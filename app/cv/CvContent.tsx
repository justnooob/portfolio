'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useApp } from '@/components/AppProvider';
import { cvContent, getCvJobs, cvEducation, cvCourses, cvSkills, cvLeadershipSkills } from '@/lib/cv-data';
import styles from './cv.module.css';

function printCv() { window.print(); }

function CvActions() {
  const { locale } = useApp();
  const t = cvContent[locale];
  return <div className={`${styles.actions} ${styles.screenOnly}`} data-cv-actions>
    <button type="button" className={styles.print} onClick={printCv}>{t.print}</button>
    <a href="/Sorokin_CV.pdf" download="Sorokin_CV.pdf" className={styles.download}>{t.download} <span aria-hidden="true">↓</span></a>
  </div>;
}

export default function CvContent() {
  const router = useRouter();
  const { locale } = useApp();
  const t = cvContent[locale];
  const jobs = getCvJobs(locale);
  return <main className={styles.page} data-cv-page>
    <div className={styles.screenOnly}><Nav /></div>
    <div className={styles.shell}>
      <div className={`${styles.toolbar} ${styles.screenOnly}`}>
        <Link href="/" prefetch={false} onMouseEnter={() => router.prefetch('/')} onFocus={() => router.prefetch('/')} className={styles.back}>← {t.back}</Link>
        <CvActions />
      </div>
      <article className={styles.document} aria-labelledby="cv-name">
        <header className={styles.header}>
          <div className={styles.eyebrow}>CV / PRODUCT DESIGN</div>
          <h1 id="cv-name">{t.name}</h1>
          <p className={styles.role}>{t.role}</p>
          <p className={styles.domains}>{t.domains}</p>
          <div className={styles.updated}><time dateTime="2026-10-20">{t.updated}</time><span>{t.pdf}</span></div>
        </header>
        <div className={styles.columns}>
          <aside className={styles.sidebar} aria-label={t.contact}>
            <section>
              <h2>{t.contact}</h2>
              <address className={styles.contacts}>
                <a href="mailto:m.sorokin.v@mail.ru">m.sorokin.v@mail.ru</a>
                <span className={styles.note}>{t.emailNote}</span>
                <a href="tel:+79817400027">+7 (981) 740-00-27</a>
                <a href="https://t.me/sfokin1337" target="_blank" rel="noopener noreferrer">Telegram @sfokin1337 ↗</a>
                <a href="https://set.ki/account/R7oX6sv" target="_blank" rel="noopener noreferrer">{locale === 'ru' ? 'Сетка' : 'Setka'} ↗</a>
                <span>{t.location}</span>
              </address>
            </section>
            <section>
              <h2>{t.portfolio}</h2>
              <div className={styles.contacts}>
                <Link href="/projects/" prefetch={false} onMouseEnter={() => router.prefetch('/projects/')} onFocus={() => router.prefetch('/projects/')}>soromax.ru ↗</Link>
                <a href="https://www.behance.net/maksimsorokin" target="_blank" rel="noopener noreferrer">Behance ↗</a>
              </div>
            </section>
            <section><h2>{t.conditions}</h2><ul className={styles.plainList}>{t.preferences.map(item => <li key={item}>{item}</li>)}</ul><p className={styles.note}>{t.personal}</p></section>
            <section><h2>{t.languages}</h2><ul className={styles.plainList}>{t.languageItems.map(item => <li key={item}>{item}</li>)}</ul></section>
            <nav className={`${styles.sectionNav} ${styles.screenOnly}`} aria-label={t.navigation}>
              <a href="#cv-experience">{t.experience}</a><a href="#cv-education">{t.education}</a><a href="#cv-skills">{t.skills}</a>
            </nav>
          </aside>
          <div className={styles.content}>
            <section className={styles.section}><h2>{t.about}</h2><p className={styles.summary}>{t.summary}</p></section>
            <section className={styles.section} id="cv-experience">
              <div className={styles.sectionHead}><h2>{t.experience}</h2><span>{t.total}</span></div>
              <p className={styles.note}>{t.overlap}</p>
              <div className={styles.timeline}>{jobs.map(job => <section className={styles.job} key={job.id} aria-labelledby={`cv-job-${job.id}`}>
                <p className={styles.period}>{job.period}</p>
                <h3 id={`cv-job-${job.id}`}>{job.company}</h3>
                <p className={styles.jobRole}>{job.role}</p>
                {job.website && <a className={styles.website} href={`https://${job.website}`} target="_blank" rel="noopener noreferrer">{job.website} ↗</a>}
                <p className={styles.jobSummary}>{job.summary}</p>
                <ul className={styles.achievements}>{job.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
              </section>)}</div>
            </section>
            <section className={styles.section} id="cv-education"><h2>{t.education}</h2>
              {cvEducation.map(item => <div key={item.year} className={styles.education}><span className={styles.year}>{item.year}</span><div><p className={styles.degree}>{item.degree[locale]}</p><h3>{item.school[locale]}</h3><p>{item.detail[locale]}</p></div></div>)}
            </section>
            <section className={styles.section}><h2>{t.courses}</h2>
              {cvCourses.map(item => <div key={item.school.en} className={styles.education}><span className={styles.year}>{item.year}</span><div><h3>{item.school[locale]}</h3><p>{item.detail[locale]}</p></div></div>)}
            </section>
            <section className={styles.section} id="cv-skills"><h2>{t.skills}</h2><ul className={styles.skills}>{[...cvSkills, ...cvLeadershipSkills[locale]].map(skill => <li key={skill}>{skill}</li>)}</ul></section>
          </div>
        </div>
        <div className={`${styles.bottomActions} ${styles.screenOnly}`}><CvActions /></div>
      </article>
    </div>
    <div className={styles.screenOnly}><Footer /></div>
  </main>;
}
