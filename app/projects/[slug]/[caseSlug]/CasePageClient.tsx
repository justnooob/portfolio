'use client';

import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import { useContentReveal } from '@/lib/useReveal';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FinalCta from '@/components/FinalCta';
import { translations, projects } from '@/lib/data';
import SplitHeading from '@/components/SplitHeading';
import Magnetic from '@/components/Magnetic';
import styles from '../project.module.css';
import cStyles from './case.module.css';
import { CaseMediaProvider, MediaSingle, MediaCompare, type MediaItem } from './CaseMedia';

interface Props {
  productSlug: string;
  caseSlug: string;
}

function buildCaseSequence() {
  const productProjects = projects.filter((p) => p.isProduct);
  const seq: { productSlug: string; caseSlug: string }[] = [];
  for (const p of productProjects) {
    for (const c of p.cases ?? []) {
      seq.push({ productSlug: p.slug, caseSlug: c.slug });
    }
  }
  return seq;
}

function getNextCaseLink(productSlug: string, caseSlug: string): string {
  const seq = buildCaseSequence();
  const idx = seq.findIndex((s) => s.productSlug === productSlug && s.caseSlug === caseSlug);
  if (idx === -1) return '/projects';
  if (idx === seq.length - 1) return '/projects/volcanoes';
  const next = seq[idx + 1];
  return `/projects/${next.productSlug}/${next.caseSlug}`;
}

