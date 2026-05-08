'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Плавные переходы между страницами через AnimatePresence.
 * Ключ — pathname, mode="wait" обеспечивает порядок (exit → enter).
 *
 * Hero scene остаётся снаружи и переживает навигацию,
 * только контент main/page анимируется.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // На каждой смене страницы скроллим вверх (без анимации,
  // т.к. exit-анимация уже идёт). Lenis сам уважает immediate.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
