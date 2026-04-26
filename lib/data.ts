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
  color: string; // gradient CSS
  coverImage?: string; // путь к картинке обложки для тёмной темы
  coverImageLight?: string; // путь к картинке обложки для светлой темы (опционально)
  lightText?: boolean; // если true — на странице проекта текст будет тёмным (для светлых градиентов)
  cover?: string; // путь к обложке-картинке (например "/projects/iywi/cover.jpg")
  screenshots?: string[]; // массив длинных макетов для страницы проекта
  logo: string; // letters
  logoColor: string;
  behanceUrl?: string;
  year: string;
  company?: { ru: string; en: string };
  name: { ru: string; en: string };
  shortDesc: { ru: string; en: string };
  tags: { ru: string[]; en: string[] };
  metrics?: { value: string; label: { ru: string; en: string } }[];
  // Для отдельной страницы
  overview: { ru: string; en: string };
  role: { ru: string; en: string };
  duration: { ru: string; en: string };
  tools: string[];
  challenge: { ru: string; en: string };
  solution: { ru: string; en: string };
  results: { ru: string[]; en: string[] };
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
        'Дизайн-система с нуля — используется всей продуктовой командой (6+ разработчиков)',
        'Время на создание новых экранов сокращено на 35%',
        'Охват мобильных пользователей вырос до 40% от всей аудитории',
        '5 лендингов на Tilda — количество лидов выросло на 80%',
        '8 A/B-тестов — удержание пользователей +15%',
        'Количество багов на проде сократилось на 60%',
        'Соблюдение дедлайнов в команде 6+ разработчиков — 95%',
      ],
      en: [
        'Design system from scratch — used by entire product team (6+ developers)',
        'New screen creation time reduced by 35%',
        'Mobile user coverage grew to 40% of total audience',
        '5 landing pages on Tilda — leads grew by 80%',
        '8 A/B tests — user retention +15%',
        'Production bugs reduced by 60%',
        'Deadline compliance in team of 6+ developers — 95%',
      ],
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
      ru: 'SaaS-платформа Smetter.ru для автоматизации строительного бизнеса — веб + iOS/Android.',
      en: 'Smetter.ru SaaS platform for construction business automation — web + iOS/Android.',
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
        '3 новых модуля с нуля — время на подготовку смет сократилось на 50%',
        'NPS вырос с 35 до 62',
        'Ускорил передачу макетов в разработку на 25%',
        '100% соответствие макетов при приёмке',
      ],
      en: [
        '3 new modules from scratch — estimate preparation time reduced by 50%',
        'NPS grew from 35 to 62',
        'Handoff to development accelerated by 25%',
        '100% mockup compliance at acceptance',
      ],
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
      ru: 'Dating-приложение в Telegram MiniApps — знакомства по хобби и интересам.',
      en: 'Dating app in Telegram MiniApps — matching by hobbies and interests.',
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
      ru: 'Приложение-помощник для ухода за домашними растениями — напоминания о поливе, пересадке, подкормке.',
      en: 'Companion app for houseplant care — reminders for watering, repotting, feeding.',
    },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    duration: { ru: '2023', en: '2023' },
    tools: ['Figma'],
    challenge: { ru: 'Сделать уход за растениями простым и приятным.', en: 'Make plant care simple and enjoyable.' },
    solution: { ru: 'Минималистичный UI с акцентом на иллюстрации и тёплую цветовую палитру.', en: 'Minimalist UI with focus on illustrations and warm color palette.' },
    results: { ru: ['Полный дизайн приложения', 'Кастомные иллюстрации'], en: ['Full app design', 'Custom illustrations'] },
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
      ru: 'Next.js + Vercel, RU/EN, dark/light — сайт, который вы смотрите.',
      en: "Next.js + Vercel, RU/EN, dark/light — the site you're viewing.",
    },
    tags: { ru: ['Next.js', 'Vercel', 'TypeScript'], en: ['Next.js', 'Vercel', 'TypeScript'] },
    overview: {
      ru: 'Мой персональный сайт-портфолио — одностраничник с темной/светлой темой, переключением языков и отдельными страницами для каждого проекта.',
      en: 'My personal portfolio website — single page with dark/light theme, language switcher, and individual project pages.',
    },
    role: { ru: 'Дизайн и разработка', en: 'Design & Development' },
    duration: { ru: '2026', en: '2026' },
    tools: ['Figma', 'Next.js', 'TypeScript', 'Vercel'],
    challenge: {
      ru: 'Создать персональный сайт, который сам по себе является демонстрацией моих навыков как продуктового дизайнера.',
      en: 'Build a personal site that itself serves as a demonstration of my product design skills.',
    },
    solution: {
      ru: 'Спроектировал сайт в современной эстетике, реализовал его на Next.js с TypeScript, деплой на Vercel.',
      en: 'Designed the site in a modern aesthetic, built it with Next.js and TypeScript, deployed on Vercel.',
    },
    results: {
      ru: ['Адаптивный дизайн', 'RU/EN локализация', 'Dark/Light темы', 'Полная поддержка SEO'],
      en: ['Responsive design', 'RU/EN localization', 'Dark/Light themes', 'Full SEO support'],
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
  },
];

