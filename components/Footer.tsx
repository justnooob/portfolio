'use client';

import { useApp } from './AppProvider';
import { translations } from '@/lib/data';
import styles from './Footer.module.css';

export default function Footer() {
  const { locale } = useApp();
  const t = translations[locale];
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>Maxim Sorokin</div>
            <div className={styles.tag}>
              {t.footer.tagline}
              <br />
              {t.footer.experience}
            </div>
            <div className={styles.status}>
              <div className={styles.statusDot}></div>
              {t.footer.available}
            </div>
          </div>

          <div>
            <div className={styles.colTtl}>{t.footer.contact}</div>
            <a href="https://t.me/sfokin1337" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Telegram @sfokin1337
            </a>
            <a href="mailto:m.sorokin.v@mail.ru" className={styles.link}>
              m.sorokin.v@mail.ru
            </a>
            <a href="tel:+79817400027" className={styles.link}>
              +7 (981) 740-00-27
            </a>
          </div>

          <div>
            <div className={styles.colTtl}>{t.footer.portfolio}</div>
            <a href="https://www.behance.net/maksimsorokin" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Behance
            </a>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" className={styles.link}>
              {t.footer.downloadCv}
            </a>
          </div>

          <div>
            <div className={styles.colTtl}>{t.footer.nav}</div>
            <a href="#about" className={styles.link}>
              {t.nav.about}
            </a>
            <a href="#projects" className={styles.link}>
              {t.nav.projects}
            </a>
            <a href="#experience" className={styles.link}>
              {t.nav.experience}
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>© {year} Maxim Sorokin. {t.footer.rights}</div>
        </div>
      </div>
    </footer>
  );
}
