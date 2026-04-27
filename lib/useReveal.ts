'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Хук для появления блока при скролле через IntersectionObserver.
 *
 * ВАЖНО: data-reveal устанавливается ПОСЛЕ того, как observer уже подключён.
 * Это даёт observer-у шанс зафиксировать начальное состояние пересечения
 * до того, как clip-path/opacity скроет элемент.
 *
 * Также используем threshold: 0 (любая часть видна) вместо 0.15 — это
 * страхует от случаев когда карточка большая и 15% не помещается во viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      // Старый браузер — сразу показываем без скрытия
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
      {
        // threshold 0 — любое касание viewport считается видимым.
        // rootMargin -80px снизу — анимация запускается когда блок реально вошёл в экран.
        threshold: 0,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    // Подключаем observer ПЕРВЫМ — он зарегистрирует initial state
    observer.observe(el);

    // ПОТОМ ставим data-reveal — теперь скрытие применится,
    // но observer уже знает начальное положение элемента
    el.setAttribute('data-reveal', 'true');

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
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    );

    observer.observe(el);
    el.setAttribute('data-reveal', 'true');

    return () => observer.disconnect();
  }, [staggerMs]);

  return { ref, visible };
}
