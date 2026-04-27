'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Preloader.module.css';

const TEXTS = [
  'Загружаем образование',
  'Получаем 5-летний опыт',
  'Изучаем инструменты',
  'Оформляем проекты',
  'Добро пожаловать!',
];

// Каждый текст держится N мс перед расщеплением
const HOLD_MS = 700;    // время показа текста
const SCATTER_MS = 400; // время расщепления (разлёт символов)
const GATHER_MS = 500;  // время сборки нового текста
const TOTAL_MS = 3200;  // полная длительность до закрытия

/**
 * Один символ текста. В зависимости от фазы — на месте, летит или собирается.
 * offset — смещение для разлёта (рандомное для каждого символа).
 */
function Char({
  char,
  phase,
  dx,
  dy,
  delay,
}: {
  char: string;
  phase: 'visible' | 'scatter' | 'gather';
  dx: number;
  dy: number;
  delay: number;
}) {
  const isSpace = char === ' ';

  const inlineStyle: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
  };

  if (phase === 'scatter') {
    inlineStyle.transform = `translate(${dx}px, ${dy}px)`;
    inlineStyle.opacity = 0;
  } else if (phase === 'gather') {
    // Начальное состояние для gather — приходим из рандомной позиции
    inlineStyle.transform = `translate(0, 0)`;
    inlineStyle.opacity = 1;
  }

  return (
    <span
      className={`${styles.char} ${isSpace ? styles.space : ''} ${
        phase === 'scatter'
          ? styles.charScatter
          : phase === 'gather'
          ? styles.charGather
          : styles.charVisible
      }`}
      style={inlineStyle}
    >
      {isSpace ? '\u00A0' : char}
    </span>
  );
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [textIdx, setTextIdx] = useState(0);
  const [phase, setPhase] = useState<'visible' | 'scatter' | 'gather'>('gather');
  const [pct, setPct] = useState(0);
  const [closing, setClosing] = useState(false);

  // Рандомные смещения для символов каждого текста (генерируем один раз)
  const offsetsRef = useRef<{ dx: number; dy: number }[]>([]);
  const startRef = useRef(Date.now());

  const generateOffsets = useCallback((len: number) => {
    offsetsRef.current = Array.from({ length: len }, () => ({
      dx: (Math.random() - 0.5) * 200,
      dy: (Math.random() - 0.5) * 120,
    }));
  }, []);

  // Генерируем смещения для первого текста
  useEffect(() => {
    generateOffsets(TEXTS[0].length);
  }, [generateOffsets]);

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
        setTimeout(() => {
          setClosing(true);
          setTimeout(onDone, 700);
        }, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  // Цикл смены текста: visible → scatter → (смена текста) → gather → visible → ...
  useEffect(() => {
    let cancelled = false;

    const cycle = async () => {
      // 1. Держим текст
      await sleep(HOLD_MS);
      if (cancelled) return;

      // 2. Расщепление
      setPhase('scatter');
      await sleep(SCATTER_MS);
      if (cancelled) return;

      // 3. Меняем текст и сразу генерим новые смещения (символы появятся из хаоса)
      setTextIdx((prev) => {
        const next = (prev + 1) % TEXTS.length;
        generateOffsets(TEXTS[next].length);
        return next;
      });
      setPhase('gather');
      await sleep(GATHER_MS);
      if (cancelled) return;

      setPhase('visible');
    };

    const interval = setInterval(cycle, HOLD_MS + SCATTER_MS + GATHER_MS);
    // Первый запуск
    cycle();

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [generateOffsets]);

  const text = TEXTS[textIdx];
  const chars = text.split('');
  const offsets = offsetsRef.current;

  return (
    <div className={`${styles.root} ${closing ? styles.closing : ''}`}>

      {/* Бегущие огни по краям */}
      <span className={`${styles.edge} ${styles.edgeTop}`} />
      <span className={`${styles.edge} ${styles.edgeRight}`} />
      <span className={`${styles.edge} ${styles.edgeBottom}`} />
      <span className={`${styles.edge} ${styles.edgeLeft}`} />

      {/* Основной текст с эффектом расщепления */}
      <div className={styles.center}>
        {/* Маленький лейбл над текстом — статичный */}
        <div className={styles.stepLabel}>
          {textIdx + 1} / {TEXTS.length}
        </div>

        {/* Текст — каждый символ анимируется отдельно */}
        <div className={styles.textWrap} aria-live="polite">
          {chars.map((char, i) => (
            <Char
              key={`${textIdx}-${i}`}
              char={char}
              phase={phase}
              dx={offsets[i]?.dx ?? 0}
              dy={offsets[i]?.dy ?? 0}
              delay={phase === 'scatter'
                ? i * 18          // разлетаются последовательно слева направо
                : (chars.length - i) * 20 // собираются с конца
              }
            />
          ))}
        </div>

        {/* Прогресс-бар */}
        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: `${pct}%` }}>
            <div className={styles.barGlow} />
          </div>
        </div>

        {/* Счётчик */}
        <div className={styles.counter}>{pct}<span className={styles.pctSign}>%</span></div>
      </div>

      {/* Имя в углу */}
      <div className={styles.nameTag}>Maxim Sorokin · UX/UI Designer</div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
