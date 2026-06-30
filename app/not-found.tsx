'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useApp } from '@/components/AppProvider';
import Nav from '@/components/Nav';
import { useGSAP, gsap, prefersReducedMotion, EASE } from '@/lib/gsap';
import styles from './not-found.module.css';

export default function NotFound() {
  const { locale } = useApp();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const items = ref.current.querySelectorAll<HTMLElement>('[data-reveal-404]');
      gsap.from(items, {
        opacity: 0,
        y: 28,
        filter: 'blur(8px)',
        duration: 0.9,
        ease: EASE.out,
        stagger: 0.12,
        clearProps: 'filter',
      });
    },
    { scope: ref }
  );

  const isRu = locale === 'ru';

  return (
    <main>
      <Nav />
      <div className={styles.wrap} ref={ref}>
        <div className={styles.code} data-reveal-404>404</div>

        <h1 className={styles.title} data-reveal-404>
          {isRu
            ? 'Кажется, такое я ещё не проектировал. Хотите сделать это вместе?'
            : "Looks like I haven't designed this one yet. Want to make it together?"}
        </h1>

        <p className={styles.sub} data-reveal-404>
          {isRu
            ? 'Страница не найдена — но это отличный повод обсудить новый проект.'
            : 'This page was not found — but it’s a great reason to discuss a new project.'}
        </p>

        <div className={styles.btns} data-reveal-404>
          <a
            href="https://t.me/sfokin1337"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
          >
            {isRu ? 'Написать в Telegram' : 'Message on Telegram'}
            <span className="btn-cta-ico-wrap">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
          <Link href="/" className="btn-secondary">
            {isRu ? 'На главную' : 'Back home'}
          </Link>
        </div>
      </div>
    </main>
  );
}
