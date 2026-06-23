'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Тонкая прогресс-линия в верхней части экрана.
 * Растёт от 0 до 100% по мере прокрутки документа.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: 'left',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, var(--accent), #a855f7)',
        zIndex: 200,
        pointerEvents: 'none',
      }}
    />
  );
}
