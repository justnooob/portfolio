'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useApp } from './AppProvider';
import { useReveal } from '@/lib/useReveal';
import { translations } from '@/lib/data';
import styles from './Myself.module.css';

/**
 * MYSELF — блок «обо мне».
 * По мере прокрутки текст закрашивается посимвольно и последовательно
 * (слово за словом, буква за буквой): обычный текст серый → белый/чёрный,
 * акцентные слова голубой → синий.
 * Стрелка «исследования → релиза»: изначально зазора и стрелки нет; после
 * того как «исследования» полностью окрасилось, стрелка вырастает, затем
 * начинают закрашиваться «до релиза» и следующие за ним слова.
 */

const SOFT = 1.5;        // ширина «волны» окрашивания на букву
const ARROW_UNITS = 7;   // сколько «шагов» прокрутки занимает рост стрелки
const CHIP_UNITS = 4;    // шаги на один чип
const SPARK = 'M4 35 L23 28 L42 31 L61 21 L80 24 L99 11 L116 4';

type Colors = { nFrom: string; nTo: string; aFrom: string; aTo: string };

/* ─────────────────────────── Контент ─────────────────────────── */

type IconName = 'ai' | 'saas' | 'mobile' | 'tg';
type Seg = { text: string; accent: boolean };
type Line =
  | { kind: 'metric'; lead: string; word: string }
  | { kind: 'text'; segs: Seg[] }
  | { kind: 'process'; pre: string; from: string; mid: string; to: string }
  | { kind: 'chips'; items: { label: string; icon: IconName }[] };

const CHIPS: { label: string; icon: IconName }[] = [
  { label: 'AI', icon: 'ai' },
  { label: 'SaaS', icon: 'saas' },
  { label: 'Mobile', icon: 'mobile' },
  { label: 'TG MiniApps', icon: 'tg' },
];

const CONTENT: Record<'ru' | 'en', Line[]> = {
  ru: [
    { kind: 'metric', lead: 'Делаю продукты, которые двигают ', word: 'метрики' },
    { kind: 'text', segs: [{ text: '7+ лет', accent: true }, { text: ' опыта. Технический бэкграунд.', accent: false }] },
    { kind: 'process', pre: 'От ', from: 'исследования', mid: 'до ', to: 'релиза' },
    { kind: 'chips', items: CHIPS },
    { kind: 'text', segs: [{ text: 'Веду ', accent: false }, { text: 'команды', accent: true }, { text: ' и процессы.', accent: false }] },
  ],
  en: [
    { kind: 'metric', lead: 'Building products that move ', word: 'metrics' },
    { kind: 'text', segs: [{ text: '7+ years', accent: true }, { text: ' of experience. Technical background.', accent: false }] },
    { kind: 'process', pre: 'From ', from: 'research', mid: 'to ', to: 'release' },
    { kind: 'chips', items: CHIPS },
    { kind: 'text', segs: [{ text: 'I lead ', accent: false }, { text: 'teams', accent: true }, { text: ' and processes.', accent: false }] },
  ],
};

/* ─────────── Построение последовательности индексов ─────────── */

type Ch = { ch: string; i: number; accent: boolean };
type RLine =
  | { kind: 'metric'; lead: Ch[]; word: Ch[]; sparkStart: number; sparkEnd: number }
  | { kind: 'text'; chars: Ch[] }
  | { kind: 'process'; pre: Ch[]; from: Ch[]; mid: Ch[]; to: Ch[]; arrowStart: number }
  | { kind: 'chips'; items: { label: string; icon: IconName; start: number }[] };

function build(lines: Line[]): { rlines: RLine[]; total: number } {
  let i = 0;
  // Пробелы не получают индекс (i = -1) и не тратят «шаг» прокрутки.
  const chars = (text: string, accent: boolean): Ch[] =>
    [...text].map((ch) => ({ ch, i: ch === ' ' ? -1 : i++, accent }));

  const rlines = lines.map<RLine>((line) => {
    if (line.kind === 'metric') {
      const lead = chars(line.lead, false);
      const sparkStart = i;
      const word = chars(line.word, true);
      const sparkEnd = i;
      return { kind: 'metric', lead, word, sparkStart, sparkEnd };
    }
    if (line.kind === 'text') {
      const cs: Ch[] = [];
      line.segs.forEach((s) => cs.push(...chars(s.text, s.accent)));
      return { kind: 'text', chars: cs };
    }
    if (line.kind === 'process') {
      const pre = chars(line.pre, false);
      const from = chars(line.from, true);
      const arrowStart = i;
      i += ARROW_UNITS;
      const mid = chars(line.mid, false);
      const to = chars(line.to, true);
      return { kind: 'process', pre, from, mid, to, arrowStart };
    }
    const items = line.items.map((it) => {
      const start = i;
      i += CHIP_UNITS;
      return { ...it, start };
    });
    return { kind: 'chips', items };
  });
  return { rlines, total: i };
}

