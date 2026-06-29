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
      typewriter: ['Продуктовый дизайнер', 'UX/UI дизайнер', 'Дизайнер интерфейсов', 'Более 7 лет опыта'],
      description: 'UX/UI-дизайнер | Продуктовый дизайнер с опытом более 7 лет и техническим бэкграундом (ИТМО). Проектирую от CJM до дизайн-систем. Работаю с метриками, AI и управляю дизайн-процессом.',
      ctaPrimary: 'Связаться со мной',
      ctaSecondary: 'Смотреть проекты',
    },
    myself: {
      label: 'Я',
      lines: [
        'Делаю продукты, которые двигают метрики.',
        'Более 7 лет опыта. Технический бэкграунд.',
        'От исследования до релиза.',
        'AI · SaaS · Mobile · TG MiniApps.',
        'Веду команды и процессы.',
      ],
      photoAlt: 'Максим Сорокин',
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
      sub: 'Более 7 лет · 5 компаний + фриланс',
      role: 'Роль',
      metrics: 'Метрики',
      thisSite: 'Этот сайт',
    },
    techStack: {
      title: 'Современный стек',
      label: 'Профессионально владею',
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
      experience: 'Более 7 лет опыта, СПб',
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
      typewriter: ['Product Designer', 'UX/UI Designer', 'Interface Designer', 'Over 7 years of experience'],
      description: 'UX/UI Designer | Product Designer with over 7 years of experience and technical background (ITMO). I design from CJM to design systems. I work with metrics, AI, and manage the design process.',
      ctaPrimary: 'Get in touch',
      ctaSecondary: 'View projects',
    },
    myself: {
      label: 'ME',
      lines: [
        'Building products that move metrics.',
        'Over 7 years of experience. Technical background.',
        'From research to release.',
        'AI · SaaS · Mobile · TG MiniApps.',
        'I lead teams and processes.',
      ],
      photoAlt: 'Maxim Sorokin',
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
      sub: 'Over 7 years · 5 companies + freelance',
      role: 'Role',
      metrics: 'Metrics',
      thisSite: 'This site',
    },
    techStack: {
      title: 'Modern Tech Stack',
      label: 'Professional at',
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
      experience: 'Over 7 years, Saint Petersburg',
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
  coverImages?: string[];
  coverImageLight?: string;
  /** Обложка для карточки в листинге /projects (если отличается от main).
   *  Используется когда featured-проект показывается и на главной (где
   *  обложка одна), и в категорийном листинге (где нужна другая обложка). */
  listCoverImage?: string;
  listCoverImageLight?: string;
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
  isProduct?: boolean;
  productTags?: string[];
  /** PC-only thumb for the sidecar card slot (2nd card in 5-card grid). */
  sidecarPcThumb?: { dark: string; light: string };
  cases?: CaseStudy[];
}

export interface CaseDecision {
  problem: { ru: string; en: string };
  solution: { ru: string; en: string };
  why: { ru: string; en: string };
  result: { ru: string; en: string };
}

export interface CaseStudy {
  slug: string;
  featured?: boolean;
  name: { ru: string; en: string };
  /** Короткое описание для карточки кейса на главной (не обрезается). */
  cardDesc?: { ru: string; en: string };
  context?: { ru: string; en: string };
  problem?: { ru: string; en: string };
  users?: { ru: string; en: string };
  constraints?: { ru: string[]; en: string[] };
  keyDecisions?: CaseDecision[];
  beforeAfter?: { before: { ru: string; en: string }; after: { ru: string; en: string } };
  /** Переопределяет лейбл "до" на слайдерах сравнения (по умолчанию "Первая итерация"). */
  compareBeforeLabel?: { ru: string; en: string };
  gallery?: { title: { ru: string; en: string }; image?: string }[];
  /** Сколько скринов показывать в галерее (screen-1..N.jpg). По умолчанию 3. */
  galleryCount?: number;
  results?: { ru: string[]; en: string[] };
  difficulties?: { ru: string; en: string };
  conclusion?: { ru: string; en: string };
  task?: { ru: string; en: string };
  solution?: { ru: string; en: string };
}

