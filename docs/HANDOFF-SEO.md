# Бриф для Claude Code: обновление arkana.uz (SEO + заявки)

Полное ТЗ: https://claude.ai/code/artifact/c06adf5a-d95c-44c3-bc17-49baa21fe164

Цель: сайт тянет заявки и поднимается в топ-3 Google/Яндекса по Ташкенту на RU и UZ
(«IT аутсорсинг Ташкент», «компьютерный мастер выезд», «разработка телеграм бота», «E-IMZO установка»,
«IT xizmatlari Toshkent», «kompyuter ustasi» и т. д.) + 1 место по бренду «arkana».

**Почти всё уже сделано в коммитах этой ветки.** Твоя задача — применить, проверить, выложить и закрыть хвосты из раздела 3.

---

## 0. Железные правила

### Не ломать дизайн
- Тёмная тема и токены из `app/globals.css` (`--ark-*`, акцент `--ark-accent` #4fd18a). Новых цветов, шрифтов и UI-библиотек не добавлять.
- Новые блоки — по образцу `components/sections/ServiceLanding.tsx`, `PricingSection.tsx`, `components/lead/LeadForm.tsx`.
- Скриншоты до/после 1440×900 и 390×844, без горизонтальной прокрутки на 390 px.

### Контент
- **Цены на сайте НЕ публикуются** — ни в HTML, ни в JS, ни в schema.org, ни в API. Только «Цена по запросу» → форма. `lib/pricing.ts` — каталог без цен.
- Не выдумывать услуги и заявления. Запрещено: 24/7 мониторинг, «Microsoft 365 Partner», «сертифицированные инженеры», SLA 95 %, uptime 99,9 %, «ответ < 30 мин», «запуск за 14 дней», «персональный/именной менеджер», штрафы/компенсации по SLA.
- Контакты — только из `lib/company.ts`.

### Next.js 16
- API изменён — перед кодом читать `node_modules/next/dist/docs/` (см. `AGENTS.md`). Middleware = `proxy.ts`.
- Проверки: `npx tsc --noEmit -p .`, `npx eslint <файлы>`, `npm run build`.

---

## 1. Что сделано (коммиты по порядку)

| Коммит | Что |
|---|---|
| Шаг 1 | Тарифы на статике, правильный адрес/телефоны в schema.org (`lib/company.ts`, `lib/seo.ts`), убраны выдуманные заявления, новый hero главной |
| Шаг 2 | Цены убраны везде, `/api/pricing` удалён; заявки в Telegram + GoARKAN/почта (`lib/leads.ts`, `app/actions/contact.ts`, `LeadForm`), телефон обязателен, UTM; мобильная панель «Позвонить / Telegram / Заявка» (`QuickContact`); посадочные on-demand, telegram-bots, e-imzo |
| Бриф | этот файл |
| Шаги 4, 6, 7 | Удалены неиспользуемые медиа (~65 МБ), кейсы сжаты; убраны демо-цифры SLA/uptime; `/services/itsm` и `/services/managed-it` → 308; `/services/it-outsourcing` и `/infrastructure` на новом шаблоне; новые `/services/microsoft-365`, `/services/development`; страница «Все услуги»; адрес в футере |
| Шаг 3 | **Языковые URL**: всё в `app/[lang]`, русский на корне (`proxy.ts`: `/x` → rewrite `/ru/x`, `/ru/x` → 308 `/x`, cookie `ark-lang` уводит на выбранный язык), `<html lang>`, метаданные и hreflang по языкам (`lib/page-meta.ts`, `lib/locale.ts`), ссылки с префиксом (`components/ui/LocaleLink.tsx`), sitemap × 4 языка; CSP пропускает Метрику и GA |
| Шаг 5 | CMS с таймаутом 4 с и без дефолтного частного IP; контакты в футере/на контактах — из `lib/company.ts` |
| Без GoARKAN | Сайт полностью отвязан от GoARKAN: удалён `lib/cms-api.ts`, контакты — из `lib/company.ts`, тарифы — из `lib/pricing.ts`, заявки — Telegram + почта (`lib/leads.ts`). Ссылки на goarkan.uz как на продукт остались |
| Слияние с main | 6 новых статей перенесены в `app/[lang]/blog/[slug]`; из статей убраны «рыночные цены» (80–250 тыс за место, 2–5 млн в месяц — ниже наших тарифов, мешают продаже), «24/7», «именной инженер», совет требовать штрафы по SLA; 404 → `app/[lang]/not-found.tsx` + catch-all; `public/robots.txt` удалён (дублировал `app/robots.ts`), `/_next/` больше не закрыт для роботов |

Проверено здесь: tsc, eslint по изменённым файлам, `npm run build` (все страницы × 4 языка статически), прод-сервер: редиректы, hreflang, `<html lang>`, ноль цен в HTML и в `.next/static`, переключение языка и отправка формы в браузере, скриншоты.

---

## 2. Как применить

Файл `arkana-seo.bundle` положить в корень репозитория. Ветка уже слита со свежим `main` (`3046741`: 6 статей блога, 404, robots).
```
git fetch ./arkana-seo.bundle seo-update:seo-update
git checkout seo-update
npm ci
npx tsc --noEmit -p .
npm run build
```
Сборка на машине с интернетом (тянет Google Fonts). Потом — PR в `main` и деплой на Vercel.

### Переменные окружения на Vercel (обязательно)
```
TELEGRAM_LEADS_BOT_TOKEN=     # бот из @BotFather, добавлен в рабочий чат
TELEGRAM_LEADS_CHAT_ID=       # id чата, можно несколько через запятую
NEXT_PUBLIC_YANDEX_METRIKA_ID=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_YANDEX_VERIFICATION=
NEXT_PUBLIC_GOOGLE_SITE_VERIFY=
# по желанию:
RESEND_API_KEY=               # резервная доставка заявок на почту
CONTACT_TO_EMAIL=info@arkana.uz
# GOARKAN_API_URL, GOARKAN_TENANT_DOMAIN, PRICING_DATA_* больше не нужны — удалить из Vercel
```

### Проверка после деплоя
1. `https://arkana.uz/uz/services/on-demand` — узбекский текст, `<html lang="uz">`, hreflang на 4 версии.
2. `https://arkana.uz/ru/pricing` → 308 на `/pricing`; `/services/itsm` → 308 на `/goarkan`.
3. Тестовая заявка с сайта → пришла в Telegram-чат.
4. В Метрике и GA видны визиты и цели `lead_submit`, `click_phone`, `click_telegram`.
5. `curl -s https://arkana.uz/pricing | grep -E "[0-9]{3} [0-9]{3} сум"` → пусто.
6. Search Console и Яндекс Вебмастер: подтвердить сайт, отправить `https://arkana.uz/sitemap.xml`, в Вебмастере регион — Ташкент.

---

## 3. Что осталось (по порядку)

1. **Кейсы** (`components/home/HomeClients.tsx`, `components/sections/CasesPage.tsx`): то, что не проекты Arkana, пометить «Опыт команды». Ждём от Азиза список — не трогать без него.
2. **Узбекские тексты** проверить носителем: посадочные (`lib/landings.ts`), тарифы (`lib/pricing.ts`, `PricingSection`), метаданные (`lib/page-meta.ts`). Китайский берёт английские тексты там, где нет своих — ок.
3. **Блог** — статьи только на русском (canonical на RU). Новые статьи писать в том же формате; темы — в ТЗ, раздел «Вне сайта».
4. **`geo` в schema.org** (`lib/seo.ts`, TODO) — поставить точные координаты офиса из Google Maps.
5. **IndexNow** для Яндекса — ключ-файл в `public/` и пинг при деплое (по желанию).

## 4. Вне кода (делает Азиз)
Google Business Profile и Яндекс Бизнес (тот же адрес и телефоны, что в `lib/company.ts`), goldenpages.uz, prom.uz, каталог IT Park, отзывы реальных клиентов, статьи в блог.
