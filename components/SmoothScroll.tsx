'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Глобальный плавный скролл через Lenis.
 * Регистрирует RAF-цикл и хук window.lenis для других компонентов
 * (чтобы scrollIntoView работал плавно).
 *
 * Отключается на prefers-reduced-motion и на тач-устройствах
 * (на тач Lenis иногда мешает нативному scroll-momentum в iOS Safari).
 */
declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // На тач-устройствах используем нативный скролл — Lenis только для wheel
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    // Интеграция с GSAP ScrollTrigger:
    // - гоняем Lenis через единый тикер GSAP (один rAF на всё)
    // - при каждом скролле Lenis обновляем ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Пересчёт позиций триггеров после загрузки шрифтов/картинок (layout сдвигается)
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    const refreshTimer = setTimeout(refresh, 600);

    // Перехватываем нативные scrollIntoView, чтобы они шли через Lenis
    const origScrollTo = window.scrollTo.bind(window);
    const origElScrollIntoView = Element.prototype.scrollIntoView;

    Element.prototype.scrollIntoView = function (arg) {
      const opts = typeof arg === 'object' ? arg : { behavior: arg ? 'smooth' : 'auto' };
      if (opts?.behavior === 'smooth') {
        const rect = (this as HTMLElement).getBoundingClientRect();
        const target = window.scrollY + rect.top;
        lenis.scrollTo(target, { duration: 1.4 });
      } else {
        origElScrollIntoView.call(this, arg);
      }
    };

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('load', refresh);
      clearTimeout(refreshTimer);
      lenis.destroy();
      delete window.lenis;
      Element.prototype.scrollIntoView = origElScrollIntoView;
    };
  }, []);

  return null;
}
