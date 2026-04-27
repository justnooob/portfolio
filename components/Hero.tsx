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
        {/* Стрелка "Это я" — идёт между правым краем текста "Сорокин"
            и левым краем фото, с отступами по 125px с каждой стороны.
            viewBox 0..1000 — это вся ширина heroGrid (грубо).
            Левая точка дуги ~ правый край заголовка + 125,
            правая точка ~ левый край фото - 125. */}
        <div className={styles.arrowWrap} aria-hidden="true">
          <svg
            className={styles.arrowSvg}
            viewBox="0 0 1000 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Дуга от X≈420 (после "Сорокин"+125) до X≈675 (за 125px до фото).
                Поднимается от Y=130 до Y=70 в средине, опускается обратно.
                Изгиб умеренный — 60 единиц вверх. */}
            <path
              className={styles.arrowPath}
              d="M 420 130 C 480 70, 620 70, 675 130"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            {/* Наконечник — указывает вниз-вправо к фото */}
            <path
              className={styles.arrowHead}
              d="M 660 115 L 680 132 L 658 142"
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
