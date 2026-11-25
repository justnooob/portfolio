'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import { translations, experiences } from '@/lib/data';
import styles from './Logos.module.css';

export default function Logos() {
  const { locale, theme } = useApp();
  const [paused, setPaused] = useState(false);
  const logos = [
    ...experiences.filter(exp => exp.id !== 'freelance').map(exp => ({
      id: exp.id, name: exp.company[locale],
      src: (theme === 'light' ? exp.logoSrcLight : exp.logoSrc) ?? exp.logoSrc,
    })),
    { id: 'evitar', name: 'Evitar', src: theme === 'light' ? '/logos/evitar-light.svg' : '/logos/evitar-dark.svg' },
  ];
  return (
    <section className={styles.section} data-section="logos" aria-label={translations[locale].logos.label}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.label}>{locale === 'ru' ? 'Компании и продуктовые команды' : 'Companies and product teams'}</h2>
          <button className={styles.pause} type="button" onClick={() => setPaused(!paused)}
            aria-label={paused ? (locale === 'ru' ? 'Продолжить карусель' : 'Resume carousel') : (locale === 'ru' ? 'Приостановить карусель' : 'Pause carousel')}>
            {paused ? <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M5 3l8 5-8 5z"/></svg> : <svg width="15" height="15" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 4v8M10 4v8"/></svg>}
          </button>
        </div>
        <div className={styles.viewport}>
          <div className={styles.track} style={{animationPlayState: paused ? 'paused' : 'running'}}>
            {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {logos.map(logo => <div key={logo.id} className={styles.item}>
                {logo.src ? <img className={styles.logo} src={logo.src} alt={copy === 0 ? logo.name : ''} data-employer={logo.id} /> : <span>{logo.name}</span>}
              </div>)}
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
