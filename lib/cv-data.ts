import { experiences, type Locale } from './data';
// Expanded CV, revised 2026-11-25. Employer identity is shared with homepage experience data.
// Shared employer names and periods come from experiences unless the source CV differs.
type Localized<T> = Record<Locale, T>;
interface CvJob {
  id: string; sourceId: string; summary: Localized<string>; bullets: Localized<string[]>;
  company?: Localized<string>; role?: Localized<string>; period?: Localized<string>;
}
export const cvContent = {
  "ru": {
    "name": "Максим Сорокин",
    "role": "Senior Product Designer",
    "domains": "B2B · B2C · SaaS · AI · E-commerce",
    "updated": "Обновлено 25 ноября 2026",
    "download": "Скачать резюме",
    "pdf": "PDF на русском",
    "print": "Распечатать",
    "contact": "Контакты",
    "location": "Санкт-Петербург, м. Фрунзенская",
    "emailNote": "Предпочитаемый способ связи",
    "about": "Обо мне",
    "summary": "Senior Product Designer с опытом Lead и Product Manager. Создаю и развиваю B2B, B2C и AI SaaS-продукты, проектирую сложные интерфейсы и дизайн-системы. Самостоятельно веду задачи от исследования до релиза и оценки результата. Руководил двумя дизайнерами, занимался наймом и координировал команду из 6+ разработчиков. Технический бэкграунд — ИТМО.",
    "conditions": "Условия работы",
    "preferences": [
      "Полная занятость",
      "Офис, удалённо или гибрид",
      "Не готов к переезду, готов к командировкам",
      "Гражданство и разрешение на работу в России",
      "Время в пути до работы не имеет значения"
    ],
    "personal": "Родился 16 марта 2000",
    "experience": "Опыт работы",
    "total": "7 лет 9 месяцев по резюме",
    "overlap": "После релиза MVP Hobbist — частичная занятость; OKK.PRO — полная; NevaTrip — проектная.",
    "education": "Образование",
    "courses": "Курсы и практика",
    "skills": "Навыки",
    "languages": "Языки",
    "languageItems": [
      "Русский, родной",
      "Английский, B2 Upper Intermediate"
    ],
    "portfolio": "Портфолио",
    "back": "На главную",
    "navigation": "Разделы резюме"
  },
  "en": {
    "name": "Maxim Sorokin",
    "role": "Senior Product Designer",
    "domains": "B2B · B2C · SaaS · AI · E-commerce",
    "updated": "Updated November 25, 2026",
    "download": "Download CV",
    "pdf": "PDF in Russian",
    "print": "Print",
    "contact": "Contact",
    "location": "Saint Petersburg, Frunzenskaya",
    "emailNote": "Preferred contact method",
    "about": "Profile",
    "summary": "Senior Product Designer with Lead and Product Manager experience. I build and develop B2B, B2C and AI SaaS products, complex interfaces and design systems. I own work from research to release and measurement. I managed two designers, recruited designers and coordinated 6+ developers. Technical background: ITMO.",
    "conditions": "Work preferences",
    "preferences": [
      "Full-time employment",
      "On-site, remote or hybrid",
      "Not open to relocation, available for business trips",
      "Russian citizenship and work authorization",
      "No commuting time preference"
    ],
    "personal": "Born March 16, 2000",
    "experience": "Experience",
    "total": "7 years 9 months in the CV",
    "overlap": "Hobbist became part-time after MVP release; OKK.PRO was full-time; NevaTrip is project-based.",
    "education": "Education",
    "courses": "Courses and training",
    "skills": "Skills",
    "languages": "Languages",
    "languageItems": [
      "Russian, native",
      "English, B2 Upper Intermediate"
    ],
    "portfolio": "Portfolio",
    "back": "Back to home",
    "navigation": "CV sections"
  }
};

