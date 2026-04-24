'use client';

import { useEffect, useState } from 'react';
import { useApp } from './AppProvider';
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
        <div className={styles.heroLeft}>
          <div className={styles.badge}>
            <div className={styles.dot}></div>
            {t.hero.badge}
          </div>
          <h1 className={styles.name}>
            {t.hero.name1}
            <br />
            {t.hero.name2}
          </h1>
          <div className={styles.type}>
            <span className={styles.twText}>{display}</span>
            <span className={styles.cursor}></span>
          </div>
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