export default function CasePageClient({ productSlug, caseSlug }: Props) {
  const { locale } = useApp();
  const t = translations[locale];
  const contentRef = useContentReveal<HTMLDivElement>();

  const product = projects.find((p) => p.slug === productSlug);
  const cases = product?.cases ?? [];
  const caseStudy = cases.find((c) => c.slug === caseSlug);
  const caseIndex = cases.findIndex((c) => c.slug === caseSlug);
  const otherCases = cases.filter((c) => c.slug !== caseSlug);
  const nextCaseLink = getNextCaseLink(productSlug, caseSlug);

  if (!product || !caseStudy) {
    return (
      <main>
        <Nav />
        <div className={styles.notFound}>
          <h1>404</h1>
          <p>Case not found</p>
          <Link href={`/projects/${productSlug}`} className="btn-cta">
            {locale === 'ru' ? 'Назад к продукту' : 'Back to product'}
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

  const isFeatured = caseStudy.featured === true;

  // ── Build ordered media list (matches on-page order for lightbox navigation) ──
  const beforeLabel = caseStudy.compareBeforeLabel
    ? caseStudy.compareBeforeLabel[locale]
    : locale === 'ru' ? 'Первая итерация' : 'First iteration';
  const afterLabel = locale === 'ru' ? 'Финальная версия' : 'Final version';

  // Базовый путь к картинкам кейса: /public/projects/<product>/<case>/...
  const base = `/projects/${productSlug}/${caseSlug}`;

  // Баннер (hero) — отдельный одиночный просмотр, НЕ входит в общую галерею:
  // при листании экранов/решений он не попадается, и из него нельзя листать дальше.
  const heroItem: MediaItem = {
    kind: 'single',
    color: product.color,
    label: locale === 'ru' ? 'Изображение кейса' : 'Case image',
    src: `${base}/hero.jpg`,
  };

  const media: MediaItem[] = [];

  // Цвет кнопки-ползунка сравнения (фон/иконка) — индивидуально по продукту
  const sliderHandle: Record<string, { bg: string; icon: string }> = {
    'okk-pro': { bg: '#6588F4', icon: '#ffffff' },
    smetter: { bg: '#7796FF', icon: '#ffffff' },
    hobbist: { bg: '#CCFF00', icon: '#000000' },
  };
  const handle = sliderHandle[productSlug];

  const decisionIdx: number[] = (isFeatured ? caseStudy.keyDecisions ?? [] : []).map((_, n) => {
    const i = media.length;
    media.push({
      kind: 'compare',
      color: product.color,
      beforeLabel,
      afterLabel,
      beforeSrc: `${base}/decision-${n + 1}-before.jpg`,
      afterSrc: `${base}/decision-${n + 1}-after.jpg`,
      handleColor: handle?.bg,
      handleIconColor: handle?.icon,
    });
    return i;
  });

  const galleryCount = caseStudy.galleryCount ?? 3;
  const galleryIdx = Array.from({ length: galleryCount }, (_, n) => {
    const i = media.length;
    media.push({
      kind: 'single',
      color: product.color,
      label: locale === 'ru' ? `Экран ${n + 1}` : `Screen ${n + 1}`,
      src: `${base}/screen-${n + 1}.jpg`,
    });
    return i;
  });

  return (
    <CaseMediaProvider items={media}>
    <main>
      <Nav />

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <Link href={`/projects#${productSlug}`} scroll={false} className={styles.back}>
            ← {locale === 'ru' ? 'Назад к проектам' : 'Back to projects'}
          </Link>
          <div className={styles.heroTop} style={{ marginTop: 40 }}>
            <div className={styles.tags}>
              {(product.productTags && product.productTags.length > 0
                ? product.productTags
                : [product.name[locale]]
              ).map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.year}>{product.year}</div>
          </div>
          <SplitHeading as="h1" className={styles.title} text={caseStudy.name[locale]} type="lines" delay={0.15} stagger={0.1} />
          <p className={styles.subtitle}>{product.shortDesc[locale]}</p>
        </div>
      </div>

      {/* META */}
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <div className={styles.metaLbl}>{locale === 'ru' ? 'Продукт' : 'Product'}</div>
          <div className={styles.metaVal}>{product.name[locale]}</div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLbl}>{t.project.role}</div>
          <div className={styles.metaVal}>{product.role[locale]}</div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLbl}>{t.project.duration}</div>
          <div className={styles.metaVal}>{product.duration[locale]}</div>
        </div>
      </div>

      {/* CONTENT */}
      <div className={styles.content} ref={contentRef}>

        {/* HERO IMAGE — отдельный провайдер: открывается, но не листается в общей галерее */}
        <div className={cStyles.heroImage}>
          <CaseMediaProvider items={[heroItem]}>
            <MediaSingle index={0} />
          </CaseMediaProvider>
        </div>

        {/* CONTEXT */}
        {caseStudy.context && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Контекст' : 'Context'}</div>
            <p className={styles.blockText}>{caseStudy.context[locale]}</p>
          </section>
        )}

        {isFeatured ? (
          <>
            {/* USERS */}
            {caseStudy.users && (
              <section className={styles.block}>
                <div className={styles.blockLbl}>{locale === 'ru' ? 'Пользователи' : 'Users'}</div>
                <p className={styles.blockText}>{caseStudy.users[locale]}</p>
              </section>
            )}

            {/* PROBLEM */}
            {caseStudy.problem && (
              <section className={styles.block}>
                <div className={styles.blockLbl}>{locale === 'ru' ? 'Проблема' : 'Problem'}</div>
                <p className={styles.blockText}>{caseStudy.problem[locale]}</p>
              </section>
            )}

            {/* CONSTRAINTS */}
            {caseStudy.constraints && caseStudy.constraints[locale].length > 0 && (
              <section className={styles.block}>
                <div className={styles.blockLbl}>{locale === 'ru' ? 'Ограничения' : 'Constraints'}</div>
                <ul className={styles.resultsList}>
                  {caseStudy.constraints[locale].map((c, i) => (
                    <li key={i} className={styles.result}>{c}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* KEY DECISIONS */}
            {caseStudy.keyDecisions && caseStudy.keyDecisions.length > 0 && (
              <section className={styles.block}>
                <div className={styles.blockLbl}>{locale === 'ru' ? 'Ключевые решения' : 'Key decisions'}</div>
                <div className={cStyles.decisions}>
                  {caseStudy.keyDecisions.map((d, i) => (
                    <div key={i} className={cStyles.decision}>
                      <div className={cStyles.decisionNum}>{String(i + 1).padStart(2, '0')}</div>
                      <div className={cStyles.decisionContent}>
                        <div className={cStyles.decisionRow}>
                          <span className={cStyles.decisionRoleLbl}>{locale === 'ru' ? 'Проблема' : 'Problem'}</span>
                          <p className={cStyles.decisionRoleText}>{d.problem[locale]}</p>
                        </div>
                        <div className={cStyles.decisionRow}>
                          <span className={cStyles.decisionRoleLbl}>{locale === 'ru' ? 'Решение' : 'Solution'}</span>
                          <p className={cStyles.decisionRoleText}>{d.solution[locale]}</p>
                        </div>
                        <div className={cStyles.decisionRow}>
                          <span className={cStyles.decisionRoleLbl}>{locale === 'ru' ? 'Почему именно так' : 'Why this way'}</span>
                          <p className={cStyles.decisionRoleText}>{d.why[locale]}</p>
                        </div>
                        <div className={cStyles.decisionRow}>
                          <span className={cStyles.decisionRoleLbl}>{locale === 'ru' ? 'Результат' : 'Result'}</span>
                          <p className={cStyles.decisionRoleText}>{d.result[locale]}</p>
                        </div>
                      </div>
                      {/* DECISION — before / after comparison */}
                      <div className={cStyles.decisionImage} style={{ opacity: 1 }}>
                        <MediaCompare index={decisionIdx[i]} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* BEFORE / AFTER */}
            {caseStudy.beforeAfter && (
              <section className={styles.block}>
                <div className={styles.blockLbl}>{locale === 'ru' ? 'Что изменилось после внедрения' : 'What changed after implementation'}</div>
                <div className={cStyles.beforeAfter}>
                  <div className={cStyles.beforeAfterItem}>
                    <div className={cStyles.beforeAfterLabel}>{locale === 'ru' ? 'До' : 'Before'}</div>
                    <p className={cStyles.beforeAfterText}>{caseStudy.beforeAfter.before[locale]}</p>
                  </div>
                  <div className={cStyles.beforeAfterItem}>
                    <div className={cStyles.beforeAfterLabel}>{locale === 'ru' ? 'После' : 'After'}</div>
                    <p className={cStyles.beforeAfterText}>{caseStudy.beforeAfter.after[locale]}</p>
                  </div>
                </div>
              </section>
            )}

            {/* GALLERY */}
            <section className={styles.screensBlock}>
              <div className={styles.blockLbl}>{locale === 'ru' ? 'Галерея экранов' : 'Screen gallery'}</div>
              <div className={`${cStyles.gallery} ${galleryIdx.length === 2 ? cStyles.gallery2 : ''}`}>
                {galleryIdx.map((gi) => (
                  <div key={gi} className={cStyles.galleryItem}>
                    <MediaSingle index={gi} />
                  </div>
                ))}
              </div>
            </section>

            {/* RESULTS */}
            {caseStudy.results && caseStudy.results[locale].length > 0 && (
              <section className={styles.block}>
                <div className={styles.blockLbl}>{t.project.results}</div>
                <ul className={styles.resultsList}>
                  {caseStudy.results[locale].map((r, i) => (
                    <li key={i} className={styles.result}>{r}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* DIFFICULTIES */}
            {caseStudy.difficulties && (
              <section className={styles.block}>
                <div className={styles.blockLbl}>{locale === 'ru' ? 'Сложности' : 'Challenges'}</div>
                <p className={styles.blockText}>{caseStudy.difficulties[locale]}</p>
              </section>
            )}
          </>
        ) : (
          <>
            {/* NON-FEATURED: shorter structure */}
            {caseStudy.task && (
              <section className={styles.block}>
                <div className={styles.blockLbl}>{locale === 'ru' ? 'Задача' : 'Task'}</div>
                <p className={styles.blockText}>{caseStudy.task[locale]}</p>
              </section>
            )}

            {caseStudy.solution && (
              <section className={styles.block}>
                <div className={styles.blockLbl}>{locale === 'ru' ? 'Решение' : 'Solution'}</div>
                <p className={styles.blockText}>{caseStudy.solution[locale]}</p>
              </section>
            )}

            {/* GALLERY */}
            <section className={styles.screensBlock}>
              <div className={styles.blockLbl}>{locale === 'ru' ? 'Галерея экранов' : 'Screen gallery'}</div>
              <div className={`${cStyles.gallery} ${galleryIdx.length === 2 ? cStyles.gallery2 : ''}`}>
                {galleryIdx.map((gi) => (
                  <div key={gi} className={cStyles.galleryItem}>
                    <MediaSingle index={gi} />
                  </div>
                ))}
              </div>
            </section>

            {/* RESULTS */}
            {caseStudy.results && caseStudy.results[locale].length > 0 && (
              <section className={styles.block}>
                <div className={styles.blockLbl}>{t.project.results}</div>
                <ul className={styles.resultsList}>
                  {caseStudy.results[locale].map((r, i) => (
                    <li key={i} className={styles.result}>{r}</li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        {/* CONCLUSION */}
        {caseStudy.conclusion && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>{locale === 'ru' ? 'Выводы' : 'Conclusion'}</div>
            <p className={styles.blockText}>{caseStudy.conclusion[locale]}</p>
          </section>
        )}

        {/* OTHER CASES IN THIS PRODUCT */}
        {otherCases.length > 0 && (
          <section className={styles.block}>
            <div className={styles.blockLbl}>
              {locale === 'ru' ? `Другие кейсы - ${product.name[locale]}` : `Other cases - ${product.name[locale]}`}
            </div>
            <div className={cStyles.otherCases}>
              {otherCases.map((c) => (
                <Link key={c.slug} href={`/projects/${productSlug}/${c.slug}`} className={cStyles.otherCase}>
                  <div className={cStyles.otherCaseName}>{c.name[locale]}</div>
                  <div className={cStyles.otherCaseArrow}>↗</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <div className={styles.projectFooter}>
          <Magnetic>
            <Link href={`/projects#${productSlug}`} scroll={false} className="btn-secondary">
              {locale === 'ru' ? 'Назад к кейсам' : 'Back to cases'}
            </Link>
          </Magnetic>
          {product.behanceUrl && (
            <Magnetic>
              <a href={product.behanceUrl} target="_blank" rel="noopener noreferrer" className="btn-cta btn-behance">
                {t.project.viewBehance}
                <span className="btn-cta-ico-wrap">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </Magnetic>
          )}
          <Magnetic>
            <Link href={nextCaseLink} className="btn-cta btn-cta-next">
              {locale === 'ru' ? 'Следующий кейс' : 'Next case'}
              <span className="btn-cta-ico-wrap">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 7H10.5M10.5 7L7 3.5M10.5 7L7 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>

      <FinalCta />
      <Footer />
    </main>
    </CaseMediaProvider>
  );
}
