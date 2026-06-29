'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

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

/** Драматичное появление карточки: 3D-поворот + scale + blur out */
export const dramaticCard = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    rotateX: -18,
    y: 80,
    filter: 'blur(14px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: easeOut },
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
 * Хук magnetic-эффекта на GSAP: курсор «притягивает» элемент.
 * Возвращает ref и хэндлеры (анимация через gsap.quickTo, без framer-style).
 *
 * intensity — насколько сильно элемент тянется (0..1, обычно 0.2-0.4)
 */
export function useMagnetic<T extends HTMLElement>(intensity = 0.25) {
  const ref = useRef<T>(null);
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

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    xTo.current?.((e.clientX - cx) * intensity);
    yTo.current?.((e.clientY - cy) * intensity * 1.2);
  };

  const onMouseLeave = () => {
    xTo.current?.(0);
    yTo.current?.(0);
  };

  return { ref, onMouseMove, onMouseLeave };
}

/**
 * Tilt-эффект для карточек на GSAP: при hover карточка наклоняется в сторону
 * курсора (3D). Возвращает ref и хэндлеры (анимация через gsap.quickTo).
 */
export function useTilt<T extends HTMLElement>(maxAngle = 6) {
  const ref = useRef<T>(null);
  const rxTo = useRef<((v: number) => void) | null>(null);
  const ryTo = useRef<((v: number) => void) | null>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.set(ref.current, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
      rxTo.current = gsap.quickTo(ref.current, 'rotationX', { duration: 0.5, ease: 'power3' });
      ryTo.current = gsap.quickTo(ref.current, 'rotationY', { duration: 0.5, ease: 'power3' });
    },
    { scope: ref }
  );

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Нормализованные координаты от центра, [-1; 1]
    const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const py = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rxTo.current?.(-py * maxAngle);
    ryTo.current?.(px * maxAngle);
  };
  const onMouseLeave = () => {
    rxTo.current?.(0);
    ryTo.current?.(0);
  };

  return { ref, onMouseMove, onMouseLeave };
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

    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: target,
      duration: duration / 1000,
      ease: 'power2.out',
      onUpdate: () => {
        const formatted = isInt
          ? Math.round(obj.n).toString()
          : obj.n.toFixed(1).replace('.', match[2].includes(',') ? ',' : '.');
        setDisplay(`${prefix}${formatted}${suffix}`);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, duration, trigger]);

  return display;
}