/* ─────────────────────────── Компонент ─────────────────────────── */

export default function Myself() {
  const { locale, theme } = useApp();
  const t = translations[locale];
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { rlines, total } = useMemo(() => build(CONTENT[locale]), [locale]);
  // Заливка идёт по мере прохождения секции через вьюпорт.
  const filled = useTransform(scrollYProgress, [0.06, 0.7], [0, total]);

  const colors: Colors =
    theme === 'dark'
      ? { nFrom: '#565c63', nTo: '#ffffff', aFrom: '#a6cdff', aTo: '#2f7dff' }
      : { nFrom: '#c2c2c2', nTo: '#0a0a0a', aFrom: '#93bdff', aTo: '#2563eb' };

  const [arrowW, setArrowW] = useState(76);
  useEffect(() => {
    const f = () => setArrowW(window.innerWidth < 640 ? 46 : window.innerWidth < 900 ? 60 : 76);
    f();
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);

  const photoY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.06]);

  const { ref: labelRef, visible: labelVisible } = useReveal<HTMLDivElement>();
  const { ref: photoRef, visible: photoVisible } = useReveal<HTMLDivElement>();

  return (
    <section ref={sectionRef} className={styles.section} data-section="myself" id="myself">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div
              ref={labelRef}
              className={`${styles.label} reveal-bounce ${labelVisible ? 'visible' : ''}`}
            >
              {t.myself.label}
            </div>
            <div className={styles.text}>
              {rlines.map((l, idx) => (
                <div key={idx} className={styles.lineRow}>
                  <RenderLine line={l} filled={filled} colors={colors} arrowW={arrowW} />
                </div>
              ))}
            </div>
          </div>

          <div
            ref={photoRef}
            className={`${styles.photoOuter} reveal-photo-zoom ${photoVisible ? 'visible' : ''}`}
          >
            <motion.div className={styles.photoWrap} style={{ y: photoY, scale: photoScale }}>
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
      </div>
    </section>
  );
}

/* ─────────────────────── Рендер строки ─────────────────────── */

function RenderLine({
  line,
  filled,
  colors,
  arrowW,
}: {
  line: RLine;
  filled: MotionValue<number>;
  colors: Colors;
  arrowW: number;
}) {
  if (line.kind === 'text') {
    return (
      <span className={styles.fillText}>
        <Words chars={line.chars} filled={filled} colors={colors} />
      </span>
    );
  }
  if (line.kind === 'metric') return <MetricLine line={line} filled={filled} colors={colors} />;
  if (line.kind === 'process') return <ProcessLine line={line} filled={filled} colors={colors} arrowW={arrowW} />;
  return <ChipsLine items={line.items} filled={filled} colors={colors} />;
}

/** Одна буква: цвет интерполируется по позиции в общей последовательности. */
function Letter({ c, filled, colors }: { c: Ch; filled: MotionValue<number>; colors: Colors }) {
  const from = c.accent ? colors.aFrom : colors.nFrom;
  const to = c.accent ? colors.aTo : colors.nTo;
  const color = useTransform(filled, [c.i, c.i + SOFT], [from, to]);
  return (
    <motion.span className={styles.letter} style={{ color }}>
      {c.ch}
    </motion.span>
  );
}

/** Группирует символы в слова (inline-block), между ними — настоящие пробелы
 *  (точки переноса строки). Буквы внутри слова окрашиваются по очереди. */
function Words({ chars, filled, colors }: { chars: Ch[]; filled: MotionValue<number>; colors: Colors }) {
  const groups: Ch[][] = [];
  let cur: Ch[] = [];
  chars.forEach((c) => {
    if (c.ch === ' ') {
      if (cur.length) { groups.push(cur); cur = []; }
      groups.push([c]);
    } else {
      cur.push(c);
    }
  });
  if (cur.length) groups.push(cur);

  return (
    <>
      {groups.map((g, gi) =>
        g.length === 1 && g[0].ch === ' ' ? (
          <span key={`s${gi}`}> </span>
        ) : (
          <span key={gi} className={styles.word}>
            {g.map((c) => <Letter key={c.i} c={c} filled={filled} colors={colors} />)}
          </span>
        )
      )}
    </>
  );
}

