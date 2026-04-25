'use client';

import { useEffect, useState } from 'react';
import { useApp } from './AppProvider';
import { translations } from '@/lib/data';
import styles from './FinalCta.module.css';

export default function FinalCta() {
  const { locale } = useApp();
  const t = translations[locale];

  /*
   * ⭐ ВАРИАНТЫ TYPEWRITER (выбери 5+ из списка и положи в массив ниже).
   *
   * RU варианты на выбор:
   *   • что-то классное          • великий продукт         • что-то с нуля
   *   • SaaS-систему             • что-то полезное         • редизайн
   *   • мобильное приложение     • интерфейс мечты         • продукт для людей
   *   • сайт                     • крутой кейс             • новый MVP
   *   • дизайн-систему           • запоминающийся бренд    • B2B-продукт
   *   • AI-продукт               • продукт мирового уровня • Telegram MiniApp
   *   • продукт, которым гордятся • дизайн с душой         • стартап
   *
   * EN варианты на выбор:
   *   • something great          • a great product         • something from scratch
   *   • a SaaS system            • something useful        • a redesign
   *   • a mobile app             • a dream interface       • a product for people
   *   • a website                • a memorable brand       • a new MVP
   *   • a design system          • a world-class product   • a B2B product
   *   • an AI product            • a meaningful design     • a Telegram MiniApp
   *   • a product to be proud of • a startup
   */
  const words: Record<string, string[]> = {
    ru: ['что-то классное', 'SaaS-систему', 'мобильное приложение', 'сайт', 'дизайн-систему', 'AI-продукт'],
    en: ['something great', 'a SaaS system', 'a mobile app', 'a website', 'a design system', 'an AI product'],
  };
  const list = words[locale];

  const [display, setDisplay] = useState(list[0]);
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = list[wordIdx];
    let timeout: NodeJS.Timeout;

    if (!deleting && display.length < current.length) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 70);
    } else if (!deleting && display.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), 40);
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % list.length);
    }

    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, list]);

  useEffect(() => {
    setDisplay('');
    setWordIdx(0);
    setDeleting(false);
  }, [locale]);

  return (
    <div className={styles.section}>
      <div className={styles.glow}></div>
      <div className={`${styles.inner} reveal-pop`}>
        <div className={styles.label}>
          <div className={styles.dot}></div>
          {t.finalCta.badge}
        </div>

        {/* Заголовок в 3 строки — блок не скачет по высоте */}
        <h2 className={styles.title}>
          <span className={styles.titleLine}>{t.finalCta.title1}</span>
          <span className={`${styles.titleLine} ${styles.titleLineTw}`}>
            <span className={styles.twSpan}>
              <span className={styles.twText}>
                {display || '\u00A0'}
              </span>
              <span className={styles.cursor}></span>
            </span>
          </span>
          <span className={styles.titleLine}>{t.finalCta.title3}</span>
        </h2>

        <p className={styles.desc}>{t.finalCta.description}</p>
        <div className={styles.btns}>
          <a href="https://t.me/sfokin1337" target="_blank" rel="noopener noreferrer" className="btn-cta">
            {t.finalCta.telegram}
            <span className="btn-cta-ico-wrap">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
          <a href="mailto:m.sorokin.v@mail.ru" className="btn-secondary">
            m.sorokin.v@mail.ru
          </a>
        </div>
      </div>
    </div>
  );
}
