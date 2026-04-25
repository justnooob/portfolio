'use client';

import { useApp } from './AppProvider';
import { translations, experiences } from '@/lib/data';
import styles from './Logos.module.css';

export default function Logos() {
  const { locale } = useApp();
  const t = translations[locale];

  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.label}>{t.logos.label}</div>
        <div className={`${styles.row} reveal-stagger`}>
          {experiences.map((exp) => (
            <div key={exp.id} className={styles.item}>
              {/*
                ⭐ Логотипы лежат в /public/logos/.
                Чтобы заменить логотип компании — просто положи свой файл
                с тем же именем, например: public/logos/uk-medicina.svg
              */}
              {exp.logoSrc ? (
                <img
                  src={exp.logoSrc}
                  alt={exp.company[locale]}
                  className={styles.logo}
                />
              ) : (
                <div className={styles.logoFallback} style={{ background: exp.logoColor }}>
                  {exp.logo}
                </div>
              )}

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
    </div>
  );
}
