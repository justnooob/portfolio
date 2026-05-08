'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useApp } from './AppProvider';
import { translations } from '@/lib/data';
import styles from './TechStack.module.css';

type Tool = {
  name: string;
  url: string;
  logo: ReactNode;
};

const FigmaMark = () => (
  <svg viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
    <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
    <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
    <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z" />
    <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z" />
  </svg>
);

const SparkleMark = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 2l2.5 7L21 12l-6.5 3L12 22l-2.5-7L3 12l6.5-3L12 2z" />
  </svg>
);

const ChatGPTMark = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M22.3 10.3a5.4 5.4 0 0 0-.5-4.4 5.5 5.5 0 0 0-5.9-2.6 5.4 5.4 0 0 0-4-1.8 5.5 5.5 0 0 0-5.3 3.8 5.4 5.4 0 0 0-3.6 2.7 5.5 5.5 0 0 0 .7 6.5 5.4 5.4 0 0 0 .5 4.4 5.5 5.5 0 0 0 5.9 2.6 5.4 5.4 0 0 0 4 1.8 5.5 5.5 0 0 0 5.3-3.8 5.4 5.4 0 0 0 3.6-2.7 5.5 5.5 0 0 0-.7-6.5z" />
  </svg>
);

const Brand = ({
  icon,
  name,
  serif,
}: {
  icon?: ReactNode;
  name: string;
  serif?: boolean;
}) => (
  <span className={styles.brand}>
    {icon && <span className={styles.brandIcon}>{icon}</span>}
    <span className={serif ? styles.brandNameSerif : styles.brandName}>{name}</span>
  </span>
);

const AdobeBox = ({ letters }: { letters: string }) => (
  <span className={styles.adobeBox}>{letters}</span>
);

const TOOLS_ROW1: Tool[] = [
  { name: 'Figma', url: 'https://www.figma.com', logo: <Brand icon={<FigmaMark />} name="Figma" /> },
  { name: 'Photoshop', url: 'https://www.adobe.com/products/photoshop.html', logo: <AdobeBox letters="Ps" /> },
  { name: 'Illustrator', url: 'https://www.adobe.com/products/illustrator.html', logo: <AdobeBox letters="Ai" /> },
];

const TOOLS_ROW2: Tool[] = [
  { name: 'Tilda', url: 'https://tilda.cc', logo: <Brand name="tilda" serif /> },
  { name: 'Gemini', url: 'https://gemini.google.com', logo: <Brand icon={<SparkleMark />} name="Gemini" /> },
  { name: 'Stitch', url: 'https://stitch.withgoogle.com', logo: <Brand name="Stitch" /> },
  { name: 'Claude', url: 'https://claude.ai', logo: <Brand name="Claude" serif /> },
  { name: 'Deepseek', url: 'https://www.deepseek.com', logo: <Brand name="deepseek" /> },
  { name: 'ChatGPT', url: 'https://chatgpt.com', logo: <Brand icon={<ChatGPTMark />} name="ChatGPT" /> },
  { name: 'After Effects', url: 'https://www.adobe.com/products/aftereffects.html', logo: <AdobeBox letters="Ae" /> },
];

export default function TechStack() {
  const { locale } = useApp();
  const t = translations[locale];
  const headingRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ['start 0.95', 'end 0.45'],
  });

  return (
    <section className={styles.section} data-section="tech-stack">
      <div ref={headingRef} className={styles.headingWrap}>
        <FlipHeading text={t.techStack.title} progress={scrollYProgress} />
      </div>

      <div className={styles.label}>{t.techStack.label}</div>

      <div className={styles.gridWrap}>
        <div className={styles.row3}>
          {TOOLS_ROW1.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
        <div className={styles.row7}>
          {TOOLS_ROW2.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={tool.name}
    >
      <div className={styles.logo}>{tool.logo}</div>
    </a>
  );
}

// Стабильный псевдо-рандом [0,1) по сиду — детерминированный между SSR/CSR.
function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function FlipHeading({ text, progress }: { text: string; progress: MotionValue<number> }) {
  const upper = text.toUpperCase();
  const words = upper.split(' ');

  let visibleIdx = 0;
  // Сид зависит от текста, чтобы при смене локали раскладка анимации менялась.
  const baseSeed = upper.charCodeAt(0) + upper.length;

  return (
    <h2 className={styles.heading}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className={styles.line}>
          {[...word].map((ch, cIdx) => {
            const idx = visibleIdx++;
            // ~80% букв анимируются — остальные статичные.
            const animated = rand(baseSeed + idx * 7 + wIdx * 3) > 0.2;
            if (!animated) {
              return (
                <span key={`${wIdx}-${cIdx}`} className={styles.letterStatic}>
                  {ch}
                </span>
              );
            }
            // Полностью рандомный старт в диапазоне [0, 0.65] — без линейной волны,
            // чтобы буквы перекатывались независимо в произвольные моменты скролла.
            const start = rand(baseSeed + idx * 13 + 91) * 0.65;
            const duration = 0.25 + rand(baseSeed + idx * 17 + 41) * 0.2;
            const end = Math.min(start + duration, 1);
            return (
              <FlipLetter
                key={`${wIdx}-${cIdx}`}
                ch={ch}
                start={start}
                end={end}
                progress={progress}
              />
            );
          })}
        </span>
      ))}
    </h2>
  );
}

function FlipLetter({
  ch,
  start,
  end,
  progress,
}: {
  ch: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}) {
  const y = useTransform(progress, [start, end], ['-50%', '0%']);
  return (
    <span className={styles.letterWrap}>
      <motion.span className={styles.letterRoll} style={{ y }}>
        <span className={styles.letterCopy} aria-hidden="true">
          {ch}
        </span>
        <span className={styles.letterCopy}>{ch}</span>
      </motion.span>
    </span>
  );
}