export const cvJobs: CvJob[] = [
  {
    "id": "nevatrip",
    "sourceId": "nevatrip",
    "summary": {
      "ru": "Проектная работа над UX страницы тура B2C e-commerce-платформы: повышение конверсии в покупку и снижение нагрузки на контакт-центр — цели, а не подтверждённые результаты.",
      "en": "Project-based UX work on a B2C e-commerce tour page: improving purchase conversion and reducing contact center workload are objectives, not measured outcomes."
    },
    "bullets": {
      "ru": [
        "Проанализировал более 4 000 обращений в контакт-центр, Яндекс.Метрику и тепловые карты; выявил барьеры выбора и покупки билетов.",
        "Сформировал и приоритизировал гипотезы на основе количественных и качественных данных.",
        "Спроектировал 4 итерации UX-оптимизации страницы тура для desktop и mobile без полного редизайна; переработал информационную архитектуру и сценарии покупки.",
        "Подготовил план A/B-тестирования с откатом изменений и отслеживанием CR, CTA CTR, Scroll Depth и обращений в контакт-центр."
      ],
      "en": [
        "Analyzed 4,000+ contact center requests, Yandex Metrica and heatmaps to identify ticket selection and purchase barriers.",
        "Formulated and prioritized hypotheses using quantitative and qualitative data.",
        "Designed four desktop and mobile UX optimization iterations without a full redesign; reworked information architecture and purchase flows.",
        "Prepared an A/B testing plan with rollback options and tracking of CR, CTA CTR, scroll depth and contact center requests."
      ]
    }
  },
  {
    "id": "hobbist",
    "sourceId": "hobbist",
    "summary": {
      "ru": "Возглавлял продуктовый дизайн Hobbist с момента разработки MVP. Проектировал библиотеку интересов, мэтчинг, онбординг, чаты и профиль для Telegram Mini App и Web. Руководил двумя дизайнерами (графическим и UX/UI), подбирал UX/UI-дизайнера, оценивал тестовые и проводил собеседования. После релиза MVP перешёл на частичную занятость: делегирование, приёмка макетов и согласование с разработкой. Спроектировал ИИ-ассистента для рекомендаций интересов и подбора собеседников.",
      "en": "Led product design at Hobbist from MVP development. Designed the interests library, matching, onboarding, chats and profiles for Telegram Mini App and web. Managed two designers (graphic and UX/UI), recruited the UX/UI designer, reviewed assignments and interviewed candidates. After MVP release, moved to part-time work focused on delegation, design acceptance and engineering alignment. Designed an AI assistant for interest recommendations and matching."
    },
    "bullets": {
      "ru": [
        "Увеличил долю ежедневно активных пользователей с 32% до 52% за 2 месяца; конверсию прохождения онбординга — с 58% до 83%.",
        "Повысил конверсию из мэтча в переписку с 23% до 38%, сократив количество действий до начала диалога.",
        "Увеличил среднее количество интересов, добавляемых одним пользователем в месяц, с 19 до 26 благодаря ИИ-рекомендациям и оптимизации библиотеки.",
        "Спроектировал более 50 интерфейсов и состояний: онбординг, библиотека, мэтчинг, чаты и профиль; разработал логику и интерфейсы ИИ-ассистента.",
        "Развивал дизайн-систему для Mini App и Web, унифицировал компоненты, состояния и паттерны.",
        "Руководил двумя дизайнерами; нанимал UX/UI-дизайнера, оценивал тестовые задания и проводил собеседования.",
        "После релиза MVP перешёл на частичную занятость, сохранив распределение задач, дизайн-ревью, приёмку макетов и согласование с разработкой."
      ],
      "en": [
        "Raised the daily active user share from 32% to 52% in two months; onboarding completion from 58% to 83%.",
        "Improved match-to-conversation conversion from 23% to 38% by reducing steps before starting a chat.",
        "Raised average interests added per user per month from 19 to 26 through AI recommendations and library improvements.",
        "Designed 50+ interfaces and states across onboarding, library, matching, chats and profiles; designed the AI assistant logic and interfaces.",
        "Developed the design system for Mini App and web, unifying components, states and interaction patterns.",
        "Managed two designers; recruited the UX/UI designer, reviewed assignments and conducted interviews.",
        "After MVP release, shifted to part-time work while retaining task allocation, reviews, design acceptance and engineering alignment."
      ]
    }
  },
  {
    "id": "uk-medicina",
    "sourceId": "uk-medicina",
    "summary": {
      "ru": "Спроектировал AI SaaS с нуля для сети МИА.РФ: рабочие пространства врачей и кураторов, консультации, голосовые тренажёры, отчёты для главврачей, РОПов и руководителей. Совмещал дизайн с функциями Product Manager: общался с заказчиком, анализировал конкурентов, формировал roadmap, планировал спринты и координировал 6+ разработчиков.",
      "en": "Designed an AI SaaS product from scratch for the MIA.RF clinic network: workspaces for doctors and curators, consultations, voice training, reporting for chief physicians, sales leads and executives. Combined design and Product Manager responsibilities: client communication, competitor analysis, roadmap, sprint planning and coordination of 6+ developers."
    },
    "bullets": {
      "ru": [
        "Повысил удержание с 37% до 52% за 2 месяца по результатам проверки гипотез и оптимизации сценариев.",
        "Снизил долю UI-несоответствий после релизов с 82% до 22% с помощью Design QA и дизайн-ревью.",
        "Создал дизайн-систему и библиотеку компонентов для 6+ разработчиков, сократив срок выпуска новой функциональности на 2 недели.",
        "Спроектировал веб-продукт с нуля и адаптировал интерфейсы для iOS и Android: кабинеты, консультации, обучение, аналитика и отчётность.",
        "Провёл 8 A/B-тестов и юзабилити-тестирования; работал с активацией и продуктовой аналитикой.",
        "Как Product Manager общался с заказчиком, анализировал конкурентов, составлял roadmap и участвовал в приоритизации.",
        "Планировал спринты, готовил тикеты и контролировал выполнение задач команды из 6+ разработчиков.",
        "Проводил daily, intro, retrospective, согласовывал требования и дизайн-решения с разработкой.",
        "Интегрировал ИИ-инструменты в исследования, генерацию гипотез и прототипирование."
      ],
      "en": [
        "Raised retention from 37% to 52% in two months following hypothesis validation and journey optimization.",
        "Reduced the post-release UI discrepancy rate from 82% to 22% through design QA and reviews.",
        "Built a design system and component library for 6+ developers, shortening new feature delivery by two weeks.",
        "Designed the web product from scratch and adapted interfaces for iOS and Android: workspaces, consultations, training, analytics and reporting.",
        "Conducted eight A/B tests and usability testing; worked with activation and product analytics.",
        "As Product Manager, communicated with the client, analyzed competitors, built a roadmap and contributed to prioritization.",
        "Planned sprints, prepared tickets and tracked delivery across 6+ developers.",
        "Facilitated daily, intro and retrospective meetings; aligned requirements and design decisions with engineering.",
        "Integrated AI tools into research, hypothesis generation and prototyping."
      ]
    },
    "company": {
      "ru": "УК Медицина · OKK.PRO",
      "en": "UK Medicina · OKK.PRO"
    },
    "role": {
      "ru": "Старший продуктовый дизайнер / Product Manager",
      "en": "Senior Product Designer / Product Manager"
    }
  },
  {
    "id": "smetter",
    "sourceId": "smetter",
    "summary": {
      "ru": "SaaS-платформа для автоматизации строительного бизнеса.",
      "en": "SaaS platform for construction business automation."
    },
    "bullets": {
      "ru": [
        "По итогам редизайна ключевых модулей NPS вырос с 35 до 62.",
        "Сократил сроки передачи макетов в разработку с 5 до 3 рабочих дней (−40%) благодаря развитию дизайн-системы.",
        "Спроектировал модули закупок, задач и обмеров; работал со сложными B2B- и CRM-интерфейсами, таблицами, фильтрами и многошаговыми сценариями для web, iOS и Android.",
        "Помогал компании подбирать дизайнера на замену при завершении работы."
      ],
      "en": [
        "Product NPS rose from 35 to 62 following redesign of core modules.",
        "Reduced design handoff from five to three working days (−40%) by developing the design system.",
        "Designed procurement, task and measurement modules; worked on complex B2B and CRM interfaces, tables, filters and multi-step flows for web, iOS and Android.",
        "Helped the company recruit a replacement designer at the end of the engagement."
      ]
    }
  },
  {
    "id": "aezakmi",
    "sourceId": "aezakmi",
    "summary": {
      "ru": "Мобильные продукты для iOS и Android в составе продуктовой команды.",
      "en": "Mobile products for iOS and Android within a product team."
    },
    "bullets": {
      "ru": [
        "Спроектировал 8 мобильных продуктов с нуля с суммарным количеством установок более 200 000.",
        "Внедрил motion design и микровзаимодействия; после изменений удержание выросло с 16% до 34%.",
        "Сократил сроки подготовки макетов с 5 до 3 рабочих дней (−40%), оптимизируя проектирование и взаимодействие с разработкой.",
        "Работал с продуктовыми метриками, интерактивными прототипами, компонентными библиотеками Figma и Design QA."
      ],
      "en": [
        "Designed eight mobile products from scratch with over 200,000 installs combined.",
        "Introduced motion design and microinteractions; retention rose from 16% to 34% following the changes.",
        "Reduced design preparation from five to three working days (−40%) by improving design and engineering collaboration.",
        "Worked with product metrics, interactive prototypes, Figma component libraries and design QA."
      ]
    },
    "period": {
      "ru": "май 2023 - май 2024 · 1 год 1 месяц",
      "en": "May 2023 - May 2024 · 1 year 1 month"
    }
  },
  {
    "id": "freelance-2023",
    "sourceId": "freelance",
    "summary": {
      "ru": "Web и SaaS-проекты для бизнеса и цифровых продуктов.",
      "en": "Web and SaaS projects for businesses and digital products."
    },
    "bullets": {
      "ru": [
        "Проектировал web-интерфейсы и сценарии B2B и B2C. Проводил UX-аудит, конкурентный анализ и исследования.",
        "Разрабатывал wireframes, User Flows, CJM, интерактивные прототипы и адаптивные mobile-first интерфейсы. Работал с информационной архитектурой сложных сценариев.",
        "Создавал UI-макеты, дизайн-концепции и визуальные системы, сопровождал передачу в разработку. Работал над конверсией, лидогенерацией и пользовательским опытом.",
        "Помогал заказчикам формулировать продуктовые гипотезы и приоритеты. Реализовал проекты для architectural-tech, legal-tech и сервисных digital-компаний."
      ],
      "en": [
        "Designed web interfaces and journeys for B2B and B2C products. Conducted UX audits, competitive analysis and research.",
        "Created wireframes, user flows, CJMs, interactive prototypes and responsive mobile-first interfaces. Structured information architecture for complex journeys.",
        "Created UI designs, concepts and visual systems and supported developer handoff. Worked on conversion, lead generation and user experience.",
        "Helped clients formulate product hypotheses and priorities. Delivered projects for architectural-tech, legal-tech and digital service companies."
      ]
    },
    "company": {
      "ru": "Частная практика",
      "en": "Freelance"
    },
    "role": {
      "ru": "Продуктовый дизайнер / UX/UI дизайнер",
      "en": "Product Designer / UX/UI Designer"
    },
    "period": {
      "ru": "март 2023 - июль 2023 · 5 месяцев",
      "en": "Mar 2023 - Jul 2023 · 5 months"
    }
  },
  {
    "id": "atlant",
    "sourceId": "atlant",
    "summary": {
      "ru": "Внутренняя система мониторинга строительства и корпоративные сервисы.",
      "en": "Internal construction monitoring system and corporate services."
    },
    "bullets": {
      "ru": [
        "Проектировал внутренние B2B-системы, дашборды и операционные сценарии для автоматизации бизнес-процессов. Работал с информационной архитектурой, навигацией и интерфейсами с большим объёмом данных.",
        "Создал дизайн-систему и UI Kit для внутренних продуктов, ускорив проектирование новых интерфейсов.",
        "Провёл UX-анализ и редизайн корпоративного сайта, увеличив конверсию заявок с 2,5% до 3,25% (+30% относительно исходной).",
        "Участвовал в обсуждении продукта, презентации решений и согласовании UX-концепций с руководством. Создавал интерактивные прототипы, выполнял handoff и Design QA с backend/frontend-разработчиками.",
        "Предложил UX-концепции развития продукта. Одна из них позволила сократить сроки разработки на 2 месяца. Формировал UX-подходы для масштабирования внутренних сервисов."
      ],
      "en": [
        "Designed internal B2B systems, dashboards and operational workflows to automate business processes. Worked on information architecture, navigation and data-heavy interfaces.",
        "Built a design system and UI Kit for internal products, accelerating interface design.",
        "Conducted UX analysis and redesigned the corporate website, increasing lead conversion from 2.5% to 3.25% (+30% relative).",
        "Contributed to product discussions, presentations and UX concept reviews with management. Built interactive prototypes and handled handoff and design QA with backend and frontend developers.",
        "Proposed product UX concepts, one of which shortened development by 2 months. Developed UX approaches for scaling internal services."
      ]
    },
    "company": {
      "ru": "ЗАО «Строительная компания Атлант»",
      "en": "Atlant Construction Company"
    },
    "period": {
      "ru": "январь 2021 - апрель 2023 · 2 года 4 месяца",
      "en": "Jan 2021 - Apr 2023 · 2 years 4 months"
    }
  },
  {
    "id": "freelance-2019",
    "sourceId": "freelance",
    "summary": {
      "ru": "Проекты для SaaS, e-commerce, корпоративных сервисов и цифровых продуктов.",
      "en": "Projects for SaaS, e-commerce, corporate services and digital products."
    },
    "bullets": {
      "ru": [
        "Проектировал web и mobile интерфейсы, пользовательские сценарии и навигацию. Проводил UX-анализ, конкурентные исследования и CJM.",
        "Работал над UX SaaS-сервисов, e-commerce и корпоративных сайтов. Создавал адаптивные интерфейсы, интерактивные прототипы и UI-концепции для MVP и продуктовых гипотез.",
        "Работал с конверсией, A/B-тестированием дизайн-концепций и анализом поведения. Выполнял handoff и сопровождал реализацию.",
        "Среди проектов Okdesk, Pravoved, Atlon FM и Atex."
      ],
      "en": [
        "Designed web and mobile interfaces, user journeys and navigation. Conducted UX analysis, competitive research and CJM.",
        "Worked on UX for SaaS, e-commerce and corporate websites. Created responsive interfaces, interactive prototypes and UI concepts for MVPs and product hypotheses.",
        "Worked on conversion, A/B testing of design concepts and behavior analysis. Handled handoff and supported implementation.",
        "Projects included Okdesk, Pravoved, Atlon FM and Atex."
      ]
    },
    "company": {
      "ru": "Частная практика",
      "en": "Freelance"
    },
    "role": {
      "ru": "UX/UI дизайнер / Продуктовый дизайнер",
      "en": "UX/UI Designer / Product Designer"
    },
    "period": {
      "ru": "март 2019 - январь 2021 · 1 год 11 месяцев",
      "en": "Mar 2019 - Jan 2021 · 1 year 11 months"
    }
  }
];