export interface Experience {
  id: string;
  logo: string;
  logoColor: string;
  logoSrc?: string; // путь к SVG логотипу (тёмная тема), например '/logos/uk-medicina.svg'
  logoSrcLight?: string; // путь к SVG логотипу для светлой темы (опционально)
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
        'Дизайн-система с нуля — 6+ разработчиков используют ежедневно',
        'Веб + адаптация iOS/Android — 40% пользователей с мобайла',
        '8 A/B-тестов интерфейса и 5 лендингов на Tilda Zero Block',
        'Управление командой разработчиков, приёмка, дизайн-ревью',
      ],
      en: [
        'Design system from scratch — 6+ developers use daily',
        'Web + iOS/Android adaptation — 40% users on mobile',
        '8 A/B tests and 5 Tilda Zero Block landings',
        'Developer team management, acceptance, design review',
      ],
    },
    products: [
      { icon: 'IY', iconColor: '#4fa3ff', name: 'IYWI', desc: { ru: 'AI SaaS для стоматологических клиник', en: 'AI SaaS for dental clinics' } },
      { icon: 'T', iconColor: '#94a3b8', name: '5 лендингов', desc: { ru: 'Tilda Zero Block', en: 'Tilda Zero Block' } },
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
        'Компонентный UI Kit — спринт с 10 до 7 дней',
        '5 глубинных интервью с пользователями',
        'Кросс-платформенный опыт MiniApps + веб',
      ],
      en: [
        'Component UI Kit — sprint from 10 to 7 days',
        '5 in-depth user interviews',
        'Cross-platform experience MiniApps + web',
      ],
    },
    products: [
      { icon: 'H', iconColor: '#e879f9', name: 'Hobbist Dating', desc: { ru: 'Telegram MiniApp', en: 'Telegram MiniApp' } },
      { icon: 'W', iconColor: '#c084fc', name: 'Hobbist Web', desc: { ru: 'Веб-версия приложения', en: 'Web version' } },
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
        '3 модуля с нуля — обмеры, доска задач, закупки',
        'Редизайн дэшборда на основе Яндекс.Метрики',
        'Единая дизайн-система веб + iOS + Android',
      ],
      en: [
        '3 modules from scratch — measurements, task board, procurement',
        'Dashboard redesign based on Yandex.Metrica',
        'Unified design system web + iOS + Android',
      ],
    },
    products: [
      { icon: 'B', iconColor: '#fbbf24', name: 'BuildIT', desc: { ru: 'SaaS-платформа для строителей', en: 'SaaS platform for builders' } },
    ],
  },
  {
    id: 'aezakmi',
    logo: 'A',
    logoColor: '#34d399',
    logoSrc: '/logos/aezakmi.svg',
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
      { icon: '📱', iconColor: '#34d399', name: '8 приложений', desc: { ru: 'iOS/Android, iGaming', en: 'iOS/Android, iGaming' } },
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
        'Дизайн-система с нуля — 5+ сотрудников',
        'Редизайн корпоративного сайта',
        'Внутренняя система мониторинга стройки',
      ],
      en: [
        'Design system from scratch — 5+ employees',
        'Corporate website redesign',
        'Internal construction monitoring system',
      ],
    },
    products: [
      { icon: 'М', iconColor: '#f87171', name: 'Система мониторинга', desc: { ru: 'Внутренняя платформа', en: 'Internal platform' } },
      { icon: 'S', iconColor: '#fca5a5', name: 'Корпоративный сайт', desc: { ru: 'Редизайн', en: 'Redesign' } },
    ],
  },
];
