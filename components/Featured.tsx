'use client';

import Link from 'next/link';
import { useApp } from './AppProvider';
import { useReveal } from '@/lib/useReveal';
import { translations, projects } from '@/lib/data';
import styles from './Featured.module.css';

export default function Featured() {
  const { locale, theme } = useApp();
  const t = translations[locale];
  const featured = projects.find((p) => p.featured);
  const { ref, visible } = useReveal<HTMLDivElement>();
  if (!featured) return null;

  const cover =
    theme === 'light' && featured.coverImageLight
      ? featured.coverImageLight
      : featured.coverImage;

  return (
    <div className={styles.section} id="projects">
      <div className={styles.label}>
        <span className={styles.labelDot}>●</span> {t.featured.label}
      </div>
      <div ref={ref} className={`reveal-scale ${visible ? 'visible' : ''}`}>
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
            {featured.tags[locale].map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.year}>{featured.year}</div>
        </div>
        <div className={styles.main}>
          <h2 className={styles.name}>{featured.name[locale]}</h2>
          <p className={styles.desc}>{featured.shortDesc[locale]}</p>
          {featured.metrics && (
            <div className={styles.metrics}>
              {featured.metrics.map((m, i) => (
                <div key={i} className={styles.metric}>
                  <div className={styles.metricNum}>{m.value}</div>
                  <div className={styles.metricLbl}>{m.label[locale]}</div>
                </div>
              ))}
            </div>
          )}
          <div className={styles.cta}>
            {t.featured.cta}
            <span className={styles.ctaIco}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
      </div>
    </div>
  );
}
