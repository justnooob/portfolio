'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Хук для появления блока при скролле.
 * Работает во ВСЕХ браузерах через IntersectionObserver.
 *
 * Защиты от пустого экрана:
 * 1) Если IntersectionObserver не поддерживается — сразу показываем
 * 2) Если элемент УЖЕ виден на момент монтирования — мгновенно показываем
 * 3) Fallback: 200мс после монтирования принудительно показываем
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    // Если элемент сразу в зоне видимости — показываем без ожидания
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < winH && rect.bottom > 0) {
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
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(el);

    const fallback = setTimeout(() => setVisible(true), 200);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return { ref, visible };
}

/**
 * Stagger-версия: к каждому ребёнку контейнера добавляется
 * inline-стиль с transition-delay в зависимости от индекса.
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  staggerMs: number = 80
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Применяем delay на каждого ребёнка
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
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(el);

    const fallback = setTimeout(() => setVisible(true), 250);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [staggerMs]);

  return { ref, visible };
}
