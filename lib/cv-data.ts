import { experiences, type Locale } from './data';
// Source: public/Sorokin_CV.pdf, updated 2026-10-20. No PDF regeneration.
// Shared employer names and periods come from experiences unless the source CV differs.
type Localized<T> = Record<Locale, T>;
interface CvJob {
  id: string; sourceId: string; summary: Localized<string>; bullets: Localized<string[]>;
  company?: Localized<string>; role?: Localized<string>; period?: Localized<string>;
}
export const cvContent = {
  "ru": {
    "name": "Максим Сорокин",
    "role": "Продуктовый дизайнер",
    "domains": "B2B · B2C · SaaS · E-commerce",
    "updated": "Обновлено 20 октября 2026",
    "download": "Скачать резюме",
    "pdf": "PDF на русском",
    "print": "Распечатать",
    "contact": "Контакты",
    "location": "Санкт-Петербург, м. Фрунзенская",
    "emailNote": "Предпочитаемый способ связи",
    "about": "Обо мне",
    "summary": "Product Designer с опытом Lead и техническим бэкграундом. Проектирую B2B, B2C, SaaS, AI-продукты и интерфейсы с высокой нагрузкой. Веду полный цикл от discovery и сбора метрик до релиза и развития функций. Строил дизайн-системы для 3 продуктов, руководил дизайнерами и командой разработки, совмещал роли дизайнера и Product Manager. Работаю с retention, conversion, NPS, DAU/MAU, A/B-тестами и глубинными интервью.",
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
    "total": "7 лет 8 месяцев по резюме",
    "overlap": "Периоды сотрудничества могут пересекаться.",
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
    "role": "Product Designer",
    "domains": "B2B · B2C · SaaS · E-commerce",
    "updated": "Updated October 20, 2026",
    "download": "Download CV",
    "pdf": "PDF in Russian",
    "print": "Print",
    "contact": "Contact",
    "location": "Saint Petersburg, Frunzenskaya",
    "emailNote": "Preferred contact method",
    "about": "Profile",
    "summary": "Product Designer with lead experience and a technical background. I design B2B, B2C, SaaS and AI products and high-load interfaces. I own the full cycle from discovery and metrics to release and ongoing development. I have built design systems for 3 products, led designers and engineering teams, and combined designer and Product Manager roles. I work with retention, conversion, NPS, DAU/MAU, A/B tests and in-depth interviews.",
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
    "total": "7 years 8 months in the source CV",
    "overlap": "Engagement periods may overlap.",
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
      "ru": "B2C e-commerce-платформа для поиска и покупки билетов на водные прогулки и экскурсии. Цели работы включают повышение конверсии в покупку и снижение нагрузки на контакт-центр.",
      "en": "B2C e-commerce platform for finding and buying boat tour and excursion tickets. The work aims to improve purchase conversion and reduce contact center workload."
    },
    "bullets": {
      "ru": [
        "Провёл UX-аудит детальной страницы тура с фокусом на mobile. Анализировал Яндекс.Метрику, тепловые карты, обращения и вопросы пользователей в контакт-центр.",
        "Выявил проблемы выбора и покупки билетов. Сформулировал продуктовые гипотезы на основе количественных и качественных данных и определил приоритеты UX-улучшений.",
        "Спроектировал 4 последовательные итерации UX-оптимизации для desktop и mobile без полного редизайна. Переработал информационную архитектуру и пользовательские сценарии.",
        "Сформировал стратегию A/B-тестирования с возможностью отката изменений и систему измерений CR, CTA CTR, Scroll Depth и обращений в контакт-центр."
      ],
      "en": [
        "Audited the tour detail page with a focus on mobile. Analyzed Yandex Metrica, heatmaps, contact center requests and customer questions.",
        "Identified ticket selection and purchase issues. Formulated hypotheses using quantitative and qualitative data and prioritized UX improvements.",
        "Designed 4 sequential UX optimization iterations for desktop and mobile without a full redesign. Reworked information architecture and user journeys.",
        "Created an A/B testing strategy with rollback options and a measurement plan for CR, CTA CTR, Scroll Depth and contact center requests."
      ]
    }
  },
  {
    "id": "hobbist",
    "sourceId": "hobbist",
    "summary": {
      "ru": "Telegram Mini App и веб-платформа для знакомств и общения по общим интересам. Отвечал за UX/UI, развитие дизайн-системы и ключевых пользовательских сценариев. Руководил 2 дизайнерами.",
      "en": "Telegram Mini App and web platform for dating and conversation through shared interests. Owned UX/UI, the design system and core user journeys. Led 2 designers."
    },
    "bullets": {
      "ru": [
        "Увеличил DAU на 20% за счёт улучшения сценариев и вовлекающих механик. Повысил конверсию прохождения онбординга на 25%.",
        "Спроектировал более 50 интерфейсов и состояний. Развивал онбординг, библиотеку интересов, поиск совпадений, общение и управление профилем.",
        "Распределял задачи между 2 дизайнерами, проводил ревью, контролировал качество и согласованность интерфейсов. Переработал компоненты, состояния и паттерны дизайн-системы для Mini App и web.",
        "Спроектировал внедрение ИИ-ассистента для рекомендаций новых увлечений по библиотеке интересов и улучшения качества подбора собеседников.",
        "Повысил конверсию из мэтча в начало переписки. Сократил количество действий до начала диалога. Благодаря ИИ-рекомендациям и упрощению библиотеки пользователи стали добавлять больше интересов за месяц.",
        "Взаимодействовал с разработчиками и продуктовой командой, участвовал в приоритизации задач и развитии продукта."
      ],
      "en": [
        "Increased DAU by 20% through improved journeys and engagement mechanics. Raised onboarding completion conversion by 25%.",
        "Designed 50+ interfaces and states across onboarding, the interests library, matching, conversation and profile management.",
        "Assigned tasks to 2 designers, reviewed work and maintained interface quality and consistency. Reworked design system components, states and interaction patterns for the Mini App and web.",
        "Designed the introduction of an AI assistant for hobby recommendations based on the interests library and better matching.",
        "Improved conversion from matching to starting a conversation and reduced the number of actions required. AI recommendations and a simpler library helped users add more interests each month.",
        "Worked with developers and the product team on task prioritization and product development."
      ]
    }
  },
  {
    "id": "uk-medicina",
    "sourceId": "uk-medicina",
    "summary": {
      "ru": "AI SaaS-платформа OKK.PRO для анализа качества консультаций в стоматологических клиниках на базе сети МИА.РФ. Lead-дизайнер в команде из 6+ разработчиков и PM.",
      "en": "AI SaaS platform OKK.PRO for analyzing dental consultation quality within the MIA.RF clinic network. Lead designer working with 6+ developers and a PM."
    },
    "bullets": {
      "ru": [
        "Вёл полный цикл Product Design от Discovery, UX Research и прототипирования до Delivery и оптимизации после релиза. Спроектировал информационную архитектуру, User Flows и ключевые сценарии MVP.",
        "Создал и развивал дизайн-систему, UI Kit и библиотеку компонентов для 6+ разработчиков. Сократил время выхода новых функций на 2 недели.",
        "Разработал web-версию продукта с нуля и адаптировал интерфейсы под iOS и Android.",
        "Провёл 8 A/B-тестов и usability-testing продуктовых гипотез. Удержание выросло на 15% за 2 месяца. Использовал продуктовую аналитику для оптимизации сценариев и активации.",
        "Выполнял handoff, Design QA и дизайн-ревью. Снизил количество UI-несоответствий после релизов на 60%.",
        "Участвовал в планировании продукта, приоритизации задач и работе со стейкхолдерами. Интегрировал AI-инструменты в исследования, генерацию гипотез и прототипирование."
      ],
      "en": [
        "Owned the full product design cycle from discovery, UX research and prototyping through delivery and post-release optimization. Designed information architecture, user flows and core MVP journeys.",
        "Built and maintained a design system, UI Kit and component library for 6+ developers. Shortened new feature delivery by 2 weeks.",
        "Designed the web product from scratch and adapted its interfaces for iOS and Android.",
        "Conducted 8 A/B tests and usability tests of product hypotheses. Retention improved by 15% in 2 months. Used product analytics to optimize journeys and activation.",
        "Handled developer handoff, design QA and reviews. Reduced post-release UI discrepancies by 60%.",
        "Contributed to product planning, prioritization and stakeholder collaboration. Integrated AI tools into research, hypothesis generation and prototyping."
      ]
    },
    "company": {
      "ru": "УК Медицина · OKK.PRO",
      "en": "UK Medicina · OKK.PRO"
    },
    "role": {
      "ru": "Старший продуктовый дизайнер",
      "en": "Senior Product Designer"
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
        "Проектировал сложные B2B-интерфейсы, CRM-модули и внутренние инструменты для web, iOS и Android. Разрабатывал информационную архитектуру, User Flows и масштабируемые сценарии.",
        "Спроектировал модули закупок, задач и обмеров. Работал с таблицами, фильтрами, дашбордами и многошаговыми сценариями.",
        "Улучшил NPS с 35 до 62 после редизайна ключевых модулей. Развивал дизайн-систему для web и mobile, ускорив передачу в разработку на 25%."
      ],
      "en": [
        "Designed complex B2B interfaces, CRM modules and internal tools for web, iOS and Android. Developed information architecture, user flows and scalable journeys.",
        "Designed procurement, task and measurement modules. Worked with tables, filters, dashboards and multi-step workflows.",
        "Improved NPS from 35 to 62 after redesigning core modules. Developed the web and mobile design system, accelerating developer handoff by 25%."
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
        "Создал 8 мобильных продуктов с нуля с суммарной аудиторией более 200 тыс. установок. Участвовал в полном цикле от discovery и UX-проектирования до delivery и оптимизации после релиза.",
        "Разрабатывал пользовательские сценарии, User Flows, интерактивные прототипы и UI-концепции. Анализировал поведение пользователей и продуктовые метрики.",
        "Внедрил motion design и микровзаимодействия, увеличив удержание на 18%. Развивал дизайн-системы и библиотеки Figma.",
        "Оптимизировал взаимодействие с разработкой и сократил сроки подготовки макетов на 25%. Выполнял handoff и Design QA, работал с PM, разработчиками и дизайнерами."
      ],
      "en": [
        "Designed 8 mobile products from scratch with over 200k installs combined. Contributed from discovery and UX design through delivery and post-release optimization.",
        "Developed user journeys, user flows, interactive prototypes and UI concepts. Analyzed user behavior and product metrics.",
        "Introduced motion design and microinteractions, increasing retention by 18%. Developed design systems and Figma libraries.",
        "Optimized collaboration with engineering, reducing design preparation time by 25%. Handled handoff and design QA alongside the PM, developers and designers."
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
        "Провёл UX-анализ и редизайн корпоративного сайта, увеличив конверсию заявок на 30%.",
        "Участвовал в обсуждении продукта, презентации решений и согласовании UX-концепций с руководством. Создавал интерактивные прототипы, выполнял handoff и Design QA с backend/frontend-разработчиками.",
        "Предложил UX-концепции развития продукта. Одна из них позволила сократить сроки разработки на 2 месяца. Формировал UX-подходы для масштабирования внутренних сервисов."
      ],
      "en": [
        "Designed internal B2B systems, dashboards and operational workflows to automate business processes. Worked on information architecture, navigation and data-heavy interfaces.",
        "Built a design system and UI Kit for internal products, accelerating interface design.",
        "Conducted UX analysis and redesigned the corporate website, increasing lead conversion by 30%.",
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
  ru: ['Дизайн-ревью', 'Найм дизайнеров', 'Приоритизация бэклога', 'Продуктовая стратегия'],
  en: ['Design reviews', 'Designer hiring', 'Backlog prioritization', 'Product strategy'],
};
export function getCvJobs(locale: Locale) {
  return cvJobs.map((job) => {
    const source = experiences.find((item) => item.id === job.sourceId)!;
    return { id: job.id, company: (job.company ?? source.company)[locale],
      role: (job.role ?? source.role)[locale], period: (job.period ?? source.period)[locale],
      summary: job.summary[locale], bullets: job.bullets[locale], website: source.website };
  });
}
