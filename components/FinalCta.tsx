'use client';

import { useApp } from './AppProvider';
import { translations } from '@/lib/data';
import styles from './FinalCta.module.css';

export default function FinalCta() {
  const { locale } = useApp();
  const t = translations[locale];

  return (
    <div className={styles.section}>
      <div className={styles.glow}></div>
      <div className={styles.inner}>
        <div className={styles.label}>
          <div className={styles.dot}></div>
          {t.finalCta.badge}
        </div>
        <h2 className={styles.title}>
          {t.finalCta.title1} <span>{t.finalCta.title2}</span> {t.finalCta.title3}
        </h2>
        <p className={styles.desc}>{t.finalCta.description}</p>
        <div className={styles.btns}>
          <a href="https://t.me/sfokin1337" target="_blank" rel="noopener noreferrer" className="btn-cta">
            {t.finalCta.telegram}
            <div className="btn-cta-ico">↗</div>
          </a>
          <a href="mailto:m.sorokin.v@mail.ru" className="btn-secondary">
            m.sorokin.v@mail.ru
          </a>
        </div>
      </div>
    </div>
  );
}
