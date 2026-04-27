'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Хук для появления блока при скролле.
 *
 * Простая логика без оптимизаций:
 * - Сразу проставляем data-reveal="true" → CSS скрывает элемент
 * - Запускаем IntersectionObserver на этот же элемент
 * - При попадании в viewport → setVisible(true) → CSS показывает
 *
 * НЕТ:
 * - fallback-таймеров (они срабатывают одновременно у всех хуков)
 * - requestAnimationFrame (создавал race condition)
 * - early-return для уже видимых (наоборот — пусть observer сам разбирается)
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [staggerMs]);

  return { ref, visible };
}
