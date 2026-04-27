'use client';

import { useEffect, useState } from 'react';
import { useApp } from './AppProvider';
import TypeOnReveal from './TypeOnReveal';
import { translations } from '@/lib/data';
import styles from './Hero.module.css';

export default function Hero() {
  const { locale } = useApp();
  const t = translations[locale];
  const words = t.hero.typewriter;

  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout: NodeJS.Timeout;

    if (!deleting && display.length < current.length) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 70);
    } else if (!deleting && display.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), 40);
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, words]);

  useEffect(() => {
    setDisplay('');
    setWordIdx(0);
    setDeleting(false);
  }, [locale]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.hero} id="about">
      <div className={styles.heroBg}></div>

      <div className={styles.heroGrid}>
        {/* Стрелка "Это я" — почти горизонтальная дуга от typewriter (Дизайнер...)
            к середине фото справа, как на красной линии в макете.
            Помещена внутри heroGrid (max-width 1440px). */}
        <div className={styles.arrowWrap} aria-hidden="true">
          <svg
            className={styles.arrowSvg}
            viewBox="0 0 1000 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Большая пологая дуга — от левой части (Y=140) поднимается до Y=70
                в центре, опускается обратно к правой части (Y=140 у фото) */}
            <path
              className={styles.arrowPath}
              d="M 50 140 C 280 30, 700 30, 920 140"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Наконечник — указывает вправо в фото */}
            <path
              className={styles.arrowHead}
              d="M 905 122 L 928 142 L 905 158"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          <span className={styles.arrowLabel}>
            {locale === 'ru' ? 'Это я' : 'This is me'}
          </span>
        </div>

        <div className={styles.heroLeft}>
          <div className={styles.badge}>
            <div className={styles.dot}></div>
            {t.hero.badge}
          </div>
          {/* Имя печатается сразу при загрузке */}
          <h1 className={styles.name}>
            <TypeOnReveal text={t.hero.name1} speed={70} delay={300} startImmediately />
            <br />
            <TypeOnReveal text={t.hero.name2} speed={70} delay={300 + t.hero.name1.length * 70 + 100} startImmediately />
          </h1>
          <div className={styles.type}>
            <span className={styles.twText}>{display}</span>
            <span className={styles.cursor}></span>
          </div>
          {/* Описание — обычный статичный текст без печати */}
          <p className={styles.desc}>{t.hero.description}</p>
          <div className={styles.btns}>
            <a href="https://t.me/sfokin1337" target="_blank" rel="noopener noreferrer" className="btn-cta">
              {t.hero.ctaPrimary}
              <span className="btn-cta-ico-wrap">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
            <button className="btn-secondary" onClick={scrollToProjects}>
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.photoWrap}>
            {/* Метка "Frame 1337" — стилизована под название фрейма из Figma */}
            <span className={styles.frameLabel}>Frame 1337</span>
            {/*
              ⭐ ФОТО
              Положи своё фото в public/me.jpg (или .png) и замени блок ниже на:
              <img src="/me.jpg" alt="Maxim Sorokin" className={styles.photo} />
            */}
            <div className={styles.photoPlaceholder}>
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="24" r="12" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 56c0-12 10-20 22-20s22 8 22 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div className={styles.photoHint}>
                {locale === 'ru' ? 'Положите фото в ' : 'Place photo at '}
                <code>public/me.jpg</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
