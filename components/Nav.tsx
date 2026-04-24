'use client';

import Link from 'next/link';
import { useApp } from './AppProvider';
import { translations } from '@/lib/data';
import styles from './Nav.module.css';

export default function Nav() {
  const { locale, setLocale, theme, toggleTheme } = useApp();
  const t = translations[locale];

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        Maxim Sorokin
      </Link>
      <div className={styles.right}>
        <div className={styles.links}>
          <a href="#about" className={`${styles.link} ${styles.active}`}>
            {t.nav.about}
          </a>
          <a href="#projects" className={styles.link}>
            {t.nav.projects}
          </a>
          <a href="#experience" className={styles.link}>
            {t.nav.experience}
          </a>
        </div>
        <div className={styles.toggles}>
          <button
            className={`${styles.tgb} ${locale === 'ru' ? styles.tgbActive : ''}`}
            onClick={() => setLocale('ru')}
          >
            RU
          </button>
          <button
            className={`${styles.tgb} ${locale === 'en' ? styles.tgbActive : ''}`}
            onClick={() => setLocale('en')}
          >
            EN
          </button>
          <button className={styles.tgb} onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </div>
    </nav>
  );
}
