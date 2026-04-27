'use client';

import { useApp } from './AppProvider';
import { useStaggerReveal } from '@/lib/useReveal';
import { translations, experiences } from '@/lib/data';
import styles from './Logos.module.css';

/** Маленькие SVG-иконки для продуктов в тултипе */
function ProductIcon({ name }: { name: string }) {
  switch (name) {
    case 'ai':
      return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.9"/>
          <path d="M10 3v2M10 15v2M3 10h2M15 10h2M5.05 5.05l1.41 1.41M13.54 13.54l1.41 1.41M5.05 14.95l1.41-1.41M13.54 6.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'tilda':
      return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 3.5L2.5 9l5.5 2L10 17l2-4.5L17 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M8 11l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'web':
      return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 10h14M10 3c-2 2-3 4.5-3 7s1 5 3 7M10 3c2 2 3 4.5 3 7s-1 5-3 7" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );
    case 'saas':
      return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 17h6M10 13v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'mobile':
      return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="2" width="8" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="10" cy="15" r="0.75" fill="currentColor"/>
        </svg>
      );
    case 'monitor':
      return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M6 17h8M10 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    default:
      return <span style={{ fontSize: 12, fontWeight: 700 }}>{name.slice(0, 2).toUpperCase()}</span>;
  }
}

export default function Logos() {
  const { locale } = useApp();
  const t = translations[locale];
  const { ref, visible } = useStaggerReveal<HTMLDivElement>(70);

  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.label}>{t.logos.label}</div>
        <div ref={ref} className={`${styles.row} reveal-stagger ${visible ? 'visible' : ''}`}>
          {experiences.map((exp) => (
            <div key={exp.id} className={styles.item}>
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
                    <div className={styles.tipProductIco} style={{ background: p.iconColor, color: '#fff' }}>
                      <ProductIcon name={p.icon} />
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
