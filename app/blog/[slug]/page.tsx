import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo";

const POSTS: Record<string, {
  title: string; category: string; date: string; readTime: string;
  excerpt: string; content: string;
}> = {
  "it-outsourcing-vs-staff": {
    title: "IT-аутсорсинг vs штатный IT-отдел: что выгоднее для бизнеса в 2026 году",
    category: "IT-аутсорсинг", date: "15 июня 2026", readTime: "8 мин",
    excerpt: "Разбираем реальные расходы: зарплаты, налоги, оборудование, обучение. Когда аутсорсинг выгоднее и для кого.",
    content: `
Для большинства компаний в Ташкенте главный вопрос звучит так: содержать собственный IT-отдел или передать IT на аутсорсинг?

## Реальная стоимость штатного IT-специалиста

Средняя зарплата IT-инженера в Ташкенте составляет $600–1200/месяц. Но это только начало:

- Налоги и социальные отчисления: +30–35%
- Оборудование, рабочее место: $500–2000 единоразово
- Обучение и сертификации: $200–500/год
- Отпуска, больничные: потеря ~20% рабочего времени
- Замена при увольнении: 1–3 месяца поиска + адаптация

**Итого**: 1 IT-специалист обходится в $1000–2000/месяц, а в нерабочее время или при увольнении вы остаётесь без поддержки.

## Что даёт аутсорсинг

IT-аутсорсинг — это фиксированный ежемесячный платёж за **полное IT-обслуживание**:

- Именная команда (не один человек)
- SLA-гарантия: время реакции <2 часа
- 24/7 мониторинг инфраструктуры
- Service Desk для сотрудников
- Регулярные отчёты

## Когда аутсорсинг выгоднее

Аутсорсинг выгоден, если в компании:
- 5–200 рабочих мест
- Нет постоянной нагрузки на IT
- Нужна предсказуемая стоимость IT
- Важна скорость реакции на инциденты

**Вывод**: для большинства компаний в Узбекистане IT-аутсорсинг обходится на 30–50% дешевле штатного отдела при более высоком качестве обслуживания.
    `,
  },
  "cybersecurity-threats-2026": {
    title: "5 главных угроз кибербезопасности для малого бизнеса в 2026 году",
    category: "Кибербезопасность", date: "8 июня 2026", readTime: "6 мин",
    excerpt: "Фишинг, программы-вымогатели, атаки на Supply Chain — как защитить бизнес без большого бюджета.",
    content: `
Кибератаки на малый бизнес растут на 40% ежегодно. В 2026 году каждая третья компания в регионе сталкивалась с инцидентом безопасности.

## 1. Фишинг через email

78% успешных атак начинаются с фишингового письма. Сотрудники переходят по ссылкам, вводят пароли — и злоумышленники получают доступ.

**Защита**: Обучение сотрудников + двухфакторная аутентификация + фильтрация email.

## 2. Программы-вымогатели (Ransomware)

Вирус шифрует все файлы и требует выкуп. Средний выкуп для малого бизнеса — $15 000–50 000.

**Защита**: Регулярные резервные копии (которые тестируются) + обновление ПО + ограничение прав.

## 3. Атаки через подрядчиков

Если ваш IT-партнёр скомпрометирован, атакующие получают доступ ко всем его клиентам.

**Защита**: Выбирайте партнёров с подтверждёнными практиками безопасности.

## 4. Незащищённый удалённый доступ

RDP без VPN, слабые пароли, отсутствие MFA — всё это открытые двери для атак.

**Защита**: VPN, строгая политика паролей, MFA для всех критических систем.

## 5. Уязвимости в устаревшем ПО

Неустановленные обновления = известные уязвимости. Хакеры используют публичные эксплойты.

**Защита**: Политика обязательных обновлений + сканирование уязвимостей.

**Вывод**: Большинство угроз предотвращаемы при правильной настройке и регулярном мониторинге.
    `,
  },
  "m365-migration-guide": {
    title: "Как перейти на Microsoft 365 без потери данных и простоя",
    category: "Microsoft 365", date: "1 июня 2026", readTime: "10 мин",
    excerpt: "Пошаговый план миграции: подготовка, перенос данных, настройка, обучение сотрудников.",
    content: `
Переход на Microsoft 365 — одно из лучших IT-решений для бизнеса. Но без правильного планирования миграция может вызвать потерю данных и простой.

## Шаг 1: Аудит и инвентаризация (1–2 недели)

Перед миграцией необходимо:
- Составить список всех почтовых ящиков и их объём
- Проверить совместимость существующего ПО
- Выбрать тип лицензий (Business Basic, Standard, Premium)
- Определить приоритет переноса: сначала пилотная группа (5–10 человек)

## Шаг 2: Подготовка DNS (1–3 дня)

Настройка DNS записей: MX, SPF, DKIM, DMARC. Это критично для корректной доставки почты.

## Шаг 3: Миграция данных

Используем Microsoft Migration Tool или стороннее ПО для переноса:
- Почта (Exchange / Gmail / Outlook.pst)
- Контакты и календари
- Файлы (в SharePoint / OneDrive)

## Шаг 4: Тестирование пилотной группы (1 неделя)

Пилотная группа работает в новой среде. Выявляем проблемы до массовой миграции.

## Шаг 5: Массовый переход

Переводим всех сотрудников по расписанию. Параллельная работа двух систем в течение 2 недель.

## Шаг 6: Обучение и поддержка

Сотрудники должны знать основы Teams, OneDrive, SharePoint. Без этого эффект от M365 минимален.

**Типичные сроки**: 3–6 недель для компании 20–100 человек.
    `,
  },
  "when-to-replace-servers": {
    title: "Когда пора менять серверное оборудование: признаки и план действий",
    category: "Инфраструктура", date: "24 мая 2026", readTime: "7 мин",
    excerpt: "Возраст оборудования, производительность, стоимость обслуживания — как принять правильное решение.",
    content: `
Серверное оборудование — долгосрочная инвестиция. Но держать устаревшие серверы дороже, чем купить новые.

## 5 признаков, что пора менять оборудование

**1. Возраст более 5–7 лет**
Производители прекращают поддержку. Запчасти дорогают или исчезают. Риск внезапного отказа растёт экспоненциально.

**2. Частые сбои и простои**
Если сервер отказывает раз в квартал — это уже проблема. Считайте стоимость простоев: она часто превышает стоимость нового оборудования.

**3. Производительность не отвечает требованиям**
Если сервер загружен >80% постоянно, пользователи жалуются на медленную работу — оборудование устарело функционально.

**4. Стоимость обслуживания растёт**
Если расходы на ремонт превышают 20–30% стоимости нового сервера в год — пора менять.

**5. Несовместимость с современным ПО**
Некоторое ПО перестаёт поддерживать старые ОС и оборудование.

## Как принять решение

Рассчитайте Total Cost of Ownership (TCO):
- Стоимость простоев за год
- Стоимость поддержки и ремонтов
- Стоимость обновлений
- Сравните с ценой нового оборудования или облачного решения

**Часто выгоднее**: перейти в облако (Azure/AWS) вместо покупки нового железа.
    `,
  },
  "cut-it-costs": {
    title: "Как сократить IT-расходы на 30–40% без потери качества",
    category: "Оптимизация затрат", date: "17 мая 2026", readTime: "9 мин",
    excerpt: "Аудит лицензий, оптимизация облака, пересмотр контрактов — практические советы.",
    content: `
IT-бюджет можно оптимизировать без ущерба для работы. Наш опыт показывает: компании переплачивают в среднем на 30–40%.

## 1. Аудит программных лицензий

Типичная картина: компания платит за 50 лицензий, используют активно 30. Остальные — неэффективные расходы.

**Действие**: Инвентаризация всех лицензий, отключение неиспользуемых.
**Экономия**: 15–25% от затрат на ПО.

## 2. Оптимизация Microsoft 365

Часто сотрудникам назначены дорогие планы (M365 Business Premium), хотя им достаточно Business Basic.

**Действие**: Пересмотр лицензий под реальные потребности.
**Экономия**: $5–10/пользователь/месяц.

## 3. Ревизия облачных ресурсов

"Облако растёт само" — распространённая проблема. Неиспользуемые VM, старые снапшоты, избыточные ресурсы.

**Действие**: Ежемесячный Cloud Cost Review.
**Экономия**: 20–40% облачных расходов.

## 4. Консолидация поставщиков

Один поставщик интернета, один поставщик оборудования, одна IT-компания — это скидки за объём.

## 5. Переход на аутсорсинг

Для компаний с непостоянной IT-нагрузкой аутсорсинг дешевле штатного отдела.

**Потенциальная суммарная экономия**: 30–45% IT-бюджета при правильном IT-аудите.
    `,
  },
  "sla-guide": {
    title: "SLA в IT-аутсорсинге: что должно быть в договоре и как проверить выполнение",
    category: "IT-аутсорсинг", date: "10 мая 2026", readTime: "5 мин",
    excerpt: "Время реакции, время решения, штрафные санкции, прозрачность — чек-лист для бизнеса.",
    content: `
SLA (Service Level Agreement) — это ваша страховка при работе с IT-подрядчиком. Без него невозможно требовать качества.

## Что обязательно должно быть в SLA

**1. Время реакции (Response Time)**
- П1 (критический): ≤ 30 минут
- П2 (высокий): ≤ 2 часа
- П3 (средний): ≤ 8 часов
- П4 (низкий): ≤ 24 часа

**2. Время решения (Resolution Time)**
- П1: ≤ 4 часа
- П2: ≤ 8 часов
- П3: ≤ 3 рабочих дня
- П4: ≤ 5 рабочих дней

**3. Доступность инфраструктуры**
Минимум 99.5% для бизнес-критичных систем (это ~3.6 часа простоя в год).

**4. Штрафные санкции**
Нарушение SLA должно влечь конкретные санкции: скидку за следующий месяц, бонусные часы, компенсацию.

**5. Инструменты контроля**
Вы должны видеть статистику в реальном времени, а не получать её по запросу.

## Как проверить выполнение SLA

Качественный IT-аутсорсер даёт клиенту доступ к системе мониторинга (как GoARKAN), где видны:
- Все открытые и закрытые заявки
- Фактическое время реакции по каждой
- SLA-исполнение за период
- История инцидентов

**Вывод**: SLA без инструментов контроля — это просто слова. Требуйте прозрачности.
    `,
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return { title: "Статья не найдена" };
  return {
    title: `${post.title} | ARKANA Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) notFound();

  const paragraphs = post.content.trim().split("\n\n");
  const articleSchema  = buildArticleSchema({ slug, title: post.title, excerpt: post.excerpt, date: post.date });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Главная", url: "/" },
    { name: "Блог", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ]);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 96 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Header */}
      <section style={{ padding: "96px 0 48px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(99,102,241,0.1), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ark-text-muted)", fontSize: 13, textDecoration: "none", marginBottom: 32 }}>
            <ArrowLeft size={14} />
            Все статьи
          </Link>
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 6, background: "var(--ark-accent-glow)", color: "var(--ark-accent-2)" }}>
              {post.category}
            </span>
          </div>
          <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1.15, color: "var(--ark-text)", marginBottom: 20 }}>
            {post.title}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: "var(--ark-text-muted)" }}>{post.date}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "var(--ark-text-muted)" }}>
              <Clock size={13} />
              {post.readTime} чтения
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article style={{ maxWidth: "48rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {paragraphs.map((block, i) => {
          if (block.startsWith("## ")) {
            return (
              <h2 key={i} style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.375rem", color: "var(--ark-text)", marginTop: 40, marginBottom: 16, letterSpacing: "-0.02em" }}>
                {block.replace("## ", "")}
              </h2>
            );
          }
          if (block.startsWith("**") && block.endsWith("**")) {
            return (
              <p key={i} style={{ fontSize: 15, color: "var(--ark-text)", fontWeight: 600, lineHeight: 1.7, marginBottom: 12 }}>
                {block.replace(/\*\*/g, "")}
              </p>
            );
          }
          if (block.startsWith("- ")) {
            const items = block.split("\n").filter(l => l.startsWith("- "));
            return (
              <ul key={i} style={{ paddingLeft: 20, marginBottom: 16 }}>
                {items.map((item, j) => (
                  <li key={j} style={{ fontSize: 15, color: "var(--ark-text-muted)", lineHeight: 1.75, marginBottom: 6 }}>
                    {item.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} style={{ fontSize: 15.5, color: "var(--ark-text-muted)", lineHeight: 1.8, marginBottom: 20 }}
               dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong style='color:var(--ark-text)'>$1</strong>") }} />
          );
        })}

        {/* CTA */}
        <div style={{ marginTop: 64, padding: "32px", borderRadius: 16, background: "linear-gradient(to bottom right, rgba(99,102,241,0.12), rgba(79,70,229,0.05))", border: "1px solid rgba(99,102,241,0.25)", textAlign: "center" }}>
          <h3 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.25rem", color: "var(--ark-text)", marginBottom: 12 }}>
            Готовы оптимизировать IT вашего бизнеса?
          </h3>
          <p style={{ fontSize: 14, color: "var(--ark-text-muted)", marginBottom: 24 }}>
            Получите бесплатный IT-аудит за 5 рабочих дней
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 24px", borderRadius: 8, background: "linear-gradient(to bottom, #6366f1, #4f46e5)", color: "white", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
            Запросить аудит
          </Link>
        </div>
      </article>
    </div>
  );
}
