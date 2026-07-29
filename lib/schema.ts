export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://soromax.ru/#person',

      name: 'Максим Сорокин',
      givenName: 'Максим',
      familyName: 'Сорокин',
      alternateName: ['Maxim Sorokin', 'Soromax'],

      url: 'https://soromax.ru',
      image: { '@id': 'https://soromax.ru/#image' },

      jobTitle: 'Lead Product Designer',
      description:
        'Lead UX/UI и Product Designer. Более 7 лет проектирую AI SaaS, B2B продукты, Telegram Mini Apps, мобильные приложения и дизайн-системы.',

      knowsLanguage: ['Russian', 'English'],

      knowsAbout: [
        'UX Design',
        'UI Design',
        'Product Design',
        'Product Strategy',
        'Design Systems',
        'Figma',
        'User Experience',
        'User Interface',
        'AI SaaS',
        'Artificial Intelligence',
        'Mobile App Design',
        'Telegram Mini Apps',
        'Interaction Design',
        'Prototyping',
        'Research',
        'Wireframing',
        'Usability',
        'B2B Products',
        'Dashboard Design',
      ],

      sameAs: [
        'https://t.me/sfokin1337',
        'https://setka.ru/users/140f8a9b-bda6-4796-806d-ad68256b7d86',
        'https://spb.hh.ru/resume/e091bcd6ff093a30910039ed1f48544f4f6749',
        'https://www.behance.net/maksimsorokin',
        'https://dprofile.ru/jobs/vacancies?sort=DATE&group=ALL&type=VACANCY',
        'https://career.habr.com/profile/notifications',
        'https://www.linkedin.com/in/maksim-sorokin-840258403/?skipRedirect=true',
        'https://vk.ru/sfokin1337',
      ],
    },

    // Раньше "Soromax" был указан как worksFor у Person — это неточно
    // (worksFor подразумевает реального работодателя). Теперь это
    // личный бренд, у которого вы — founder, а не наоборот.
    {
      '@type': 'Organization',
      '@id': 'https://soromax.ru/#organization',
      name: 'Soromax',
      url: 'https://soromax.ru',
      founder: { '@id': 'https://soromax.ru/#person' },
      logo: {
        '@type': 'ImageObject',
        url: 'https://soromax.ru/favicon.svg',
      },
    },

    {
      '@type': 'ImageObject',
      '@id': 'https://soromax.ru/#image',
      url: 'https://soromax.ru/maksim-sorokin-product-designer.jpg',
      contentUrl: 'https://soromax.ru/maksim-sorokin-product-designer.jpg',
      // TODO: впишите реальные пиксельные размеры файла — см. "Следующие шаги" ниже
      // width: ...,
      // height: ...,
      caption:
        'Максим Сорокин — Product Designer. UX/UI, AI SaaS, Design Systems.',
    },

    {
      '@type': 'WebSite',
      '@id': 'https://soromax.ru/#website',
      url: 'https://soromax.ru',
      name: 'Soromax',
      publisher: { '@id': 'https://soromax.ru/#person' },
      inLanguage: 'ru-RU',
    },

    // WebPage и ProfilePage объединены в один узел (раньше были
    // два раздельных объекта, описывающих одну и ту же страницу).
    {
      '@type': ['WebPage', 'ProfilePage'],
      '@id': 'https://soromax.ru/#webpage',
      url: 'https://soromax.ru',
      name: 'Максим Сорокин — UX/UI Product Designer',
      isPartOf: { '@id': 'https://soromax.ru/#website' },
      about: { '@id': 'https://soromax.ru/#person' },
      mainEntity: { '@id': 'https://soromax.ru/#person' },
      primaryImageOfPage: { '@id': 'https://soromax.ru/#image' },
      hasPart: [{ '@id': 'https://soromax.ru/projects/#portfolio' }],
    },

    {
      '@type': 'BreadcrumbList',
      '@id': 'https://soromax.ru/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Главная',
          item: 'https://soromax.ru',
        },
      ],
    },

    // Теперь подключена к WebPage через hasPart и имеет свой url —
    // раньше "висела в воздухе", ни на что не ссылаясь.
    {
      '@type': 'CollectionPage',
      '@id': 'https://soromax.ru/projects/#portfolio',
      url: 'https://soromax.ru/projects',
      name: 'Портфолио',
      about: { '@id': 'https://soromax.ru/#person' },
    },
  ],
};
