'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Preloader.module.css';

/**
 * Прелоадер портфолио Максима Сорокина.
 * Концепция: большой экран, 3-4 крупные строки которые медленно сменяются.
 * Каждая строка — факт о дизайнере. Читается с первого взгляда.
 * В конце — схлопывается. Длительность ~3.5 секунды.
 */

// Каждая карточка показывается ~600-800мс, всего 4 карточки до закрытия
const SLIDES = [
  {
    label: 'Опыт',
    value: '5+ лет',
    sub: 'UX/UI · Продукт · Системы',
    accent: false,
  },
  {
    label: 'Метрики',
    value: '+80%',
    sub: 'рост лидов у клиентов',
    accent: true,
  },
  {
    label: 'Стек',
    value: 'Figma',
    sub: 'Principle · Tilda · After Effects',
    accent: false,
  },
  {
    label: 'AI',
    value: 'ChatGPT',
    sub: 'Midjourney · Deepseek · нейросети',
    accent: true,
  },
  {
    label: 'Образование',
    value: 'ИТМО',
    sub: 'Магистр с отличием · ВОЕНМЕХ',
    accent: false,
  },
];

// Прогресс от 0 до 100 за 3200мс
const TOTAL_MS = 3200;

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [slideVisible, setSlideVisible] = useState(true);
  const [pct, setPct] = useState(0);
  const [closing, setClosing] = useState(false);
  const startRef = useRef(Date.now());

  // Прогресс-бар
  useEffect(() => {
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(Math.round((elapsed / TOTAL_MS) * 100), 100);
      setPct(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        // 100% → пауза → схлопывание
        setTimeout(() => {
          setClosing(true);
          setTimeout(onDone, 700);
        }, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  // Смена слайдов — каждый слайд живёт фиксированное время
  useEffect(() => {
    const slideMs = TOTAL_MS / SLIDES.length; // ~640мс на слайд
    let idx = 0;
    const next = () => {
      // Fade out
      setSlideVisible(false);
      setTimeout(() => {
        idx = (idx + 1) % SLIDES.length;
        setSlideIdx(idx);
        setSlideVisible(true);
      }, 200); // 200мс на fade out
    };
    const interval = setInterval(next, slideMs);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[slideIdx];

  return (
    <div className={`${styles.root} ${closing ? styles.closing : ''}`}>

      {/* Бегущие огни по краям */}
      <span className={`${styles.edge} ${styles.edgeTop}`} />
      <span className={`${styles.edge} ${styles.edgeRight}`} />
      <span className={`${styles.edge} ${styles.edgeBottom}`} />
      <span className={`${styles.edge} ${styles.edgeLeft}`} />

      {/* Основной контент — по центру */}
      <div className={`${styles.slide} ${slideVisible ? styles.slideIn : styles.slideOut}`}>
        <div className={styles.slideLabel}>{slide.label}</div>
        <div className={`${styles.slideValue} ${slide.accent ? styles.slideValueAccent : ''}`}>
          {slide.value}
        </div>
        <div className={styles.slideSub}>{slide.sub}</div>
      </div>

      {/* Прогресс внизу */}
      <div className={styles.bottom}>
        {/* Счётчик */}
        <div className={styles.pct}>{pct}<span className={styles.pctSign}>%</span></div>

        {/* Бар */}
        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: `${pct}%` }}>
            <div className={styles.barGlow} />
          </div>
        </div>

        {/* Имя */}
        <div className={styles.name}>Maxim Sorokin · UX/UI Designer</div>
      </div>
    </div>
  );
}
