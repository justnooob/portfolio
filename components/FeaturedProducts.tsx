'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useApp } from './AppProvider';
import { useReveal, useCardReveal } from '@/lib/useReveal';
import { projects } from '@/lib/data';
import { MediaProvider, MediaSingle, useMedia, type MediaItem } from './MediaViewer';
import styles from './FeaturedProducts.module.css';

/* ── Case card ─────────────────────────────────────────── */
function CaseCard({
  c,
  product,
  wide,
  sidecar,
}: {
  c: NonNullable<typeof projects[0]['cases']>[0];
  product: typeof projects[0];
  wide: boolean;
  sidecar?: boolean;
}) {
  const { locale, theme } = useApp();
  // GSAP card-reveal (всплытие + clip + parallax картинки) — единый с карточками /projects
  const { cardRef, imgRef } = useCardReveal<HTMLDivElement, HTMLImageElement>();
  const desc = c.cardDesc?.[locale] ?? c.context?.[locale] ?? c.problem?.[locale] ?? '';

  // Light/dark variants: thumb-dark.jpg / thumb-light.jpg; fallback to hero.jpg
  const thumbDark = `/projects/${product.slug}/${c.slug}/thumb-dark.jpg`;
  const thumbLight = `/projects/${product.slug}/${c.slug}/thumb-light.jpg`;
  const thumbFallback = `/projects/${product.slug}/${c.slug}/hero.jpg`;
  const [darkFail, setDarkFail] = useState(false);
  const [lightFail, setLightFail] = useState(false);
  const [allFail, setAllFail] = useState(false);

  const thumb = theme === 'dark'
    ? (darkFail ? thumbFallback : thumbDark)
    : (lightFail ? thumbFallback : thumbLight);

  return (
    <div
      ref={cardRef}
      className={`${styles.caseCardWrap} ${wide ? styles.caseCardWide : ''} ${sidecar ? styles.caseCardSidecar : ''}`}
    >
      <Link
        href={`/projects/${product.slug}/${c.slug}`}
        className={styles.caseCard}
      >
        <div className={styles.caseCardInner}>
        <div className={styles.caseCardText}>
          {product.productTags && (
            <div className={styles.caseTags}>
              {product.productTags.join(' · ')}
            </div>
          )}
          <div className={styles.caseName}>{c.name[locale]}</div>
          {desc && <p className={styles.caseDesc}>{desc}</p>}
        </div>
        <div className={styles.caseImg}>
          {allFail ? (
            <span className={styles.caseImgLabel}>{c.name[locale]}</span>
          ) : (
            <picture>
              {sidecar && product.sidecarPcThumb && (
                <source
                  media="(min-width: 1025px)"
                  srcSet={theme === 'dark' ? product.sidecarPcThumb.dark : product.sidecarPcThumb.light}
                />
              )}
              <img
                ref={imgRef}
                src={thumb}
                alt={c.name[locale]}
                className={styles.caseImgPhoto}
                loading="lazy"
                onError={() => {
                  if (theme === 'dark') {
                    setDarkFail(true);
                    if (lightFail) setAllFail(true);
                  } else {
                    setLightFail(true);
                    if (darkFail) setAllFail(true);
                  }
                }}
              />
            </picture>
          )}
        </div>
      </div>
      </Link>
    </div>
  );
}

/* ── Cases grid ────────────────────────────────────────── */
function CasesGrid({ product }: { product: typeof projects[0] }) {
  const cases = product.cases ?? [];

  return (
    <div className={styles.casesGrid}>
      {cases.map((c, i) => {
        const wide = cases.length === 5 && i === 0;
        const sidecar = cases.length === 5 && i === 1;
        return <CaseCard key={c.slug} c={c} product={product} wide={wide} sidecar={sidecar} />;
      })}
    </div>
  );
}

