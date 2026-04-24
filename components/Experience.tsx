'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import { useReveal } from '@/lib/useReveal';
import { translations, experiences } from '@/lib/data';
import styles from './Experience.module.css';

/**
 * ⭐ ЛОГОТИП КОМПАНИИ В БЛОКЕ ОПЫТА
 * Чтобы заменить заглушку на реальный SVG:
 * Используй <img src="/logos/название.svg" alt="..." className={styles.logoSvg} />
 */
function CompanyLogoBig({ initials, color }: { initials: string; color: string }) {
  return (
    <svg viewBox="0 0 48 48" width="40" height="40" xmlns="http://www.w3.org/2000/svg" className={styles.logoSvg}>
      <rect width="48" height="48" rx="10" fill={color} />
      <text x="24" y="31" fontFamily="-apple-system, sans-serif" fontWeight="600" fontSize="16" fill="#0c0c0e" textAnchor="middle">
        {initials}
      </text>
    </svg>
  );
}

export default function Experience() {
  const { locale } = useApp();
  const t = translations[locale];
  const [openIdx, setOpenIdx] = useState<number>(0);
  const { ref, visible } = useReveal<HTMLDivElement>();

  const toggle = (i: number) => setOpenIdx(openIdx === i ? -1 : i);

  return (
    <div className={styles.section} id="experience">
      <div className={styles.head}>
        <div className={styles.title}>{t.experience.title}</div>
        <div className={styles.sub}>{t.experience.sub}</div>
      </div>

      <div ref={ref} className={`${styles.list} reveal-stagger ${visible ? 'visible' : ''}`}>
        {experiences.map((exp, i) => (
          <div key={exp.id} className={`${styles.card} ${openIdx === i ? styles.open : ''}`}>
            <div className={styles.cardHead} onClick={() => toggle(i)}>
              <CompanyLogoBig initials={exp.logo} color={exp.logoColor} />
              <div className={styles.info}>
                <div className={styles.companyRow}>
                  <span className={styles.company}>{exp.company[locale]}</span>
                  {exp.website && (
                    <a
                      href={`https://${exp.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.website}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {exp.website}
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>
                <div className={styles.meta}>
                  <span>{exp.location[locale]}</span>
                  <div className={styles.mdot}></div>
                  <span>{exp.role[locale]}</span>
                  <div className={styles.mdot}></div>
                  <span>{exp.period[locale]}</span>
                </div>
              </div>
              <div className={styles.kpi}>
                <div className={styles.kpiNum}>{exp.kpi.value}</div>
                <div className={styles.kpiLbl}>{exp.kpi.label[locale]}</div>
              </div>
              <div className={styles.chev}>⌄</div>
            </div>
            <div className={styles.body}>
              <div className={styles.bodyIn}>
                <div className={styles.product}>{exp.product[locale]}</div>
                <div className={styles.metrics}>
                  {exp.metrics.map((m, j) => (
                    <div key={j} className={styles.metric}>
                      <div className={styles.metricNum}>{m.value}</div>
                      <div className={styles.metricLbl}>{m.label[locale]}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.achList}>
                  {exp.achievements[locale].map((a, j) => (
                    <div key={j} className={styles.ach}>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
