'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { useReveal } from '@/lib/useReveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import { translations, projects } from '@/lib/data';
import styles from './project.module.css';

export default function ProjectPageClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { locale } = useApp();
  const t = translations[locale];

  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [resultsExpanded, setResultsExpanded] = useState(false);

  const { ref: screensRef, visible: screensVisible } = useReveal<HTMLDivElement>();

  const project = projects.find((p) => p.slug === slug);

  const openModal = (src: string) => {
    setActiveImage(src);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveImage(null);
  };

  useEffect(() => {
    if (!project) return;
    const heroMode = project.lightText ? 'light' : 'dark';
    document.documentElement.setAttribute('data-hero-mode', heroMode);
    return () => {
      document.documentElement.removeAttribute('data-hero-mode');
    };
  }, [project]);

  if (!project) {
    return (
      <main>
        <Nav />
        <div className={styles.notFound}>
          <h1>404</h1>
          <p>Project not found</p>
          <Link href="/" className="btn-cta">
            {t.project.back}
          </Link>
        </div>
      </main>
    );
  }

  const allResults = project.results[locale];
  const hasMore = allResults.length > 3;
  const displayedResults = resultsExpanded ? allResults : allResults.slice(0, 3);

  const showMoreLabel = locale === 'ru' ? 'Показать все' : 'Show all';
  const collapseLabel = locale === 'ru' ? 'Свернуть' : 'Collapse';

  const firstScreen = project.screens?.[0];

  return (
    <main>
      <Nav />

      {/* HERO */}
      <div
        className={`${styles.hero} ${project.lightText ? styles.heroLight : ''}`}
        style={{ background: project.color }}
      >
        <div className={styles.heroContent}>
          <button onClick={() => router.push('/projects')} className={styles.back}>
            ← {t.project.back}
          </button>

          <h1 className={styles.title}>{project.name[locale]}</h1>
          <p className={styles.subtitle}>{project.shortDesc[locale]}</p>
        </div>
      </div>

      {/* SCREENS */}
      {project.screens && project.screens.length > 0 && (
        <section className={styles.screensBlock}>
          <div className={styles.blockLbl}>
            {locale === 'ru' ? 'Экраны' : 'Screens'}
          </div>

          <div
            ref={screensRef}
            className={`${styles.screensGrid} ${
              screensVisible ? styles.screensGridVisible : ''
            }`}
          >
            {/* 1 экран — ТОЛЬКО если есть изображение */}
            {firstScreen && firstScreen.image && (
              <div className={styles.screenItem}>
                <img
                  src={firstScreen.image}
                  alt={firstScreen.title[locale]}
                  onClick={() => openModal(firstScreen.image)} // теперь firstScreen.image точно строка
                  className={styles.clickableImg}
                />
              </div>
            )}

            {/* остальные экраны */}
            {project.screens.slice(1).map((screen, i) => (
              <div key={i} className={styles.screenItem}>
                {screen.image && (
                  <img
                    src={screen.image}
                    alt={screen.title[locale]}
                    onClick={() => openModal(screen.image)}
                    className={styles.clickableImg}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RESULTS */}
      <section className={styles.block}>
        <div className={styles.blockLbl}>{t.project.results}</div>

        <ul className={styles.resultsList}>
          {displayedResults.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>

        {hasMore && (
          <button onClick={() => setResultsExpanded(!resultsExpanded)}>
            {resultsExpanded ? collapseLabel : showMoreLabel}
          </button>
        )}
      </section>

      {/* MODAL */}
      {modalOpen && activeImage && (
        <div className={`${styles.modal} ${modalOpen ? styles.modalActive : ''}`} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={closeModal}>
              ✕
            </button>

            <img
              src={activeImage}
              className={styles.modalImg}
              onClick={closeModal}
            />
          </div>
        </div>
      )}

      <FinalCta />
      <Footer />
    </main>
  );
}