'use client';

import { useRef, useEffect, useState } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: easeOut },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerContainerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

/**
 * Хук magnetic-эффекта: курсор «притягивает» элемент.
 * Возвращает ref, motion-style объект и хэндлеры.
 *
 * intensity — насколько сильно элемент тянется (0..1, обычно 0.2-0.4)
 */
export function useMagnetic<T extends HTMLElement>(intensity = 0.25) {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * intensity);
    y.set((e.clientY - cy) * intensity * 1.2);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x: sx, y: sy }, onMouseMove, onMouseLeave };
}

/**
 * Tilt-эффект для карточек: при hover карточка наклоняется в сторону курсора (3D).
 * Используется на крупных карточках проектов.
 */
export function useTilt<T extends HTMLElement>(maxAngle = 6) {
  const ref = useRef<T>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 22 });
  const sry = useSpring(ry, { stiffness: 200, damping: 22 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Нормализованные координаты от центра, [-1; 1]
    const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const py = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rx.set(-py * maxAngle);
    ry.set(px * maxAngle);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return {
    ref,
    style: { rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' as const },
    onMouseMove,
    onMouseLeave,
  };
}

/**
 * Хук счётчика — анимирует число от start до end за duration мс,
 * запускается когда элемент попадает в viewport.
 *
 * value — итоговая строка (например "+80%"). Парсим число из неё, а суффикс/префикс
 * сохраняем. Если число не выделяется — возвращаем value как есть.
 */
export function useCounter(value: string, duration = 1400, trigger: boolean = true) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!trigger) return;
    // Извлекаем число (поддерживаем минусы, запятые в качестве разделителей)
    const match = value.match(/^([^\d-]*)(-?\d+(?:[.,]\d+)?)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const prefix = match[1];
    const target = parseFloat(match[2].replace(',', '.'));
    const suffix = match[3];
    const isInt = !match[2].includes('.') && !match[2].includes(',');

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = target * eased;
      const formatted = isInt
        ? Math.round(current).toString()
        : current.toFixed(1).replace('.', match[2].includes(',') ? ',' : '.');
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, trigger]);

  return display;
}