export const projects: Project[] = [
  // FEATURED
  {
    slug: 'okk-pro',
    category: 'saas',
    featured: true,
    isProduct: true,
    productTags: ['B2B', 'AI', 'SaaS', 'Web'],
    sidecarPcThumb: { dark: '/projects/okk-pro/thumb-pc-dark.jpg', light: '/projects/okk-pro/thumb-pc-light.jpg' },
    color: 'linear-gradient(135deg, #1a2b4a 0%, #2a1f3f 50%, #0a1a2a 100%)',
    coverImage: '/projects/iywi.png',
    /* На странице /projects карточка использует прикрепленные скрины дашборда
       iywi. ⚠ Бинарные вложения из чата я сохранить не могу, сейчас оба
       варианта указывают на существующий iywi.png. Чтобы включить смену
       темы, сохраните файлы как:
         /public/projects/iywi-dark.png  (вариант с тёмным window-chrome)
         /public/projects/iywi-light.png (вариант со светлым window-chrome)
       и поменяйте пути ниже. */
    listCoverImage: '/projects/iywi-dark.jpg',
    listCoverImageLight: '/projects/iywi-light.jpg',
    logo: 'IY',
    logoColor: '#4fa3ff',
    behanceUrl: 'https://www.behance.net/gallery/247519813/IYWI-B2B-Medical-SaaS-UXUI-Design',
    year: '2025-2026',
    company: { ru: 'УК Медицина', en: 'UK Medicina' },
    name: { ru: 'IYWI (OKK.PRO)', en: 'IYWI (OKK.PRO)' },
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
      ru: 'AI SaaS-платформа для анализа качества консультаций врачей в стоматологических клиниках. Lead-дизайнер в команде 6+ разработчиков и PM.',
      en: 'AI SaaS platform for analyzing doctor consultation quality in dental clinics. Lead designer in a team of 6+ developers and a PM.',
    },
    role: { ru: 'Продуктовый дизайнер / Продакт менеджер', en: 'Product Designer / Product Manager' },
    duration: { ru: '8 месяцев (сент 2025 - апр 2026)', en: '8 months (Sep 2025 - Apr 2026)' },
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
      ru: 'Отвечал за полный цикл Product Design: Discovery, UX Research, Prototyping, Delivery и post-release оптимизацию. Спроектировал Information Architecture, User Flows и ключевые сценарии MVP для 4 ролей пользователей. Создал дизайн-систему с component library и UI Kit для команды 6+ разработчиков, сократив выход новых фич на 2 недели. Разработал web-версию продукта с нуля и адаптировал под iOS и Android. Провёл 8 A/B-тестов и usability-testing гипотез: retention вырос на 15% за 2 месяца. Применял data-driven подход и продуктовую аналитику для оптимизации activation-flow. Выполнял handoff, Design QA и дизайн-ревью, снизив UI-несоответствия после релизов на 60%. Интегрировал AI tools в процессы UX Research, генерации гипотез и прототипирования.',
      en: 'Responsible for the full Product Design cycle: Discovery, UX Research, Prototyping, Delivery, and post-release optimization. Designed Information Architecture, User Flows, and key MVP scenarios for 4 user roles. Built a design system with component library and UI Kit for a team of 6+ developers, reducing new feature delivery by 2 weeks. Developed the web product from scratch and adapted it for iOS and Android. Conducted 8 A/B tests and usability testing: user retention grew by 15% in 2 months. Applied data-driven approach and product analytics to optimize activation flows. Performed handoff, Design QA, and design reviews, reducing UI discrepancies after releases by 60%. Integrated AI tools into UX Research, hypothesis generation, and prototyping.',
    },
    keyFeatures: {
      ru: [
        'Полный цикл Product Design',
        'Information Architecture + User Flows (4 роли)',
        'Дизайн-система + component library',
        'Веб + iOS + Android',
        '8 A/B-тестов, usability-testing',
        'Design QA + handoff',
        'AI tools в процессе',
      ],
      en: [
        'Full Product Design cycle',
        'Information Architecture + User Flows (4 roles)',
        'Design system + component library',
        'Web + iOS + Android',
        '8 A/B tests, usability testing',
        'Design QA + handoff',
        'AI tools in the process',
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
      ru: 'Полный цикл от Discovery до post-release оптимизации в сложном B2B AI-продукте. Дизайн-система сократила время выхода фич на 2 недели, A/B тесты подняли retention на 15%, а Design QA снизил UI-несоответствия на 60%.',
      en: 'Full cycle from Discovery to post-release optimization in a complex B2B AI product. Design system reduced feature delivery by 2 weeks, A/B tests raised retention by 15%, and Design QA reduced UI discrepancies by 60%.',
    },
    cases: [
      {
        slug: 'curator-dashboard',
        featured: true,
        name: { ru: 'Дэшборд куратора и врача', en: 'Curator & Doctor Dashboard' },
        context: {
          ru: 'Продукт находился на стадии идеи. Не существовало понимания того, какие данные должны видеть пользователи и как должна выглядеть главная точка входа в систему.',
          en: 'The product was at the idea stage. There was no understanding of what data users should see and how the main entry point to the system should look.',
        },
        users: {
          ru: 'Врачи, кураторы лечения, РОП, главврачи',
          en: 'Doctors, treatment curators, head of sales, chief physicians',
        },
        problem: {
          ru: 'Пользователи не понимали: сколько заработали, сколько осталось до выполнения плана, какие навыки требуют улучшения, какое обучение необходимо пройти.',
          en: 'Users did not understand: how much they earned, how much was left to reach the plan, which skills needed improvement, what training they needed to complete.',
        },
        constraints: {
          ru: ['Основная аудитория использовала мобильные устройства', 'Все решения должны были легко адаптироваться под мобильные платформы'],
          en: ['The main audience used mobile devices', 'All solutions had to be easily adaptable for mobile platforms'],
        },
        keyDecisions: [
          {
            problem: { ru: 'Пользователи не понимали, сколько заработали и выполняется ли план', en: 'Users did not understand how much they earned and whether the plan was on track' },
            solution: { ru: 'Финансовый модуль вынесен в верхнюю часть дэшборда как главный блок', en: 'Financial module placed at the top of the dashboard as the main block' },
            why: { ru: 'Финансы - самый сильный ежедневный мотиватор для входа в систему', en: 'Finances are the strongest daily motivator for entering the system' },
            result: { ru: 'Пользователи получили ежедневный повод открывать приложение', en: 'Users got a daily reason to open the app' },
          },
          {
            problem: { ru: 'Врачи не видели обратную связь по своим последним консультациям', en: 'Doctors did not see feedback on their latest consultations' },
            solution: { ru: 'Блок аналитики последних консультаций с оценкой прямо на дэшборде', en: 'Recent consultation analytics block with rating directly on the dashboard' },
            why: { ru: 'Свежая обратная связь важнее исторической статистики. Она актуальна и применима прямо сейчас', en: 'Fresh feedback matters more than historical stats. It\'s relevant and applicable right now' },
            result: { ru: 'Врачи сразу видят что нужно улучшить после последней консультации', en: 'Doctors immediately see what to improve after their latest consultation' },
          },
          {
            problem: { ru: 'Непонятно что и когда учить. Курсы не были связаны с реальными навыками', en: 'Unclear what and when to study. Courses were not tied to actual skills' },
            solution: { ru: 'Рекомендации по обучению формируются на основе слабых мест из аналитики консультаций', en: 'Learning recommendations are generated based on weak points from consultation analytics' },
            why: { ru: 'Персонализированное обучение эффективнее общих курсов. Пользователь понимает зачем он это изучает', en: 'Personalized learning is more effective than general courses. The user understands why they\'re studying' },
            result: { ru: 'Обучение стало контекстуальным и привязанным к реальной практике', en: 'Learning became contextual and tied to real practice' },
          },
          {
            problem: { ru: 'Разные роли требовали разных акцентов. Врачи и кураторы видят продукт по-разному', en: 'Different roles required different emphasis. Doctors and curators see the product differently' },
            solution: { ru: 'Единый адаптивный дэшборд с ролевыми акцентами вместо разных интерфейсов', en: 'A single adaptive dashboard with role-based emphasis instead of separate interfaces' },
            why: { ru: 'Единая кодовая база и меньше точек поддержки, при этом каждая роль видит релевантные данные', en: 'Single codebase and fewer support points, while each role sees relevant data' },
            result: { ru: 'Оба типа пользователей работают в одной системе без потери контекста', en: 'Both user types work in the same system without losing context' },
          },
        ],
        beforeAfter: {
          before: { ru: 'Пользователь работал в нескольких системах и не видел полной картины своей эффективности.', en: 'The user worked in multiple systems and did not see the full picture of their performance.' },
          after: { ru: 'Финансы, аналитика консультаций и рекомендации по обучению объединены в едином интерфейсе.', en: 'Finances, consultation analytics, and learning recommendations are unified in a single interface.' },
        },
        difficulties: {
          ru: 'Множество итераций состава блоков, поиск правильной структуры дэшборда, проработка геймификации и рейтингов.',
          en: 'Many iterations on block composition, finding the right dashboard structure, working out gamification and ratings.',
        },
        results: {
          ru: ['Единая точка входа для всех ролей', 'Ежедневный мотиватор через финансовый модуль', 'Рекомендации по обучению привязаны к навыкам'],
          en: ['Single entry point for all roles', 'Daily motivator through the financial module', 'Learning recommendations tied to skills'],
        },
        conclusion: {
          ru: 'Дэшборд стал центральным хабом продукта. Главный урок: структура данных важнее визуала. Правильные блоки в правильном порядке решают задачу лучше любой анимации.',
          en: 'The dashboard became the product\'s central hub. Key lesson: data structure matters more than visuals. The right blocks in the right order solve the problem better than any animation.',
        },
      },
      {
        slug: 'consultations',
        featured: true,
        name: { ru: 'Работа с консультациями', en: 'Working with Consultations' },
        context: {
          ru: 'Разработка отказалась от автоматического определения пользователей по голосу.',
          en: 'Development abandoned automatic user identification by voice.',
        },
        problem: {
          ru: 'Необходимо было понять, какая консультация принадлежит конкретному врачу или куратору. Особенно сложно это было для кураторов, поскольку консультация могла состоять из нескольких частей.',
          en: 'It was necessary to understand which consultation belongs to a specific doctor or curator. This was especially difficult for curators, since a consultation could consist of several parts.',
        },
        constraints: {
          ru: ['Отсутствовало распознавание по голосу', 'Кураторы не были привязаны к кабинетам', 'Отсутствовали специальные теги'],
          en: ['No voice recognition', 'Curators were not tied to specific rooms', 'No special tags available'],
        },
        keyDecisions: [
          {
            problem: { ru: 'Большой список консультаций без идентификаторов. Найти нужную почти невозможно', en: 'Large list of consultations without identifiers. Nearly impossible to find the right one' },
            solution: { ru: 'Развитая система фильтров по дате, кабинету, продолжительности и статусу', en: 'Advanced filter system by date, room, duration, and status' },
            why: { ru: 'Фильтры работают даже без голосовой идентификации и не требуют изменений в AI-модели', en: 'Filters work even without voice identification and require no changes to the AI model' },
            result: { ru: 'Пользователь сужает список до нескольких записей за секунды', en: 'User narrows the list to a few records in seconds' },
          },
          {
            problem: { ru: 'Консультация похожа на соседние. Непонятно которая из них нужная', en: 'Consultation looks like adjacent ones. Unclear which is the right one' },
            solution: { ru: 'Контекстные подсказки из транскрипта прямо в карточке консультации', en: 'Contextual hints from the transcript directly in the consultation card' },
            why: { ru: 'Фрагменты речи уникальны и помогают идентифицировать запись без дополнительных метаданных', en: 'Speech fragments are unique and help identify a record without additional metadata' },
            result: { ru: 'Пользователь распознаёт нужную консультацию по содержанию разговора', en: 'User identifies the right consultation by conversation content' },
          },
          {
            problem: { ru: 'Консультация куратора состоит из нескольких частей в разных записях', en: 'Curator\'s consultation consists of several parts in different records' },
            solution: { ru: 'Drag & drop объединение нескольких консультаций в одну сессию', en: 'Drag & drop merging of multiple consultations into one session' },
            why: { ru: 'Ручное объединение даёт точность без сложной AI-логики, которая пока недоступна', en: 'Manual merging provides accuracy without complex AI logic that is not yet available' },
            result: { ru: 'Кураторы могут собрать полную картину своей консультации из частей', en: 'Curators can assemble a complete picture of their consultation from parts' },
          },
          {
            problem: { ru: 'Пользователь не знает с чего начать поиск в незнакомом интерфейсе', en: 'User does not know where to start searching in an unfamiliar interface' },
            solution: { ru: 'Автоматический поиск похожих консультаций по контексту текущей записи', en: 'Automatic search for similar consultations based on the current record\'s context' },
            why: { ru: 'Система должна направлять пользователя, а не ждать пока он сам разберётся', en: 'The system should guide the user rather than wait for them to figure it out' },
            result: { ru: 'Пользователь находит связанные записи быстрее через автоматические подсказки', en: 'User finds related records faster through automatic suggestions' },
          },
        ],
        beforeAfter: {
          before: { ru: 'Поиск консультаций происходил вручную среди большого количества похожих записей.', en: 'Consultations were searched manually among a large number of similar records.' },
          after: { ru: 'Контекстные подсказки и система объединения помогли быстро находить нужные консультации.', en: 'Contextual hints and the merging system helped quickly find the right consultations.' },
        },
        difficulties: {
          ru: 'Большие списки похожих консультаций без достаточного количества идентификаторов.',
          en: 'Large lists of similar consultations without sufficient identifiers.',
        },
        results: {
          ru: ['Система фильтров сокращает время поиска', 'Drag & drop объединение частей консультации', 'Контекстные подсказки из транскрипта'],
          en: ['Filter system reduces search time', 'Drag & drop merging of consultation parts', 'Contextual hints from transcript'],
        },
        conclusion: {
          ru: 'Главный урок: когда AI не справляется, дизайн должен восполнить пробел ручными механиками. Хорошо спроектированный UX может компенсировать технические ограничения.',
          en: 'Key lesson: when AI falls short, design must fill the gap with manual mechanics. Well-designed UX can compensate for technical limitations.',
        },
      },
      {
        slug: 'voice-training',
        featured: true,
        name: { ru: 'Голосовые тренажеры и курсы', en: 'Voice Trainers & Courses' },
        context: {
          ru: 'Для обучения использовались Moodle, iSpring и Lexis Voice.',
          en: 'Moodle, iSpring, and Lexis Voice were used for training.',
        },
        problem: {
          ru: 'Пользователи постоянно переключались между разными платформами. Терялся контекст обучения.',
          en: 'Users constantly switched between different platforms. The learning context was lost.',
        },
        constraints: {
          ru: ['Необходимо было объединить статьи, курсы и тренажеры внутри одной системы'],
          en: ['It was necessary to unite articles, courses, and trainers within one system'],
        },
        keyDecisions: [
          {
            problem: { ru: 'Moodle - внешняя платформа, которая не интегрируется с аналитикой консультаций', en: 'Moodle is an external platform that does not integrate with consultation analytics' },
            solution: { ru: 'Отказ от Moodle в пользу собственной обучающей системы внутри продукта', en: 'Abandoned Moodle in favor of a native learning system inside the product' },
            why: { ru: 'Интеграция позволяет связать обучение с аналитикой и рекомендациями в реальном времени', en: 'Integration allows linking learning with real-time analytics and recommendations' },
            result: { ru: 'Обучение стало частью продукта, а не отдельным инструментом', en: 'Learning became part of the product, not a separate tool' },
          },
          {
            problem: { ru: 'Разрозненные материалы в разных форматах и местах', en: 'Scattered materials in different formats and locations' },
            solution: { ru: 'Единая система курсов внутри платформы с единым стилем и навигацией', en: 'Unified course system inside the platform with consistent style and navigation' },
            why: { ru: 'Единая среда снижает когнитивную нагрузку и ускоряет обучение', en: 'A unified environment reduces cognitive load and accelerates learning' },
            result: { ru: 'Пользователи не выходят из продукта для обучения', en: 'Users do not leave the product to study' },
          },
          {
            problem: { ru: 'Непонятно какой курс пройти следующим и почему', en: 'Unclear which course to take next and why' },
            solution: { ru: 'Рекомендации курсов формируются на основе слабых навыков из аналитики консультаций', en: 'Course recommendations are generated based on weak skills from consultation analytics' },
            why: { ru: 'Связь между практикой и обучением делает курсы актуальными, а не абстрактными', en: 'The link between practice and learning makes courses relevant rather than abstract' },
            result: { ru: 'Пользователь понимает зачем проходит конкретный курс прямо сейчас', en: 'User understands why they are taking a specific course right now' },
          },
          {
            problem: { ru: 'Обучающие материалы выглядят скучно и не соответствуют стилю продукта', en: 'Training materials look boring and do not match the product style' },
            solution: { ru: 'Более 60 уникальных иллюстраций, разработанных специально для курсов', en: 'Over 60 unique illustrations created specifically for the courses' },
            why: { ru: 'Визуальное вовлечение увеличивает время в курсе и снижает отказы', en: 'Visual engagement increases time in course and reduces dropouts' },
            result: { ru: 'Курсы выглядят как продуктовый контент, а не как корпоративная документация', en: 'Courses look like product content, not corporate documentation' },
          },
        ],
        beforeAfter: {
          before: { ru: 'Обучение происходило в нескольких системах: Moodle, iSpring и Lexis Voice.', en: 'Learning took place across multiple systems: Moodle, iSpring, and Lexis Voice.' },
          after: { ru: 'Все образовательные сценарии стали частью единой платформы с единым стилем.', en: 'All educational scenarios became part of a unified platform with a consistent style.' },
        },
        difficulties: {
          ru: 'Необходимо было убедить команду отказаться от Moodle и реализовать обучение внутри продукта.',
          en: 'It was necessary to convince the team to abandon Moodle and implement learning inside the product.',
        },
        results: {
          ru: ['Единая обучающая система внутри продукта', 'Рекомендации курсов на основе навыков из аналитики', 'Более 60 уникальных иллюстраций'],
          en: ['Unified learning system inside the product', 'Course recommendations based on analytics skills', 'Over 60 unique illustrations'],
        },
        conclusion: {
          ru: 'Интеграция обучения в продукт - это не просто удобство, это стратегическое решение. Когда рекомендация курса появляется сразу после анализа консультации, пользователь видит прямую связь между практикой и развитием.',
          en: 'Integrating learning into the product is not just convenience. It\'s a strategic decision. When a course recommendation appears right after consultation analysis, the user sees a direct link between practice and growth.',
        },
      },
      {
        slug: 'doctor-dashboard',
        featured: false,
        name: { ru: 'Функционал РОПа и главврача', en: 'Head of Sales & Chief Physician Tools' },
        cardDesc: { ru: 'Дашборды, аналитика, отчёты и управление командой.', en: 'Dashboards, analytics, reports, and team management.' },
        context: { ru: 'РОПу и главврачу нужен сводный контроль над работой команды: дашборды с ключевыми показателями, аналитика по консультациям, отчёты и инструменты управления командой.', en: 'The head of sales and the chief physician need consolidated control over the team: dashboards with key metrics, consultation analytics, reports, and team management tools.' },
        task: { ru: 'Спроектировать функционал для РОПа и главврача: дашборды, аналитику, отчёты и управление командой в единой дизайн-системе.', en: 'Design functionality for the head of sales and the chief physician: dashboards, analytics, reports, and team management within a unified design system.' },
        solution: { ru: 'Разработал ролевые рабочие пространства: дашборды с KPI, детальную аналитику по консультациям и навыкам, выгружаемые отчёты и блок управления командой - распределение нагрузки, контроль и обучение.', en: 'Built role-based workspaces: KPI dashboards, detailed consultation and skill analytics, exportable reports, and a team management block - workload distribution, control, and training.' },
        results: { ru: ['Единый интерфейс под роли РОПа и главврача', 'Дашборды, аналитика, отчёты и управление командой', 'Ролевые акценты без дублирования компонентов'], en: ['Unified interface for head of sales and chief physician roles', 'Dashboards, analytics, reports, and team management', 'Role-based emphasis without component duplication'] },
        conclusion: { ru: 'Ролевая адаптация доказала ценность единой дизайн-системы: смена акцентов для РОПа и главврача не требовала новых компонентов.', en: 'Role-based adaptation proved the value of a unified design system: shifting emphasis for the head of sales and the chief physician required no new components.' },
      },
      {
        slug: 'director-dashboard',
        featured: false,
        name: { ru: 'Функционал Руководителя', en: 'Executive & Owner Tools' },
        cardDesc: { ru: 'Админ-панель с данными по врачам и кураторам, мониторингом устройств и финансами по сети.', en: 'Admin panel with doctor and curator data, device monitoring, and network finances.' },
        context: { ru: 'Руководителю нужен сводный обзор сразу по врачам и кураторам и мониторинг записывающих устройств в кабинетах. Владельцу сети - показатели по всей сети клиник и по отдельным филиалам. По сути админ-панель с финансовой аналитикой.', en: 'A manager needs a consolidated view across both doctors and curators plus monitoring of the recording devices in the offices. A network owner needs metrics across the entire clinic network and by individual branches - essentially an admin panel with financial analytics.' },
        task: { ru: 'Спроектировать админ-панель руководителя: сводные данные по врачам и кураторам, мониторинг устройств в кабинетах и финансовую аналитику по сети и филиалам.', en: 'Design a manager admin panel: consolidated data across doctors and curators, in-office device monitoring, and financial analytics across the network and branches.' },
        solution: { ru: 'Многоуровневая аналитика: сеть → филиал → сотрудник (врач или куратор). Добавил мониторинг записывающих устройств в кабинетах и финансовый блок. Владелец видит показатели по всей сети и детализирует до конкретного филиала или человека.', en: 'Multi-level analytics: network → branch → employee (doctor or curator). Added monitoring of in-office recording devices and a financial block. The owner sees network-wide metrics and can drill down to a specific branch or person.' },
        results: { ru: ['Сводные данные по врачам и кураторам', 'Мониторинг записывающих устройств в кабинетах', 'Финансовая аналитика по сети и филиалам', 'Детализация сеть → филиал → сотрудник'], en: ['Consolidated data across doctors and curators', 'Monitoring of in-office recording devices', 'Financial analytics across network and branches', 'Drill-down network → branch → employee'] },
        conclusion: { ru: 'Иерархическая аналитика с финансовым блоком и мониторингом устройств - ключевой инструмент для масштабирования продукта на сети клиник.', en: 'Hierarchical analytics with a financial block and device monitoring is a key tool for scaling the product to clinic networks.' },
      },
    ],
  },

  // MOBILE
  {
    slug: 'hobbist',
    category: 'mobile',
    isProduct: true,
    productTags: ['B2C', 'Mobile', 'iOS · Android'],
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
      ru: 'Dating-продукт в Telegram Mini Apps и web-платформа для знакомств по хобби и интересам.',
      en: 'Dating product in Telegram Mini Apps and web platform for matching by hobbies and interests.',
    },
    role: { ru: 'Ведущий продуктовый дизайнер', en: 'Lead Product Designer' },
    duration: { ru: '1 год (сент 2024 - сент 2025)', en: '1 year (Sep 2024 - Sep 2025)' },
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
      ru: 'Руководил командой 3 дизайнеров: менторство, дизайн-ревью, выстраивание процессов. Отвечал за Product Discovery и UX-проектирование с нуля: onboarding-flow, User Flows и key user journeys для mobile и web. Разработал 50+ экранов MVP и компонентную дизайн-систему, сократив время выхода новых фич на 1–2 недели. Провёл UX-исследования: глубинные интервью, CJM-анализ, usability-testing. Оптимизировал activation-сценарии на основе продуктовых метрик и A/B тестирования. Подготавливал интерактивные прототипы, проводил handoff и сопровождал delivery.',
      en: 'Led a team of 3 designers: mentoring, design reviews, workflow setup. Responsible for Product Discovery and UX design from scratch: onboarding flow, User Flows, and key user journeys for mobile and web. Built 50+ MVP screens and a component design system, reducing new feature delivery by 1–2 weeks. Conducted UX research: in-depth interviews, CJM analysis, usability testing. Optimized activation scenarios using product metrics and A/B testing. Prepared interactive prototypes, conducted handoff, and supported the delivery process.',
    },
    keyFeatures: {
      ru: ['Product Discovery + UX Research', 'Руководство командой 3 дизайнеров', '50+ экранов MVP', 'Компонентная дизайн-система', 'A/B тестирование', 'TG Mini Apps + Web'],
      en: ['Product Discovery + UX Research', 'Team Lead (3 designers)', '50+ MVP screens', 'Component design system', 'A/B testing', 'TG Mini Apps + Web'],
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
      ru: 'HOBBIST доказал, что Telegram - перспективная платформа для социальных продуктов. Компонентная дизайн-система и кросс-платформенный подход позволили быстро масштабировать MVP и повысить вовлечённость пользователей.',
      en: 'HOBBIST proved that Telegram is a promising platform for social products. A component design system and cross-platform approach enabled rapid MVP scaling and increased user engagement.',
    },
    cases: [
      {
        slug: 'interests-library',
        featured: true,
        name: { ru: 'Библиотека интересов', en: 'Interests Library' },
        context: {
          ru: 'Продукт создавался с нуля. Основная идея - знакомства через увлечения.',
          en: 'The product was built from scratch. The core idea is dating through shared interests.',
        },
        users: {
          ru: 'Пользователи 18–35 лет, ищущие глубокое общение через общие интересы в кино, музыке и книгах',
          en: 'Users aged 18–35 looking for deep connections through shared interests in film, music, and books',
        },
        problem: {
          ru: 'Существующие дейтинг-продукты строят подбор пользователей через возраст, расстояние и фотографии. Глубина интересов не учитывается.',
          en: 'Existing dating products match users by age, distance, and photos. The depth of interests is not considered.',
        },
        constraints: {
          ru: ['Telegram Mini Apps имеет ограниченный набор UI-компонентов', 'Нельзя использовать нативные элементы платформы'],
          en: ['Telegram Mini Apps has a limited set of UI components', 'Native platform elements cannot be used'],
        },
        keyDecisions: [
          {
            problem: { ru: 'Одна библиотека интересов не отражает многогранность пользователя', en: 'A single interest library does not reflect the multifaceted nature of the user' },
            solution: { ru: 'Пять отдельных библиотек: фильмы, книги, музыка, игры, медиа с единым интерфейсом, который легко масштабировать и расширять в будущем', en: 'Five separate libraries: films, books, music, games, media with a unified interface that is easy to scale and expand in the future' },
            why: { ru: 'Разные медиа создают разные точки для разговора и лучше раскрывают личность', en: 'Different media create different conversation starters and better reveal personality' },
            result: { ru: 'Пользователи заполняют профиль через знакомое потребление контента', en: 'Users fill out their profile through familiar content consumption' },
          },
          {
            problem: { ru: 'Текстовые описания субъективны и неинформативны при мэтчинге', en: 'Text descriptions are subjective and uninformative for matching' },
            solution: { ru: 'Оценки и рецензии к каждому фильму, альбому и книге', en: 'Ratings and reviews for each film, album, and book' },
            why: { ru: 'Структурированные оценки дают алгоритму числовые данные для сравнения вкусов', en: 'Structured ratings give the algorithm numerical data for comparing tastes' },
            result: { ru: 'Мэтчинг стал основан на реальных предпочтениях, а не самоописании', en: 'Matching became based on real preferences, not self-description' },
          },
          {
            problem: { ru: 'Заполнение библиотеки с нуля занимает много времени и снижает конверсию', en: 'Filling the library from scratch takes a long time and reduces conversion' },
            solution: { ru: 'Импорт интересов из внешних источников: история просмотров, любимые исполнители', en: 'Import interests from external sources: viewing history, favorite artists' },
            why: { ru: 'Пользователи уже записали свои интересы в других сервисах. Не надо делать это заново', en: 'Users have already recorded their interests in other services. No need to do it again' },
            result: { ru: 'Время заполнения профиля сократилось, конверсия онбординга выросла', en: 'Profile completion time reduced, onboarding conversion increased' },
          },
          {
            problem: { ru: 'Библиотека должна быть полезна не только для мэтчинга, но и как личный архив', en: 'The library should be useful not only for matching but also as a personal archive' },
            solution: { ru: 'Библиотека как самостоятельная ценность: персональный каталог с историей', en: 'Library as standalone value: personal catalog with history' },
            why: { ru: 'Пользователи возвращаются в приложение не только ради дейтинга, но и ради своего контента', en: 'Users return to the app not only for dating but also for their own content' },
            result: { ru: 'Retention вырос. Библиотека стала ежедневным сценарием использования', en: 'Retention grew. The library became a daily usage scenario' },
          },
        ],
        beforeAfter: {
          before: { ru: 'Пользователь мог рассказать о себе только через текстовое описание.', en: 'The user could only describe themselves through a text description.' },
          after: { ru: 'Появилась структурированная система интересов, используемая для мэтчинга и как личный архив.', en: 'A structured interest system appeared, used for matching and as a personal archive.' },
        },
        difficulties: {
          ru: 'Изучение новой предметной области и проектирование под Telegram Mini Apps с ограниченным набором UI-паттернов.',
          en: 'Exploring a new domain and designing for Telegram Mini Apps with a limited set of UI patterns.',
        },
        results: {
          ru: ['Пять библиотек: фильмы, книги, музыка, игры, медиа — легко масштабируются', 'Оценки и рецензии для структурированного мэтчинга', 'Импорт интересов из внешних источников'],
          en: ['Five libraries: films, books, music, games, media — easily scalable', 'Ratings and reviews for structured matching', 'Interest import from external sources'],
        },
        galleryCount: 2,
        conclusion: {
          ru: 'Библиотека интересов - ключевой инсайт продукта: люди легче рассказывают о себе через любимый контент, чем через анкеты. Это снижает барьер входа и делает данные для мэтчинга богаче.',
          en: 'The interest library is the product\'s key insight: people find it easier to describe themselves through favorite content than through questionnaires. This lowers the entry barrier and enriches matching data.',
        },
      },
      {
        slug: 'interest-matching',
        featured: true,
        name: { ru: 'Мэтчинг по интересам', en: 'Interest Matching' },
        context: {
          ru: 'Необходимо было сохранить привычный сценарий дейтинга и одновременно показать уникальность продукта.',
          en: 'It was necessary to preserve the familiar dating scenario while showcasing the product\'s uniqueness.',
        },
        users: {
          ru: 'Пользователи, которые хотят найти собеседника с похожими вкусами, а не просто привлекательного незнакомца',
          en: 'Users who want to find someone with similar tastes, not just an attractive stranger',
        },
        problem: {
          ru: 'Пользователи быстро теряют темы для общения после мэтча. Поверхностные совпадения не создают глубоких связей.',
          en: 'Users quickly run out of conversation topics after a match. Superficial matches do not create deep connections.',
        },
        constraints: {
          ru: ['Карточка мэтчинга должна загружаться мгновенно', 'Нельзя перегружать экран, решение принимается за секунды'],
          en: ['The matching card must load instantly', 'Cannot overload the screen, a decision is made in seconds'],
        },
        keyDecisions: [
          {
            problem: { ru: 'Пользователь видит незнакомца и не знает с чего начать разговор', en: 'User sees a stranger and does not know where to start a conversation' },
            solution: { ru: 'Процент совпадения интересов вынесен на карточку мэтчинга как главная метрика', en: 'Interest match percentage is featured on the matching card as the main metric' },
            why: { ru: 'Конкретная цифра даёт контекст для первого сообщения и создаёт точку разговора', en: 'A specific number provides context for the first message and creates a conversation starter' },
            result: { ru: 'Первое сообщение стало начинаться с обсуждения общих интересов, а не дежурных фраз', en: 'The first message began with discussing shared interests rather than generic phrases' },
          },
          {
            problem: { ru: 'Подробная информация мешает быстрому принятию решения', en: 'Detailed information interferes with quick decision-making' },
            solution: { ru: 'Минималистичная карточка: фото, имя, процент совпадения и три топ-интереса', en: 'Minimalist card: photo, name, match percentage, and three top interests' },
            why: { ru: 'Дейтинг - это сначала импульс, потом анализ. Деталям место на следующем экране', en: 'Dating is first impulse, then analysis. Details belong on the next screen' },
            result: { ru: 'Скорость принятия решений выросла без потери качества мэтчинга', en: 'Decision-making speed increased without loss of match quality' },
          },
          {
            problem: { ru: 'После мэтча непонятно что объединяет двух людей', en: 'After a match it\'s unclear what unites two people' },
            solution: { ru: 'Детализированный профиль с разбивкой совпадений по категориям: кино, музыка, книги', en: 'Detailed profile with match breakdown by category: film, music, books' },
            why: { ru: 'Категорийный анализ даёт конкретные темы для разговора вместо абстрактной совместимости', en: 'Category analysis provides specific conversation topics instead of abstract compatibility' },
            result: { ru: 'Пользователи находят темы для разговора до первого сообщения', en: 'Users find conversation topics before sending the first message' },
          },
          {
            problem: { ru: 'Сложно понять насколько глубоко совпадают вкусы. Процент не всё объясняет', en: 'Hard to understand how deeply tastes align. A percentage doesn\'t explain everything' },
            solution: { ru: 'Экран сравнения интересов: что совпадает и в чём различия', en: 'Interest comparison screen: what matches and where differences lie' },
            why: { ru: 'Различия интересны не меньше совпадений. Они создают почву для новых открытий', en: 'Differences are just as interesting as matches. They create ground for new discoveries' },
            result: { ru: 'Разговор стал начинаться как с точек совпадения, так и с точек различия', en: 'Conversations began starting from both match points and difference points' },
          },
        ],
        beforeAfter: {
          before: { ru: 'Выбор происходил по фотографии и короткому текстовому описанию.', en: 'Selection was based on a photo and a short text description.' },
          after: { ru: 'Появился подбор на основе совместимости интересов с конкретными темами для первого разговора.', en: 'Matching based on interest compatibility appeared, with specific topics for the first conversation.' },
        },
        difficulties: {
          ru: 'Поиск баланса между количеством информации на карточке и скоростью принятия решения.',
          en: 'Finding the balance between the amount of information on the card and the speed of decision-making.',
        },
        results: {
          ru: ['Процент совпадения как главная метрика мэтча', 'Детализированный профиль с разбивкой по категориям', 'Экран сравнения интересов'],
          en: ['Match percentage as the main metric', 'Detailed profile with category breakdown', 'Interest comparison screen'],
        },
        conclusion: {
          ru: 'Мэтчинг через интересы доказал: люди хотят не просто красивое лицо, а точку входа в разговор. Правильная структура данных создаёт этот контекст автоматически.',
          en: 'Interest-based matching proved: people want not just an attractive face, but an entry point into conversation. The right data structure creates this context automatically.',
        },
        galleryCount: 2,
      },
      {
        slug: 'onboarding',
        featured: false,
        name: { ru: 'Онбординг', en: 'Onboarding' },
        context: { ru: 'Пользователь заходил в приложение впервые и не понимал чем оно отличается от обычного дейтинга.', en: 'User opened the app for the first time and did not understand how it differed from regular dating.' },
        task: { ru: 'Спроектировать онбординг, который объясняет концепцию и мотивирует заполнить библиотеку интересов.', en: 'Design an onboarding that explains the concept and motivates users to fill their interest library.' },
        solution: { ru: 'Короткий онбординг, прохождение которого занимает несколько минут, с акцентом на уникальность мэтчинга по интересам, затем сразу переход к заполнению библиотеки.', en: 'A short onboarding that takes a few minutes to complete, emphasizing the uniqueness of interest-based matching, then immediate transition to filling the library.' },
        results: { ru: ['Конверсия онбординга выросла на 25%', 'Пользователи понимают концепцию до первого мэтча'], en: ['Onboarding conversion grew by 25%', 'Users understand the concept before the first match'] },
        conclusion: { ru: 'Онбординг должен продавать концепцию, а не объяснять интерфейс. Лучший онбординг - тот, который быстро ведёт к первому ценному действию.', en: 'Onboarding should sell the concept, not explain the interface. The best onboarding leads quickly to the first valuable action.' },
      },
      {
        slug: 'chats',
        featured: false,
        name: { ru: 'Чаты', en: 'Chats' },
        context: { ru: 'После мэтча пользователям нужно общаться внутри приложения.', en: 'After a match, users need to communicate inside the app.' },
        task: { ru: 'Спроектировать чат с учётом контекста общих интересов и ограничений Telegram Mini Apps.', en: 'Design a chat considering the context of shared interests and Telegram Mini Apps constraints.' },
        solution: { ru: 'Чат с быстрым доступом к профилю мэтча и общим интересам прямо в шапке диалога.', en: 'Chat with quick access to the match profile and shared interests directly in the dialog header.' },
        results: { ru: ['Контекст интересов доступен в чате', 'Быстрый переход к профилю мэтча'], en: ['Interest context available in chat', 'Quick transition to match profile'] },
        conclusion: { ru: 'Хороший чат для дейтинга отличается от мессенджера наличием контекста отношений: кто этот человек и почему вы совпали.', en: 'A good dating chat differs from a messenger by having relationship context: who this person is and why you matched.' },
        galleryCount: 2,
      },
      {
        slug: 'profile',
        featured: false,
        name: { ru: 'Профиль пользователя', en: 'User Profile' },
        context: { ru: 'Профиль является витриной пользователя и основным источником данных для мэтчинга.', en: 'The profile is the user\'s showcase and the primary data source for matching.' },
        task: { ru: 'Спроектировать профиль, который одновременно является визиткой и персональным архивом интересов.', en: 'Design a profile that serves both as a business card and a personal interest archive.' },
        solution: { ru: 'Профиль с двумя режимами: краткая визитка для мэтчинга и полный архив интересов с рецензиями.', en: 'Profile with two modes: a brief business card for matching and a full interest archive with reviews.' },
        results: { ru: ['Профиль работает и как визитка, и как архив', 'Интересы структурированы по категориям'], en: ['Profile works both as a business card and as an archive', 'Interests structured by category'] },
        conclusion: { ru: 'Профиль в дейтинг-приложении - это не резюме, а живой артефакт интересов. Чем богаче данные, тем точнее мэтчинг.', en: 'A profile in a dating app is not a resume but a living artifact of interests. The richer the data, the more accurate the matching.' },
        galleryCount: 2,
      },
    ],
  },


  // SAAS
  {
    slug: 'smetter',
    category: 'saas',
    isProduct: true,
    productTags: ['B2B', 'SaaS', 'Construction'],
    sidecarPcThumb: { dark: '/projects/smetter/thumb-pc-dark.jpg', light: '/projects/smetter/thumb-pc-light.jpg' },
    color: 'linear-gradient(135deg, #1e40af 0%, #0ea5e9 50%, #38bdf8 100%)',
    coverImage: '/projects/buildit-dark.jpg',
    coverImageLight: '/projects/buildit-light.jpg',
    logo: 'BI',
    logoColor: '#1a5f4a',
    behanceUrl: 'https://www.behance.net/gallery/232621029/BuildIT-SAAS-System-UXUI-Design',
    year: '2024',
    company: { ru: 'Сметтер', en: 'Smetter' },
    name: { ru: 'BuildIT (Сметтер)', en: 'BuildIT (Smetter)' },
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
      ru: 'SaaS-платформа для автоматизации строительного бизнеса: закупки, задачи, обмеры, финансы. Веб + iOS/Android.',
      en: 'SaaS platform for construction business automation: procurement, tasks, measurements, finance. Web + iOS/Android.',
    },
    role: { ru: 'Продуктовый дизайнер', en: 'Product Designer' },
    duration: { ru: '4 месяца (июн - сент 2024)', en: '4 months (Jun - Sep 2024)' },
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
      ru: 'Проектировал сложные B2B-интерфейсы: CRM-модули и internal tools для web, iOS и Android. Разрабатывал Information Architecture, User Flows и UX-сценарии для новых модулей платформы. Спроектировал SaaS-модули закупок, задач и обмеров с нуля, упростив внутренние бизнес-процессы пользователей. Работал с data-heavy интерфейсами: таблицы, фильтры, dashboard-сценарии и multi-step workflows. Улучшил NPS продукта с 35 до 62 после редизайна ключевых модулей. Развивал дизайн-систему для web и mobile, ускорив передачу в разработку на 25%.',
      en: 'Designed complex B2B interfaces: CRM modules and internal tools for web, iOS, and Android. Developed Information Architecture, User Flows, and UX scenarios for new platform modules. Designed SaaS modules for procurement, tasks, and measurements from scratch, simplifying internal business processes. Worked with data-heavy interfaces: tables, filters, dashboard scenarios, and multi-step workflows. Improved product NPS from 35 to 62 after key module redesign. Developed the design system for web and mobile, accelerating handoff to development by 25%.',
    },
    keyFeatures: {
      ru: ['B2B-интерфейсы (web, iOS, Android)', 'Information Architecture + User Flows', 'Data-heavy интерфейсы', 'Модули закупок, задач, обмеров', 'Единая дизайн-система'],
      en: ['B2B interfaces (web, iOS, Android)', 'Information Architecture + User Flows', 'Data-heavy interfaces', 'Procurement, Tasks, Measurements', 'Unified design system'],
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
      ru: 'Редизайн ключевых B2B-модулей и системная работа с data-heavy интерфейсами подняли NPS с 35 до 62. Единая дизайн-система обеспечила предсказуемость разработки и 100% приёмку макетов.',
      en: 'Redesigning key B2B modules and systematic work with data-heavy interfaces raised NPS from 35 to 62. A unified design system ensured development predictability and 100% mockup acceptance.',
    },
    cases: [
      {
        slug: 'tasks',
        featured: true,
        name: { ru: 'Модуль задач', en: 'Tasks Module' },
        context: {
          ru: 'В продукте отсутствовал собственный таск-трекер. Задачи велись через сторонние сервисы и чаты.',
          en: 'The product had no task tracker. Tasks were managed through third-party services and chats.',
        },
        problem: {
          ru: 'Информация о задачах была распределена между несколькими системами. Строители теряли контекст и сроки.',
          en: 'Task information was spread across multiple systems. Builders lost context and deadlines.',
        },
        constraints: {
          ru: ['Необходимо поддерживать специфические строительные статусы задач', 'Разные роли пользователей видят задачи по-разному'],
          en: ['Must support specific construction task statuses', 'Different user roles see tasks differently'],
        },
        keyDecisions: [
          {
            problem: { ru: 'Строители привыкли к линейным спискам, но задачи имеют сложные зависимости', en: 'Builders are used to linear lists, but tasks have complex dependencies' },
            solution: { ru: 'Список задач как основной вид с возможностью быстрого переключения на другие представления', en: 'Task list as the primary view with quick switching to other representations' },
            why: { ru: 'Привычный вид снижает порог входа, а переключение позволяет выбрать удобный формат', en: 'A familiar view lowers the entry threshold, and switching allows choosing a convenient format' },
            result: { ru: 'Пользователи начали работать с модулем без обучения', en: 'Users started working with the module without training' },
          },
          {
            problem: { ru: 'Строительные проекты требуют визуализации параллельных задач', en: 'Construction projects require visualization of parallel tasks' },
            solution: { ru: 'Канбан-доска со строительными статусами: в работе, на объекте, на проверке, выполнено', en: 'Kanban board with construction statuses: in progress, on site, under review, completed' },
            why: { ru: 'Канбан отражает физический процесс строительства лучше чем абстрактные статусы', en: 'Kanban reflects the physical construction process better than abstract statuses' },
            result: { ru: 'Прорабы видят статус всех задач на объекте с первого взгляда', en: 'Site managers see the status of all site tasks at a glance' },
          },
          {
            problem: { ru: 'Сложно понять когда задачи пересекаются и где узкие места по срокам', en: 'Hard to understand when tasks overlap and where deadline bottlenecks are' },
            solution: { ru: 'Календарное представление задач с временной шкалой', en: 'Calendar task view with timeline' },
            why: { ru: 'Строительство завязано на сроках. Визуализация времени критична для планирования', en: 'Construction is deadline-driven. Time visualization is critical for planning' },
            result: { ru: 'Менеджеры увидели конфликты сроков до того, как они стали проблемой', en: 'Managers saw deadline conflicts before they became a problem' },
          },
          {
            problem: { ru: 'Обычные таск-трекеры не знают строительной специфики', en: 'Generic task trackers do not understand construction specifics' },
            solution: { ru: 'Строительные статусы и метаданные: объект, подрядчик, смета', en: 'Construction statuses and metadata: site, contractor, estimate' },
            why: { ru: 'Контекст строительного проекта встроен в задачу. Не нужно объяснять коллегам что это значит', en: 'Construction project context is built into the task. No need to explain to colleagues what it means' },
            result: { ru: 'Задачи несут полный строительный контекст без дополнительных полей', en: 'Tasks carry full construction context without additional fields' },
          },
        ],
        beforeAfter: {
          before: { ru: 'Информация была распределена между несколькими системами: мессенджерами и сторонними таск-трекерами.', en: 'Information was spread across multiple systems: messengers and third-party task trackers.' },
          after: { ru: 'Появилось единое пространство управления задачами внутри строительной платформы.', en: 'A unified task management space appeared inside the construction platform.' },
        },
        difficulties: {
          ru: 'Проектирование для разных ролей пользователей (прораб, менеджер, директор) и развитие дизайн-системы параллельно с новым модулем.',
          en: 'Designing for different user roles (site manager, project manager, director) while developing the design system in parallel.',
        },
        results: {
          ru: ['Единое пространство управления задачами', '3 представления: список, канбан, календарь', 'Строительные статусы и контекст в каждой задаче'],
          en: ['Unified task management space', '3 views: list, kanban, calendar', 'Construction statuses and context in every task'],
        },
        conclusion: {
          ru: 'Строительный таск-трекер - это не просто адаптация Jira. Специфика отрасли требует иных статусов, иных связей и иного контекста. Правильное проектирование под домен важнее универсальности.',
          en: 'A construction task tracker is not just an adaptation of Jira. Industry specifics require different statuses, different links, and different context. Domain-specific design matters more than universality.',
        },
      },
      {
        slug: 'dashboard',
        featured: true,
        name: { ru: 'Редизайн дэшборда', en: 'Dashboard Redesign' },
        compareBeforeLabel: { ru: 'До редизайна', en: 'Before redesign' },
        context: {
          ru: 'Существовал рабочий дэшборд, созданный разработчиками. Продукт проходил масштабный редизайн.',
          en: 'A working dashboard created by developers existed. The product was undergoing a major redesign.',
        },
        problem: {
          ru: 'Не хватало единой визуальной системы и удобной структуры данных. Пользователи с трудом ориентировались в интерфейсе.',
          en: 'There was a lack of a unified visual system and convenient data structure. Users had difficulty navigating the interface.',
        },
        constraints: {
          ru: ['Пользователи уже привыкли к существующему интерфейсу', 'Изменения не должны ломать привычные сценарии'],
          en: ['Users were already accustomed to the existing interface', 'Changes should not break familiar workflows'],
        },
        keyDecisions: [
          {
            problem: { ru: 'Полный редизайн разрушит привычки пользователей и вызовет отторжение', en: 'A full redesign would break user habits and cause rejection' },
            solution: { ru: 'Эволюционный редизайн: улучшаем существующее вместо полной замены', en: 'Evolutionary redesign: improving existing rather than replacing entirely' },
            why: { ru: 'Пользователи приняли изменения легче, когда базовая логика осталась знакомой', en: 'Users accepted changes more easily when the basic logic remained familiar' },
            result: { ru: 'Редизайн прошёл без волны негативной обратной связи', en: 'Redesign passed without a wave of negative feedback' },
          },
          {
            problem: { ru: 'Нельзя просто убрать то, к чему привыкли пользователи', en: 'Cannot simply remove what users are accustomed to' },
            solution: { ru: 'Сохранение привычных сценариев при обновлении визуальной системы', en: 'Preserving familiar workflows while updating the visual system' },
            why: { ru: 'Поведенческие паттерны ценнее визуального обновления. Не надо заставлять переучиваться', en: 'Behavioral patterns are more valuable than visual updates. No need to force relearning' },
            result: { ru: 'Пользователи не заметили болезненного перехода', en: 'Users did not experience a painful transition' },
          },
          {
            problem: { ru: 'Пользователи не видели общего прогресса по проекту', en: 'Users did not see overall project progress' },
            solution: { ru: 'Новый блок хода работ с визуализацией прогресса по ключевым метрикам', en: 'New work progress block with visualization of progress on key metrics' },
            why: { ru: 'Видимый прогресс мотивирует и даёт ощущение контроля над строительным проектом', en: 'Visible progress motivates and gives a sense of control over the construction project' },
            result: { ru: 'Пользователи стали чаще открывать дэшборд для проверки статуса', en: 'Users started opening the dashboard more often to check status' },
          },
          {
            problem: { ru: 'Дэшборд существовал изолированно от других модулей', en: 'Dashboard existed in isolation from other modules' },
            solution: { ru: 'Дэшборд стал фундаментом новой дизайн-системы и шаблоном для всех последующих модулей', en: 'Dashboard became the foundation of the new design system and template for all subsequent modules' },
            why: { ru: 'Единая система компонентов ускоряет разработку и делает продукт последовательным', en: 'A unified component system accelerates development and makes the product consistent' },
            result: { ru: 'Все новые модули строятся на базе компонентов из дэшборда', en: 'All new modules are built on components from the dashboard' },
          },
        ],
        beforeAfter: {
          before: { ru: 'Устаревший интерфейс без единой дизайн-системы, созданный разработчиками.', en: 'Outdated interface without a unified design system, created by developers.' },
          after: { ru: 'Обновлённый дэшборд стал основой дальнейшего развития продукта и фундаментом дизайн-системы.', en: 'Updated dashboard became the foundation for further product development and the design system.' },
        },
        difficulties: {
          ru: 'Поиск баланса между привычностью интерфейса и его обновлением. Нельзя было резко менять то, к чему привыкли пользователи.',
          en: 'Finding the balance between interface familiarity and updating it. It was impossible to abruptly change what users were accustomed to.',
        },
        results: {
          ru: ['Единая визуальная система для всего продукта', 'Блок хода работ как новая точка контроля', 'Фундамент дизайн-системы для новых модулей'],
          en: ['Unified visual system for the entire product', 'Work progress block as a new control point', 'Design system foundation for new modules'],
        },
        conclusion: {
          ru: 'Редизайн существующего продукта сложнее создания нового. Нужно уважать привычки пользователей и улучшать, а не заменять. Эволюционный подход оказался правильным решением.',
          en: 'Redesigning an existing product is harder than creating a new one. You must respect user habits and improve, not replace. The evolutionary approach proved to be the right decision.',
        },
      },
      {
        slug: 'measurements',
        featured: false,
        name: { ru: 'Модуль обмеров', en: 'Measurements Module' },
        context: { ru: 'Строители делали обмеры вручную и вносили данные в таблицы. Интеграции со сметами не было.', en: 'Builders took measurements manually and entered data into spreadsheets. There was no integration with estimates.' },
        task: { ru: 'Спроектировать модуль обмеров, который связывает полевые данные со сметами автоматически.', en: 'Design a measurements module that connects field data to estimates automatically.' },
        solution: { ru: 'Цифровой журнал обмеров с привязкой к помещениям и автоматическим расчётом объёмов для смет.', en: 'Digital measurement log linked to rooms with automatic volume calculation for estimates.' },
        results: { ru: ['Время на подготовку смет сократилось', 'Ошибки из-за ручного ввода устранены'], en: ['Estimate preparation time reduced', 'Errors from manual entry eliminated'] },
        conclusion: { ru: 'Цифровые обмеры - базовый, но критически важный шаг к автоматизации строительного учёта.', en: 'Digital measurements are a basic but critically important step toward automated construction accounting.' },
      },
      {
        slug: 'procurement',
        featured: false,
        name: { ru: 'Модуль закупок', en: 'Procurement Module' },
        context: { ru: 'Закупки велись через переписку и таблицы. Статус поставок был непрозрачен.', en: 'Procurement was handled through messaging and spreadsheets. Delivery status was opaque.' },
        task: { ru: 'Спроектировать модуль закупок с прозрачным статусом поставок и историей заявок.', en: 'Design a procurement module with transparent delivery status and request history.' },
        solution: { ru: 'Система заявок на материалы с привязкой к объектам, статусами поставки и историей поставщиков.', en: 'Material request system linked to sites, with delivery statuses and supplier history.' },
        results: { ru: ['Прозрачный статус поставок', 'История заявок и поставщиков в одном месте'], en: ['Transparent delivery status', 'Request and supplier history in one place'] },
        conclusion: { ru: 'Закупки - один из самых болезненных процессов в строительстве. Прозрачность статусов снижает количество звонков и переписки.', en: 'Procurement is one of the most painful processes in construction. Status transparency reduces the number of calls and messages.' },
      },
      {
        slug: 'finance',
        featured: false,
        name: { ru: 'Финансовый модуль', en: 'Finance Module' },
        context: { ru: 'Финансовый учёт вёлся в отдельных таблицах без связи с задачами и сметами.', en: 'Financial accounting was maintained in separate spreadsheets with no connection to tasks and estimates.' },
        task: { ru: 'Переработать финансовый модуль на основе данных Яндекс.Метрики и обратной связи пользователей.', en: 'Redesign the finance module based on Yandex.Metrica data and user feedback.' },
        solution: { ru: 'Финансовый дэшборд с P&L по объектам, кассовыми разрывами и интеграцией со сметами.', en: 'Financial dashboard with P&L by site, cash gaps, and estimate integration.' },
        results: { ru: ['Финансы связаны со сметами и задачами', 'Видимость кассовых разрывов'], en: ['Finances linked to estimates and tasks', 'Cash gap visibility'] },
        conclusion: { ru: 'Финансовый модуль стал завершающим звеном в цепочке: обмеры → смета → закупки → финансы. Связанность данных - главная ценность платформы.', en: 'The finance module became the final link in the chain: measurements → estimate → procurement → finances. Data connectivity is the platform\'s main value.' },
        galleryCount: 2,
      },
    ],
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
      { title: { ru: 'Info', en: 'Info' }, image: '/projects/volcano/1.jpg' },
      { title: { ru: 'Map and Quiz', en: 'Map and Quiz' }, image: '/projects/volcano/2.jpg' },
      { title: { ru: 'Trip Planner', en: 'Trip Planner' }, image: '/projects/volcano/3.jpg' },
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
      ru: 'Next.js + ClaudeCode. Сайт, который вы смотрите.',
      en: "Next.js + ClaudeCode. The site you're viewing.",
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
      { title: { ru: 'Hero', en: 'Hero' }, image: '/projects/avejis/1.jpg' },
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
      {
    slug: 'importer',
    category: 'web',
    color: 'linear-gradient(135deg, #7F4ED9 0%, #9460F3 50%, #955CFF 100%)',
    coverImage: '/projects/importer-dark.jpg',
    coverImageLight: '/projects/importer-light.jpg',
    logo: 'I',
    logoColor: '#3a3a5a',
    behanceUrl: '',
    year: '2020',
    name: { ru: 'ATEX', en: 'ATEX' },
    shortDesc: { ru: 'Редизайн сайта импортера товаров для бизнеса', en: 'Website redesign for a B2B import company' },
    tags: { ru: ['Web', 'B2B', 'Redesign'], en: ['Web', 'B2B', 'Redesign'] },
    overview: { ru: 'Редизайн сайта импортера товаров из Китая, Кореи и Японии.', en: 'Website redesign for an importer of goods from China, Korea, and Japan.' },
    role: { ru: 'Web дизайнер', en: 'Web Designer' },
    duration: { ru: '2020', en: '2020' },
    tools: ['Figma'],
    challenge: { ru: 'Освежить визуал, улучшить структуру и увеличить количество заявок.', en: 'Refresh visuals, improve structure, and increase conversions.' },
    solution: { ru: 'Новая структура, больше CTA, кейсы и отзывы, детальная проработка макетов.', en: 'New structure, more CTAs, cases and testimonials, detailed design.' },
    results: { ru: ['Редизайн сайта', 'Улучшенная структура', 'Усиление конверсии'], en: ['Website redesign', 'Improved structure', 'Stronger conversion'] },
    context: {
      ru: 'Сайт импортера товаров для бизнеса, где важно выстроить доверие и мотивировать пользователя оставить заявку.',
      en: 'B2B importer website where trust and lead generation are ключевые задачи.',
    },
    problem: {
      ru: '(1) Устаревший визуал, (2) Слабая структура, (3) Недостаточно CTA.',
      en: '(1) Outdated visuals, (2) Weak structure, (3) Not enough CTAs.',
    },
    goals: {
      ru: ['Обновить визуал', 'Улучшить структуру', 'Добавить точки контакта', 'Повысить конверсию'],
      en: ['Refresh visuals', 'Improve structure', 'Add touchpoints', 'Increase conversion'],
    },
    process: {
      ru: 'Совместно с клиентом проработал структуру сайта, разработал несколько концептов, выбрал финальный вариант и детально проработал макеты с текстами и микроанимациями.',
      en: 'Worked with client on structure, created multiple concepts, selected final one, and refined layouts with copy and micro-interactions.',
    },
    keyFeatures: {
      ru: ['CTA элементы', 'Формы', 'Кейсы', 'Отзывы', 'Микроанимации'],
      en: ['CTA elements', 'Forms', 'Cases', 'Testimonials', 'Microinteractions'],
    },
    uiDirection: {
      ru: 'Современный корпоративный интерфейс с акцентом на доверие и конверсию.',
      en: 'Modern corporate UI focused on trust and conversion.',
    },
    screens: [
      { title: { ru: 'Hero Screen', en: 'Hero Screen' }, image: '/projects/importer/1.jpg' },
    ],
    conclusion: {
      ru: 'Грамотная структура и усиление точек контакта напрямую влияют на конверсию даже без изменения продукта.',
      en: 'Well-structured layout and stronger touchpoints can significantly improve conversion without changing the product.',
    },
  },
    {
    slug: 'okdesk',
    category: 'web',
    color: 'linear-gradient(135deg, #1e3a1e 0%, #3f7f3f 100%)',
    coverImage: '/projects/okdesk-dark.jpg',
    coverImageLight: '/projects/okdesk-light.jpg',
    logo: 'O',
    logoColor: '#3a3a5a',
    behanceUrl: '',
    year: '2020',
    name: { ru: 'OKDESK', en: 'OKDESK' },
    shortDesc: { ru: 'Редизайн сайта SaaS системы', en: 'SaaS website redesign' },
    tags: { ru: ['SaaS', 'Web', 'A/B Testing'], en: ['SaaS', 'Web', 'A/B Testing'] },
    overview: { ru: 'Редизайн сайта SaaS системы в связи с изменением позиционирования.', en: 'Website redesign after product repositioning.' },
    role: { ru: 'Web дизайнер', en: 'Web Designer' },
    duration: { ru: '2020', en: '2020' },
    tools: ['Figma'],
    challenge: { ru: 'Сайт не отражал новые возможности продукта.', en: 'Website did not reflect updated product capabilities.' },
    solution: { ru: 'Анализ конкурентов, концепции дизайна, A/B тестирование и итерации.', en: 'Competitor analysis, design concepts, A/B testing and iterations.' },
    results: { ru: ['Запуск через A/B тест', 'Сбор обратной связи', 'Масштабирование'], en: ['A/B test launch', 'Feedback collection', 'Scaling'] },
    context: {
      ru: 'Быстро растущий SaaS продукт требовал обновления сайта под новое позиционирование.',
      en: 'Fast-growing SaaS product required website update for new positioning',
    },
    problem: {
      ru: '(1) Несоответствие позиционированию, (2) Устаревший UX, (3) Потеря конверсии.',
      en: '(1) Mismatch with positioning, (2) Outdated UX, (3) Conversion loss.',
    },
    goals: {
      ru: ['Обновить сайт', 'Отразить продукт', 'Повысить конверсию'],
      en: ['Update website', 'Reflect product', 'Increase conversion'],
    },
    process: {
      ru: 'Провел анализ конкурентов, разработал концепции, протестировал через A/B тест, собрал обратную связь и масштабировал решение.',
      en: 'Analyzed competitors, created concepts, tested via A/B, collected feedback, scaled solution.',
    },
    keyFeatures: {
      ru: ['A/B тестирование', 'Концепции дизайна', 'UX улучшения'],
      en: ['A/B testing', 'Design concepts', 'UX improvements'],
    },
    uiDirection: {
      ru: 'SaaS-интерфейс с акцентом на продукт и ценность.',
      en: 'SaaS UI focused on product clarity and value.',
    },
    screens: [
      { title: { ru: 'Hero Screen', en: 'Hero Screen' }, image: '/projects/okdesk/1.jpg' },
    ],
    conclusion: {
      ru: 'Итеративный подход и A/B тестирование позволяют принимать решения на основе данных.',
      en: 'Iterative approach and A/B testing enable data-driven decisions.',
    },
  },
    {
    slug: 'atlon',
    category: 'web',
    color: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)',
    coverImage: '/projects/atlon-dark.jpg',
    coverImageLight: '/projects/atlon-light.jpg',
    logo: 'A',
    logoColor: '#3a3a5a',
    behanceUrl: '',
    year: '2019',
    name: { ru: 'ATLON', en: 'ATLON' },
    shortDesc: { ru: 'Сайт агентства по ремонту квартир', en: 'Apartment renovation agency website' },
    tags: { ru: ['Web', 'Landing', 'Services'], en: ['Web', 'Landing', 'Services'] },
    overview: { ru: 'Сайт агентства по ремонту квартир под ключ.', en: 'Turnkey apartment renovation agency website.' },
    role: { ru: 'Продуктовый дизайнер / UX/UI дизайнер', en: 'Product Designer / UX/UI Designer' },
    duration: { ru: '2019', en: '2019' },
    tools: ['Figma'],
    challenge: { ru: 'Разрозненный визуал и слабая иерархия.', en: 'Unified style, structured UX, web + mobile.' },
    solution: { ru: 'Единый стиль, структурированный UX, web + mobile.', en: 'Unified style, structured UX, web + mobile.' },
    results: { ru: ['Обновленный сайт', 'Единый стиль'], en: ['Updated website', 'Unified style'] },
    context: {
      ru: 'Сайт услуг ремонта, где важно доверие и понятная структура.',
      en: 'Service website where trust and clarity are critical.',
    },
    problem: {
      ru: '(1) Нет иерархии, (2) Разрозненный дизайн, (3) Слабый бренд.',
      en: '(1) No hierarchy, (2) Inconsistent design, (3) Weak brand.',
    },
    goals: {
      ru: ['Унифицировать дизайн', 'Повысить лиды', 'Улучшить UX'],
      en: ['Unify design', 'Increase leads', 'Improve UX'],
    },
    process: {
      ru: 'Провел анализ конкурентов, согласовал структуру, разработал web и mobile версии.',
      en: 'Analyzed competitors, aligned structure, designed web and mobile.',
    },
    keyFeatures: {
      ru: ['Структура', 'Web + mobile', 'Единый стиль'],
      en: ['Structure', 'Web + mobile', 'Unified style'],
    },
    uiDirection: {
      ru: 'Чистый и понятный сервисный интерфейс.',
      en: 'Clean and structured service UI.',
    },
    screens: [
      { title: { ru: 'Hero Screen', en: 'Hero Screen' }, image: '/projects/atlon/1.jpg' },
    ],
    conclusion: {
      ru: 'Консистентность дизайна напрямую влияет на доверие к бренду.',
      en: 'Design consistency directly impacts brand trust.',
    },
  },
     {
    slug: 'pravoved',
    category: 'web',
    color: 'linear-gradient(135deg, #1e3a1e 0%, #3f7f3f 100%)',
    coverImage: '/projects/pravoved-dark.jpg',
    coverImageLight: '/projects/pravoved-light.jpg',
    logo: 'P',
    logoColor: '#3a3a5a',
    behanceUrl: '',
    year: '2019',
    name: { ru: 'PRAVOVED', en: 'PRAVOVED' },
    shortDesc: { ru: 'Редизайн сайта юридической помощи', en: 'Legal service website redesign' },
    tags: { ru: ['Web', 'UX', 'Navigation'], en: ['Web', 'UX', 'Navigation'] },
    overview: { ru: 'Сайт юридических услуг для частных лиц и бизнеса.', en: 'Legal services website for individuals and businesses.' },
    role: { ru: 'Web дизайнер', en: 'Web Designer' },
    duration: { ru: '2019', en: '2019' },
    tools: ['Figma'],
    challenge: { ru: 'Сложная навигация и потеря пользователей.', en: 'Complex navigation and user drop-off.' },
    solution: { ru: 'UX анализ, интервью, новые концепции, mobile адаптация.', en: 'UX audit, interviews, new concepts, mobile adaptation.' },
    results: { ru: ['Упрощение навигации', 'Адаптив'], en: ['Simplified navigation', 'Responsive design'] },
    context: {
      ru: 'Юридический сервис с большим количеством сценариев и типов пользователей.',
      en: 'Legal service with complex user scenarios.',
    },
    problem: {
      ru: '(1) Сложная навигация, (2) Потеря клиентов, (3) Перегруженный UX.',
      en: '(1) Complex navigation, (2) User drop-off, (3) Overloaded UX.',
    },
    goals: {
      ru: ['Упростить UX', 'Снизить отток', 'Улучшить навигацию'],
      en: ['Simplify UX', 'Reduce drop-off', 'Improve navigation'],
    },
    process: {
      ru: 'Провел аудит сайта, глубинные интервью, предложил новые концепции и адаптировал под мобильные устройства.',
      en: 'Conducted audit, user interviews, proposed concepts, adapted for mobile.',
    },
    keyFeatures: {
      ru: ['UX аудит', 'Навигация', 'Mobile'],
      en: ['UX audit', 'Navigation', 'Mobile'],
    },
    uiDirection: {
      ru: 'Функциональный UX с акцентом на доступность информации.',
      en: 'Functional UX focused on accessibility.',
    },
    screens: [
      { title: { ru: 'Hero Screen', en: 'Hero Screen' }, image: '/projects/pravoved/1.jpg' },
    ],
    conclusion: {
      ru: 'Упрощение навигации напрямую снижает отток пользователей',
      en: 'Simplifying navigation directly reduces user drop-off.',
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
    role: { ru: 'Продуктовый дизайнер / Продакт менеджер', en: 'Product Designer / Product Manager' },
    period: { ru: 'сент 2025 - апр 2026 · 8 мес', en: 'Sep 2025 - Apr 2026 · 8 mo' },
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
    logoSrc: '/logos/new-hobbist.svg',
    logoSrcLight: '/logos/new-hobbist-light.svg',
    company: { ru: 'Hobbist', en: 'Hobbist' },
    website: 'hobbist.com',
    location: { ru: 'Удалённо', en: 'Remote' },
    role: { ru: 'Ведущий продуктовый дизайнер', en: 'Lead Product Designer' },
    period: { ru: 'сент 2024 - сент 2025 · 1 год', en: 'Sep 2024 - Sep 2025 · 1 yr' },
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
    logoSrc: '/logos/new-smetter.svg',
    logoSrcLight: '/logos/new-smetter-light.svg',
    company: { ru: 'Сметтер · BuildIT', en: 'Smetter · BuildIT' },
    website: 'smetter.ru',
    location: { ru: 'СПб', en: 'SPb' },
    role: { ru: 'Продуктовый дизайнер', en: 'Product Designer' },
    period: { ru: 'июн - сент 2024 · 4 мес', en: 'Jun - Sep 2024 · 4 mo' },
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
    logoSrc: '/logos/new-aezakmi.svg',
    logoSrcLight: '/logos/new-aezakmi-light.svg',
    company: { ru: 'Aezakmi Group', en: 'Aezakmi Group' },
    website: 'aezakmi.group',
    location: { ru: 'Удалённо', en: 'Remote' },
    role: { ru: 'Продуктовый дизайнер / UX/UI дизайнер', en: 'Product Designer / UX/UI Designer' },
    period: { ru: 'май 2023 - май 2024 · 1 год', en: 'May 2023 - May 2024 · 1 yr' },
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
    id: 'freelance',
    logo: 'Ф',
    logoColor: '#a78bfa',
    // Логотип шапки: на тёмной теме светлый, на светлой - тёмный.
    logoSrc: '/soromax-light.svg',
    logoSrcLight: '/soromax-dark.svg',
    company: { ru: 'Фриланс', en: 'Freelance' },
    location: { ru: 'Удалённо', en: 'Remote' },
    role: { ru: 'UX/UI дизайнер', en: 'UX/UI Designer' },
    period: { ru: 'март 2023 - июль 2023 · март 2019 - янв 2021 · 2+ года', en: 'Mar 2023 - Jul 2023 · Mar 2019 - Jan 2021 · 2+ yr' },
    kpi: { value: '6', label: { ru: 'проектов', en: 'projects' } },
    product: {
      ru: 'Коммерческие и некоммерческие проекты в двух периодах: 2019–2021 и 2023. Сайты, фирменный стиль, UX-исследования, передача в разработку.',
      en: 'Commercial and non-commercial projects across two periods: 2019–2021 and 2023. Websites, brand identity, UX research, dev handoff.',
    },
    metrics: [
      { value: '6', label: { ru: 'проектов с нуля', en: 'projects from scratch' } },
      { value: '2+', label: { ru: 'года опыта', en: 'years of exp' } },
      { value: '100%', label: { ru: 'передача в dev', en: 'handoff' } },
    ],
    achievements: {
      ru: [
        'Конкурентный анализ, мудборды, варианты разделов',
        'Согласование макетов с заказчиками, итерации',
        'Веб + мобильная версия для архитектурного бюро',
        'Вайрфреймы и фирменный стиль для службы помощи на дорогах',
        'UX-исследования и прототипирование для IT-стартапов (2019–2021)',
        'Дизайн мобильных приложений и брендинг для малого бизнеса',
      ],
      en: [
        'Competitive analysis, moodboards, section variants',
        'Mockup approval with clients, iterations',
        'Web + mobile version for architecture studio',
        'Wireframes and brand identity for roadside assistance service',
        'UX research and prototyping for IT startups (2019–2021)',
        'Mobile app design and branding for small businesses',
      ],
    },
    products: [
      { icon: 'web', iconColor: '#a78bfa', name: 'Architecture Studio', desc: { ru: 'Сайт архитектурного бюро', en: 'Architecture studio website' } },
      { icon: 'web', iconColor: '#c4b5fd', name: 'Tehnichka', desc: { ru: 'Сайт службы помощи на дорогах', en: 'Roadside assistance website' } },
    ],
  },
  {
    id: 'atlant',
    logo: 'А',
    logoColor: '#f87171',
    logoSrc: '/logos/new-atlant.svg',
    logoSrcLight: '/logos/new-atlant-light.svg',
    company: { ru: 'Атлант', en: 'Atlant' },
    website: 'sk-atlant.ru',
    location: { ru: 'СПб', en: 'SPb' },
    role: { ru: 'Продуктовый дизайнер / UX/UI дизайнер', en: 'Product Designer / UX/UI Designer' },
    period: { ru: 'янв 2021 - апр 2023 · 2+ года', en: 'Jan 2021 - Apr 2023 · 2+ yr' },
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
