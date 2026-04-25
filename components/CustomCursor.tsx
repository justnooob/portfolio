'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

/**
 * Лёгкий кастомный курсор со свечением.
 * - Без mix-blend-mode (это очень тяжело для GPU)
 * - Использует requestAnimationFrame для плавности
 * - Не показывается на тач-устройствах и мобилках
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);

  useEffect(() => {
    // Отключаем на тач-устройствах и мобилках
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (isTouch || !isFinePointer) return;

    enabled.current = true;
    document.documentElement.classList.add('cursor-active');

    // Текущая позиция (мгновенная) и lazy позиция (для свечения)
    let mx = -100, my = -100;
    let gx = -100, gy = -100;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Точка следует мгновенно
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        dotRef.current.style.opacity = '1';
      }
    };

    const tick = () => {
      // Свечение плавно догоняет (lerp)
      gx += (mx - gx) * 0.15;
      gy += (my - gy) * 0.15;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
        glowRef.current.style.opacity = '1';
      }
      rafId = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, label, [data-cursor-hover]');
      if (interactive) {
        dotRef.current?.classList.add(styles.dotHover);
        glowRef.current?.classList.add(styles.glowHover);
      } else {
        dotRef.current?.classList.remove(styles.dotHover);
        glowRef.current?.classList.remove(styles.glowHover);
      }
    };

    const onDown = () => dotRef.current?.classList.add(styles.dotClick);
    const onUp = () => dotRef.current?.classList.remove(styles.dotClick);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('cursor-active');
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className={styles.glow} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
