export type Locale = 'ru' | 'en';

export const translations = {
  ru: {
    nav: {
      about: 'Обо мне',
      projects: 'Проекты',
      experience: 'Опыт',
    },
    hero: {
      badge: 'Открыт к предложениям · СПб | Удалённо',
      name1: 'Максим',
      name2: 'Сорокин',
      typewriter: ['Продуктовый дизайнер', 'UX/UI дизайнер', 'Дизайнер интерфейсов', 'Более 5 лет опыта'],
      description: 'UX/UI-дизайнер | Продуктовый дизайнер с опытом более 5 лет и техническим бэкграундом (ИТМО). Проектирую от CJM до дизайн-систем. Работаю с метриками, AI и управляю дизайн-процессом.',
      ctaPrimary: 'Связаться со мной',
      ctaSecondary: 'Смотреть проекты',
    },
    logos: {
      label: 'Компании, где я работал',
      workedOn: 'Над чем работал',
    },
    featured: {
      label: 'Новейший проект',
      cta: 'Смотреть кейс',
    },
    categories: {
      saas: { title: 'SaaS-системы', sub: 'Веб-платформы для бизнеса' },
      mobile: { title: 'Мобильные приложения', sub: 'iOS · Android · Telegram MiniApps' },
      web: { title: 'Сайты и лендинги', sub: 'Корпоративные сайты и промо-страницы' },
    },
    experience: {
      title: 'Опыт работы',
      sub: 'Более 5 лет · 5 компаний',
      role: 'Роль',
      metrics: 'Метрики',
      thisSite: 'Этот сайт',
    },
    finalCta: {
      badge: 'Открыт к новым проектам',
      title1: 'Давайте сделаем',
      title2: 'что-то классное',
      title3: 'вместе',
      description: 'Ищу интересные продуктовые задачи и команды, где дизайн действительно меняет метрики. Напишите, буду рад обсудить.',
      telegram: 'Написать в Telegram',
    },
    footer: {
      tagline: 'UX/UI · Продуктовый дизайнер',
      experience: 'Более 5 лет опыта, СПб',
      available: 'Доступен для проектов',
      contact: 'Связь',
      portfolio: 'Портфолио',
      nav: 'Навигация',
      downloadCv: 'Скачать резюме',
      rights: 'Все права защищены.',
    },
    project: {
      back: 'Назад на главную',
      viewBehance: 'Смотреть на Behance',
      overview: 'Обзор',
      role: 'Роль',
      duration: 'Период',
      tools: 'Инструменты',
      challenge: 'Задача',
      solution: 'Решение',
      results: 'Результаты',
      screens: 'Экраны',
    },
  },
  en: {
    nav: {
      about: 'About',
      projects: 'Projects',
      experience: 'Experience',
    },
    hero: {
      badge: 'Open to opportunities · Saint Petersburg | Remote',
      name1: 'Maxim',
      name2: 'Sorokin',
      typewriter: ['Product Designer', 'UX/UI Designer', 'Interface Designer', 'Over 5 years of experience'],
      description: 'UX/UI Designer | Product Designer with over 5 years of experience and technical background (ITMO). I design from CJM to design systems. I work with metrics, AI, and manage the design process.',
      ctaPrimary: 'Get in touch',
      ctaSecondary: 'View projects',
    },
    logos: {
      label: 'Companies I worked with',
      workedOn: 'What I worked on',
    },
    featured: {
      label: 'Latest project',
      cta: 'View case study',
    },
    categories: {
      saas: { title: 'SaaS systems', sub: 'Web platforms for business' },
      mobile: { title: 'Mobile apps', sub: 'iOS · Android · Telegram MiniApps' },
      web: { title: 'Websites & landings', sub: 'Corporate websites and promo pages' },
    },
    experience: {
      title: 'Experience',
      sub: 'Over 5 years · 5 companies',
      role: 'Role',
      metrics: 'Metrics',
      thisSite: 'This site',
    },
    finalCta: {
      badge: 'Open to new projects',
      title1: "Let's create",
      title2: 'something great',
      title3: 'together',
      description: "I'm looking for interesting product challenges and teams where design truly moves metrics. Drop me a line, happy to chat.",
      telegram: 'Message on Telegram',
    },
    footer: {
      tagline: 'UX/UI · Product Designer',
      experience: 'Over 5 years, Saint Petersburg',
      available: 'Available for projects',
      contact: 'Contact',
      portfolio: 'Portfolio',
      nav: 'Navigation',
      downloadCv: 'Download CV',
      rights: 'All rights reserved.',
    },
    project: {
      back: 'Back to home',
      viewBehance: 'View on Behance',
      overview: 'Overview',
      role: 'Role',
      duration: 'Duration',
      tools: 'Tools',
      challenge: 'Challenge',
      solution: 'Solution',
      results: 'Results',
      screens: 'Screens',
    },
  },
};

export type ProjectCategory = 'saas' | 'mobile' | 'web';

export interface Project {
  slug: string;
  category: ProjectCategory;
  featured?: boolean;
  isThisSite?: boolean;
  color: string;
  coverImage?: string;
  coverImageLight?: string;
  lightText?: boolean;
  cover?: string;
  screenshots?: string[];
  logo: string;
  logoColor: string;
  behanceUrl?: string;
  year: string;
  company?: { ru: string; en: string };
  name: { ru: string; en: string };
  shortDesc: { ru: string; en: string };
  tags: { ru: string[]; en: string[] };
  metrics?: { value: string; label: { ru: string; en: string } }[];
  overview?: { ru: string; en: string };
  role: { ru: string; en: string };
  duration: { ru: string; en: string };
  tools: string[];
  challenge?: { ru: string; en: string };
  solution?: { ru: string; en: string };
  results: { ru: string[]; en: string[] };
  context?: { ru: string; en: string };
  problem?: { ru: string; en: string };
  goals?: { ru: string[]; en: string[] };
  process?: { ru: string; en: string };
  keyFeatures?: { ru: string[]; en: string[] };
  uiDirection?: { ru: string; en: string };
  conclusion?: { ru: string; en: string };
  screens?: {
    title: { ru: string; en: string };
    desc?: { ru: string; en: string };
    image?: string;
  }[];
}

