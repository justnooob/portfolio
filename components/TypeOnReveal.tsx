'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  speed?: number; // мс на символ
  delay?: number; // задержка перед стартом, мс
  /** 'div' | 'span' — простой выбор тега */
  as?: 'div' | 'span';
  className?: string;
  /** Если true — после печати показать курсор-каретку */
  showCursor?: boolean;
  /** Стартовать сразу при монтировании, без ожидания скролла */
  startImmediately?: boolean;
}

/**
 * Печатает текст по символам когда элемент попадает в viewport.
 * Если JS не работает — текст просто отображается.
 */
export default function TypeOnReveal({
  text,
  speed = 22,
  delay = 0,
  as = 'span',
  className,
  showCursor = false,
  startImmediately = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(startImmediately);

  // IntersectionObserver — стартует при появлении
  useEffect(() => {
    if (started) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -5% 0px' }
    );

    const raf = requestAnimationFrame(() => observer.observe(el));
    const fallback = setTimeout(() => setStarted(true), 5000);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [started]);

  // Сама печать
  useEffect(() => {
    if (!started) return;
    let i = 0;
    let cancelled = false;

    const startTimer = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        i++;
        setDisplay(text.slice(0, i));
        if (i < text.length) {
          setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      tick();
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
    };
  }, [started, text, speed, delay]);

  const content = (
    <>
      {started ? display : text}
      {showCursor && started && !done && <span className="type-caret">│</span>}
    </>
  );

  // Используем простую условную отрисовку — без сложных полиморфных типов
  if (as === 'div') {
    return (
      <div
        ref={ref}
        className={className}
        data-typed={started ? 'true' : undefined}
        data-done={done ? 'true' : undefined}
      >
        {content}
      </div>
    );
  }

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={className}
      data-typed={started ? 'true' : undefined}
      data-done={done ? 'true' : undefined}
    >
      {content}
    </span>
  );
}
