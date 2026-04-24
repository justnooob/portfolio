'use client';

import Link from 'next/link';
import { useApp } from './AppProvider';
import { translations, projects, Project, ProjectCategory } from '@/lib/data';
import styles from './Projects.module.css';

function ProjectCard({ project }: { project: Project }) {
  const { locale } = useApp();
  const t = translations[locale];

  const renderPreview = () => {
    if (project.isThisSite) {
      return (
        <div className={styles.selfPreview} style={{ background: project.color }}>
          <div className={styles.selfBadge}>{t.experience.thisSite}</div>
          <div className={styles.selfName}>sorokin.design</div>
          <div className={styles.selfSub}>Portfolio 2026</div>
        </div>
      );
    }
    if (project.category === 'mobile') {
      return (
        <div className={styles.preview} style={{ background: project.color }}>
          <div className={styles.phone}></div>
        </div>
      );
    }
    if (project.category === 'web') {
      return (
        <div className={styles.preview} style={{ background: project.color }}>
          <div className={styles.browser}></div>
        </div>
      );
    }
    // saas
    return (
      <div className={styles.preview} style={{ background: project.color }}>
        <div className={styles.mock}>{project.name[locale]}</div>
      </div>
    );
  };

  return (
    <Link href={`/projects/${project.slug}`} className={styles.card}>
      {renderPreview()}
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
  );
}

function CategorySection({ category, columns }: { category: ProjectCategory; columns: 2 | 3 }) {
  const { locale } = useApp();
  const t = translations[locale];
  const catInfo = t.categories[category];
  const items = projects.filter((p) => p.category === category && !p.featured);

  const gridClass = columns === 3 ? styles.grid3 : styles.grid2;
  const count = items.length.toString().padStart(2, '0');

  return (
    <div className={styles.section}>
      <div className={styles.head}>
        <div className={styles.title}>
          {catInfo.title} <span className={styles.count}>{count}</span>
        </div>
        <div className={styles.sub}>{catInfo.sub}</div>
      </div>
      <div className={gridClass}>
        {items.map((p) => (
          <ProjectCard key={p.slug} project={p} />
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
