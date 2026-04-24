'use client';

import Link from 'next/link';
import { useApp } from './AppProvider';
import { translations, projects } from '@/lib/data';
import styles from './Featured.module.css';

export default function Featured() {
  const { locale } = useApp();
  const t = translations[locale];
  const featured = projects.find((p) => p.featured);
  if (!featured) return null;

  return (
    <div className={styles.section} id="projects">
      <div className={styles.label}>
        <b>●</b> {t.featured.label}
      </div>
      <Link href={`/projects/${featured.slug}`} className={styles.card} style={{ background: featured.color }}>
        <div className={styles.glow}></div>
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
            <div className={styles.ctaIco}>↗</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
