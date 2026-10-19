# Бриф для Claude Code: обновление arkana.uz (SEO + заявки)

Полное ТЗ: https://claude.ai/code/artifact/c06adf5a-d95c-44c3-bc17-49baa21fe164
Этот файл — рабочая выжимка: правила, что уже сделано, что делать дальше и как проверять.

Цель: сайт тянет заявки и поднимается в топ-3 Google/Яндекса по Ташкенту на RU и UZ
(«IT аутсорсинг Ташкент», «компьютерный мастер выезд», «разработка телеграм бота», «E-IMZO установка»,
«IT xizmatlari Toshkent», «kompyuter ustasi» и т. д.) + 1 место по бренду «arkana».

---

## 0. Железные правила

### Не ломать дизайн
- Тёмная тема и токены из `app/globals.css`: `--ark-bg`, `--ark-card`, `--ark-border`, `--ark-text*`, акцент `--ark-accent` (#4fd18a). Новых цветов, шрифтов и UI-библиотек не добавлять.
- Шрифты: Nacelle (заголовки), Manrope/Inter (текст). Классы `ark-badge`, `heading-gradient`, `btn grad-border` — переиспользовать.
- Новые блоки делать по образцу уже готовых: `components/sections/ServiceLanding.tsx`, `components/sections/PricingSection.tsx`, `components/lead/LeadForm.tsx`.
- Перед изменением страницы и после — скриншоты 1440×900 и 390×844 (Playwright), сравнить. Никакой горизонтальной прокрутки на 390 px.
- Анимации, видео-глобус и общую композицию главной не трогать, кроме пунктов ниже.

### Контент
- **Цены на сайте НЕ публикуются.** Только «Цена по запросу» / «Узнать стоимость» → форма. Цифры не должны попадать ни в HTML, ни в JS-бандл, ни в schema.org, ни в API. `lib/pricing.ts` — каталог без цен, так и оставить.
- Не выдумывать услуги и заявления. Запрещено: 24/7 мониторинг, «Microsoft 365 Partner», «сертифицированные инженеры», SLA 95 %, uptime 99,9 %, «ответ < 30 мин», «запуск за 14 дней», «персональный менеджер», штрафы/компенсации по SLA.
- Реальные контакты — только из `lib/company.ts` (Ташкент, Бозсув МФЙ, Хаким-заде 71; +998 99 998 17 77; +998 50 120 88 88; info@arkana.uz; @arkana_uz). Больше нигде их не хардкодить.

### Next.js
- Это Next.js 16 с изменённым API. Перед кодом читать `node_modules/next/dist/docs/` (см. `AGENTS.md`). Middleware здесь — `proxy.ts`.
- Проверки: `npx tsc --noEmit -p .`, `npx eslint <изменённые файлы>`, `npm run build`.

### Git
- Каждый шаг — отдельный коммит, понятное сообщение на русском. Работать в ветке `seo-update`, не в `main`.

---

## 1. Уже сделано (коммиты «Шаг 1» и «Шаг 2»)

- `lib/pricing.ts` — каталог услуг без цен; `/pricing` — «Услуги и тарифы», кнопки «Узнать стоимость» подставляют тариф в форму (`selectPlan`).
- `/api/pricing` удалён (отдавал цены из GoARKAN всем подряд).
- `lib/company.ts` — контакты; `lib/seo.ts` — правильный адрес и телефоны в schema.org.
- Главная: H1 «IT-отдел на аутсорсе для бизнеса в Ташкенте», новые цифры в hero, бегущая строка, чистка заявлений (HomeHero, HomeTrust, HomePlatform, HomeEnterprise, HomeComparison, HomeOperationFlow, AboutPage, CasesPage).
- Заявки: `lib/leads.ts` (Telegram + GoARKAN/Resend параллельно, ок — если дошло хоть куда-то), `app/actions/contact.ts` (телефон обязателен, email и компания по желанию, услуга, тариф, UTM, страница), `components/lead/LeadForm.tsx`, `lib/track.ts` (цели Метрики/GA).
- `components/lead/QuickContact.tsx` — нижняя панель на мобиле + кнопка Telegram на десктопе; телефон в шапке.
- Посадочные: `/services/on-demand`, `/services/telegram-bots`, `/services/e-imzo` (контент в `lib/landings.ts`, шаблон `ServiceLanding`, обёртка `LandingPage` со schema Service + FAQPage + Breadcrumbs). Меню, футер, sitemap обновлены.

Env, без которых заявки не доходят (сейчас GoARKAN на частном IP 192.168.112.11 → с Vercel недоступен):
```
TELEGRAM_LEADS_BOT_TOKEN=
TELEGRAM_LEADS_CHAT_ID=
RESEND_API_KEY=
CONTACT_TO_EMAIL=info@arkana.uz
NEXT_PUBLIC_YANDEX_METRIKA_ID=
NEXT_PUBLIC_GA_ID=
```

---

## 2. Что делать дальше — строго по порядку

### Шаг 3. Языковые URL — главный SEO-шаг
Сейчас uz/en/zh переключаются через localStorage → в поиске существует только RU.
- Русский остаётся на корне (`/`, `/pricing`…), остальные — с префиксом: `/uz/...`, `/en/...`, `/zh/...`.
- Язык определяется из URL (а не из localStorage) и на сервере: `<html lang>`, metadata, контент в первом HTML.
- `ThemeLanguageProvider` получает начальный язык из маршрута; переключатель языка ведёт на ту же страницу в другом языке (ссылка, не state).
- `generateMetadata` по языку: title/description для uz/en/zh (для посадочных — добавить `meta` по языкам в `lib/landings.ts`).
- hreflang: ru, uz, en, zh + x-default на каждой странице, взаимные; canonical — на себя. Сейчас в `app/layout.tsx` все языки указывают на один URL — исправить.
- `app/sitemap.ts` — все URL × 4 языка с `alternates.languages`.
- Нельзя ломать существующие RU-URL.
- Приёмка: `curl -s localhost:3000/uz/services/on-demand` отдаёт узбекский текст и `<html lang="uz">`; hreflang корректный; переключатель меняет URL.

### Шаг 4. Скорость (Core Web Vitals)
- Не используются нигде в коде — удалить: `public/hero-globe.mp4` (53 МБ), `public/hero-sphere.png` (2,9 МБ), `public/logo-dark.png`, `public/logo-light.png` (~1,6 МБ каждый). Перед удалением ещё раз `grep` по репо.
- Используются: `hero-globe.webm`, `hero-globe-720.mp4`, `hero-poster.jpg` — оставить, проверить `preload="none"`/постер. `logo-3d.png` (484 КБ) → WebP ≤ 40 КБ.
- `public/cases` (23 МБ) → WebP ≤ 200 КБ на картинку, тот же кадр и пропорции.
- Картинки — через `next/image` с размерами. three.js / gsap — динамический импорт, не на первом экране, где возможно.
- Приёмка: PageSpeed (мобильный) ≥ 85 на `/`, `/pricing`, `/services/on-demand`; внешний вид первого экрана не меняется.

### Шаг 5. Убрать зависимость от CMS на частном IP
`lib/cms-api.ts` ходит на `GOARKAN_API_URL ?? http://192.168.112.11` за блогом, FAQ, командой, настройками.
- Контент, который сейчас приходит из CMS, держать в репозитории (как `lib/landings.ts`); CMS — опционально, с таймаутом и фолбэком на локальные данные.
- Приёмка: без `GOARKAN_API_URL` все страницы собираются и показывают полный текст.

### Шаг 6. Хвосты контента
- `HomeDashboard` — демо-цифры (95,4 % SLA, 99,9 % uptime): подписать «Пример интерфейса GoARKAN» или заменить на нейтральные значения без процентов SLA/uptime.
- `HomeClients` / `/cases` — кейсы, которые не проекты Arkana, пометить «Опыт команды» (ждём подтверждения от Азиза — до этого не трогать).
- `lib/i18n.ts` — в переводах лежат `99.9%`, `24/7` (stat1v, s1v, s2b) — убрать, если где-то выводятся.
- `components/home/HomePricing.tsx` (не используется, внутри старые цены) — удалить.
- Старые `/services/managed-it` и `/services/itsm` → 301 на `/services/it-outsourcing` и `/goarkan` (`next.config.ts` redirects); `/services` — обновить список под новые посадочные.
- `components/layout/Footer.tsx` — две старые ошибки линтера (`react-hooks/static-components`, строка ~133) и неиспользуемые `PRICING_HREFS`, `address`.

### Шаг 7. Ещё посадочные (тем же шаблоном `ServiceLanding`)
- `/services/microsoft-365` — Microsoft 365, корпоративная почта на домене.
- `/services/development` — разработка: сайты, CRM, интеграции (ставки и цены не публиковать).
- Только услуги из тарифной сетки; ничего нового не придумывать.

### Шаг 8. Аналитика и вебмастера
- Проверить, что цели из `lib/track.ts` (`lead_submit`, `click_phone`, `click_telegram`) реально уходят в Метрику и GA.
- Подготовить IndexNow-ключ и роут для Яндекса.

---

## 3. Как проверять каждый шаг
1. `npx tsc --noEmit -p .` — без ошибок.
2. `npx eslint` по изменённым файлам — без новых ошибок.
3. `npm run build` — проходит.
4. Скриншоты до/после 1440 и 390 — дизайн не поехал.
5. `curl` страницы — нужный текст есть в HTML; цифр цен нет: `curl -s localhost:3000/pricing | grep -E "[0-9]{3} [0-9]{3}"` → пусто.
6. Отправка тестовой заявки → приходит в Telegram-чат.

## 4. Вне кода (делает Азиз, сюда для полноты)
Google Business Profile, Яндекс Бизнес, goldenpages.uz, prom.uz, каталог IT Park, отзывы реальных клиентов, Search Console и Яндекс Вебмастер, статьи в блог.
