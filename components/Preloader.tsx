'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Preloader.module.css';

/**
 * Прелоадер для портфолио Максима Сорокина.
 * Показывается при каждом открытии страницы (не только при первом визите).
 * Длительность: 2.8 секунды. Исчезает — схлопывается в точку.
 *
 * Никаких внешних библиотек — только CSS анимации и SVG.
 * Совместимо с существующим стеком (CSS Modules, Next.js 14).
 */

// Фазы прогресса с текстами — как будто загружаются части опыта
const PHASES = [
  { pct: 0,   text: 'Инициализация Figma...' },
  { pct: 12,  text: 'Загрузка опыта: ВОЕНМЕХ' },
  { pct: 24,  text: 'Компиляция 5 лет практики' },
  { pct: 36,  text: 'Подключение нейросетей' },
  { pct: 48,  text: 'Применение ChatGPT / Midjourney' },
  { pct: 60,  text: 'Рост конверсии: +40%' },
  { pct: 72,  text: 'Сборка дизайн-системы...' },
  { pct: 84,  text: 'Увеличение лидов: +80%' },
  { pct: 92,  text: 'Диплом ИТМО: с отличием' },
  { pct: 100, text: 'Готово. Добро пожаловать.' },
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [phaseText, setPhaseText] = useState(PHASES[0].text);
  const [closing, setClosing] = useState(false);
  const startTime = useRef(Date.now());
  const DURATION = 2600; // мс до начала закрытия

  useEffect(() => {
    let rafId: number;
    let lastPhaseIdx = 0;

    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease-in-out для прогресса
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const currentPct = Math.round(eased * 100);

      setPct(currentPct);

      // Обновляем текст фазы по прогрессу
      for (let i = PHASES.length - 1; i >= 0; i--) {
        if (currentPct >= PHASES[i].pct && i !== lastPhaseIdx) {
          lastPhaseIdx = i;
          setPhaseText(PHASES[i].text);
          break;
        }
      }

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        // Пауза 300мс на 100%, потом схлопывание
        setTimeout(() => {
          setClosing(true);
          // После CSS-анимации схлопывания (600мс) — сообщаем что готово
          setTimeout(onDone, 600);
        }, 300);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onDone]);

  return (
    <div className={`${styles.root} ${closing ? styles.closing : ''}`}>

      {/* Бегущие огни по краям — голографический эффект */}
      <span className={`${styles.edge} ${styles.edgeTop}`} />
      <span className={`${styles.edge} ${styles.edgeRight}`} />
      <span className={`${styles.edge} ${styles.edgeBottom}`} />
      <span className={`${styles.edge} ${styles.edgeLeft}`} />

      {/* Пульсирующий SVG-логотип "S" в центре */}
      <div className={styles.logoWrap}>
        <svg
          className={styles.logoS}
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Внешние кольца — пульсируют */}
          <circle className={`${styles.ring} ${styles.ring1}`} cx="60" cy="60" r="54" />
          <circle className={`${styles.ring} ${styles.ring2}`} cx="60" cy="60" r="46" />

          {/* Буква S */}
          <path
            className={styles.letterS}
            d="M72 38c-3-5-8-8-14-8-9 0-16 6-16 14 0 18 30 14 30 32 0 9-7 16-17 16-7 0-13-3-17-8"
            stroke="var(--accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        {/* Частицы вокруг логотипа */}
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              '--i': i,
              '--total': 8,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Прогресс и текст */}
      <div className={styles.info}>
        <div className={styles.phaseText}>{phaseText}</div>

        {/* Прогресс-бар */}
        <div className={styles.barWrap}>
          <div className={styles.bar} style={{ width: `${pct}%` }} />
        </div>

        {/* Счётчик процентов */}
        <div className={styles.counter}>{String(pct).padStart(3, '0')}</div>
      </div>

      {/* Имя в углу */}
      <div className={styles.nameTag}>Maxim Sorokin · UX/UI Designer</div>
    </div>
  );
}