export const cvEducation = [
  {
    "year": "2023",
    "degree": {
      "ru": "Магистр",
      "en": "Master’s degree"
    },
    "school": {
      "ru": "Университет ИТМО, Санкт-Петербург",
      "en": "ITMO University, Saint Petersburg"
    },
    "detail": {
      "ru": "Факультет программной инженерии и компьютерной техники. Мультимедиа-технологии, дизайн и юзабилити.",
      "en": "Faculty of Software Engineering and Computer Systems. Multimedia technologies, design and usability."
    }
  },
  {
    "year": "2021",
    "degree": {
      "ru": "Бакалавр",
      "en": "Bachelor’s degree"
    },
    "school": {
      "ru": "БГТУ «ВОЕНМЕХ» им. Д. Ф. Устинова, Санкт-Петербург",
      "en": "Baltic State Technical University VOENMEH, Saint Petersburg"
    },
    "detail": {
      "ru": "Информационные управляющие системы. Информационные системы и программная инженерия.",
      "en": "Information and control systems. Information systems and software engineering."
    }
  }
];

export const cvCourses = [
  {
    "year": "2023",
    "school": {
      "ru": "Яндекс Практикум",
      "en": "Yandex Practicum"
    },
    "detail": {
      "ru": "Дизайнер интерфейсов. Дизайн пользовательских интерфейсов.",
      "en": "Interface designer. User interface design."
    }
  },
  {
    "year": "2023",
    "school": {
      "ru": "Film Factory",
      "en": "Film Factory"
    },
    "detail": {
      "ru": "Производственная практика. Видеомонтажёр.",
      "en": "Industry placement. Video editing."
    }
  }
];

