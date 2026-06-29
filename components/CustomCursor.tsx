'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './CustomCursor.module.css';

/**
 * Кастомный курсор-указатель.
 * - Форма ближе к обычному курсору (стрелка-указатель), чуть крупнее.
 * - Цвет инвертируется по теме (чёрный на светлой, белый на тёмной) — без свечения.
 * - При наведении на кликабельное morphSVG плавно превращает указатель в круг,
 *   внутри которого проявляется диагональная стрелка ↗.
 * - Позиция — через gsap.quickTo (один переиспользуемый твин, плавно).
 */

// Указатель (hotspot — верхний левый угол) и круг для morph при ховере.
const POINTER = 'M4 2.5L4 20L9 15.4L12.2 21.6L15.1 20.1L11.9 14.1L18.4 14.1Z';
const CIRCLE = 'M12 2.2A9.8 9.8 0 1 0 12.01 2.2Z';

export default function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const arrowRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (isTouch || !isFinePointer) return;

    document.documentElement.classList.add('cursor-active');

    const wrap = wrapRef.current!;
    const path = pathRef.current!;
    const arrow = arrowRef.current!;

    const xTo = gsap.quickTo(wrap, 'x', { duration: 0.13, ease: 'power3' });
    const yTo = gsap.quickTo(wrap, 'y', { duration: 0.13, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      wrap.style.opacity = '1';
    };
    const onLeave = () => {
      wrap.style.opacity = '0';
    };

    let hovering = false;
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = !!target.closest(
        'a, button, [role="button"], input, textarea, label, [data-cursor-hover]'
      );
      if (interactive === hovering) return;
      hovering = interactive;
      gsap.to(path, {
        morphSVG: interactive ? CIRCLE : POINTER,
        duration: 0.35,
        ease: 'power3.inOut',
      });
      gsap.to(wrap, {
        scale: interactive ? 1.7 : 1,
        duration: 0.35,
        ease: 'power3.inOut',
      });
      gsap.to(arrow, { opacity: interactive ? 1 : 0, duration: 0.2 });
    };

    const onDown = () => gsap.to(wrap, { scale: hovering ? 1.45 : 0.8, duration: 0.15 });
    const onUp = () => gsap.to(wrap, { scale: hovering ? 1.7 : 1, duration: 0.15 });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.classList.remove('cursor-active');
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.cursor} aria-hidden="true">
      <svg viewBox="0 0 24 24" className={styles.cursorSvg}>
        <path ref={pathRef} d={POINTER} className={styles.cursorShape} />
        <g ref={arrowRef} style={{ opacity: 0 }} className={styles.cursorArrow}>
          <path
            d="M9.5 14.5L14.5 9.5M14.5 9.5H10.5M14.5 9.5V13.5"
            fill="none"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
