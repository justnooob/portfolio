'use client';

import { motion } from 'framer-motion';
import Nav from '@/components/Nav';
import Projects from '@/components/Projects';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import { useApp } from '@/components/AppProvider';
import { translations } from '@/lib/data';
import { easeOut } from '@/components/motion-utils';
import styles from './projects-index.module.css';

/**
 * Отдельная страница со всеми проектами.
 * Hero — крупный заголовок «WORK / РАБОТЫ», под ним грид всех категорий.
 */
export default function ProjectsIndexPage() {
  const { locale } = useApp();
  const t = translations[locale];

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
          <div className={styles.label}>
            <span className={styles.dot} />
            {locale === 'ru' ? 'Проекты' : 'Selected work'}
          </div>
          <h1 className={styles.title}>
            <SplitText text={locale === 'ru' ? 'РАБОТЫ' : 'WORK'} />
          </h1>
          <p className={styles.sub}>
            {locale === 'ru'
              ? 'Подборка кейсов: AI SaaS, B2B-продукты, мобильные приложения, сайты и Telegram MiniApps.'
              : 'A curated set of cases: AI SaaS, B2B products, mobile apps, websites and Telegram MiniApps.'}
          </p>
        </motion.div>
      </section>

      <Projects />
      <FinalCta />
      <Footer />
    </main>
  );
}

function SplitText({ text }: { text: string }) {
  return (
    <span style={{ display: 'inline-block' }}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.85, ease: easeOut, delay: 0.3 + i * 0.05 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
