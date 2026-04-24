'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import { translations, projects } from '@/lib/data';
import styles from './project.module.css';

export default function ProjectPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { locale } = useApp();
  const t = translations[locale];

  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <main>
        <Nav />
        <div className={styles.notFound}>
          <h1>404</h1>
          <p>Project not found</p>
          <Link href="/" className="btn-cta">
            {t.project.back}
            <div className="btn-cta-ico">↗</div>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Nav />

      <div className={styles.hero} style={{ background: project.color }}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <button onClick={() => router.push('/')} className={styles.back}>
            ← {t.project.back}
          </button>
          <div className={styles.heroTop}>
            <div className={styles.tags}>
              {project.tags[locale].map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={styles.year}>{project.year}</div>
          </div>
          <h1 className={styles.title}>{project.name[locale]}</h1>
          <p className={styles.subtitle}>{project.shortDesc[locale]}</p>
          {project.metrics && (
            <div className={styles.metrics}>
              {project.metrics.map((m, i) => (
                <div key={i} className={styles.metric}>
                  <div className={styles.metricNum}>{m.value}</div>
                  <div className={styles.metricLbl}>{m.label[locale]}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <div className={styles.metaLbl}>{t.project.role}</div>
          <div className={styles.metaVal}>{project.role[locale]}</div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLbl}>{t.project.duration}</div>
          <div className={styles.metaVal}>{project.duration[locale]}</div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLbl}>{t.project.tools}</div>
          <div className={styles.metaVal}>{project.tools.join(', ')}</div>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.block}>
          <div className={styles.blockLbl}>{t.project.overview}</div>
          <p className={styles.blockText}>{project.overview[locale]}</p>
        </section>

        <section className={styles.block}>
          <div className={styles.blockLbl}>{t.project.challenge}</div>
          <p className={styles.blockText}>{project.challenge[locale]}</p>
        </section>

        <section className={styles.block}>
          <div className={styles.blockLbl}>{t.project.solution}</div>
          <p className={styles.blockText}>{project.solution[locale]}</p>
        </section>

        <section className={styles.block}>
          <div className={styles.blockLbl}>{t.project.results}</div>
          <ul className={styles.resultsList}>
            {project.results[locale].map((r, i) => (
              <li key={i} className={styles.result}>
                {r}
              </li>
            ))}
          </ul>
        </section>

        {/* Плейсхолдер под скриншоты — сюда Максим положит свои макеты */}
        <section className={styles.screensBlock}>
          <div className={styles.blockLbl}>{t.project.screens}</div>
          <div className={styles.screensPlaceholder} style={{ background: project.color }}>
            <div className={styles.screensMsg}>
              {locale === 'ru'
                ? 'Добавьте скриншоты проекта в папку public/projects/' + project.slug + '/'
                : 'Add project screenshots to public/projects/' + project.slug + '/'}
            </div>
          </div>
        </section>

        {project.behanceUrl && (
          <div className={styles.behance}>
            <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className="btn-cta">
              {t.project.viewBehance}
              <div className="btn-cta-ico">↗</div>
            </a>
          </div>
        )}
      </div>

      <FinalCta />
      <Footer />
    </main>
  );
}
