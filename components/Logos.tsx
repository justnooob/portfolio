'use client';

import { useApp } from './AppProvider';
import { translations, experiences } from '@/lib/data';
import styles from './Logos.module.css';

export default function Logos() {
  const { locale } = useApp();
  const t = translations[locale];

  return (
    <div className={styles.section}>
      <div className={styles.label}>{t.logos.label}</div>
      <div className={styles.row}>
        {experiences.map((exp) => (
          <div key={exp.id} className={styles.item}>
            <div className={styles.mark} style={{ background: exp.logoColor }}>
              {exp.logo}
            </div>
            <div className={styles.name}>{exp.company[locale].split(' · ')[0]}</div>

            <div className={styles.tip}>
              <div className={styles.tipRole}>{exp.role[locale]}</div>
              <div className={styles.tipPeriod}>{exp.period[locale]}</div>
              <div className={styles.tipLbl}>{t.logos.workedOn}</div>
              {exp.products.map((p, i) => (
                <div key={i} className={styles.tipProduct}>
                  <div className={styles.tipProductIco} style={{ background: p.iconColor }}>
                    {p.icon}
                  </div>
                  <div>
                    <div className={styles.tipPn}>{p.name}</div>
                    <div className={styles.tipPd}>{p.desc[locale]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