/* ── Process tab inner (needs MediaProvider context) ───── */
function ProcessTabInner({
  product,
  imgs,
  imgIdx,
  setImgIdx,
}: {
  product: typeof projects[0];
  imgs: string[];
  imgIdx: number;
  setImgIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { locale } = useApp();
  const { open } = useMedia();
  const hasImgs = imgs.length > 0;

  return (
    <div className={styles.processLayout}>
      {/* Left: main text */}
      <div className={styles.processMain}>
        {product.overview && (
          <p className={styles.processOverview}>{product.overview[locale]}</p>
        )}
        {product.process && (
          <div className={styles.processSection}>
            <h3 className={styles.processSectionTitle}>
              {locale === 'ru' ? 'Что я делал' : 'What I did'}
            </h3>
            <p className={styles.processSectionText}>{product.process[locale]}</p>
          </div>
        )}
        {product.conclusion && (
          <div className={styles.processSection}>
            <h3 className={styles.processSectionTitle}>
              {locale === 'ru' ? 'Итог' : 'Result'}
            </h3>
            <p className={styles.processSectionText}>{product.conclusion[locale]}</p>
          </div>
        )}
      </div>

      {/* Right: sidebar */}
      <div className={styles.processSidebar}>
        {product.keyFeatures && (
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarCardTitle}>
              {locale === 'ru' ? 'Ключевые функции' : 'Key features'}
            </div>
            <ul className={styles.sidebarList}>
              {product.keyFeatures[locale].map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
        {hasImgs && (
          <div className={styles.sidebarImgBlock}>
            <div
              className={styles.sidebarImgWrap}
            >
              {/* Unified MediaSingle opens the shared fullscreen lightbox */}
              <div className={styles.sidebarImgMediaWrap}>
                <MediaSingle index={imgIdx} />
              </div>

              {/* Arrows — navigate without opening fullscreen */}
              {imgs.length > 1 && (
                <>
                  <button
                    className={`${styles.imgArrow} ${styles.imgArrowLeft}`}
                    aria-label="Previous"
                    onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i - 1 + imgs.length) % imgs.length); }}
                  >
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                      <path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    className={`${styles.imgArrow} ${styles.imgArrowRight}`}
                    aria-label="Next"
                    onClick={(e) => { e.stopPropagation(); setImgIdx(i => (i + 1) % imgs.length); }}
                  >
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                      <path d="M8 4l7 7-7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </>
              )}
            </div>
            {imgs.length > 1 && (
              <div className={styles.sidebarImgNav}>
                <span className={styles.sidebarNavDots}>
                  {imgs.map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.sidebarNavDot} ${i === imgIdx ? styles.sidebarNavDotActive : ''}`}
                      onClick={() => setImgIdx(i)}
                    />
                  ))}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Process tab (wraps with MediaProvider) ────────────── */
function ProcessTab({ product }: { product: typeof projects[0] }) {
  const { locale } = useApp();
  const [imgIdx, setImgIdx] = useState(0);

  const imgs =
    product.coverImages ??
    (product.screens && product.screens.length > 0
      ? (product.screens.map((s) => s.image).filter(Boolean) as string[])
      : product.coverImage
      ? [product.coverImage]
      : []);

  const mediaItems: MediaItem[] = imgs.map((src) => ({
    kind: 'single' as const,
    color: product.color,
    src,
    label: product.name[locale],
  }));

  return (
    <MediaProvider items={mediaItems}>
      <ProcessTabInner
        product={product}
        imgs={imgs}
        imgIdx={imgIdx}
        setImgIdx={setImgIdx}
      />
    </MediaProvider>
  );
}

/* ── Product block ─────────────────────────────────────── */
function ProductBlock({ product }: { product: typeof projects[0] }) {
  const { locale } = useApp();
  const [activeTab, setActiveTab] = useState<'cases' | 'process'>('cases');
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();
  const { ref: contentRef, visible: contentVisible } = useReveal<HTMLDivElement>();
  const productRef = useRef<HTMLDivElement>(null);

  const switchTab = (tab: 'cases' | 'process') => {
    setActiveTab(tab);
    const el = productRef.current;
    if (!el) return;
    const lenis = (window as unknown as {
      lenis?: { scrollTo: (t: Element, o?: { offset?: number }) => void };
    }).lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(el, { offset: -70 });
    } else {
      const y = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.product} id={product.slug} ref={productRef}>
      <div className={styles.stickyHead}>
        <div
          ref={headRef}
          className={`${styles.productHeader} reveal-slide-left ${headVisible ? 'visible' : ''}`}
        >
          <h2 className={styles.productTitle}>
            {product.name[locale]}
            <span className={styles.productTitleYear}>{product.year}</span>
          </h2>
          <div className={styles.productSubtitle}>
            <span>{locale === 'ru' ? 'Должность' : 'Role'}: {product.role[locale]}</span>
            <span className={styles.subtitleDot}>·</span>
            <span>{product.duration[locale]}</span>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'cases' ? styles.tabActive : ''}`}
            onClick={() => switchTab('cases')}
          >
            {locale === 'ru' ? 'Кейсы' : 'Cases'}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'process' ? styles.tabActive : ''}`}
            onClick={() => switchTab('process')}
          >
            {locale === 'ru' ? 'Процессы' : 'Process'}
          </button>
        </div>
      </div>

      {product.shortDesc && (
        <p className={styles.productDesc}>{product.shortDesc[locale]}</p>
      )}

      <div
        ref={contentRef}
        className={`${styles.productContent} ${contentVisible ? styles.productContentVisible : ''}`}
      >
        {activeTab === 'cases' ? (
          <CasesGrid product={product} />
        ) : (
          <ProcessTab product={product} />
        )}
      </div>
    </div>
  );
}

/* ── Section ───────────────────────────────────────────── */
export default function FeaturedProducts({ hideBanner }: { hideBanner?: boolean } = {}) {
  const { locale, theme } = useApp();
  const productProjects = projects.filter((p) => p.isProduct);
  const { ref: titleRef, visible: titleVisible } = useReveal<HTMLDivElement>();
  const { ref: bannerRef, visible: bannerVisible } = useReveal<HTMLAnchorElement>();

  return (
    <section className={styles.section} id="projects">
      <div
        ref={titleRef}
        className={`${styles.sectionHead} reveal-slide-left ${titleVisible ? 'visible' : ''}`}
      >
        <div className={styles.sectionTitle}>
          {locale === 'ru' ? 'Последние проекты' : 'Recent Projects'}
        </div>
      </div>

      <div className={styles.products}>
        {productProjects.map((p) => (
          <ProductBlock key={p.slug} product={p} />
        ))}
      </div>

      {!hideBanner && (
        <Link href="/projects" ref={bannerRef} className={`${styles.banner} reveal-scale ${bannerVisible ? 'visible' : ''}`}>
          <div className={styles.bannerInner}>
            <div className={styles.bannerText}>
              <span className={styles.bannerTitle}>
                {locale === 'ru' ? 'Все кейсы' : 'All Cases'}
              </span>
              <span className={styles.bannerSub}>
                {locale === 'ru' ? 'SaaS, Mobile, Web - полный архив работ' : 'SaaS, Mobile, Web - full work archive'}
              </span>
            </div>
            <span className={styles.bannerBtn}>
              {locale === 'ru' ? 'Смотреть все →' : 'View all →'}
            </span>
          </div>
          {/* Decorative right-side background image with gradient fade */}
          <div className={styles.bannerBg} aria-hidden="true">
            <img
              src={theme === 'dark' ? '/projects/banner-bg-dark.jpg' : '/projects/banner-bg-light.jpg'}
              alt=""
              className={styles.bannerBgImg}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          </div>
        </Link>
      )}
    </section>
  );
}