/** «метрики» + sparkline, рисующийся по мере окрашивания слова. */
function MetricLine({ line, filled, colors }: { line: Extract<RLine, { kind: 'metric' }>; filled: MotionValue<number>; colors: Colors }) {
  const draw = useTransform(filled, [line.sparkStart, line.sparkEnd], [0, 1]);
  const areaO = useTransform(draw, [0, 0.4], [0, 1]);
  const dotO = useTransform(draw, [0.8, 1], [0, 1]);
  const dotS = useTransform(draw, [0.8, 1], [0, 1]);
  return (
    <span className={styles.fillText}>
      <Words chars={line.lead} filled={filled} colors={colors} />
      <span className={styles.metricWordWrap}>
        <span className={styles.word}>
          {line.word.map((c) => <Letter key={c.i} c={c} filled={filled} colors={colors} />)}
        </span>
        <span className={styles.spark} aria-hidden="true">
          <svg viewBox="0 0 120 40" className={styles.sparkSvg} fill="none">
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.30" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path d={`${SPARK} L116 40 L4 40 Z`} fill="url(#sparkFill)" style={{ opacity: areaO }} />
            <motion.path
              d={SPARK}
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: draw }}
            />
            <motion.circle cx="116" cy="4" r="3.6" fill="var(--accent)" className={styles.sparkDot} style={{ opacity: dotO, scale: dotS }} />
          </svg>
        </span>
      </span>
    </span>
  );
}

/** «От исследования → до релиза»: стрелка растёт из нуля после «исследования». */
function ProcessLine({
  line,
  filled,
  colors,
  arrowW,
}: {
  line: Extract<RLine, { kind: 'process' }>;
  filled: MotionValue<number>;
  colors: Colors;
  arrowW: number;
}) {
  const width = useTransform(filled, [line.arrowStart, line.arrowStart + ARROW_UNITS], [0, arrowW]);
  const h = Math.round((arrowW / 112) * 16);
  return (
    <span className={styles.fillText}>
      <Words chars={line.pre} filled={filled} colors={colors} />
      <span className={styles.word}>
        {line.from.map((c) => <Letter key={c.i} c={c} filled={filled} colors={colors} />)}
      </span>
      <motion.span className={styles.arrow} style={{ width }} aria-hidden="true">
        <svg width={arrowW} height={h} viewBox="0 0 112 16" className={styles.arrowSvg} fill="none">
          <path
            d="M3 8 H99 M91 3 L100 8 L91 13"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.span>
      <Words chars={line.mid} filled={filled} colors={colors} />
      <span className={styles.word}>
        {line.to.map((c) => <Letter key={c.i} c={c} filled={filled} colors={colors} />)}
      </span>
    </span>
  );
}

/* Чипы стека — окрашиваются и проявляются по очереди в общей последовательности. */
function ChipsLine({ items, filled, colors }: { items: Extract<RLine, { kind: 'chips' }>['items']; filled: MotionValue<number>; colors: Colors }) {
  return (
    <span className={styles.chips}>
      {items.map((it) => <ChipFill key={it.label} item={it} filled={filled} colors={colors} />)}
    </span>
  );
}

function ChipFill({ item, filled, colors }: { item: { label: string; icon: IconName; start: number }; filled: MotionValue<number>; colors: Colors }) {
  const t = useTransform(filled, [item.start, item.start + CHIP_UNITS], [0, 1]);
  const opacity = useTransform(t, [0, 1], [0.4, 1]);
  const color = useTransform(t, [0, 1], [colors.nFrom, colors.nTo]);
  const iconColor = useTransform(t, [0, 1], [colors.aFrom, colors.aTo]);
  return (
    <motion.span className={styles.chip} style={{ opacity, color }}>
      <motion.span className={styles.chipIconWrap} style={{ color: iconColor }}>
        <ChipIcon name={item.icon} />
      </motion.span>
      {item.label}
    </motion.span>
  );
}

function ChipIcon({ name }: { name: IconName }) {
  const cls = styles.chipIcon;
  if (name === 'ai') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l1.6 4.6 4.6 1.6-4.6 1.6L12 15l-1.6-4.2-4.6-1.6 4.6-1.6L12 3z" fill="currentColor" />
        <path d="M18.5 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" fill="currentColor" />
      </svg>
    );
  }
  if (name === 'saas') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M4 12l8 4.5 8-4.5M4 16.5L12 21l8-4.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === 'mobile') {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="3" width="10" height="18" rx="2.6" stroke="currentColor" strokeWidth="2" />
        <path d="M10.5 18h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21.5 3.5l-19 7.2 6 2.1 2.1 6 2.9-4.1 4.4 3.2 3.6-14.4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.5 12.8l9-6.1-6.4 8.2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
