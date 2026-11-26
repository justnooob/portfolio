'use client';

import { useApp } from './AppProvider';
import { responsiveImage } from '@/lib/responsive-images';
import styles from './Myself.module.css';

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
    { kind: 'metric', lead: 'Проектирую продукты, меняющие ', word: 'метрики' },
    { kind: 'text', segs: [{ text: '7+ лет', accent: true }, { text: ' опыта. Технический бэкграунд.', accent: false }] },
    { kind: 'process', pre: 'От ', from: 'исследования', mid: 'до ', to: 'релиза' },
    { kind: 'chips', items: CHIPS },
    { kind: 'text', segs: [{ text: 'Управляю ', accent: false }, { text: 'дизайном', accent: true }, { text: ' и разработкой.', accent: false }] },
  ],
  en: [
    { kind: 'metric', lead: 'Designing products that improve ', word: 'metrics' },
    { kind: 'text', segs: [{ text: '7+ years', accent: true }, { text: ' of experience. Technical background.', accent: false }] },
    { kind: 'process', pre: 'From ', from: 'research', mid: 'to ', to: 'release' },
    { kind: 'chips', items: CHIPS },
    { kind: 'text', segs: [{ text: 'Leading ', accent: false }, { text: 'design', accent: true }, { text: ' and coordinating engineering.', accent: false }] },
  ],
};


export default function Myself() {
  const { locale } = useApp();
  return (
    <section className={styles.section} data-section="myself" id="myself" aria-label={locale === 'ru' ? 'Обо мне' : 'About me'}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <div className={styles.text}>
              {CONTENT[locale].map((line, idx) => (
                <div key={idx} className={styles.lineRow}>
                  {line.kind === 'metric' ? (
                    <>{line.lead}<span className={styles.accent}>{line.word}</span></>
                  ) : line.kind === 'text' ? (
                    <>{line.segs.map((seg, i) => <span key={i} className={seg.accent ? styles.accent : undefined}>{seg.text}</span>)}</>
                  ) : line.kind === 'process' ? (
                    <>{line.pre}<span className={styles.accent}>{line.from}</span>
                      <span className={styles.arrow} aria-hidden="true">
                        <svg viewBox="0 0 112 16" className={styles.arrowSvg} fill="none">
                          <path d="M3 8 H99 M91 3 L100 8 L91 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>{line.mid}<span className={styles.accent}>{line.to}</span></>
                  ) : (
                    <div className={styles.chips}>
                      {line.items.map(item => (
                        <a key={item.label} href={item.icon === 'ai' || item.icon === 'saas' ? '/#okk-pro' : '/#hobbist'} className={styles.chip} data-optical-glass>
                          <span className={styles.chipIconWrap}><ChipIcon name={item.icon} /></span>{item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.photoOuter}>
            <div className={styles.photoWrap}>
              <picture>
                <source type="image/webp" srcSet={responsiveImage('/maksim-sorokin-product-designer.jpg')} sizes="(max-width: 640px) 100vw, (max-width: 900px) 480px, 560px" />
                <img src="/maksim-sorokin-product-designer.jpg"
                  alt={locale === 'ru' ? 'Максим Сорокин, продуктовый дизайнер' : 'Maxim Sorokin, Product Designer'}
                  className={styles.photo} decoding="async" loading="lazy" />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
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
