'use client';

import { useEffect, useState } from 'react';
import styles from './CustomCursor.module.css';

/**
 * Кастомный курсор со свечением.
 * - Маленькая точка курсора следует сразу за мышью
 * - Большое свечение плавно догоняет
 * - При наведении на интерактивные элементы (a, button) курсор увеличивается
 * - На тач-устройствах и мобилках не показывается (работает только с мышью)
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Отключаем на тач-устройствах и мобилках
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (isTouch || !isFinePointer) return;
    setEnabled(true);
    // Помечаем что кастомный курсор активен — CSS скроет системный
    document.documentElement.classList.add('cursor-active');

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, label, [data-cursor-hover]');
      setHovering(Boolean(interactive));
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Большое свечение — с задержкой, плавно догоняет */}
      <div
        className={`${styles.glow} ${hovering ? styles.glowHover : ''} ${hidden ? styles.hidden : ''}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
        }}
      />
      {/* Маленькая точка курсора */}
      <div
        className={`${styles.dot} ${hovering ? styles.dotHover : ''} ${clicking ? styles.dotClick : ''} ${hidden ? styles.hidden : ''}`}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