export const projects: Project[] = [
  // FEATURED
  {
    slug: 'iywi',
    category: 'saas',
    featured: true,
    color: 'linear-gradient(135deg, #1a2b4a 0%, #2a1f3f 50%, #0a1a2a 100%)',
    coverImage: '/projects/iywi.png',
    logo: 'IY',
    logoColor: '#4fa3ff',
    behanceUrl: 'https://www.behance.net/gallery/247519813/IYWI-B2B-Medical-SaaS-UXUI-Design',
    year: '2025 — 2026',
    company: { ru: 'УК Медицина', en: 'UK Medicina' },
    name: { ru: 'IYWI', en: 'IYWI' },
    shortDesc: {
      ru: 'AI-продукт для анализа качества консультаций в стоматологических клиниках. Полный продуктовый дизайн с нуля: веб, iOS, Android, дизайн-система, лендинги.',
      en: 'AI-powered product for analyzing consultation quality in dental clinics. Full product design from scratch: web, iOS, Android, design system, landings.',
    },
    tags: {
      ru: ['AI SaaS', 'Design System', 'Web + Mobile'],
      en: ['AI SaaS', 'Design System', 'Web + Mobile'],
    },
    metrics: [
      { value: '+80%', label: { ru: 'рост лидов', en: 'leads growth' } },
      { value: '−35%', label: { ru: 'время на экраны', en: 'screen time' } },
      { value: '+15%', label: { ru: 'удержание', en: 'retention' } },
      { value: '−60%', label: { ru: 'баги на проде', en: 'production bugs' } },
    ],
    overview: {
      ru: 'AI-решение для стоматологических клиник, анализирующее качество консультаций врачей с пациентами. Продукт объединяет несколько сложных пользовательских ролей: администраторов клиник, врачей, менеджеров качества и руководителей.',
      en: 'AI solution for dental clinics analyzing consultation quality between doctors and patients. The product serves multiple complex user roles: clinic administrators, doctors, quality managers, and executives.',
    },
    role: { ru: 'Ведущий продуктовый дизайнер', en: 'Lead Product Designer' },
    duration: { ru: '8 месяцев (сент 2025 — апр 2026)', en: '8 months (Sep 2025 — Apr 2026)' },
    tools: ['Figma', 'Principle', 'Tilda Zero Block', 'ChatGPT', 'After Effects'],
    challenge: {
      ru: 'Создать с нуля продуктовый дизайн сложного B2B-продукта с AI-логикой, дизайн-систему для команды 6+ разработчиков и обеспечить быстрый рост лидов через лендинги.',
      en: 'Build product design for a complex B2B AI product from scratch, create a design system for a team of 6+ developers, and drive rapid lead growth through landing pages.',
    },
    solution: {
      ru: 'Разработал полноценную дизайн-систему, которая сократила время создания новых экранов на 35%. Провёл 8 A/B-тестов интерфейса. Создал 5 продающих лендингов на Tilda с AI-генерированным кодом. Адаптировал веб-версию под iOS и Android.',
      en: 'Developed a comprehensive design system that reduced new screen creation time by 35%. Conducted 8 A/B tests. Built 5 sales landings on Tilda with AI-generated code. Adapted the web version for iOS and Android.',
    },
    results: {
      ru: [
        'Дизайн-система с нуля, которая используется всей продуктовой командой (6+ разработчиков)',
        'Время на создание новых экранов сокращено на 35%',
        'Охват мобильных пользователей вырос до 40% от всей аудитории',
        '5 лендингов на Tilda повысившее количество лидов на 80%',
        '8 A/B-тестов. Удержание пользователей +15%',
        'Количество багов на проде сократилось на 60%',
        'Соблюдение дедлайнов в команде 6+ разработчиков 95%',
      ],
      en: [
        'Design system from scratch used by entire product team (6+ developers)',
        'New screen creation time reduced by 35%',
        'Mobile user coverage grew to 40% of total audience',
        '5 landing pages on Tilda. Дeads grew by 80%',
        '8 A/B tests. User retention +15%',
        'Production bugs reduced by 60%',
        'Deadline compliance in team of 6+ developers 95%',
      ],
    },
    context: {
      ru: 'IYWI (Improve Yourself With Intellect) это AI-платформа для стоматологических клиник, которая анализирует качество консультаций врачей с пациентами в реальном времени. Это сложный B2B-продукт, требующий интеграции с разными системами и ролями пользователей.',
      en: 'IYWI (Improve Yourself With Intellect) is an AI platform for dental clinics that analyzes consultation quality between doctors and patients in real-time. It\'s a complex B2B product requiring integration with different systems and user roles.',
    },
    problem: {
      ru: '(1) медицинский B2B AI-продукт требует высокой точности UX, (2) система должна работать для 4+ ролей пользователей одновременно, (3) нужно обеспечить масштабирование для сетевых клиник, (4) время на выход на рынок критично и нужны быстрые лидогенерирующие лендинги.',
      en: '(1) a medical B2B AI product demands high UX precision, (2) the system must serve 4+ user roles simultaneously, (3) scalability needed for big medical companies, (4) market time is critical and fast lead-generating landings were needed.',
    },
    goals: {
      ru: [
        'Создать полный продуктовый дизайн сложного AI-SaaS с нуля',
        'Разработать дизайн-систему для масштабирования команды',
        'Упростить UX для разных ролей пользователей (врачи, админы, менеджеры)',
        'Создать 5+ лендингов для роста лидов',
        'Адаптировать платформу под веб, iOS и Android',
      ],
      en: [
        'Create full product design for complex AI-SaaS from scratch',
        'Develop design system for team scalability',
        'Simplify UX for different user roles (doctors, admins, managers)',
        'Build 5+ landing pages for lead growth',
        'Adapt platform for web, iOS, and Android',
      ],
    },
    process: {
      ru: 'Начал с погружения в медицинский контекст и интервью с врачами. Построил карту сложных user flows для каждой роли. Создал дизайн-систему с компонентами для быстрого масштабирования. Провёл 8 A/B-тестов интерфейса на основе пользовательского поведения. Подготовил множество концепций экранов для всех возможных ролей. Спроектировал 5 лендингов на Tilda с AI-генерированным контентом. Адаптировал веб-версию под мобильные платформы.',
      en: 'Started by diving into medical context and interviewing doctors. Built complex user flow maps for each role. Created design system with components for rapid scaling. Conducted 8 UI A/B tests based on user behavior. Created multiple variants of screens for all roles. Designed 5 landing pages on Tilda with AI-generated content. Adapted web version for mobile platforms.',
    },
    keyFeatures: {
      ru: [
        'AI-анализ качества консультаций',
        'Мультиролевая система (врачи, админы, менеджеры)',
		'Встроенные курсы и голосовые тренажеры',
        'Веб + iOS + Android',
        'Единая дизайн-система из 50+ компонентов',
        '5 продающих лендингов',
        'A/B тестирование интерфейсов',
      ],
      en: [
        'AI consultation quality analysis',
        'Multi-role system (doctors, admins, managers)',
		'Built-in courses and voice trainers',
        'Web + iOS + Android',
        'Unified design system with 50+ components',
        '5 sales landing pages',
        'Interface A/B testing',
      ],
    },
    uiDirection: {
      ru: 'B2B SaaS с высокой плотностью информации, строгой иерархией и системным подходом к масштабируемости. UI фокусируется на скорости восприятия данных и надёжности на фоне сложного медицинского контекста.',
      en: 'B2B SaaS with high information density, strict hierarchy, and systematic approach to scalability. UI focuses on data perception speed and reliability against complex medical context.',
    },
    screens: [
      { title: { ru: 'Manager Dashboard', en: 'Manager Dashboard' }, image: '/projects/iywi/1.jpg' },
      { title: { ru: 'Head Analytics', en: 'Head Analytics' }, image: '/projects/iywi/2.jpg' },
      { title: { ru: 'Consultation Analytics', en: 'Consultation Analytics' }, image: '/projects/iywi/3.jpg' },
      { title: { ru: 'Voice Training', en: 'Voice Training' }, image: '/projects/iywi/4.jpg' },
      { title: { ru: 'Mobile App', en: 'Mobile App' }, image: '/projects/iywi/5.jpg' },
    ],
    conclusion: {
      ru: 'Главный инсайт проекта: дизайн-система важнее отдельных экранов. Когда команда работает быстро и в срок, это не потому что хороший дизайн, а потому что система позволяет строить быстро и предсказуемо. Рост лидов на 80% пришёл не из красивых интерфейсов, а из правильно выстроенного юзер-флоу и скоростных лендингов. Этот проект доказывает, что продуктовый дизайнер это не дизайнер интерфейсов, а архитектор решений.',
      en: 'Key insight: design systems matter more than individual screens. When teams work fast and meet deadlines, it\'s not because of beautiful design, but because the system allows rapid and predictable building. 80% lead growth came from well-structured user flows and fast landing pages, not from gorgeous interfaces. This project proves that product designers aren\'t UI designers they\'re solution architects.',
    },
  },

  // SAAS
  {
    slug: 'buildit',
    category: 'saas',
    color: 'linear-gradient(135deg, #1e40af 0%, #0ea5e9 50%, #38bdf8 100%)',
    coverImage: '/projects/buildit-dark.jpg',
    coverImageLight: '/projects/buildit-light.jpg',
    logo: 'BI',
    logoColor: '#1a5f4a',
    behanceUrl: 'https://www.behance.net/gallery/232621029/BuildIT-SAAS-System-UXUI-Design',
    year: '2024',
    company: { ru: 'Сметтер', en: 'Smetter' },
    name: { ru: 'BuildIT', en: 'BuildIT' },
    shortDesc: {
      ru: 'SaaS-платформа для автоматизации строительного бизнеса. 3 новых модуля с нуля, редизайн дэшборда.',
      en: 'SaaS platform for construction business automation. 3 new modules from scratch, dashboard redesign.',
    },
    tags: { ru: ['SaaS', 'Веб + Мобайл', 'Дизайн-система'], en: ['SaaS', 'Web + Mobile', 'Design System'] },
    metrics: [
      { value: '35→62', label: { ru: 'NPS', en: 'NPS' } },
      { value: '−50%', label: { ru: 'время смет', en: 'estimates time' } },
      { value: '100%', label: { ru: 'приёмка', en: 'acceptance' } },
    ],
    overview: {
      ru: 'SaaS-платформа Smetter.ru для автоматизации строительного бизнеса. Веб + iOS/Android.',
      en: 'Smetter.ru SaaS platform for construction business automation. WEB + iOS/Android.',
    },
    role: { ru: 'Ведущий UX/UI дизайнер', en: 'Lead UX/UI Designer' },
    duration: { ru: '4 месяца (июн — сент 2024)', en: '4 months (Jun — Sep 2024)' },
    tools: ['Figma', 'Яндекс.Метрика', 'Material Design', 'HIG'],
    challenge: {
      ru: 'Спроектировать 3 новых модуля платформы и провести редизайн существующих, основываясь на метриках и опыте пользователей.',
      en: 'Design 3 new platform modules and redesign existing ones based on metrics and user experience.',
    },
    solution: {
      ru: 'Спроектировал модули обмеров, доски задач и закупок с нуля. Провёл редизайн дэшборда и финансов на основе Яндекс.Метрики. Поддерживал единую дизайн-систему под десктоп и мобайл.',
      en: 'Designed measurement, task board, and procurement modules from scratch. Redesigned dashboard and finance modules based on Yandex.Metrica. Maintained a unified design system for desktop and mobile.',
    },
    results: {
      ru: [
        '3 новых модуля с нуля. Время на подготовку смет сократилось на 50%',
        'NPS вырос с 35 до 62',
        'Ускорил передачу макетов в разработку на 25%',
        '100% соответствие макетов при приёмке',
      ],
      en: [
        '3 new modules from scratch. Estimate preparation time reduced by 50%',
        'NPS grew from 35 to 62',
        'Handoff to development accelerated by 25%',
        '100% mockup compliance at acceptance',
      ],
    },
    context: {
      ru: 'BuildIT это SaaS-платформа для управления строительными проектами: сметы, задачи, закупки, финансы. Требовалось расширить функциональность и улучшить UX.',
      en: 'BuildIT is a SaaS platform for construction project management: estimates, tasks, procurement, finances. The task was to expand functionality and improve UX.',
    },
    problem: {
      ru: '(1) Пользователи жаловались на сложность интерфейса, (2) Низкая скорость создания смет, (3) Не хватало прозрачности в задачах и закупках.',
      en: '(1) Users complained about interface complexity, (2) Low speed of creating estimates, (3) Lack of transparency in tasks and procurement.',
    },
    goals: {
      ru: [
        'Спроектировать модули обмеров, задач и закупок',
        'Переработать дашборд и финансы',
        'Повысить NPS до 60+',
        'Снизить время на создание смет',
        'Ускорить передачу в разработку',
      ],
      en: [
        'Design measurement, task, and procurement modules',
        'Redesign dashboard and finance',
        'Increase NPS to 60+',
        'Reduce estimate creation time',
        'Accelerate handoff to development',
      ],
    },
    process: {
      ru: 'Проанализировал данные Яндекс.Метрики и поддержки, провёл глубинные интервью с 10 клиентами, создал CJM, прототипы, дизайн-систему, A/B тестирование.',
      en: 'Analyzed Yandex.Metrica and support data, conducted in-depth interviews with 10 clients, created CJM, prototypes, design system, A/B testing.',
    },
    keyFeatures: {
      ru: ['Модуль обмеров', 'Модуль задач', 'Модуль закупок', 'Дашборд', 'Финансы'],
      en: ['Measurements Module', 'Tasks Module', 'Procurement Module', 'Dashboard', 'Finance'],
    },
    uiDirection: {
      ru: 'Enterprise SaaS система с сильной структурой данных, высокой плотностью информации и единой дизайн-системой.',
      en: 'Enterprise SaaS with strong data structure, high information density, and unified design system.',
    },
    screens: [
      { title: { ru: 'Review', en: 'Review' }, image: '/projects/buildit/1.jpg' },
      { title: { ru: 'Dashboard', en: 'Dashboard' }, image: '/projects/buildit/2.jpg' },
      { title: { ru: 'Procurement', en: 'Procurement' }, image: '/projects/buildit/3.jpg' },
      { title: { ru: 'Finance', en: 'Finance' }, image: '/projects/buildit/4.jpg' },
	  { title: { ru: 'Mobile', en: 'Mobile' }, image: '/projects/buildit/5.jpg' },
    ],
    conclusion: {
      ru: 'Проект показал, что системный подход на основе данных и клиентоцентричности даёт высокие результаты. Комбинация количественного анализа и глубинных интервью помогла выявить реальные потребности.',
      en: 'The project showed that a systematic approach based on data and client-centrism yields high results. The combination of quantitative analysis and in-depth interviews helped identify real needs.',
    },
  },

  // MOBILE
  {
    slug: 'hobbist',
    category: 'mobile',
    color: 'linear-gradient(135deg, #4ade80 0%, #84cc16 50%, #22d3ee 100%)',
    coverImage: '/projects/hobbist-dark.jpg',
    coverImageLight: '/projects/hobbist-light.jpg',
    lightText: true,
    logo: 'H',
    logoColor: '#e879f9',
    behanceUrl: 'https://www.behance.net/gallery/233364373/Hobbist-Dating-App-UXUI-Design',
    year: '2024–2025',
    company: { ru: 'Hobbist', en: 'Hobbist' },
    name: { ru: 'Hobbist', en: 'Hobbist' },
    shortDesc: {
      ru: 'Dating-приложение в Telegram MiniApps. UX/UI, дизайн-система, юзабилити-тесты.',
      en: 'Dating app in Telegram MiniApps. UX/UI, design system, usability tests.',
    },
    tags: { ru: ['TG MiniApp', 'UI Kit', 'Research'], en: ['TG MiniApp', 'UI Kit', 'Research'] },
    metrics: [
      { value: '+20%', label: { ru: 'DAU', en: 'DAU' } },
      { value: '+25%', label: { ru: 'конверсия', en: 'conversion' } },
      { value: '50+', label: { ru: 'макетов', en: 'screens' } },
    ],
    overview: {
      ru: 'Dating-приложение в Telegram MiniApps для знакомства по хобби и интересам.',
      en: 'Dating app in Telegram MiniApps for matching by hobbies and interests.',
    },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    duration: { ru: '1 год (сент 2024 — сент 2025)', en: '1 year (Sep 2024 — Sep 2025)' },
    tools: ['Figma', 'Telegram MiniApps', 'Principle'],
    challenge: {
      ru: 'Создать MVP для dating-приложения внутри Telegram, учитывая особенности платформы и ограничения TG MiniApps.',
      en: 'Build MVP for a dating app inside Telegram, considering platform specifics and TG MiniApps constraints.',
    },
    solution: {
      ru: 'Разработал 50+ макетов MVP, создал компонентный UI Kit, провёл 5 глубинных интервью с пользователями, руководил командой 2 дизайнеров.',
      en: 'Designed 50+ MVP screens, built a component UI Kit, conducted 5 in-depth user interviews, managed a team of 2 designers.',
    },
    results: {
      ru: [
        'DAU вырос на 20% за 3 месяца после редизайна',
        'Конверсия онбординга и регистрации +25%',
        'UI Kit ускорил работу команды с 10 до 7 дней на спринт',
        'Количество правок после ревью сократилось на 40%',
      ],
      en: [
        'DAU grew by 20% in 3 months after redesign',
        'Onboarding and registration conversion +25%',
        'UI Kit sped up team from 10 to 7 days per sprint',
        'Post-review edits reduced by 40%',
      ],
    },
    context: {
      ru: 'HOBBIST это dating-приложение в Telegram MiniApps, знакомящее людей по хобби. Требовалось создать привлекательный MVP с учётом технических ограничений платформы.',
      en: 'HOBBIST is a dating app in Telegram MiniApps that matches people by hobbies. The goal was to create an attractive MVP considering platform constraints.',
    },
    problem: {
      ru: '(1) Существующие dating-приложения не дают глубоких связей, (2) Telegram имеет технические ограничения, (3) Нужен был быстрый MVP при высокой конкуренции.',
      en: '(1) Existing dating apps don\'t facilitate deep connections, (2) Telegram has technical limitations, (3) Needed a fast MVP with high competition.',
    },
    goals: {
      ru: [
        'Создать MVP dating-приложения в Telegram',
        'Разработать компонентный UI Kit',
        'Провести пользовательские интервью и юзабилити-тесты',
        'Обеспечить быстрый онбординг через Telegram',
        'Создать систему мэтчинга на основе интересов',
      ],
      en: [
        'Create MVP dating app in Telegram',
        'Develop component UI Kit',
        'Conduct user interviews and usability tests',
        'Provide fast onboarding via Telegram',
        'Create interest-based matching system',
      ],
    },
    process: {
      ru: 'Проанализировал ограничения TG MiniApps, провёл глубинные интервью, создал прототипы ключевых флоу, разработал компонентную дизайн-систему, провёл 2 раунда юзабилити-тестирования.',
      en: 'Analyzed TG MiniApps constraints, conducted in-depth interviews, created prototypes of key flows, developed a component design system, conducted 2 rounds of usability testing.',
    },
    keyFeatures: {
      ru: ['Dating по интересам', 'Telegram MiniApps', 'MVP (50+ макетов)', 'UI Kit', 'User flows'],
      en: ['Interest-based dating', 'Telegram MiniApps', 'MVP (50+ mockups)', 'UI Kit', 'User flows'],
    },
    uiDirection: {
      ru: 'Быстрый, минималистичный UX под Telegram-формат, акцент на простоту и скорость действий.',
      en: 'Fast, minimalist UX for Telegram format, emphasis on simplicity and speed of actions.',
    },
    screens: [
      { title: { ru: 'Dating', en: 'Dating' }, image: '/projects/hobbist/1.jpg' },
      { title: { ru: 'Profile', en: 'Profile' }, image: '/projects/hobbist/2.jpg' },
      { title: { ru: 'Library', en: 'Library' }, image: '/projects/hobbist/3.jpg' },
      { title: { ru: 'Reviews', en: 'Reviews' }, image: '/projects/hobbist/4.jpg' },
      { title: { ru: 'Match and Chat', en: 'Match and Chat' }, image: '/projects/hobbist/5.jpg' },
    ],
    conclusion: {
      ru: 'HOBBIST показал, что Telegram это перспективная платформа для социальных продуктов. Компонентный UI Kit позволил быстро итерировать и запустить MVP в сжатые сроки.',
      en: 'HOBBIST showed that Telegram is a promising platform for social products. A component UI Kit allowed rapid iteration and MVP launch in a short timeframe.',
    },
  },
  {
    slug: 'volcanoes',
    category: 'mobile',
    color: 'linear-gradient(135deg, #3a1a0e 0%, #7f3a1e 100%)',
    coverImage: '/projects/volcanoes-dark.jpg',
    coverImageLight: '/projects/volcanoes-light.jpg',
    logo: 'V',
    logoColor: '#7f3a1e',
    behanceUrl: 'https://www.behance.net/gallery/210208613/Volcanoes-Explorer-Mobile-UXUI-Design',
    year: '2024',
    name: { ru: 'Volcanoes Explorer', en: 'Volcanoes Explorer' },
    shortDesc: {
      ru: 'Мобильное приложение-гид по вулканам мира. Концептуальный UX/UI дизайн.',
      en: 'Mobile guide app for volcanoes around the world. Conceptual UX/UI design.',
    },
    tags: { ru: ['iOS · Android', 'Концепт'], en: ['iOS · Android', 'Concept'] },
    overview: {
      ru: 'Концептуальное мобильное приложение-гид, знакомящее пользователей с вулканами мира.',
      en: 'Conceptual mobile guide app introducing users to volcanoes around the world.',
    },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    duration: { ru: 'Концептуальный проект', en: 'Conceptual project' },
    tools: ['Figma', 'After Effects'],
    challenge: { ru: 'Создать визуально насыщенное, но информативное приложение.', en: 'Create a visually rich yet informative application.' },
    solution: { ru: 'Спроектировал атмосферный интерфейс с акцентом на сторителлинг и геймификацию обучения.', en: 'Designed an atmospheric interface focused on storytelling and gamified learning.' },
    results: { ru: ['Полный UX/UI mobile-приложения', 'Атмосферный визуал'], en: ['Full mobile app UX/UI', 'Atmospheric visuals'] },
    context: {
      ru: 'Volcanoes Explorer концептуальное приложение для знакомства с вулканами через иммерсивный опыт.',
      en: 'Volcanoes Explorer is a conceptual app for discovering volcanoes through an immersive experience.',
    },
    problem: {
      ru: '(1) Образовательный контент о геологии скучен, (2) Нужен визуально захватывающий экспириенс, (3) Баланс между информативностью и эстетикой.',
      en: '(1) Educational geology content is boring, (2) Need a visually captivating experience, (3) Balance between informativeness and aesthetics.',
    },
    goals: {
      ru: ['Атмосферный UI', 'Сторителлинг', 'Геймификация', 'Понятная подача информации', 'Полный UX/UI концепт'],
      en: ['Atmospheric UI', 'Storytelling', 'Gamification', 'Clear information delivery', 'Complete UX/UI concept'],
    },
    process: {
      ru: 'Изучил существующие гиды, разработал визуальную концепцию с природной палитрой, создал интерактивные прототипы, разработал анимацию переходов.',
      en: 'Studied existing guides, developed a visual concept with a natural palette, created interactive prototypes, developed transition animations.',
    },
    keyFeatures: {
      ru: ['Интерактивный гид', 'Сторителлинг', 'Обучение', 'Мобильный UX', 'Атмосферный дизайн', 'Геймификация'],
      en: ['Interactive Guide', 'Storytelling', 'Learning', 'Mobile UX', 'Atmospheric Design', 'Gamification'],
    },
    uiDirection: {
      ru: 'Иммерсивный визуальный опыт, где дизайн создаёт настроение и усиливает повествование.',
      en: 'Immersive visual experience where design creates the mood and enhances the narrative.',
    },
    screens: [
      { title: { ru: 'Info', en: 'Info' }, image: '/projects/volcanoes/1.jpg' },
      { title: { ru: 'Map and Quiz', en: 'Map and Quiz' }, image: '/projects/volcanoes/2.jpg' },
      { title: { ru: 'Trip Planner', en: 'Trip Planner' }, image: '/projects/volcanoes/3.jpg' },
    ],
    conclusion: {
      ru: 'Volcanoes Explorer это пример превращения сложного образовательного контента в захватывающее приключение. Атмосферный дизайн, сторителлинг и геймификация создают уникальный опыт.',
      en: 'Volcanoes Explorer is an example of turning complex educational content into an exciting adventure. Atmospheric design, storytelling, and gamification create a unique experience.',
    },
  },
  {
    slug: 'plant-pal',
    category: 'mobile',
    color: 'linear-gradient(135deg, #1e3a1e 0%, #3f7f3f 100%)',
    coverImage: '/projects/plant-dark.jpg',
    coverImageLight: '/projects/plant-light.jpg',
    logo: 'PP',
    logoColor: '#3f7f3f',
    behanceUrl: 'https://www.behance.net/gallery/184342431/Plant-Pal-UXUI-Design',
    year: '2023',
    name: { ru: 'Plant Pal', en: 'Plant Pal' },
    shortDesc: {
      ru: 'Приложение для ухода за растениями с напоминаниями и трекингом.',
      en: 'Plant care app with reminders and tracking.',
    },
    tags: { ru: ['iOS · Android', 'Lifestyle'], en: ['iOS · Android', 'Lifestyle'] },
    overview: {
      ru: 'Приложение-помощник для ухода за домашними растениями с напоминания о поливе, пересадке, подкормке.',
      en: 'Companion app for houseplant care with reminders for watering, repotting, feeding.',
    },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    duration: { ru: '2023', en: '2023' },
    tools: ['Figma'],
    challenge: { ru: 'Сделать уход за растениями простым и приятным.', en: 'Make plant care simple and enjoyable.' },
    solution: { ru: 'Минималистичный UI с акцентом на иллюстрации и тёплую цветовую палитру.', en: 'Minimalist UI with focus on illustrations and warm color palette.' },
    results: { ru: ['Полный дизайн приложения', 'Кастомные иллюстрации'], en: ['Full app design', 'Custom illustrations'] },
    context: {
      ru: 'Plant Pal помогает пользователям заботиться о растениях, напоминая о поливе, удобрении и других действиях.',
      en: 'Plant Pal helps users care for their plants by reminding them about watering, fertilizing, and other actions.',
    },
    problem: {
      ru: '(1) Пользователи забывают ухаживать за растениями, (2) Нужен простой и понятный интерфейс, (3) Система напоминаний и трекинга.',
      en: '(1) Users forget to care for plants, (2) Need a simple and intuitive interface, (3) Reminder and tracking system.',
    },
    goals: {
      ru: ['Сделать уход регулярным', 'Разработать систему напоминаний', 'Создать тёплый дизайн', 'Нарисовать кастомные иллюстрации', 'Интуитивный UX'],
      en: ['Make care regular', 'Develop reminder system', 'Create warm design', 'Draw custom illustrations', 'Intuitive UX'],
    },
    process: {
      ru: 'Проанализировал аналоги, создал user flow и прототипы, разработал визуальную концепцию с тёплой палитрой и иллюстрациями, спроектировал систему трекинга.',
      en: 'Analyzed competitors, created user flow and prototypes, developed visual concept with warm palette and illustrations, designed tracking system.',
    },
    keyFeatures: {
      ru: ['Напоминания', 'Трекинг растений', 'Система ухода', 'Кастомные иллюстрации', 'Прогресс роста'],
      en: ['Reminders', 'Plant Tracking', 'Care System', 'Custom Illustrations', 'Growth Progress'],
    },
    uiDirection: {
      ru: 'Тёплый, дружелюбный, минималистичный. Акцент на иллюстрации и природную гамму.',
      en: 'Warm, friendly, minimalist. Emphasis on illustrations and natural color scheme.',
    },
    screens: [
      { title: { ru: 'Home', en: 'Home' }, image: '/projects/plant-pal/1.jpg' },
      { title: { ru: 'Plant', en: 'Plant' }, image: '/projects/plant-pal/2.jpg' },
      { title: { ru: 'Reminders', en: 'Reminders' }, image: '/projects/plant-pal/3.jpg' },
	  { title: { ru: 'Add', en: 'Add' }, image: '/projects/plant-pal/4.jpg' },
	  { title: { ru: 'WEB', en: 'WEB' }, image: '/projects/plant-pal/5.jpg' },
    ],
    conclusion: {
      ru: 'Plant Pal это пример успешного сочетания функциональности и эстетики. Минималистичный дизайн и дружелюбные иллюстрации создают позитивный опыт.',
      en: 'Plant Pal is an example of successful combination of functionality and aesthetics. Minimalist design and friendly illustrations create a positive experience.',
    },
  },
  {
    slug: 'praktika',
    category: 'mobile',
    color: 'linear-gradient(135deg, #0a2a3e 0%, #1e5a7f 100%)',
    coverImage: '/projects/praktika-dark.jpg',
    coverImageLight: '/projects/praktika-light.jpg',
    logo: 'PR',
    logoColor: '#1e5a7f',
    behanceUrl: 'https://www.behance.net/gallery/177008945/Praktika-School-Mobile-App-UXUI-Design',
    year: '2023',
    name: { ru: 'Praktika School', en: 'Praktika School' },
    shortDesc: {
      ru: 'Мобильное приложение для онлайн-школы. Обучение и прогресс.',
      en: 'Mobile app for online school. Learning and progress.',
    },
    tags: { ru: ['iOS · Android', 'EdTech'], en: ['iOS · Android', 'EdTech'] },
    overview: { ru: 'Мобильное приложение онлайн-школы для отслеживания прогресса обучения и выполнения заданий.', en: 'Online school mobile app for tracking learning progress and completing assignments.' },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    duration: { ru: '2023', en: '2023' },
    tools: ['Figma'],
    challenge: { ru: 'Замотивировать учеников на регулярное обучение.', en: 'Motivate students to study regularly.' },
    solution: { ru: 'Геймификация прогресса, наглядная визуализация достижений.', en: 'Progress gamification, clear achievement visualization.' },
    results: { ru: ['Полный UX/UI приложения', 'Система прогресса'], en: ['Full app UX/UI', 'Progress system'] },
    context: {
      ru: 'Praktika School это приложение для онлайн-школы, помогающее студентам отслеживать прогресс и получать задания.',
      en: 'Praktika School is an app for an online school that helps students track progress and receive assignments.',
    },
    problem: {
      ru: '(1) Низкая мотивация студентов, (2) Отсутствие понятной системы прогресса, (3) Высокий отсев после первого месяца.',
      en: '(1) Low student motivation, (2) Lack of clear progress tracking, (3) High dropout after first month.',
    },
    goals: {
      ru: ['Повысить вовлечённость', 'Внедрить геймификацию', 'Создать систему отслеживания прогресса', 'Визуализировать достижения', 'Снизить отсев'],
      en: ['Increase engagement', 'Implement gamification', 'Create progress tracking system', 'Visualize achievements', 'Reduce dropout'],
    },
    process: {
      ru: 'Проанализировал образовательные платформы и геймификацию, разработал систему ачивок и уровней, создал визуально привлекательные дашборды, провёл юзабилити-тестирование.',
      en: 'Analyzed educational platforms and gamification, developed achievement and level system, created visually appealing dashboards, conducted usability testing.',
    },
    keyFeatures: {
      ru: ['Отслеживание прогресса', 'Система заданий', 'Геймификация', 'Ачивки и бейджи', 'Визуализация успехов', 'Мотивационные уведомления'],
      en: ['Progress Tracking', 'Assignment System', 'Gamification', 'Achievements and Badges', 'Visualization of Success', 'Motivational Notifications'],
    },
    uiDirection: {
      ru: 'Мотивационный educational UI с акцентом на чёткую структуру, позитивные цвета и анимированные элементы прогресса.',
      en: 'Motivational educational UI with emphasis on clear structure, positive colors, and animated progress elements.',
    },
    screens: [
      { title: { ru: 'Dashboard', en: 'Dashboard' }, image: '/projects/praktika/1.jpg' },
      { title: { ru: 'Lessons', en: 'Lessons' }, image: '/projects/praktika/2.jpg' },
      { title: { ru: 'Progress', en: 'Progress' }, image: '/projects/praktika/3.jpg' },
    ],
    conclusion: {
      ru: 'Praktika School это пример того, как геймификация и визуализация прогресса превращают обучение в увлекательный процесс, повышая мотивацию.',
      en: 'Praktika School is an example of how gamification and progress visualization turn learning into an engaging process, increasing motivation.',
    },
  },

  // WEB
  {
    slug: 'portfolio',
    category: 'web',
    isThisSite: true,
    color: 'linear-gradient(135deg, #0c0c0e 0%, #1a1a22 100%)',
    coverImage: '/projects/portfolio-dark.jpg',
    coverImageLight: '/projects/portfolio-light.jpg',
    logo: 'MS',
    logoColor: '#4fa3ff',
    year: '2026',
    name: { ru: 'Мой сайт-портфолио', en: 'My portfolio website' },
    shortDesc: {
      ru: 'Next.js + ClaudeCode, RU/EN, dark/light. Сайт, который вы смотрите.',
      en: "Next.js + ClaudeCode, RU/EN, dark/light. The site you're viewing.",
    },
    tags: { ru: ['Next.js', 'ClaudeCode', 'TypeScript'], en: ['Next.js', 'ClaudeCode', 'TypeScript'] },
    overview: {
      ru: 'Мой персональный сайт-портфолио это одностраничник с темной/светлой темой, переключением языков и отдельными страницами для каждого проекта.',
      en: 'My personal portfolio website is single page with dark/light theme, language switcher, and individual project pages.',
    },
    role: { ru: 'Дизайн и разработка', en: 'Design & Development' },
    duration: { ru: '2026', en: '2026' },
    tools: ['Figma', 'Next.js', 'TypeScript', 'ClaudeCode'],
    challenge: {
      ru: 'Создать персональный сайт, который сам по себе является демонстрацией моих навыков как продуктового дизайнера.',
      en: 'Build a personal site that itself serves as a demonstration of my product design skills.',
    },
    solution: {
      ru: 'Спроектировал сайт в современной эстетике, реализовал его на Next.js с помощью ClaudeCode, деплой на CloudFlare.',
      en: 'Designed the site in a modern aesthetic, built it with Next.js and ClaudeCode, deployed on CloudFlare.',
    },
    results: {
      ru: ['Адаптивный дизайн', 'RU/EN локализация', 'Dark/Light темы', 'Полная поддержка SEO'],
      en: ['Responsive design', 'RU/EN localization', 'Dark/Light themes', 'Full SEO support'],
    },
    context: {
      ru: 'Этот сайт представляет моё портфолио как полноценный продукт, объединяющий дизайн и разработку.',
      en: 'This site presents my portfolio as a full-fledged product combining design and development.',
    },
    problem: {
      ru: '(1) Нужно было создать персональный сайт, демонстрирующий уровень дизайна и разработки, (2) Поддержка двух языков и двух тем, (3) Хорошая SEO-структура.',
      en: '(1) Need a personal site demonstrating design and development level, (2) Support two languages and two themes, (3) Good SEO structure.',
    },
    goals: {
      ru: ['Создать портфолио как продукт', 'Объединить дизайн и разработку', 'Реализовать мультиязычность и темы', 'Обеспечить SEO'],
      en: ['Create portfolio as a product', 'Combine design and development', 'Implement multi-language and themes', 'Ensure SEO'],
    },
    process: {
      ru: 'Спроектировал архитектуру на Next.js, разработал дизайн с акцентом на типографику и структуру, реализовал локализацию и тёмную/светлую темы, задеплоил на CloudFlare.',
      en: 'Designed the architecture on Next.js, developed design with focus on typography and structure, implemented localization and dark/light themes, deployed on CloudFlare.',
    },
    keyFeatures: {
      ru: ['RU/EN локализация', 'Dark/Light темы', 'Отдельные страницы проектов', 'SEO-оптимизация', 'Адаптивный дизайн', 'Next.js архитектура'],
      en: ['RU/EN localization', 'Dark/Light themes', 'Individual project pages', 'SEO optimization', 'Responsive design', 'Next.js architecture'],
    },
    uiDirection: {
      ru: 'Современный продуктовый интерфейс с акцентом на чистую типографику, структуру и технологичность.',
      en: 'Modern product interface with focus on clean typography, structure, and technological feel.',
    },
    screens: [
      { title: { ru: 'Главная', en: 'Home' }, image: '/projects/portfolio/1.jpg' },
      { title: { ru: 'Проекты', en: 'Projects' }, image: '/projects/portfolio/2.jpg' },
      { title: { ru: 'Опыт', en: 'Work' }, image: '/projects/portfolio/3.jpg' },
      { title: { ru: 'Страница проекта', en: 'Project Page' }, image: '/projects/portfolio/4.jpg' },
      { title: { ru: 'Скрины проекта', en: 'Project Screens' }, image: '/projects/portfolio/5.jpg' },
    ],
    conclusion: {
      ru: 'Этот сайт это не только портфолио, но и демонстрация моих технических навыков как продуктового дизайнера, способного реализовать полноценный продукт от идеи до деплоя.',
      en: 'This site is not only a portfolio but also a demonstration of my technical skills as a product designer capable of implementing a full-fledged product from idea to deployment.',
    },
  },
  {
    slug: 'architecture-studio',
    category: 'web',
    color: 'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%)',
    coverImage: '/projects/studio-dark.jpg',
    coverImageLight: '/projects/studio-light.jpg',
    logo: 'AS',
    logoColor: '#4a4a4a',
    behanceUrl: 'https://www.behance.net/gallery/168472159/Architecture-Studio',
    year: '2023',
    name: { ru: 'Architecture Studio', en: 'Architecture Studio' },
    shortDesc: { ru: 'Сайт архитектурной студии', en: 'Architecture studio website' },
    tags: { ru: ['Веб', 'Корп'], en: ['Web', 'Corporate'] },
    overview: { ru: 'Корпоративный сайт архитектурной студии с акцентом на работы и визуальный язык.', en: 'Corporate website of an architecture studio focused on works and visual language.' },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    duration: { ru: '2023', en: '2023' },
    tools: ['Figma'],
    challenge: { ru: 'Показать портфолио студии на первом плане.', en: 'Showcase studio portfolio front and center.' },
    solution: { ru: 'Галерейная раскладка с минимумом интерфейса.', en: 'Gallery layout with minimal interface.' },
    results: { ru: ['Концепт сайта', 'Адаптив'], en: ['Site concept', 'Responsive'] },
    context: {
      ru: 'Сайт архитектурной студии, где основной задачей была эффектная демонстрация портфолио с вау-эффектом.',
      en: 'Architecture studio website where the main task was to effectively showcase the portfolio with a wow effect.',
    },
    problem: {
      ru: '(1) Нужно показать портфолио с эффектом вау, (2) Создать нестандартный опыт просмотра, (3) Оставить центр внимания на работах, а не на UI.',
      en: '(1) Need to showcase portfolio with wow effect, (2) Create non-standard viewing experience, (3) Keep focus on work, not on UI.',
    },
    goals: {
      ru: ['Сделать портфолио центральным элементом', 'Создать галерею с горизонтальным скроллом', 'Минималистичный UI', 'Адаптивность', 'Передать визуальный стиль студии'],
      en: ['Make portfolio central', 'Create gallery with horizontal scroll', 'Minimalist UI', 'Responsiveness', 'Convey studio visual style'],
    },
    process: {
      ru: 'Изучил лучшие примеры сайтов-портфолио, разработал концепцию галереи с горизонтальным скроллом, создал минималистичный UI, не отвлекающий от работ.',
      en: 'Studied best portfolio websites, developed gallery concept with horizontal scroll, created minimalist UI that doesn\'t distract from work.',
    },
    keyFeatures: {
      ru: ['Галерея', 'Горизонтальный скролл', 'Интерактивный UX', 'Минимализм', 'Визуальный фокус'],
      en: ['Gallery', 'Horizontal scroll', 'Interactive UX', 'Minimalism', 'Visual focus'],
    },
    uiDirection: {
      ru: 'Минимализм + визуальный фокус. Дизайн полностью подчинён демонстрации работ.',
      en: 'Minimalism + visual focus. Design entirely subservient to showcasing work.',
    },
    screens: [
      { title: { ru: 'Главная', en: 'Main' }, image: '/projects/architecture-studio/1.jpg' },
      { title: { ru: 'Услуги', en: 'Skills' }, image: '/projects/architecture-studio/2.jpg' },
	  { title: { ru: 'Проекты', en: 'Project View' }, image: '/projects/architecture-studio/3.jpg' },
    ],
    conclusion: {
      ru: 'Нестандартное UI-решение с горизонтальным скроллом создаёт кинематографический эффект, позволяя работам говорить самим за себя.',
      en: 'The non-standard UI solution with horizontal scroll creates a cinematic effect, allowing the work to speak for itself.',
    },
  },
  {
    slug: 'pioner',
    category: 'web',
    color: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #60a5fa 100%)',
    coverImage: '/projects/pioner-dark.jpg',
    coverImageLight: '/projects/pioner-light.jpg',
    logo: 'П',
    logoColor: '#7f1e1e',
    behanceUrl: 'https://www.behance.net/gallery/181286239/redizajn-glavnoj-stranicy-sajta-zavoda-pioner',
    year: '2023',
    name: { ru: 'Завод «Пионер»', en: 'Pioner Factory' },
    shortDesc: { ru: 'Редизайн главной страницы сайта', en: 'Homepage redesign' },
    tags: { ru: ['Веб', 'Редизайн'], en: ['Web', 'Redesign'] },
    overview: { ru: 'Редизайн главной страницы сайта производственного завода.', en: "Homepage redesign for a manufacturing factory's website." },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    duration: { ru: '2023', en: '2023' },
    tools: ['Figma'],
    challenge: { ru: 'Осовременить визуально устаревший сайт.', en: 'Modernize a visually outdated website.' },
    solution: { ru: 'Структурированная сетка, чёткая иерархия CTA.', en: 'Structured grid, clear CTA hierarchy.' },
    results: { ru: ['Редизайн главной', 'Гайды по стилю'], en: ['Homepage redesign', 'Style guides'] },
    context: {
      ru: 'Редизайн главной страницы сайта завода для осовременивания стиля, улучшения структуры и повышения конверсии.',
      en: 'Homepage redesign for a factory website to modernize style, improve structure, and increase conversion.',
    },
    problem: {
      ru: '(1) Устаревший дизайн не вызывал доверия, (2) Низкая конверсия в заявки, (3) Сложная навигация, (4) Отсутствие чётких CTA.',
      en: '(1) Outdated design didn\'t inspire trust, (2) Low conversion to leads, (3) Complex navigation, (4) Lack of clear CTAs.',
    },
    goals: {
      ru: ['Осовременить визуальный стиль', 'Улучшить структуру и навигацию', 'Повысить конверсию', 'Разработать систему CTA', 'Создать гайдлайн'],
      en: ['Modernize visual style', 'Improve structure and navigation', 'Increase conversion', 'Develop CTA system', 'Create guidelines'],
    },
    process: {
      ru: 'Проанализировал конкурентов и лучшие корпоративные сайты, разработал новую визуальную концепцию, создал систему CTA, разработал гайдлайн по сетке и компонентам.',
      en: 'Analyzed competitors and best corporate websites, developed new visual concept, created CTA system, developed guidelines for grid and components.',
    },
    keyFeatures: {
      ru: ['Редизайн главной', 'Система CTA', 'Модульная сетка', 'Гайдлайны', 'Современный стиль', 'Строгая структура'],
      en: ['Homepage redesign', 'CTA system', 'Grid layout', 'Guidelines', 'Modern style', 'Strict structure'],
    },
    uiDirection: {
      ru: 'Строгий корпоративный стиль с акцентом на структуру, чёткую иерархию и сильные CTA.',
      en: 'Strict corporate style with emphasis on structure, clear hierarchy, and strong CTAs.',
    },
    screens: [
      { title: { ru: 'Главная', en: 'Homepage' }, image: '/projects/pioner/1.jpg' },
      { title: { ru: 'Каталог', en: 'Cataloge' }, image: '/projects/pioner/2.jpg' },
	  { title: { ru: 'Контакты', en: 'Contacts' }, image: '/projects/pioner/3.jpg' },
    ],
    conclusion: {
      ru: 'Проект PIONER это пример успешного редизайна корпоративного сайта от устаревшего к современному, повысившего бизнес-показатели.',
      en: 'The PIONER project is an example of a successful corporate website redesign from outdated to modern, improving business metrics.',
    },
  },
  {
    slug: 'aveji',
    category: 'web',
    color: 'linear-gradient(135deg, #e7d5b5 0%, #d4a574 50%, #c89766 100%)',
    coverImage: '/projects/aveji-dark.jpg',
    coverImageLight: '/projects/aveji-light.jpg',
    lightText: true,
    logo: 'AV',
    logoColor: '#7f5a1e',
    behanceUrl: 'https://www.behance.net/gallery/181469821/AVEJI-LANDING-PAGE',
    year: '2023',
    name: { ru: 'AVEJI', en: 'AVEJI' },
    shortDesc: { ru: 'Landing page', en: 'Landing page' },
    tags: { ru: ['Landing'], en: ['Landing'] },
    overview: { ru: 'Landing page для продукта AVEJI.', en: 'Landing page for AVEJI product.' },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    duration: { ru: '2023', en: '2023' },
    tools: ['Figma'],
    challenge: { ru: 'Конверсионная посадочная страница.', en: 'Conversion-focused landing.' },
    solution: { ru: 'Ясная структура, сильные CTA.', en: 'Clear structure, strong CTAs.' },
    results: { ru: ['Лендинг', 'Адаптив'], en: ['Landing', 'Responsive'] },
    context: {
      ru: 'Конверсионный лендинг для продукта AVEJI, задача максимизировать лидогенерацию.',
      en: 'Conversion landing page for AVEJI product, task to maximize lead generation.',
    },
    problem: {
      ru: '(1) Нужно создать лендинг для нового продукта, (2) Чётко донести ценность, (3) Минимизировать отвлекающие факторы.',
      en: '(1) Need to create landing for new product, (2) Clearly communicate value, (3) Minimize distractions.',
    },
    goals: {
      ru: ['Создать конверсионный лендинг', 'Донести ценность продукта', 'Разработать сильные CTA', 'Обеспечить адаптивность', 'Минимизировать отвлекающие факторы'],
      en: ['Create conversion landing', 'Communicate product value', 'Develop strong CTAs', 'Ensure responsiveness', 'Minimize distractions'],
    },
    process: {
      ru: 'Проанализировал лучшие примеры конверсионных лендингов, разработал структуру, ведущую к действию, создал минималистичный дизайн с акцентом на типографику и преимущества.',
      en: 'Analyzed best conversion landing examples, developed structure leading to action, created minimalist design with focus on typography and benefits.',
    },
    keyFeatures: {
      ru: ['Лендинг', 'Сильные CTA', 'Чёткая структура', 'Минимализм', 'Адаптивность'],
      en: ['Landing', 'Strong CTAs', 'Clear structure', 'Minimalism', 'Responsiveness'],
    },
    uiDirection: {
      ru: 'Минимализм + конверсия. Чистая типографика, ясная иерархия, ненавязчивый визуальный стиль.',
      en: 'Minimalism + conversion. Clean typography, clear hierarchy, unobtrusive visual style.',
    },
    screens: [
      { title: { ru: 'Hero', en: 'Hero' }, image: '/projects/aveji/1.jpg' },
    ],
    conclusion: {
      ru: 'AVEJI это пример эффективного конверсионного лендинга, где минималистичный дизайн и чёткая структура работают на результат.',
      en: 'AVEJI is an example of an effective conversion landing where minimalist design and clear structure work for results.',
    },
  },
  {
    slug: 'webinar',
    category: 'web',
    color: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)',
    coverImage: '/projects/webinar-dark.jpg',
    coverImageLight: '/projects/webinar-light.jpg',
    logo: 'W',
    logoColor: '#3a3a5a',
    behanceUrl: 'https://www.behance.net/gallery/181538443/minimalizm-v-veb-dizajne-stranica-vebinara',
    year: '2023',
    name: { ru: 'Webinar Page', en: 'Webinar Page' },
    shortDesc: { ru: 'Минималистичная страница вебинара', en: 'Minimalist webinar landing page' },
    tags: { ru: ['Landing', 'Minimal'], en: ['Landing', 'Minimal'] },
    overview: { ru: 'Минималистичная посадочная страница для вебинара.', en: 'Minimalist landing page for a webinar.' },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    duration: { ru: '2023', en: '2023' },
    tools: ['Figma'],
    challenge: { ru: 'Максимум конверсии при минимуме элементов.', en: 'Maximum conversion with minimal elements.' },
    solution: { ru: 'Чистая типографика, один экран.', en: 'Clean typography, single screen.' },
    results: { ru: ['Лендинг', 'Минималистичный дизайн'], en: ['Landing', 'Minimalist design'] },
    context: {
      ru: 'Лендинг для вебинара с единственной целью - регистрация. Сверхчистый дизайн, один экран.',
      en: 'Webinar landing page with single goal - registration. Ultra-clean design, one screen.',
    },
    problem: {
      ru: '(1) Максимальная конверсия, (2) Убрать все отвлекающие элементы, (3) Чётко донести ценность вебинара.',
      en: '(1) Maximum conversion, (2) Remove all distracting elements, (3) Clearly communicate webinar value.',
    },
    goals: {
      ru: ['Минималистичный лендинг', 'Упростить до одного действия', 'Максимально повысить конверсию', 'Чётко донести ценность', 'Чистый и понятный дизайн'],
      en: ['Minimalist landing', 'Simplify to one action', 'Maximize conversion', 'Clearly communicate value', 'Clean and clear design'],
    },
    process: {
      ru: 'Изучил best practices вебинарных лендингов, разработал концепцию «одного экрана», создал чистый дизайн с акцентом на типографику и главное сообщение.',
      en: 'Studied webinar landing best practices, developed "single screen" concept, created clean design with focus on typography and main message.',
    },
    keyFeatures: {
      ru: ['Один экран', 'Сильный CTA', 'Минималистичный UI', 'Чистая типографика', 'Максимальная конверсия'],
      en: ['Single screen', 'Strong CTA', 'Minimalist UI', 'Clean typography', 'Maximum conversion'],
    },
    uiDirection: {
      ru: 'Супер-минимализм. Одна страница, одно действие. Максимум белого пространства и чёткая типографика.',
      en: 'Ultra-minimalism. One page, one action. Maximum white space and clear typography.',
    },
    screens: [
      { title: { ru: 'Hero Screen', en: 'Hero Screen' }, image: '/projects/webinar/1.jpg' },
    ],
    conclusion: {
      ru: 'Супер-минималистичный дизайн может быть максимально эффективным: убрав всё лишнее, оставив только одно действие, удалось создать страницу с высокой конверсией.',
      en: 'Ultra-minimalist design can be maximally effective: removing everything unnecessary and leaving only one action created a page with high conversion.',
    },
  },
];

