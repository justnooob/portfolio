'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useApp } from './AppProvider';
import { translations } from '@/lib/data';
import styles from './Myself.module.css';

/**
 * MYSELF — блок «обо мне» между Hero и Logos.
 * Каждое слово имеет собственный marginRight со своим диапазоном
 * (начальное/конечное значение задаются детерминированным seed по
 * индексам строки и слова). По мере прокрутки одни промежутки
 * расширяются, другие сужаются — органичный эффект как у itsjay.us.
 * Справа — фото с лёгким parallax.
 */
export default function Myself() {
  const { locale } = useApp();
  const t = translations[locale];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const [gapRange, setGapRange] = useState<[number, number]>([8, 64]);
  useEffect(() => {
    const update = () =>
      setGapRange(window.innerWidth < 900 ? [4, 22] : [8, 64]);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const photoY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  return (
    <section ref={sectionRef} className={styles.section} data-section="myself" id="myself">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.label}>{t.myself.label}</div>
            <div className={styles.text}>
              {t.myself.lines.map((line, i) => (
                <Line
                  key={i}
                  text={line}
                  lineIdx={i}
                  progress={scrollYProgress}
                  gapRange={gapRange}
                />
              ))}
            </div>
          </div>

          <motion.div
            className={styles.photoWrap}
            style={{ y: photoY, scale: photoScale }}
          >
            <img
              src="/me.jpg"
              alt={t.myself.photoAlt}
              className={styles.photo}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Детерминированный псевдо-рандом 0..1 на основе целого seed. */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Возвращает текущий gap для слова с заданным seed на прогрессе v.
 * Слова с direction=+1 идут от lowVal к highVal, с direction=-1 —
 * наоборот. ampScale и phaseOffset ломают синхронность.
 */
function gapAt(seed: number, v: number, minG: number, span: number): number {
  const direction = seededRandom(seed) > 0.5 ? 1 : -1;
  const ampScale = 0.7 + seededRandom(seed + 1) * 0.3;
  const phaseOffset = (seededRandom(seed + 2) - 0.5) * 0.3;
  const center = minG + span / 2;
  const half = (span * ampScale) / 2;
  const lowVal = center - half;
  const highVal = center + half;
  const from = direction > 0 ? lowVal : highVal;
  const to = direction > 0 ? highVal : lowVal;
  const t = Math.max(0, Math.min(1, v + phaseOffset));
  return from + (to - from) * t;
}

interface LineProps {
  text: string;
  lineIdx: number;
  progress: MotionValue<number>;
  gapRange: [number, number];
}

function Line({ text, lineIdx, progress, gapRange }: LineProps) {
  const words = text.split(' ');
  const [minG, maxG] = gapRange;
  const span = maxG - minG;
  // Базовый gap во flex — постоянная величина, она не анимируется.
  // А «избыточный» сдвиг каждого слова реализуется через translateX,
  // которое работает на уровне composite (без layout/paint).
  const baseGap = minG;

  return (
    <div className={styles.line} style={{ gap: `${baseGap}px` }}>
      {words.map((w, i) => (
        <Word
          key={i}
          text={w}
          position={i}
          lineIdx={lineIdx}
          progress={progress}
          minG={minG}
          span={span}
          baseGap={baseGap}
        />
      ))}
    </div>
  );
}

interface WordProps {
  text: string;
  position: number;
  lineIdx: number;
  progress: MotionValue<number>;
  minG: number;
  span: number;
  baseGap: number;
}

/**
 * Каждое слово сдвигается через transform: translateX по сумме
 * «избыточных» gap-ов всех предшествующих слов. transform не
 * триггерит layout — только composite, поэтому Lenis и framer-motion
 * остаются синхронными, без микротряски.
 */
function Word({ text, position, lineIdx, progress, minG, span, baseGap }: WordProps) {
  const x = useTransform(progress, (v) => {
    let shift = 0;
    for (let j = 0; j < position; j++) {
      const seed = lineIdx * 113 + j * 7;
      shift += gapAt(seed, v, minG, span) - baseGap;
    }
    return Math.round(shift);
  });

  return (
    <motion.span className={styles.word} style={{ x }}>
      {text}
    </motion.span>
  );
}
