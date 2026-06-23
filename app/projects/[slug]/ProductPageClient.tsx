'use client';

import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import { translations, projects } from '@/lib/data';
import styles from './project.module.css';
import pStyles from './product.module.css';

export default function ProductPageClient({ slug }: { slug: string }) {
  const { locale } = useApp();
  const t = translations[locale];

  const project = projects.find((p) => p.slug === slug);
  const productProjects = projects.filter((p) => p.isProduct);
  const currentIdx = productProjects.findIndex((p) => p.slug === slug);
  const nextProduct = productProjects[(currentIdx + 1) % productProjects.length];

  if (!project) {
    return (
      <main>
        <Nav />
        <div className={styles.notFound}>
          <h1>404</h1>
          <p>Product not found</p>
          <Link href="/" className="btn-cta">
            {t.project.back}
            <span className="btn-cta-ico-wrap">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </div>
      </main>
    );
  }

  const cases = project.cases ?? [];
  const featuredCases = cases.filter((c) => c.featured);
  const otherCases = cases.filter((c) => !c.featured);

  return (
    <main>
      <Nav />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <Link href={`/projects#${slug}`} scroll={false} className={styles.back}>
            ← {locale === 'ru' ? 'Назад к проектам' : 'Back to projects'}
          </Link>
          <div className={styles.heroTop}>
            <div className={styles.tags}>
              {project.tags[locale].map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
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

      {/* META */}
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

      {/* CONTENT */}
      <div className={styles.content}>

        {/* BANNER PLACEHOLDER */}
        <div className={pStyles.banner} style={{ background: project.color }}>
          <span className={pStyles.bannerLabel}>
            {locale === 'ru' ? 'Баннер продукта' : 'Product banner'}
          </span>
        </div>

        {/* ABOUT */}
        {project.overview && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'О продукте' : 'About the product'}</div>
            <p className={styles.blockText}>{project.overview[locale]}</p>
          </section>
        )}

        {/* MY ROLE */}
        {project.process && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Моя роль' : 'My role'}</div>
            <p className={styles.blockText}>{project.process[locale]}</p>
          </section>
        )}

        {/* CASES GRID */}
        {cases.length > 0 && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Ключевые направления работы' : 'Key work directions'}</div>
            <div className={pStyles.casesGrid}>
              {featuredCases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/projects/${slug}/${c.slug}`}
                  className={`${pStyles.caseCard} ${pStyles.caseCardFeatured}`}
                >
                  <div className={pStyles.caseCardInner} style={{ background: project.color }}>
                    <span className={pStyles.casePlaceholderText}>
                      {locale === 'ru' ? 'Изображение кейса' : 'Case image'}
                    </span>
                  </div>
                  <div className={pStyles.caseCardBody}>
                    <div className={pStyles.caseCardName}>{c.name[locale]}</div>
                  </div>
                </Link>
              ))}
              {otherCases.map((c) => (
                <Link
                  key={c.slug}
                  href={`/projects/${slug}/${c.slug}`}
                  className={pStyles.caseCard}
                >
                  <div className={pStyles.caseCardInner} style={{ background: project.color, opacity: 0.6 }}>
                    <span className={pStyles.casePlaceholderText}>
                      {locale === 'ru' ? 'Изображение кейса' : 'Case image'}
                    </span>
                  </div>
                  <div className={pStyles.caseCardBody}>
                    <div className={pStyles.caseCardName}>{c.name[locale]}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* RESULTS */}
        {project.results && project.results[locale].length > 0 && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Ключевые результаты' : 'Key results'}</div>
            <ul className={styles.resultsList}>
              {project.results[locale].map((r, i) => (
                <li key={i} className={styles.result}>{r}</li>
              ))}
            </ul>
          </section>
        )}

        {/* BEFORE / AFTER */}
        {project.challenge && project.solution && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Что изменилось' : 'What changed'}</div>
            <div className={pStyles.beforeAfter}>
              <div className={pStyles.beforeAfterItem}>
                <div className={pStyles.beforeAfterLabel}>{locale === 'ru' ? 'До' : 'Before'}</div>
                <p className={pStyles.beforeAfterText}>{project.challenge[locale]}</p>
              </div>
              <div className={pStyles.beforeAfterItem}>
                <div className={pStyles.beforeAfterLabel}>{locale === 'ru' ? 'После' : 'After'}</div>
                <p className={pStyles.beforeAfterText}>{project.solution[locale]}</p>
              </div>
            </div>
          </section>
        )}

        {/* CONCLUSION */}
        {project.conclusion && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Выводы' : 'Conclusion'}</div>
            <p className={styles.blockText}>{project.conclusion[locale]}</p>
          </section>
        )}

        {/* FOOTER BUTTONS */}
        <div className={styles.projectFooter}>
          {project.behanceUrl && (
            <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer" className="btn-cta">
              {t.project.viewBehance}
              <span className="btn-cta-ico-wrap">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          )}
          {nextProduct && nextProduct.slug !== slug && (
            <Link href={`/projects/${nextProduct.slug}`} className="btn-cta">
              {locale === 'ru' ? 'Следующий продукт' : 'Next product'}
              <span className="btn-cta-ico-wrap">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          )}
        </div>
      </div>

      <FinalCta />
      <Footer />
    </main>
  );
}