export interface Experience {
  id: string;
  logo: string;
  logoColor: string;
  logoSrc?: string;
  logoSrcLight?: string;
  company: { ru: string; en: string };
  website?: string;
  location: { ru: string; en: string };
  role: { ru: string; en: string };
  period: { ru: string; en: string };
  kpi: { value: string; label: { ru: string; en: string } };
  product: { ru: string; en: string };
  metrics: { value: string; label: { ru: string; en: string } }[];
  achievements: { ru: string[]; en: string[] };
  products: { icon: string; iconColor: string; name: string; desc: { ru: string; en: string } }[];
}

export const experiences: Experience[] = [
  {
    id: 'uk-medicina',
    logo: 'МИ',
    logoColor: '#4fa3ff',
    logoSrc: '/logos/uk-medicina.svg',
    company: { ru: 'УК Медицина · IYWI', en: 'UK Medicina · IYWI' },
    website: 'okk.pro',
    location: { ru: 'СПб', en: 'SPb' },
    role: { ru: 'Ведущий продуктовый дизайнер', en: 'Lead Product Designer' },
    period: { ru: 'сент 2025 — апр 2026 · 8 мес', en: 'Sep 2025 — Apr 2026 · 8 mo' },
    kpi: { value: '+80%', label: { ru: 'рост лидов', en: 'leads growth' } },
    product: { ru: 'AI-продукт для анализа качества консультаций в стоматологических клиниках. Команда 6+ разработчиков.', en: 'AI product for analyzing consultation quality in dental clinics. Team of 6+ developers.' },
    metrics: [
      { value: '−35%', label: { ru: 'время на экраны', en: 'screen time' } },
      { value: '+15%', label: { ru: 'удержание', en: 'retention' } },
      { value: '−60%', label: { ru: 'баги на проде', en: 'production bugs' } },
      { value: '95%', label: { ru: 'дедлайны', en: 'deadlines' } },
    ],
    achievements: {
      ru: [
        'Дизайн-система с нуля. 6+ разработчиков используют ежедневно',
        'Веб + адаптация iOS/Android. 40% пользователей с мобайла',
        '8 A/B-тестов интерфейса и 5 лендингов на Tilda Zero Block',
        'Управление командой разработчиков, приёмка, дизайн-ревью',
      ],
      en: [
        'Design system from scratch. 6+ developers use daily',
        'Web + iOS/Android adaptation. 40% users on mobile',
        '8 A/B tests and 5 Tilda Zero Block landings',
        'Developer team management, acceptance, design review',
      ],
    },
    products: [
      { icon: 'ai', iconColor: '#4fa3ff', name: 'IYWI', desc: { ru: 'AI SaaS для стоматологических клиник', en: 'AI SaaS for dental clinics' } },
      { icon: 'tilda', iconColor: '#94a3b8', name: '5 лендингов', desc: { ru: 'Tilda Zero Block', en: 'Tilda Zero Block' } },
    ],
  },
  {
    id: 'hobbist',
    logo: 'H',
    logoColor: '#e879f9',
    logoSrc: '/logos/hobbist.svg',
    company: { ru: 'Hobbist', en: 'Hobbist' },
    website: 'hobbist.com',
    location: { ru: 'Удалённо', en: 'Remote' },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    period: { ru: 'сент 2024 — сент 2025 · 1 год', en: 'Sep 2024 — Sep 2025 · 1 yr' },
    kpi: { value: '+20%', label: { ru: 'DAU', en: 'DAU' } },
    product: { ru: 'Dating-приложение TG MiniApps + веб. Руководил командой 2 дизайнеров.', en: 'Dating app TG MiniApps + web. Managed team of 2 designers.' },
    metrics: [
      { value: '50+', label: { ru: 'макетов MVP', en: 'MVP screens' } },
      { value: '+25%', label: { ru: 'конверсия', en: 'conversion' } },
      { value: '−40%', label: { ru: 'правок', en: 'edits' } },
    ],
    achievements: {
      ru: [
        'Компонентный UI Kit. Спринт с 10 до 7 дней',
        '5 глубинных интервью с пользователями',
        'Кросс-платформенный опыт MiniApps + веб',
      ],
      en: [
        'Component UI Kit. Sprint from 10 to 7 days',
        '5 in-depth user interviews',
        'Cross-platform experience MiniApps + web',
      ],
    },
    products: [
      { icon: 'telegram', iconColor: '#e879f9', name: 'Hobbist Dating', desc: { ru: 'Telegram MiniApp', en: 'Telegram MiniApp' } },
      { icon: 'web', iconColor: '#c084fc', name: 'Hobbist Web', desc: { ru: 'Веб-версия приложения', en: 'Web version' } },
    ],
  },
  {
    id: 'smetter',
    logo: 'С',
    logoColor: '#fbbf24',
    logoSrc: '/logos/smetter.svg',
    logoSrcLight: '/logos/smetter-light.svg',
    company: { ru: 'Сметтер · BuildIT', en: 'Smetter · BuildIT' },
    website: 'smetter.ru',
    location: { ru: 'СПб', en: 'SPb' },
    role: { ru: 'Ведущий UX/UI дизайнер', en: 'Lead UX/UI Designer' },
    period: { ru: 'июн — сент 2024 · 4 мес', en: 'Jun — Sep 2024 · 4 mo' },
    kpi: { value: '35→62', label: { ru: 'NPS', en: 'NPS' } },
    product: { ru: 'SaaS для строительного бизнеса. 3 новых модуля с нуля.', en: 'SaaS for construction business. 3 new modules from scratch.' },
    metrics: [
      { value: '−50%', label: { ru: 'время смет', en: 'estimates time' } },
      { value: '−25%', label: { ru: 'передача в dev', en: 'handoff' } },
      { value: '100%', label: { ru: 'приёмка', en: 'acceptance' } },
    ],
    achievements: {
      ru: [
        '3 модуля с нуля. Обмеры, доска задач, закупки',
        'Редизайн дэшборда на основе Яндекс.Метрики',
        'Единая дизайн-система веб + iOS + Android',
      ],
      en: [
        '3 modules from scratch. Measurements, task board, procurement',
        'Dashboard redesign based on Yandex.Metrica',
        'Unified design system web + iOS + Android',
      ],
    },
    products: [
      { icon: 'saas', iconColor: '#fbbf24', name: 'BuildIT', desc: { ru: 'SaaS-платформа для строителей', en: 'SaaS platform for builders' } },
    ],
  },
  {
    id: 'aezakmi',
    logo: 'A',
    logoColor: '#34d399',
    logoSrc: '/logos/aezakmi.svg',
    logoSrcLight: '/logos/aezakmi-light.svg',
    company: { ru: 'Aezakmi Group', en: 'Aezakmi Group' },
    website: 'aezakmi.group',
    location: { ru: 'Удалённо', en: 'Remote' },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    period: { ru: 'май 2023 — май 2024 · 1 год', en: 'May 2023 — May 2024 · 1 yr' },
    kpi: { value: '200k+', label: { ru: 'установок', en: 'installs' } },
    product: { ru: '8 мобильных приложений iOS/Android.', en: '8 mobile iOS/Android apps.' },
    metrics: [
      { value: '8', label: { ru: 'приложений', en: 'apps' } },
      { value: '+18%', label: { ru: 'удержание', en: 'retention' } },
      { value: '−25%', label: { ru: 'сроки', en: 'timelines' } },
    ],
    achievements: {
      ru: [
        '8 приложений iOS/Android с нуля',
        'Анимированные интерфейсы After Effects',
        'Компонентный подход, библиотеки Figma',
      ],
      en: [
        '8 iOS/Android apps from scratch',
        'Animated interfaces After Effects',
        'Component approach, Figma libraries',
      ],
    },
    products: [
      { icon: 'mobile', iconColor: '#34d399', name: '8 приложений', desc: { ru: 'iOS/Android, iGaming', en: 'iOS/Android, iGaming' } },
    ],
  },
  {
    id: 'atlant',
    logo: 'А',
    logoColor: '#f87171',
    logoSrc: '/logos/atlant.svg',
    logoSrcLight: '/logos/atlant-light.svg',
    company: { ru: 'Атлант', en: 'Atlant' },
    website: 'sk-atlant.ru',
    location: { ru: 'СПб', en: 'SPb' },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    period: { ru: 'янв 2021 — апр 2023 · 2+ года', en: 'Jan 2021 — Apr 2023 · 2+ yr' },
    kpi: { value: '+30%', label: { ru: 'конверсия сайта', en: 'site conversion' } },
    product: { ru: 'Внутренняя система мониторинга + корпоративный сайт.', en: 'Internal monitoring system + corporate website.' },
    metrics: [
      { value: '2.5→3.25%', label: { ru: 'конверсия', en: 'conversion' } },
      { value: '−40%', label: { ru: 'время проектирования', en: 'design time' } },
    ],
    achievements: {
      ru: [
        'Дизайн-система с нуля. 5+ сотрудников',
        'Редизайн корпоративного сайта',
        'Внутренняя система мониторинга стройки',
      ],
      en: [
        'Design system from scratch. 5+ employees',
        'Corporate website redesign',
        'Internal construction monitoring system',
      ],
    },
    products: [
      { icon: 'monitor', iconColor: '#f87171', name: 'Система мониторинга', desc: { ru: 'Внутренняя платформа', en: 'Internal platform' } },
      { icon: 'web', iconColor: '#fca5a5', name: 'Корпоративный сайт', desc: { ru: 'Редизайн', en: 'Redesign' } },
    ],
  },
];