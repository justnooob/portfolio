'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Хук для появления блока при скролле.
 *
 * Защиты от пустых экранов:
 * 1) Если элемент УЖЕ виден на момент монтирования — мгновенно показываем
 * 2) Если IntersectionObserver не поддерживается — показываем сразу
 * 3) Fallback: через 200мс после монтирования принудительно показываем
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
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
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
