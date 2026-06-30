'use client';

/**
 * Единая точка входа GSAP для всего проекта.
 *
 * - Регистрирует плагины один раз (ScrollTrigger, SplitText, useGSAP).
 * - Экспортирует общие пресеты (ease / длительности) для консистентности
 *   анимаций между страницами.
 * - Содержит переиспользуемые хелперы reveal / parallax / split-заголовков,
 *   чтобы повторяющийся контент (карточки, заголовки, секции) вёл себя
 *   одинаково на главной, /projects и страницах кейсов.
 *
 * Весь GSAP — строго клиентский (Next.js SSR не должен дёргать gsap/ScrollTrigger).
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, MorphSVGPlugin, useGSAP);
}

/* ── Пресеты ────────────────────────────────────────────────── */

/** Единые easing-кривые. EASE.out совпадает по ощущению с прежним [0.16,1,0.3,1]. */
export const EASE = {
  out: 'power3.out',
  outSoft: 'power2.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
} as const;

/** Базовые длительности (сек) — чтобы reveal/заголовки были согласованы. */
export const DUR = {
  fast: 0.5,
  base: 0.8,
  slow: 1.1,
} as const;

/** Уважение к prefers-reduced-motion. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Десктоп ли (для pinned/horizontal эффектов, которые на мобилке деградируют). */
export function isDesktop(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(min-width: 1025px)').matches;
}

/* ── Reveal: появление блоков по скроллу ────────────────────── */

export interface RevealOptions {
  y?: number;
  blur?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  /** scale-from (например 0.96) — для карточек. */
  scaleFrom?: number;
}

/**
 * Появление элементов «снизу + проявление» по мере входа в зону видимости.
 * Использует ScrollTrigger.batch — эффективная замена IntersectionObserver,
 * с естественным стаггером для элементов, вошедших вместе.
 *
 * targets — селектор (в пределах scope) или массив элементов.
 * Возвращает функцию очистки (kill всех созданных триггеров).
 */
export function revealBatch(
  targets: gsap.DOMTarget,
  opts: RevealOptions = {}
): () => void {
  const {
    y = 34,
    blur = 6,
    duration = DUR.base,
    stagger = 0.12,
    start = 'top 88%',
    scaleFrom,
  } = opts;

  const els = gsap.utils.toArray<HTMLElement>(targets);
  if (!els.length) return () => {};

  if (prefersReducedMotion()) {
    gsap.set(els, { clearProps: 'all' });
    return () => {};
  }

  // Начальное скрытое состояние
  gsap.set(els, {
    opacity: 0,
    y,
    filter: blur ? `blur(${blur}px)` : 'none',
    ...(scaleFrom ? { scale: scaleFrom } : {}),
  });

  const triggers = ScrollTrigger.batch(els, {
    start,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration,
        ease: EASE.out,
        stagger,
        overwrite: true,
        onComplete: () => gsap.set(batch, { clearProps: 'filter,transform' }),
      }),
  });

  return () => triggers.forEach((t) => t.kill());
}

/* ── Parallax / scrub ───────────────────────────────────────── */

export interface ParallaxOptions {
  /** На сколько px сместить за весь проход (отрицательное — вверх). */
  y?: number;
  /** Затухание прозрачности к концу (0..1, 1 = не затухает). */
  fadeTo?: number;
  trigger?: Element;
  start?: string;
  end?: string;
  scale?: number;
}

/** Привязывает transform элемента к скроллу (scrub) — мягкий премиальный parallax. */
export function parallax(el: Element, opts: ParallaxOptions = {}): ScrollTrigger | null {
  if (prefersReducedMotion()) return null;
  const { y = -80, fadeTo = 1, trigger = el, start = 'top top', end = 'bottom top', scale } = opts;
  const tween = gsap.to(el, {
    y,
    ...(fadeTo < 1 ? { opacity: fadeTo } : {}),
    ...(scale ? { scale } : {}),
    ease: 'none',
    scrollTrigger: { trigger, start, end, scrub: true },
  });
  return tween.scrollTrigger ?? null;
}

/* ── SplitText: кинематографичный reveal заголовков ─────────── */

export interface SplitHeadingOptions {
  /** 'lines' | 'chars' | 'words' и комбинации. */
  type?: string;
  duration?: number;
  stagger?: number;
  delay?: number;
  y?: string;
  /** Запуск по входу в зону видимости (ScrollTrigger) вместо немедленного. */
  onScroll?: boolean;
  start?: string;
}

/**
 * Reveal заголовка через SplitText с mask-эффектом (строки/символы выезжают
 * из-под обрезки). Возвращает SplitText-инстанс и функцию очистки.
 * Один помощник для всех заголовков → консистентность между страницами.
 */
export function splitHeadingReveal(
  el: Element,
  opts: SplitHeadingOptions = {}
): { split: SplitText | null; cleanup: () => void } {
  const {
    type = 'lines',
    duration = DUR.slow,
    stagger = 0.12,
    delay = 0,
    y = '110%',
    onScroll = false,
    start = 'top 85%',
  } = opts;

  if (prefersReducedMotion()) {
    return { split: null, cleanup: () => {} };
  }

  // Без mask (overflow:clip) — иначе при плотном line-height обрезаются нижние
  // выносные элементы букв (р, у, ц…). Строки/буквы просто выезжают снизу + fade.
  const split = SplitText.create(el, {
    type,
    linesClass: 'gsapLine',
    autoSplit: true,
  });

  const targets =
    type.includes('chars') ? split.chars : type.includes('words') ? split.words : split.lines;

  const tween = gsap.from(targets, {
    yPercent: parseFloat(y),
    opacity: 0,
    duration,
    ease: EASE.out,
    stagger,
    delay,
    ...(onScroll ? { scrollTrigger: { trigger: el, start, once: true } } : {}),
  });

  return {
    split,
    cleanup: () => {
      tween.kill();
      split.revert();
    },
  };
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
