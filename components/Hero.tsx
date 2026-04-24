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
      timeout = setTimeout(() => setDeleting(true), 1400);
    } else if (deleting && display.length > 0) {
      timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), 40);
    } else if (deleting && display.length === 0) {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [display, deleting, wordIdx, words]);

  // Reset on locale change
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
          <div className="btn-cta-ico">↗</div>
        </a>
        <button className="btn-secondary" onClick={scrollToProjects}>
          {t.hero.ctaSecondary}
        </button>
      </div>
    </div>
  );
}
