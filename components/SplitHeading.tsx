'use client';

import { useRef, createElement } from 'react';
import { useGSAP, splitHeadingReveal, type SplitHeadingOptions } from '@/lib/gsap';

/**
 * Переиспользуемый заголовок с кинематографичным SplitText-reveal.
 * Один компонент для всех страниц → единое поведение повторяющегося контента
 * (имя hero, «РАБОТЫ», заголовки кейсов и стенделон-проектов).
 *
 * Текст передаётся строкой; переносы строк (\n) дают многострочный заголовок,
 * SplitText разбивает на строки/символы и анимирует их выезд из-под маски.
 */
export default function SplitHeading({
  as = 'h1',
  text,
  className,
  type = 'lines, chars',
  delay = 0,
  onScroll = false,
  stagger,
  duration,
}: {
  as?: keyof JSX.IntrinsicElements;
  text: string;
  className?: string;
  } & SplitHeadingOptions) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const { cleanup } = splitHeadingReveal(el, { type, delay, onScroll, stagger, duration });
      return cleanup;
    },
    { scope: ref, dependencies: [text, type] }
  );

  // Сохраняем переносы строк (white-space задаётся в CSS получателя при необходимости)
  return createElement(
  as,
  {
    ref,
    className,
    key: `${as}-${text}`
  },
  text
);
}
