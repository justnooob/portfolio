# Портфолио Максима Сорокина

Это Next.js портфолио со статическим экспортом, оптимизированное под Cloudflare Pages.

## 🚀 Быстрый старт локально

```bash
npm install
npm run dev
```

Открой http://localhost:3000

## 📦 Сборка статической версии

```bash
npm run build
```

После сборки появится папка `out/` с готовыми HTML/CSS/JS файлами — её можно загружать на любой хостинг.

---

## 🌍 Деплой на Cloudflare Pages (рекомендуется для РФ)

Cloudflare Pages — бесплатный хостинг с серверами в России. Сайт будет летать.

### Шаг 1. Закоммить и запушь код в GitHub

```bash
git add .
git commit -m "Switch to static export for Cloudflare Pages"
git push
```

### Шаг 2. Подключи репозиторий к Cloudflare Pages

1. Зайди на https://dash.cloudflare.com → **Workers & Pages → Create → Pages**
2. Нажми **Connect to Git** → выбери GitHub → авторизуй Cloudflare
3. Выбери свой репозиторий `portfolio`
4. Нажми **Begin setup**

### Шаг 3. Настройки сборки

В настройках укажи:

| Поле | Значение |
|------|----------|
| **Framework preset** | `Next.js (Static HTML Export)` |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | `/` (по умолчанию) |
| **Node version** | `20` (через `Environment Variables`: `NODE_VERSION = 20`) |

Нажми **Save and Deploy**.

### Шаг 4. Жди сборки

1-3 минуты. Когда соберётся — Cloudflare выдаст URL вида `portfolio-xxx.pages.dev`. Открой — должно работать.

### Шаг 5. Привязка домена soromax.ru

1. **В Cloudflare Pages** → твой проект → **Custom domains** → **Set up a custom domain**
2. Введи `soromax.ru` → жмём **Continue → Activate**
3. **Удали в DNS старую запись** которая ведёт на Vercel (cname → vercel.app или A-запись на Vercel)
4. Cloudflare сам пропишет новые записи на Pages
5. Подожди 2-5 минут

### Шаг 6. Отключи Vercel (опционально)

Раз сайт уже на Pages — Vercel больше не нужен. Можешь удалить проект там, чтобы не платить (если был на платном плане).

---

## 🎨 Как редактировать контент

Все данные в одном файле: **`lib/data.ts`**

- `translations` — все тексты RU/EN
- `projects` — массив проектов
- `experiences` — опыт работы

После изменений запушь в GitHub — Cloudflare Pages автоматически пересоберёт.

## 🖼 Картинки и логотипы

- **Логотипы компаний** → `public/logos/`
- **Обложки проектов** → `public/projects/`
- **Иконка сайта** → `public/favicon.svg`

Достаточно положить файл с тем же именем — он сразу подхватится.

## 🔄 Workflow обновлений

```bash
# Внёс изменения в код
git add .
git commit -m "описание изменений"
git push
# Cloudflare Pages автоматически пересоберёт и обновит сайт за 1-3 минуты
```

---

## 📁 Структура проекта

```
portfolio/
├── app/
│   ├── layout.tsx              ← корневой layout
│   ├── page.tsx                ← главная страница
│   ├── globals.css             ← глобальные стили + темы
│   └── projects/[slug]/
│       ├── page.tsx            ← серверный wrapper (генерирует страницы)
│       ├── ProjectPageClient.tsx ← клиентская логика страницы проекта
│       └── project.module.css
├── components/
│   ├── AppProvider.tsx         ← хранит тему и язык
│   ├── CustomCursor.tsx        ← кастомный курсор со свечением
│   ├── Nav.tsx                 ← sticky-навигация с бургер-меню
│   ├── Hero.tsx                ← hero с typewriter
│   ├── Logos.tsx               ← логотипы компаний (SVG)
│   ├── Featured.tsx            ← главный проект (IYWI)
│   ├── Projects.tsx            ← сетка проектов по категориям
│   ├── Experience.tsx          ← аккордеон опыта работы
│   ├── FinalCta.tsx            ← финальный CTA
│   └── Footer.tsx              ← футер
├── lib/
│   ├── data.ts                 ← ⭐ ВСЕ ДАННЫЕ ЗДЕСЬ
│   └── useReveal.ts            ← хук reveal-анимаций
├── public/
│   ├── favicon.svg
│   ├── logos/                  ← SVG логотипы компаний
│   └── projects/               ← обложки проектов
├── package.json
└── next.config.js              ← конфиг с output: 'export'
```

---

## ❓ Если что-то не работает

### Сборка падает локально

```bash
rm -rf node_modules .next out
npm install
npm run build
```

### На Cloudflare Pages 404 на страницах проектов

Проверь что в `next.config.js`:
```js
output: 'export',
trailingSlash: true,
```

### Картинки не отображаются

Все пути должны быть от корня: `/projects/iywi.jpg` (не `./projects/...` и не `projects/...`).

---

Удачи! 🚀
