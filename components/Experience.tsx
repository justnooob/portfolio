'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import { useReveal, useStaggerReveal } from '@/lib/useReveal';
import { translations, experiences } from '@/lib/data';
import styles from './Experience.module.css';

export default function Experience() {
  const { locale, theme } = useApp();
  const t = translations[locale];
  const [openIdx, setOpenIdx] = useState<number>(0);
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();
  const { ref: listRef, visible: listVisible } = useStaggerReveal<HTMLDivElement>(110);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? -1 : i);

  return (
    <div className={styles.section} id="experience">
      <div ref={headRef} className={`${styles.head} reveal-slide-left ${headVisible ? 'visible' : ''}`}>
        <div className={styles.title}>{t.experience.title}</div>
        <div className={styles.sub}>{t.experience.sub}</div>
      </div>

      <div ref={listRef} className={`${styles.list} reveal-stagger ${listVisible ? 'visible' : ''}`}>
        {experiences.map((exp, i) => {
          // Выбираем логотип по теме: для светлой используем logoSrcLight если есть
          const logoForTheme =
            theme === 'light' && exp.logoSrcLight ? exp.logoSrcLight : exp.logoSrc;

          return (
          <div key={exp.id} className={`${styles.card} ${openIdx === i ? styles.open : ''}`}>
            <div className={styles.cardHead} onClick={() => toggle(i)}>
              {/*
                Логотип компании — берётся из public/logos/.
                Для светлой темы можно подложить инвертированный вариант
                через поле logoSrcLight в data.ts (см. smetter, atlant).
              */}
              {logoForTheme ? (
                <img
                  src={logoForTheme}
                  alt={exp.company[locale]}
                  className={styles.logoImg}
                />
              ) : (
                <div className={styles.logoFallback} style={{ background: exp.logoColor }}>
                  {exp.logo}
                </div>
              )}
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
          );
        })}
      </div>
    </div>
  );
}
