'use client';

import Link from 'next/link';
import { useApp } from './AppProvider';
import { useReveal, useCardReveal } from '@/lib/useReveal';
import { translations, projects, Project, ProjectCategory } from '@/lib/data';
import { useTilt, easeOut } from './motion-utils';
import styles from './Projects.module.css';

interface ProjectCardProps {
  project: Project;
  /** Индекс карточки в гриде (для определения направления slide-in картинки) */
  index?: number;
  /** Кол-во колонок в гриде (2 или 3) */
  columns?: 2 | 3;
}

function ProjectCard({ project, index = 0, columns = 2 }: ProjectCardProps) {
  const { locale, theme } = useApp();
  const t = translations[locale];
  // ref на обёртку — она получает GSAP card-reveal (всплытие + clip + parallax картинки)
  const { cardRef, imgRef } = useCardReveal<HTMLDivElement, HTMLImageElement>();
  // 3D-tilt при hover
  const tilt = useTilt<HTMLDivElement>(3.5);

  // Выбираем обложку по теме. Для листинга /projects предпочитаем listCoverImage*
  // (если задано) — это позволяет featured-проектам показывать в категорийном
  // листинге обложку, отличную от обложки на главной.
  const cover =
    theme === 'light'
      ? project.listCoverImageLight ?? project.coverImageLight ?? project.listCoverImage ?? project.coverImage
      : project.listCoverImage ?? project.coverImage;

  const renderPreview = () => {
    if (cover) {
      return (
        <div className={styles.preview} style={{ background: project.color }}>
          <img
            ref={imgRef}
            src={cover}
            alt={project.name[locale]}
            className={styles.coverImg}
            loading="lazy"
          />
          {project.isThisSite && (
            <div className={styles.selfBadge}>{t.experience.thisSite}</div>
          )}
        </div>
      );
    }
    if (project.isThisSite) {
      return (
        <div className={styles.selfPreview} style={{ background: project.color }}>
          <div className={styles.selfBadge}>{t.experience.thisSite}</div>
          <div className={styles.selfName}>sorokin.design</div>
          <div className={styles.selfSub}>Portfolio 2026</div>
        </div>
      );
    }
    const previewCls = `${styles.preview} ${project.lightText ? styles.previewLight : ''}`;
    if (project.category === 'mobile') {
      return (
        <div className={previewCls} style={{ background: project.color }}>
          <div className={styles.phone}></div>
        </div>
      );
    }
    if (project.category === 'web') {
      return (
        <div className={previewCls} style={{ background: project.color }}>
          <div className={styles.browser}></div>
        </div>
      );
    }
    return (
      <div className={previewCls} style={{ background: project.color }}>
        <div className={styles.mock}>{project.name[locale]}</div>
      </div>
    );
  };

  return (
    /*
      Структура карточки:
      .cardWrap (обёртка с ref) — получает .cardFigmaIn когда виден,
                                  и clip-path анимацию (frame draw)
        ├─ .figmaCursor — курсор-крестик в углу (только в момент рисования)
        └─ Link.card — сама карточка
            ├─ .coverSlide (выезжает с одной из сторон ПОСЛЕ раскрытия рамки)
            │   └─ preview (картинка)
            └─ body (название, описание, мета)
    */
    <div
      ref={cardRef}
      id={project.slug}
      className={styles.cardWrap}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
      >
        <Link href={`/projects/${project.slug}`} className={styles.card}>
          {/* coverSlide — обёртка над картинкой для slide-in анимации */}
          <div className={styles.coverSlide}>
            {renderPreview()}
          </div>

          <div className={styles.body}>
            <div className={styles.head}>
              <div className={styles.name}>{project.name[locale]}</div>
              <div className={styles.arrow}>↗</div>
            </div>
            <div className={styles.desc}>{project.shortDesc[locale]}</div>
            <div className={styles.meta}>
              <span>{project.year}</span>
              {project.company && (
                <>
                  <div className={styles.mdot}></div>
                  <span>{project.company[locale]}</span>
                </>
              )}
              {project.metrics && project.metrics[0] && (
                <>
                  <div className={styles.mdot}></div>
                  <span>
                    {project.metrics[0].value} {project.metrics[0].label[locale]}
                  </span>
                </>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function CategorySection({ category, columns, olderOnly }: { category: ProjectCategory; columns: 2 | 3; olderOnly?: boolean }) {
  const { locale } = useApp();
  const t = translations[locale];
  const catInfo = t.categories[category];
  const items = projects.filter((p) => {
    if (p.category !== category) return false;
    if (olderOnly && p.isProduct) return false;
    return true;
  });
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();

  if (items.length === 0) return null;

  const gridClass = columns === 3 ? styles.grid3 : styles.grid2;
  const count = items.length.toString().padStart(2, '0');

  return (
    <div className={styles.section}>
      <div ref={headRef} className={`${styles.head} reveal-slide-left ${headVisible ? 'visible' : ''}`}>
        <div className={styles.title}>
          {catInfo.title} <span className={styles.count}>{count}</span>
        </div>
        <div className={styles.sub}>{catInfo.sub}</div>
      </div>
      <div className={gridClass}>
        {items.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} columns={columns} />
        ))}
      </div>
    </div>
  );
}

function OlderProjectsHeader() {
  const { locale } = useApp();
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div className={styles.section} style={{ borderTop: '0.5px solid var(--border)', paddingBottom: 0 }}>
      <div ref={ref} className={`${styles.head} reveal-slide-left ${visible ? 'visible' : ''}`}>
        <div className={styles.title}>
          {locale === 'ru' ? 'Другие проекты' : 'Older Projects'}
        </div>
        <div className={styles.sub}>
          {locale === 'ru' ? 'Более ранние кейсы' : 'Earlier case studies'}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ olderOnly }: { olderOnly?: boolean }) {
  return (
    <div data-section="projects">
      {olderOnly && <OlderProjectsHeader />}
      <CategorySection category="saas" columns={2} olderOnly={olderOnly} />
      <CategorySection category="mobile" columns={2} olderOnly={olderOnly} />
      <CategorySection category="web" columns={3} olderOnly={olderOnly} />
    </div>
  );
}
