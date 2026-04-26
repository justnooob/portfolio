'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Хук для появления блока при скролле через IntersectionObserver.
 *
 * Логика:
 * 1) Сразу проставляет data-reveal="true" — CSS скрывает элемент
 * 2) Запускает IntersectionObserver
 * 3) Когда элемент попадает в viewport — добавляет .visible → анимация
 *
 * Защита от бага "всё появилось при загрузке":
 * - Используем СТРОГУЮ проверку начальной видимости (только если элемент
 *   реально в viewport на момент монтирования, не выше и не ниже)
 * - Используем requestAnimationFrame чтобы дать браузеру layout
 *
 * Защита от пустого экрана:
 * - Без хука data-reveal не ставится → CSS не скрывает контент
 * - Если IntersectionObserver не работает — сразу показываем
 * - Fallback таймер 4с (если observer завис)
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.setAttribute('data-reveal', 'true');

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
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
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    // Даём layout успеть установиться, прежде чем подключаем observer
    const rafId = requestAnimationFrame(() => {
      observer.observe(el);
    });

    // Страховка: если за 4 секунды observer не сработал — показать насильно
    const fallback = setTimeout(() => setVisible(true), 4000);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return { ref, visible };
}

/**
 * Stagger-версия — children получают transitionDelay по индексу.
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    const rafId = requestAnimationFrame(() => {
      observer.observe(el);
    });

    const fallback = setTimeout(() => setVisible(true), 4000);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [staggerMs]);

  return { ref, visible };
}
