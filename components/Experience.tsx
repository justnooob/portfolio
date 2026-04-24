'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import { translations, experiences } from '@/lib/data';
import styles from './Experience.module.css';

export default function Experience() {
  const { locale } = useApp();
  const t = translations[locale];
  const [openIdx, setOpenIdx] = useState<number>(0);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? -1 : i);

  return (
    <div className={styles.section} id="experience">
      <div className={styles.head}>
        <div className={styles.title}>{t.experience.title}</div>
        <div className={styles.sub}>{t.experience.sub}</div>
      </div>

      <div className={styles.list}>
        {experiences.map((exp, i) => (
          <div key={exp.id} className={`${styles.card} ${openIdx === i ? styles.open : ''}`}>
            <div className={styles.cardHead} onClick={() => toggle(i)}>
              <div className={styles.logo} style={{ background: exp.logoColor }}>
                {exp.logo}
              </div>
              <div className={styles.info}>
                <div className={styles.company}>{exp.company[locale]}</div>
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
