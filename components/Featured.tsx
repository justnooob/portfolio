'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useApp } from './AppProvider';
import { translations, projects } from '@/lib/data';
import { fadeUp, scaleIn, staggerContainer, easeOut, useTilt, useCounter } from './motion-utils';
import styles from './Featured.module.css';

export default function Featured() {
  const { locale, theme } = useApp();
  const t = translations[locale];
  const featured = projects.find((p) => p.featured);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.2, once: true });

  if (!featured) return null;

  const cover =
    theme === 'light' && featured.coverImageLight
      ? featured.coverImageLight
      : featured.coverImage;

  const tilt = useTilt<HTMLAnchorElement>(4);

  return (
    <motion.div
      className={styles.section}
      id="projects"
      data-section="featured"
      ref={sectionRef}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      <motion.div className={styles.label} variants={fadeUp}>
        <span className={styles.labelDot}>●</span> {t.featured.label}
      </motion.div>

      <motion.div variants={scaleIn}>
        <motion.div
          ref={tilt.ref as any}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={{ ...tilt.style, perspective: 1200 }}
        >
          <Link
            href={`/projects/${featured.slug}`}
            className={styles.card}
            style={{ background: featured.color }}
          >
            <div className={styles.glow}></div>
            {cover && (
              <div className={styles.coverBg}>
                <img src={cover} alt={featured.name[locale]} />
              </div>
            )}
            <div className={styles.top}>
              <div className={styles.tags}>
                {featured.tags[locale].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className={styles.tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: easeOut, delay: 0.4 + i * 0.06 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <div className={styles.year}>{featured.year}</div>
            </div>
            <div className={styles.main}>
              <h2 className={styles.name}>
                <SplitText text={featured.name[locale]} inView={inView} delay={0.5} />
              </h2>
              <motion.p
                className={styles.desc}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: easeOut, delay: 0.7 }}
              >
                {featured.shortDesc[locale]}
              </motion.p>
              {featured.metrics && (
                <div className={styles.metrics}>
                  {featured.metrics.map((m, i) => (
                    <MetricItem
                      key={i}
                      value={m.value}
                      label={m.label[locale]}
                      delay={0.85 + i * 0.08}
                      trigger={inView}
                    />
                  ))}
                </div>
              )}
              <motion.div
                className={styles.cta}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: easeOut, delay: 1.05 }}
              >
                {t.featured.cta}
                <span className={styles.ctaIco}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </motion.div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Анимированный счётчик для метрик кейса */
function MetricItem({
  value,
  label,
  delay,
  trigger,
}: {
  value: string;
  label: string;
  delay: number;
  trigger: boolean;
}) {
  const display = useCounter(value, 1500, trigger);
  return (
    <motion.div
      className={styles.metric}
      initial={{ opacity: 0, y: 20 }}
      animate={trigger ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      <div className={styles.metricNum}>{display}</div>
      <div className={styles.metricLbl}>{label}</div>
    </motion.div>
  );
}

/** Текст, разбитый на буквы со slide-in появлением */
function SplitText({ text, inView, delay = 0 }: { text: string; inView: boolean; delay?: number }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
          initial={{ y: '110%' }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.7, ease: easeOut, delay: delay + i * 0.035 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}
