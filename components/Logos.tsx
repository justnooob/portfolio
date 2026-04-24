'use client';

import { useApp } from './AppProvider';
import { useReveal } from '@/lib/useReveal';
import { translations, experiences } from '@/lib/data';
import styles from './Logos.module.css';

function CompanyLogoPlaceholder({ initials, color }: { initials: string; color: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" xmlns="http://www.w3.org/2000/svg" className={styles.placeholderSvg}>
      <rect width="40" height="40" rx="8" fill={color} />
      <text x="20" y="26" fontFamily="-apple-system, sans-serif" fontWeight="600" fontSize="14" fill="#0c0c0e" textAnchor="middle">
        {initials}
      </text>
    </svg>
  );
}

export default function Logos() {
  const { locale } = useApp();
  const t = translations[locale];
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.label}>{t.logos.label}</div>
        <div ref={ref} className={`${styles.row} reveal-stagger ${visible ? 'visible' : ''}`}>
          {experiences.map((exp) => (
            <div key={exp.id} className={styles.item}>
              <CompanyLogoPlaceholder initials={exp.logo} color={exp.logoColor} />
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
    </div>
  );
}
