'use client';

import { useApp } from './AppProvider';
import { translations, experiences } from '@/lib/data';
import styles from './Logos.module.css';

export default function Logos() {
  const { locale, theme } = useApp();
  const logos = [
    ...experiences.filter(exp => exp.id !== 'freelance').map(exp => ({
      id: exp.id, name: exp.company[locale],
      href: exp.website ? `https://${exp.website}` : undefined,
      src: (theme === 'light' ? exp.logoSrcLight : exp.logoSrc) ?? exp.logoSrc,
    })),
    { id: 'evitar', name: 'Evitar', href: 'https://evitar.ru', src: theme === 'light' ? '/logos/evitar-light.svg' : '/logos/evitar-dark.svg' },
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
              {[0, 1, 2].map(repetition => logos.map(logo => {
                const duplicate = copy !== 0 || repetition !== 0;
                const mark = logo.src ? <img className={styles.logo} src={logo.src} alt="" data-employer={logo.id} /> : <span>{logo.name}</span>;
                return <div key={repetition + '-' + logo.id} className={styles.item} aria-hidden={duplicate ? true : undefined}>
                  {logo.href ? <a className={styles.logoLink} href={logo.href} target="_blank" rel="noopener noreferrer"
                    tabIndex={duplicate ? -1 : undefined}
                    aria-label={locale === 'ru' ? `Сайт ${logo.name} (в новой вкладке)` : `${logo.name} website (opens in a new tab)`}>
                    {mark}
                  </a> : <span className={styles.logoLink} aria-label={logo.name}>{mark}</span>}
                </div>;
              }))}
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
