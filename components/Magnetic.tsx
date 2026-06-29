'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP, gsap } from '@/lib/gsap';

/**
 * Magnetic-обёртка на GSAP quickTo: курсор «притягивает» вложенный элемент.
 * Единый эффект для CTA на главной, в блоке CTA и на кнопках страниц кейсов.
 */
export default function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.4, ease: 'power3' });
      yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.4, ease: 'power3' });
    },
    { scope: ref }
  );

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-flex' }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        xTo.current?.((e.clientX - (r.left + r.width / 2)) * strength);
        yTo.current?.((e.clientY - (r.top + r.height / 2)) * strength * 1.2);
      }}
      onMouseLeave={() => {
        xTo.current?.(0);
        yTo.current?.(0);
      }}
    >
      {children}
    </span>
  );
}
