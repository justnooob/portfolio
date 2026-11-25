'use client';

import { useApp } from './AppProvider';
import { translations, experiences } from '@/lib/data';
import styles from './Logos.module.css';

export default function Logos() {
  const { locale, theme } = useApp();
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
        </div>
        <div className={styles.viewport}>
          <div className={styles.track}>
            {[0, 1].map(copy => <div className={styles.group} key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {[0, 1, 2].map(repetition => logos.map(logo => <div key={repetition + '-' + logo.id} className={styles.item} aria-hidden={repetition > 0 ? true : undefined}>
                {logo.src ? <img className={styles.logo} src={logo.src} alt={copy === 0 && repetition === 0 ? logo.name : ''} data-employer={logo.id} /> : <span>{logo.name}</span>}
              </div>))}
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
