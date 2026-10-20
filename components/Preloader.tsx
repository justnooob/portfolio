'use client';

import { useEffect } from 'react';
import { useApp } from './AppProvider';
import styles from './Preloader.module.css';

export default function Preloader({ onDone }: { onDone: () => void }) {
  const { locale } = useApp();
  useEffect(() => {
    const html = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    html.dataset.sceneStage = 'preload';
    const handleMotion = () => { if (reduced.matches) onDone(); };
    handleMotion();
    reduced.addEventListener('change', handleMotion);
    // Safety cleanup if animationend is interrupted or animations are disabled.
    const fallback = window.setTimeout(onDone, 750);
    return () => {
      window.clearTimeout(fallback);
      reduced.removeEventListener('change', handleMotion);
      html.dataset.sceneStage = 'hero';
    };
  }, [onDone]);

  const text = locale === 'ru' ? 'Добро пожаловать!' : 'Welcome!';
  return (
    <div className={styles.root} aria-hidden="true"
      onAnimationEnd={(event) => { if (event.target === event.currentTarget) onDone(); }}>
      <span className={`${styles.edge} ${styles.edgeTop}`} />
      <span className={`${styles.edge} ${styles.edgeRight}`} />
      <span className={`${styles.edge} ${styles.edgeBottom}`} />
      <span className={`${styles.edge} ${styles.edgeLeft}`} />
      <div className={styles.center}>
        <div className={styles.textWrap}>
          {[...text].map((char, i) => <span key={i}
            className={`${styles.char} ${char === ' ' ? styles.space : ''}`}
            style={{ animationDelay: `${i * 8}ms` }}>{char === ' ' ? '\u00a0' : char}</span>)}
        </div>
        <div className={styles.barTrack}><div className={styles.barFill}><div className={styles.barGlow} /></div></div>
      </div>
      <div className={styles.nameTag}>Maxim Sorokin · UX/UI Designer</div>
    </div>
  );
}
