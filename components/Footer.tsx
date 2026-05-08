'use client';

import { useApp } from './AppProvider';
import styles from './Footer.module.css';

export default function Footer() {
  const { locale } = useApp();

  const workLabel  = locale === 'ru' ? 'Работы'  : 'Work';
  const emailLabel = locale === 'ru' ? 'Почта'   : 'E-mail';
  const cvLabel    = locale === 'ru' ? 'Резюме'  : 'CV';
  const setkaLabel = locale === 'ru' ? 'Сетка'   : 'Setka';

  return (
    <footer className={styles.footer} data-section="footer">

      {/* Фоновый бренд-текст — просвечивает через блюр карточек */}
      <div className={styles.bgBrand} aria-hidden="true">
        <span className={styles.bgText}>Maxim<br />Sorokin</span>
      </div>

      {/*
        CSS Grid — 3 колонки × 3 строки:
          "work  work  cv"
          "tg    setka hh"
          "email setka hh"
      */}
      <div className={styles.grid}>

        {/* Ряд 1 — colspan 2 */}
        <a href="/projects" className={`${styles.cell} ${styles.cellWork}`}>
          <span className={styles.label}>{workLabel}</span>
          <span className={styles.arrow}>↗</span>
        </a>

        <a
          href="/Sorokin_CV.pdf"
          download="Sorokin_Maxim_CV.pdf"
          className={`${styles.cell} ${styles.cellCv}`}
        >
          <span className={styles.label}>{cvLabel}</span>
          <span className={styles.arrowDown}>↓</span>
        </a>

        {/* Ряд 2 col 1 */}
        <a
          href="https://t.me/sfokin1337"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.cell} ${styles.cellTg}`}
        >
          <span className={styles.label}>Telegram</span>
          <span className={styles.arrow}>↗</span>
        </a>

        {/* Setka — rowspan 2 */}
        <a
          href="https://setka.ru/users/140f8a9b-bda6-4796-806d-ad68256b7d86"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.cell} ${styles.cellSetka}`}
        >
          <span className={styles.label}>{setkaLabel}</span>
          <span className={styles.arrow}>↗</span>
        </a>

        {/* HH — rowspan 2 */}
        <a
          href="https://spb.hh.ru/resume/e091bcd6ff093a30910039ed1f48544f4f6749"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.cell} ${styles.cellHh}`}
        >
          <span className={styles.label}>Headhunter</span>
          <span className={styles.arrow}>↗</span>
        </a>

        {/* Ряд 3 col 1 */}
        <a href="mailto:m.sorokin.v@mail.ru" className={`${styles.cell} ${styles.cellEmail}`}>
          <span className={styles.label}>{emailLabel}</span>
          <span className={styles.arrow}>↗</span>
        </a>

      </div>
    </footer>
  );
}
