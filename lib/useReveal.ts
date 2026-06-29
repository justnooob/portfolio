'use client';

import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP, EASE, prefersReducedMotion } from './gsap';

/**
 * Появление карточки проекта/кейса — единый эффект для главной и /projects
 * (замена прежней «Figma frame draw»). Карточка «всплывает»: clip снизу вверх +
 * scale-from + лёгкий blur, а изображение внутри получает мягкий parallax на скролле.
 *
 * Возвращает cardRef (обёртка карточки) и imgRef (опц. — изображение для parallax).
 */
export function useCardReveal<
  C extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLImageElement
>() {
  const cardRef = useRef<C>(null);
  const imgRef = useRef<I>(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (!card) return;
      if (prefersReducedMotion()) return;

      gsap.from(card, {
        opacity: 0,
        y: 48,
        scale: 0.96,
        filter: 'blur(8px)',
        clipPath: 'inset(0% 0% 100% 0% round 16px)',
        duration: 0.95,
        ease: EASE.out,
        clearProps: 'filter,clipPath',
        scrollTrigger: { trigger: card, start: 'top 90%', once: true },
      });

      // Мягкий parallax изображения внутри карточки.
      // scale даёт запас по краям, чтобы сдвиг не обнажал фон контейнера.
      const img = imgRef.current;
      if (img) {
        gsap.set(img, { scale: 1.14, transformOrigin: 'center center' });
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    },
    { scope: cardRef }
  );

  return { cardRef, imgRef };
}

/**
 * Хук появления блока при скролле.
 *
 * Движок наблюдения — GSAP ScrollTrigger (а не IntersectionObserver): он
 * синхронизирован с Lenis через общий тикер, поэтому reveal-классы срабатывают
 * ровно в такт плавному скроллу. API сохранён ({ ref, visible }), CSS-классы
 * появления (reveal-slide-left и т.п.) продолжают работать через `visible`.
 *
 * Cleanup (kill триггеров) выполняется автоматически благодаря useGSAP scope.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        setVisible(true);
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        // запуск, когда блок реально вошёл в экран (с запасом снизу)
        start: 'top 90%',
        once: true,
        onEnter: () => setVisible(true),
      });
      // Атрибут включает CSS-скрытие ([data-reveal].reveal-*). Ставим ПОСЛЕ
      // создания триггера, чтобы позиции считались по «обычному» положению.
      el.setAttribute('data-reveal', 'true');
    },
    { scope: ref }
  );

  return { ref, visible };
}

/**
 * Поблочное появление контента (страницы кейсов/стенделон-проектов).
 * Каждый прямой ребёнок контейнера всплывает по мере входа в зону видимости —
 * страница перестаёт быть «статичной формой» и оживает на скролле.
 */
export function useContentReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const blocks = gsap.utils.toArray<HTMLElement>(root.children);
      if (!blocks.length || prefersReducedMotion()) return;

      gsap.set(blocks, { opacity: 0, y: 42, filter: 'blur(6px)' });
      ScrollTrigger.batch(blocks, {
        start: 'top 86%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: EASE.out,
            stagger: 0.1,
            overwrite: true,
            onComplete: () => gsap.set(batch, { clearProps: 'filter,transform' }),
          }),
      });
    },
    { scope: ref }
  );

  return ref;
}

/**
 * Stagger-версия — children получают transitionDelay по индексу (для CSS-переходов),
 * а сам контейнер раскрывается по ScrollTrigger.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  staggerMs: number = 80
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      Array.from(el.children).forEach((child, idx) => {
        (child as HTMLElement).style.transitionDelay = `${idx * staggerMs}ms`;
      });

      if (prefersReducedMotion()) {
        setVisible(true);
        return;
      }
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => setVisible(true),
      });
      el.setAttribute('data-reveal', 'true');
    },
    { scope: ref, dependencies: [staggerMs] }
  );

  return { ref, visible };
}