export const cvSkills = [
  "Product Design",
  "UX/UI Design",
  "UX Research",
  "User Flow",
  "Customer Journey Map (CJM)",
  "Jobs To Be Done (JTBD)",
  "Information Architecture",
  "Wireframing",
  "Interactive Prototyping",
  "Usability Testing",
  "Product Analytics",
  "Product Metrics",
  "Design System",
  "Adaptive Design",
  "Design QA",
  "Figma",
  "Auto Layout",
  "Variables",
  "Variants",
  "Components",
  "A/B Testing",
  "Yandex Metrica",
  "Product Roadmap",
  "Product Management",
  "HTML",
  "CSS",
  "Web Design",
  "iOS",
  "Android",
  "SaaS",
  "CRM",
  "AI",
  "Claude",
  "ChatGPT"
];

export const cvLeadershipSkills = {
  ru: ['Дизайн-ревью', 'Найм дизайнеров', 'Приоритизация бэклога', 'Продуктовая стратегия', 'Планирование спринтов', 'Постановка задач разработчикам', 'Координация разработки'],
  en: ['Design reviews', 'Designer hiring', 'Backlog prioritization', 'Product strategy', 'Sprint planning', 'Developer task definition', 'Engineering coordination'],
};
export function getCvJobs(locale: Locale) {
  return cvJobs.map((job) => {
    const source = experiences.find((item) => item.id === job.sourceId)!;
    return { id: job.id, company: (job.company ?? source.company)[locale],
      role: (job.role ?? source.role)[locale], period: (job.period ?? source.period)[locale],
      summary: job.summary[locale], bullets: job.bullets[locale], website: source.website };
  });
}
