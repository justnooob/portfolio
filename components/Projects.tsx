'use client';

import Link from 'next/link';
import { useApp } from './AppProvider';
import { useReveal, useStaggerReveal } from '@/lib/useReveal';
import TypeOnReveal from './TypeOnReveal';
import { translations, projects, Project, ProjectCategory } from '@/lib/data';
import styles from './Projects.module.css';

interface ProjectCardProps {
  project: Project;
  /** Индекс в гриде, начиная с 0 */
  index?: number;
  /** Кол-во колонок в гриде (2 или 3) */
  columns?: 2 | 3;
}

function ProjectCard({ project, index = 0, columns = 2 }: ProjectCardProps) {
  const { locale, theme } = useApp();
  const t = translations[locale];
  const { ref, visible } = useReveal<HTMLDivElement>();

  const cover =
    theme === 'light' && project.coverImageLight
      ? project.coverImageLight
      : project.coverImage;

  /**
   * Определяем с какой стороны выезжает картинка после раскрытия фрейма:
   * - грид 2 колонки: левая (col=0) → справа налево; правая (col=1) → слева направо
   * - грид 3 колонки: левая → справа; центр → сверху; правая → слева
   */
  const col = index % columns;
  let coverFromClass = '';
  if (columns === 2) {
    coverFromClass = col === 0 ? styles.coverFromRight : styles.coverFromLeft;
  } else {
    if (col === 0) coverFromClass = styles.coverFromRight;
    else if (col === 1) coverFromClass = styles.coverFromTop;
    else coverFromClass = styles.coverFromLeft;
  }

  const renderPreview = () => {
    // Если есть обложка — используем её, даже для "this site" проекта
    if (cover) {
      return (
        <div className={styles.preview} style={{ background: project.color }}>
          <img
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

    // Фолбэк для "this site" если обложки нет
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
    // saas
    return (
      <div className={previewCls} style={{ background: project.color }}>
        <div className={styles.mock}>{project.name[locale]}</div>
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`${styles.cardWrap} ${styles.cardFigma} ${coverFromClass} ${visible ? styles.cardFigmaIn : ''}`}
    >
      <Link href={`/projects/${project.slug}`} className={styles.card}>
        {/* Курсор-крестик (Figma frame tool) — рисуется в углу */}
        <span className={styles.figmaCursor} aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>

        {/* Обёртка над preview — с её помощью картинка выезжает с нужной стороны */}
        <div className={styles.coverSlide}>
          {renderPreview()}
        </div>

        <div className={styles.body}>
          <div className={styles.head}>
            {/* Название печатается после появления фрейма */}
            {visible ? (
              <TypeOnReveal
                text={project.name[locale]}
                speed={28}
                delay={1100}
                startImmediately
                as="div"
                className={styles.name}
              />
            ) : (
              <div className={styles.name}>{project.name[locale]}</div>
            )}
            {/* Стрелка появляется в конце */}
            <div className={`${styles.arrow} ${visible ? styles.arrowIn : ''}`}>↗</div>
          </div>
          {visible ? (
            <TypeOnReveal
              text={project.shortDesc[locale]}
              speed={14}
              delay={1100 + project.name[locale].length * 28 + 150}
              startImmediately
              as="div"
              className={styles.desc}
            />
          ) : (
            <div className={styles.desc}>{project.shortDesc[locale]}</div>
          )}
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
  );
}

function CategorySection({ category, columns }: { category: ProjectCategory; columns: 2 | 3 }) {
  const { locale } = useApp();
  const t = translations[locale];
  const catInfo = t.categories[category];
  const items = projects.filter((p) => p.category === category && !p.featured);
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();

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

export default function Projects() {
  return (
    <>
      <CategorySection category="saas" columns={2} />
      <div className={styles.dividerWrap}>
        <div className={styles.divider}></div>
      </div>
      <CategorySection category="mobile" columns={2} />
      <div className={styles.dividerWrap}>
        <div className={styles.divider}></div>
      </div>
      <CategorySection category="web" columns={3} />
    </>
  );
}
