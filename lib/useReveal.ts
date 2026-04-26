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
 * НЕ используем fallback-таймер: он срабатывал у всех хуков сразу через
 * N секунд независимо от позиции, и анимации теряли смысл.
 * IntersectionObserver работает в 99.9% браузеров — можно полагаться.
 *
 * Если IntersectionObserver вообще не поддерживается (старый браузер) —
 * сразу показываем без анимации.
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

    const rafId = requestAnimationFrame(() => {
      observer.observe(el);
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
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

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [staggerMs]);

  return { ref, visible };
}
