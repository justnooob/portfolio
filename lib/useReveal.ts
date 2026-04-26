'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Хук для появления блока при скролле.
 *
 * Как работает:
 * 1) Сразу проставляет на элемент data-reveal="true" — это запускает
 *    скрытие через CSS [data-reveal].reveal { opacity: 0 ... }
 * 2) Через IntersectionObserver следит за видимостью
 * 3) Когда элемент в зоне видимости — добавляет класс .visible → анимация
 *
 * Защиты от пустого экрана:
 * - Если JS не сработает или хук не подключён — на элементе нет
 *   data-reveal, и CSS-правила со скрытием НЕ применяются → контент виден.
 * - Если IntersectionObserver не поддерживается — сразу .visible
 * - Если элемент уже виден на момент монтирования — сразу .visible
 * - Fallback таймер 250мс на случай зависания observer-а
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Включаем "скрытое" состояние через data-атрибут — CSS подхватит
    el.setAttribute('data-reveal', 'true');

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < winH && rect.bottom > 0) {
      // Элемент уже виден — даём чуть времени на CSS, потом анимируем
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(el);

    // Страховка — через 250мс точно показать
    const fallback = setTimeout(() => setVisible(true), 250);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return { ref, visible };
}

/**
 * Stagger-версия — каждый ребёнок получает свой transition-delay
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  staggerMs: number = 80
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.setAttribute('data-reveal', 'true');

    Array.from(el.children).forEach((child, idx) => {
      (child as HTMLElement).style.transitionDelay = `${idx * staggerMs}ms`;
    });

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < winH && rect.bottom > 0) {
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);

    const fallback = setTimeout(() => setVisible(true), 300);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [staggerMs]);

  return { ref, visible };
}
