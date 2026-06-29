'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import styles from './MediaViewer.module.css';

/* ─────────────────────────── Types ─────────────────────────── */

export interface MediaItem {
  kind: 'single' | 'compare';
  color: string;
  /** single */
  label?: string;
  src?: string;
  /** compare */
  beforeLabel?: string;
  afterLabel?: string;
  beforeSrc?: string;
  afterSrc?: string;
  /** compare slider handle theming (per product) */
  handleColor?: string;
  handleIconColor?: string;
}

interface MediaCtx {
  items: MediaItem[];
  open: (index: number, originRect?: DOMRect) => void;
  getPos: (index: number) => number;
  setPos: (index: number, pos: number) => void;
}

const Ctx = createContext<MediaCtx | null>(null);

export function useMedia() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('Media components must be used within <MediaProvider>');
  return ctx;
}

/* ─────────────────── Comparison slider (shared) ─────────────────── */

export function CompareView({
  item,
  pos,
  onPos,
  onSurfaceClick,
}: {
  item: MediaItem;
  pos: number;
  onPos: (p: number) => void;
  /** Клик по самому фото (не по ручке и не перетаскивание) — напр. открыть фулскрин */
  onSurfaceClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  // Был ли это драг (двигали ручку) — чтобы клик после перетаскивания не открывал фулскрин
  const dragged = useRef(false);
  const [beforeFail, setBeforeFail] = useState(false);
  const [afterFail, setAfterFail] = useState(false);

  const update = useCallback(
    (clientX: number) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
      onPos(p);
    },
    [onPos]
  );

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) {
        dragged.current = true;
        update(e.clientX);
      }
    };
    const up = () => {
      dragging.current = false;
      // Сбрасываем флаг драга после того, как успеет сгенерироваться click,
      // чтобы этот click не открыл фулскрин
      if (dragged.current) setTimeout(() => { dragged.current = false; }, 0);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [update]);

  const startDrag = (e: React.PointerEvent) => {
    // NB: не вызываем preventDefault на pointerdown — иначе браузер подавляет
    // совместимые mouse-события (mousemove) на всё время жеста, и кастомный
    // курсор (слушает mousemove) застывает на месте до отпускания.
    e.stopPropagation();
    dragging.current = true;
    dragged.current = false;
    update(e.clientX);
  };

  const handleSurfaceClick = (e: React.MouseEvent) => {
    if (!onSurfaceClick) return;
    // Не открываем, если это было перетаскивание ручки или клик по самой ручке
    if (dragged.current) return;
    if ((e.target as HTMLElement).closest(`.${styles.compareHandle}`)) return;
    onSurfaceClick();
  };

  return (
    <div
      ref={ref}
      className={styles.compareInner}
      onClick={handleSurfaceClick}
      style={onSurfaceClick ? { cursor: 'zoom-in' } : undefined}
    >
      {/* After — full background (right side visible) */}
      <div className={styles.compareAfter}>
        {item.afterSrc && !afterFail && (
          <img
            src={item.afterSrc}
            alt={item.afterLabel ?? ''}
            className={styles.compareImg}
            onError={() => setAfterFail(true)}
          />
        )}
      </div>

      {/* Before — clipped to the left of the handle */}
      <div
        className={styles.compareBefore}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {item.beforeSrc && !beforeFail && (
          <img
            src={item.beforeSrc}
            alt={item.beforeLabel ?? ''}
            className={styles.compareImg}
            onError={() => setBeforeFail(true)}
          />
        )}
      </div>

      {/* Handle */}
      <div className={styles.compareHandle} style={{ left: `${pos}%` }} onPointerDown={startDrag}>
        <div
          className={styles.compareGrip}
          style={item.handleColor ? { background: item.handleColor, color: item.handleIconColor ?? '#fff' } : undefined}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L2.5 8L6 12M10 4l3.5 4L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── Single image ─────────────────────── */

export function MediaSingle({ index, className }: { index: number; className?: string }) {
  const { items, open } = useMedia();
  const item = items[index];
  const [fail, setFail] = useState(false);

  return (
    <button
      type="button"
      className={`${styles.mediaSingle} ${className ?? ''}`}
      onClick={(e) => open(index, (e.currentTarget as HTMLElement).getBoundingClientRect())}
    >
      {item.src && !fail ? (
        <img src={item.src} alt={item.label ?? ''} className={styles.mediaImg} onError={() => setFail(true)} />
      ) : (
        <span className={styles.placeholderLabel}>{item.label}</span>
      )}
      <span className={styles.mediaExpand}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 1h4v4M5 13H1V9M13 1L8 6M1 13l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

/* ───────────────────── Inline comparison ───────────────────── */

export function MediaCompare({ index, className }: { index: number; className?: string }) {
  const { items, open, getPos, setPos } = useMedia();
  const item = items[index];
  const rootRef = useRef<HTMLDivElement>(null);
  const openWithRect = () =>
    open(index, rootRef.current?.getBoundingClientRect());

  return (
    <div ref={rootRef} className={`${styles.mediaCompare} ${className ?? ''}`}>
      <CompareView
        item={item}
        pos={getPos(index)}
        onPos={(p) => setPos(index, p)}
        onSurfaceClick={openWithRect}
      />

      {/* Corner labels */}
      <span className={`${styles.compareCorner} ${styles.compareCornerLeft}`}>{item.beforeLabel}</span>
      <span className={`${styles.compareCorner} ${styles.compareCornerRight}`}>{item.afterLabel}</span>

      {/* Expand to fullscreen — в нижнем углу, чтобы не конфликтовать с лейблами сверху */}
      <button type="button" className={`${styles.mediaExpand} ${styles.mediaExpandCompare}`} onClick={openWithRect} aria-label="Open fullscreen">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 1h4v4M5 13H1V9M13 1L8 6M1 13l5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function LightboxSingle({ item }: { item: MediaItem }) {
  const [fail, setFail] = useState(false);
  if (item.src && !fail) {
    return (
      <img
        src={item.src}
        alt={item.label ?? ''}
        className={styles.lightboxImg}
        onError={() => setFail(true)}
      />
    );
  }
  return (
    <div className={styles.lightboxPlaceholder}>
      <span className={styles.placeholderLabel}>{item.label}</span>
    </div>
  );
}

/* ─────────────────────────── Lightbox ─────────────────────────── */

function Lightbox({ index, originRect, onClose, onPrev, onNext }: {
  index: number;
  originRect: DOMRect | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { items, getPos, setPos } = useMedia();
  const item = items[index];
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const closing = useRef(false);

  // Плавное раскрытие на фулскрин из позиции/размера миниатюры (один раз при открытии)
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      const stage = stageRef.current;
      if (!overlay || !stage) return;
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      if (originRect && !prefersReducedMotion()) {
        const f = stage.getBoundingClientRect();
        gsap.from(stage, {
          x: originRect.left + originRect.width / 2 - (f.left + f.width / 2),
          y: originRect.top + originRect.height / 2 - (f.top + f.height / 2),
          scaleX: originRect.width / f.width,
          scaleY: originRect.height / f.height,
          opacity: 0.4,
          duration: 0.5,
          ease: 'power3.inOut',
        });
      } else {
        gsap.from(stage, { scale: 0.92, opacity: 0, duration: 0.35, ease: 'power2.out' });
      }
    },
    { scope: overlayRef }
  );

  // Плавное закрытие: схлопывание + затухание, потом реальное размонтирование
  const animateClose = () => {
    if (closing.current) return;
    closing.current = true;
    const overlay = overlayRef.current;
    const stage = stageRef.current;
    if (!overlay || !stage || prefersReducedMotion()) {
      onClose();
      return;
    }
    gsap.to(overlay, { opacity: 0, duration: 0.28, ease: 'power2.in' });
    gsap.to(stage, {
      scale: 0.9,
      opacity: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  // Свайп-навигация (мобилка): листаем влево/вправо.
  // Свайп, начатый на самом ползунке сравнения, не листает — двигает ручку.
  const touchStart = useRef<{ x: number; y: number; skip: boolean } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    const skip = !!(e.target as HTMLElement).closest(`.${styles.compareInner}`);
    touchStart.current = { x: t.clientX, y: t.clientY, skip };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || start.skip || items.length < 2) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) onNext();
      else onPrev();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') animateClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  const content = (
    <div ref={overlayRef} className={styles.lightbox} onClick={animateClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <button type="button" className={styles.lightboxClose} onClick={animateClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {items.length > 1 && (
        <button
          type="button"
          className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div ref={stageRef} className={styles.lightboxStage} onClick={(e) => e.stopPropagation()}>
        {item.kind === 'compare' ? (
          <div className={styles.lightboxCompare}>
            <CompareView item={item} pos={getPos(index)} onPos={(p) => setPos(index, p)} />
            <span className={`${styles.compareCorner} ${styles.compareCornerLeft}`}>{item.beforeLabel}</span>
            <span className={`${styles.compareCorner} ${styles.compareCornerRight}`}>{item.afterLabel}</span>
          </div>
        ) : (
          <LightboxSingle item={item} />
        )}
      </div>

      {items.length > 1 && (
        <button
          type="button"
          className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M8 4l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(content, document.body);
}

/* ─────────────────────────── Provider ─────────────────────────── */

export function MediaProvider({ items, children }: { items: MediaItem[]; children: ReactNode }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [positions, setPositions] = useState<Record<number, number>>({});

  const getPos = useCallback((i: number) => positions[i] ?? 50, [positions]);
  const setPos = useCallback((i: number, p: number) => {
    setPositions((prev) => ({ ...prev, [i]: p }));
  }, []);

  const open = useCallback((i: number, rect?: DOMRect) => {
    setOriginRect(rect ?? null);
    setOpenIndex(i);
  }, []);
  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
  }, [items.length]);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? i : (i + 1) % items.length));
  }, [items.length]);

  return (
    <Ctx.Provider value={{ items, open, getPos, setPos }}>
      {children}
      {openIndex !== null && (
        <Lightbox index={openIndex} originRect={originRect} onClose={close} onPrev={prev} onNext={next} />
      )}
    </Ctx.Provider>
  );
}

/** @deprecated use MediaProvider */
export { MediaProvider as CaseMediaProvider };
