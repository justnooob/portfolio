'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import { useReveal } from '@/lib/useReveal';
import { translations, experiences, type Experience as ExpType } from '@/lib/data';
import { useCounter } from './motion-utils';
import styles from './Experience.module.css';

export default function Experience() {
  const { locale } = useApp();
  const t = translations[locale];
  const [openIdx, setOpenIdx] = useState<number>(0);
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();

  const toggle = (i: number) => setOpenIdx(openIdx === i ? -1 : i);

  return (
    <div className={styles.section} id="experience" data-section="experience">
      <div ref={headRef} className={`${styles.head} reveal-slide-left ${headVisible ? 'visible' : ''}`}>
        <div className={styles.title}>{t.experience.title}</div>
        <div className={styles.sub}>{t.experience.sub}</div>
      </div>

      {/*
        Каждая карточка использует свой собственный useReveal —
        появляется индивидуально при попадании во viewport.
        Это даёт плавное последовательное появление при скролле,
        а не один общий триггер на всю секцию.
      */}
      <div className={styles.list}>
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={exp.id}
            exp={exp}
            isOpen={openIdx === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}

function ExperienceCard({
  exp,
  isOpen,
  onToggle,
}: {
  exp: ExpType;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { locale, theme } = useApp();
  // Каждая карточка — свой IntersectionObserver через useReveal.
  // Появление триггерится индивидуально при подскроле к карточке.
  const { ref, visible } = useReveal<HTMLDivElement>();

  // Выбираем логотип по теме: для светлой используем logoSrcLight если есть
  const logoForTheme =
    theme === 'light' && exp.logoSrcLight ? exp.logoSrcLight : exp.logoSrc;

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isOpen ? styles.open : ''} reveal-3d-tilt ${visible ? 'visible' : ''}`}
    >
      <div className={styles.cardHead} onClick={onToggle}>
        {logoForTheme ? (
          <img
            src={logoForTheme}
            alt={exp.company[locale]}
            className={`${styles.logoImg}${exp.id === 'freelance' ? ` ${styles.logoImgSoromax}` : ''}${exp.id === 'uk-medicina' ? ` ${styles.logoImgOkk}` : ''}`}
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
          <div className={styles.kpiNum}>
            <KpiCount value={exp.kpi.value} trigger={visible} />
          </div>
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
                <div className={styles.metricNum}>
                  <KpiCount value={m.value} trigger={isOpen} />
                </div>
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
}

function KpiCount({ value, trigger }: { value: string; trigger: boolean }) {
  const display = useCounter(value, 1300, trigger);
  return <>{display}</>;
}
