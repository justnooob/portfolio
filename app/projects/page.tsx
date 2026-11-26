'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import FeaturedProducts from '@/components/FeaturedProducts';
import Projects from '@/components/Projects';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import { useApp } from '@/components/AppProvider';
import { easeOut } from '@/components/motion-utils';
import SplitHeading from '@/components/SplitHeading';
import styles from './projects-index.module.css';
import NevaTripTeaser from './NevaTripTeaser';

/**
 * Отдельная страница со всеми проектами.
 * Hero — крупный заголовок «WORK / РАБОТЫ», под ним грид всех категорий.
 */
export default function ProjectsIndexPage() {
  const { locale } = useApp();

  // Возврат с кейса/проекта по якорю (#slug): плавно докручиваем к нужной
  // карточке. Старт — с текущей (верхней) позиции, скролл анимированный вниз/вверх.
  // offset -70 под фиксированный nav, чтобы заголовок/теги не уходили под него.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (!hash) return;
    let cancelled = false;
    const run = (attempt = 0) => {
      if (cancelled) return;
      const el = document.getElementById(hash);
      const lenis = (window as unknown as {
        lenis?: { scrollTo: (t: Element | number, o?: { offset?: number }) => void };
      }).lenis;
      if (!el || !lenis?.scrollTo) {
        if (attempt < 50) setTimeout(() => run(attempt + 1), 80);
        else if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      lenis.scrollTo(el, { offset: -70 });
    };
    // Короткая задержка — ждём когда Next.js завершит рендер DOM
    setTimeout(() => run(), 50);
    return () => { cancelled = true; };
  }, []);

  return (
    <main>
      <Nav />

      <section className={styles.hero} data-section="hero">
        <motion.div
          className={styles.heroInner}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <SplitHeading
            as="h1"
            className={styles.title}
            text={locale === 'ru' ? 'РАБОТЫ' : 'WORK'}
            type="chars"
            delay={0.25}
            stagger={0.05}
          />
        </motion.div>
      </section>

      <FeaturedProducts hideBanner />
      <NevaTripTeaser />
      <Projects olderOnly />
      <FinalCta />
      <Footer />
    </main>
  );
}

