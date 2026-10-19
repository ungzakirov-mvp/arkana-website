"use client";

import Link from "next/link";
import { Check, Minus, ArrowRight } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import {
  tr, fmt, type L,
  SUBSCRIPTION, SUBSCRIPTION_COMPARE, SUBSCRIPTION_ADDONS, SUBSCRIPTION_TERMS,
  ON_DEMAND, PROJECTS, PROJECT_TERMS,
  GOARKAN_PLANS, GOARKAN_FEATURES, BOT_PLANS, BOT_NOTE, GENERAL_TERMS, CHOOSER,
} from "@/lib/pricing";

const UI = {
  badge: { ru: "Тарифы 2027", uz: "2027 tariflari", en: "2027 pricing" },
  h1: { ru: "Цены на IT-обслуживание в Ташкенте", uz: "Toshkentda IT xizmat narxlari", en: "IT support pricing in Tashkent" },
  sub: {
    ru: "Подписка, разовые работы, проекты, цифровой офис GoARKAN и Telegram-боты. Все цены в сумах, без НДС, фиксируются в договоре.",
    uz: "Obuna, bir martalik ishlar, loyihalar, GoARKAN raqamli ofisi va Telegram-botlar. Barcha narxlar so'mda, QQSsiz, shartnomada belgilanadi.",
    en: "Subscription, one-off jobs, projects, GoARKAN digital office and Telegram bots. All prices in UZS, VAT-exempt, fixed in the contract.",
  },
  nav: [
    { id: "subscription", l: { ru: "Подписка", uz: "Obuna", en: "Subscription" } },
    { id: "on-demand", l: { ru: "По заявкам", uz: "Ariza bo'yicha", en: "Pay per job" } },
    { id: "projects", l: { ru: "Проекты", uz: "Loyihalar", en: "Projects" } },
    { id: "goarkan", l: { ru: "GoARKAN", uz: "GoARKAN", en: "GoARKAN" } },
    { id: "bots", l: { ru: "Боты", uz: "Botlar", en: "Bots" } },
  ],
  sum: { ru: "сум", uz: "so'm", en: "UZS" },
  mo: { ru: "в месяц", uz: "oyiga", en: "per month" },
  from: { ru: "от", uz: "dan", en: "from" },
  recommended: { ru: "Чаще выбирают", uz: "Ko'proq tanlanadi", en: "Most chosen" },
  choose: { ru: "Подключить", uz: "Ulash", en: "Get started" },
  order: { ru: "Заказать", uz: "Buyurtma berish", en: "Order" },
  call: { ru: "Вызвать специалиста", uz: "Mutaxassis chaqirish", en: "Call an engineer" },
  subTitle: { ru: "Подписка — ваш ИТ-отдел за фиксированную сумму", uz: "Obuna — belgilangan narxdagi IT bo'limingiz", en: "Subscription — your IT department for a fixed fee" },
  subLead: {
    ru: "Один платёж в месяц: поддержка сотрудников, выезды, серверы и Microsoft 365, сроки реакции в договоре, отчёт руководителю и GoARKAN.",
    uz: "Oyiga bitta to'lov: xodimlarni qo'llab-quvvatlash, tashriflar, serverlar va Microsoft 365, shartnomadagi javob muddatlari, rahbarga hisobot va GoARKAN.",
    en: "One monthly payment: staff support, on-site visits, servers and Microsoft 365, contractual response times, management report and GoARKAN.",
  },
  compare: { ru: "Сравнить пакеты подробно", uz: "Paketlarni batafsil solishtirish", en: "Compare plans in detail" },
  addons: { ru: "Дополнительно к любому пакету", uz: "Har qanday paketga qo'shimcha", en: "Add-ons for any plan" },
  addonPrice: { ru: "сум в месяц", uz: "so'm oyiga", en: "UZS per month" },
  terms: { ru: "Условия", uz: "Shartlar", en: "Terms" },
  odTitle: { ru: "По заявкам — платите только за факт", uz: "Ariza bo'yicha — faqat bajarilgan ish uchun", en: "Pay per job — only for what's done" },
  odLead: { ru: "Без абонентской платы и обязательств. Хороший способ начать и посмотреть, как мы работаем.", uz: "Abonent to'lovi va majburiyatlarsiz. Boshlash va ishimizni ko'rish uchun yaxshi usul.", en: "No monthly fee, no commitment. A good way to start and see how we work." },
  callout: { ru: "Выезд по Ташкенту", uz: "Toshkent bo'ylab tashrif", en: "Call-out in Tashkent" },
  calloutNote: { ru: "Один выезд — сколько угодно работ", uz: "Bitta tashrif — istalgancha ish", en: "Any number of jobs per visit" },
  fixed: { ru: "Типовая работа", uz: "Oddiy ish", en: "Standard job" },
  fixedNote: { ru: "Фиксированная цена из таблицы", uz: "Jadvaldagi qat'iy narx", en: "Fixed price from the table" },
  hourly: { ru: "Работа по часам", uz: "Soatbay ish", en: "Hourly work" },
  hourlyNote: { ru: "Минимум 1 час, далее по 30 минут", uz: "Kamida 1 soat, keyin 30 daqiqadan", en: "1 hour minimum, then 30-minute steps" },
  perHour: { ru: "/ час", uz: "/ soat", en: "/ hour" },
  hourCards: { ru: "Карта часов: действует 3 месяца, выезды включены", uz: "Soatlar kartasi: 3 oy amal qiladi, tashriflar kiritilgan", en: "Hour pack: valid 3 months, call-outs included" },
  hours: { ru: "часов", uz: "soat", en: "hours" },
  hourComes: { ru: "час выходит", uz: "soat narxi", en: "per hour" },
  example: { ru: "Пример", uz: "Misol", en: "Example" },
  priceList: { ru: "Самые частые работы", uz: "Eng ko'p bajariladigan ishlar", en: "Most common jobs" },
  work: { ru: "Работа", uz: "Ish", en: "Job" },
  unit: { ru: "Единица", uz: "Birlik", en: "Unit" },
  price: { ru: "Цена, сум", uz: "Narx, so'm", en: "Price, UZS" },
  prTitle: { ru: "Проекты — фиксированная цена за результат", uz: "Loyihalar — natija uchun qat'iy narx", en: "Projects — fixed price for the result" },
  prLead: { ru: "Внедрили, настроили, сдали по акту.", uz: "Joriy etdik, sozladik, dalolatnoma bilan topshirdik.", en: "Rolled out, configured, signed off." },
  byEstimate: { ru: "по смете", uz: "smeta bo'yicha", en: "by estimate" },
  gaTitle: { ru: "GoARKAN — цифровой офис вашей компании", uz: "GoARKAN — kompaniyangizning raqamli ofisi", en: "GoARKAN — your company's digital office" },
  gaLead: {
    ru: "Заявки сотрудников, учёт техники и склада, документооборот с электронной подписью и дашборд руководителя — в браузере и в Telegram. В подписке уже включён: START — Service Desk, BUSINESS — Офис, ENTERPRISE — Цифровой офис.",
    uz: "Xodimlar arizalari, texnika va ombor hisobi, elektron imzoli hujjat aylanishi va rahbar paneli — brauzerda va Telegramda. Obunaga allaqachon kiritilgan: START — Service Desk, BUSINESS — Ofis, ENTERPRISE — Raqamli ofis.",
    en: "Staff requests, asset and stock records, e-docs with electronic signature and a management dashboard — in the browser and Telegram. Already included in subscriptions: START — Service Desk, BUSINESS — Office, ENTERPRISE — Digital Office.",
  },
  gaMore: { ru: "Подробнее о GoARKAN", uz: "GoARKAN haqida batafsil", en: "More about GoARKAN" },
  storage: { ru: "Хранилище", uz: "Xotira", en: "Storage" },
  botTitle: { ru: "Telegram-боты под ключ", uz: "Tayyor Telegram-botlar", en: "Turnkey Telegram bots" },
  botLead: { ru: "Бот, который принимает заявки, собирает данные или уведомляет сотрудников — за фиксированную цену и в понятный срок.", uz: "Arizalarni qabul qiluvchi, ma'lumot yig'uvchi yoki xodimlarni xabardor qiluvchi bot — qat'iy narx va aniq muddatda.", en: "A bot that takes requests, collects data or notifies staff — at a fixed price and a clear deadline." },
  term: { ru: "Срок", uz: "Muddat", en: "Timeline" },
  integrations: { ru: "Интеграции", uz: "Integratsiyalar", en: "Integrations" },
  support: { ru: "Хостинг и сопровождение", uz: "Xosting va kuzatuv", en: "Hosting and support" },
  chooseTitle: { ru: "Что выбрать — за минуту", uz: "Bir daqiqada tanlang", en: "Pick in a minute" },
  situation: { ru: "Ваша ситуация", uz: "Vaziyatingiz", en: "Your situation" },
  solution: { ru: "Решение", uz: "Yechim", en: "Solution" },
  guide: { ru: "Ориентир", uz: "Taxminiy narx", en: "Guide price" },
  general: { ru: "Общие условия", uz: "Umumiy shartlar", en: "General terms" },
  ctaTitle: { ru: "Не знаете, что подходит?", uz: "Qaysi biri mosligini bilmaysizmi?", en: "Not sure what fits?" },
  ctaBody: { ru: "Напишите, сколько сотрудников и что болит, — пришлём расчёт на одну страницу.", uz: "Nechta xodim va qanday muammo borligini yozing — bir sahifalik hisob yuboramiz.", en: "Tell us your headcount and pain points — we'll send a one-page quote." },
  ctaBtn: { ru: "Получить расчёт", uz: "Hisob olish", en: "Get a quote" },
} satisfies Record<string, L | unknown>;

const Yes = () => <Check size={16} strokeWidth={2.5} style={{ color: "var(--ark-accent)" }} aria-label="да" />;
const No = () => <Minus size={16} style={{ color: "var(--ark-text-faint)" }} aria-label="нет" />;

function Section({ id, title, lead, children }: { id: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="pr-section">
      <div className="pr-wrap">
        <h2 className="pr-h2">{title}</h2>
        {lead && <p className="pr-lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function PricingSection() {
  const { lang } = useApp();
  const t = (v: L) => tr(v, lang);
  const sum = t(UI.sum);

  return (
    <>
      <style>{`
        .pr-wrap { max-width: 76rem; margin: 0 auto; padding: 0 1.25rem; }
        .pr-section { padding: 72px 0 0; scroll-margin-top: 96px; }
        .pr-h2 { font-family: Nacelle, sans-serif; font-weight: 600; font-size: clamp(1.5rem, 3vw, 2.1rem); letter-spacing: -0.03em; color: var(--ark-text-heading); margin: 0 0 12px; }
        .pr-h3 { font-family: Nacelle, sans-serif; font-weight: 600; font-size: 1.15rem; color: var(--ark-text-heading); margin: 40px 0 14px; }
        .pr-lead { color: var(--ark-text-muted); font-size: 16px; line-height: 1.65; max-width: 760px; margin: 0 0 28px; }
        .pr-grid3 { display: grid; gap: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .pr-grid2 { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (max-width: 900px) { .pr-grid3, .pr-grid2 { grid-template-columns: 1fr; } }
        .pr-card { position: relative; background: var(--ark-card); border: 1px solid var(--ark-border); border-radius: 16px; padding: 24px 22px; display: flex; flex-direction: column; }
        .pr-card.rec { border-color: var(--ark-accent); box-shadow: 0 0 0 1px var(--ark-accent), 0 10px 40px var(--ark-accent-glow); }
        .pr-flag { position: absolute; top: -12px; left: 22px; background: var(--ark-accent); color: #05080a; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; letter-spacing: .02em; }
        .pr-name { font-size: 12px; font-weight: 800; letter-spacing: .14em; color: var(--ark-accent-2); text-transform: uppercase; }
        .pr-price { font-family: Nacelle, sans-serif; font-size: 30px; font-weight: 700; letter-spacing: -0.03em; color: var(--ark-text-heading); margin: 10px 0 2px; line-height: 1.1; }
        .pr-price small { font-size: 14px; font-weight: 500; color: var(--ark-text-sub); letter-spacing: 0; }
        .pr-meta { font-size: 13px; color: var(--ark-text-sub); margin-bottom: 4px; }
        .pr-aud { font-size: 14px; color: var(--ark-text-muted); margin: 6px 0 16px; }
        .pr-list { list-style: none; padding: 0; margin: 0 0 22px; display: flex; flex-direction: column; gap: 9px; flex: 1; }
        .pr-list li { display: flex; gap: 9px; font-size: 14px; color: var(--ark-text-dim); line-height: 1.45; }
        .pr-list li svg { flex-shrink: 0; margin-top: 2px; }
        .pr-btn { display: block; text-align: center; padding: 11px 16px; border-radius: 10px; font-size: 14px; font-weight: 700; text-decoration: none; border: 1px solid var(--ark-border-strong); color: var(--ark-text); transition: opacity .15s, transform .1s; }
        .pr-btn.primary { background: var(--ark-accent); color: #05080a; border-color: var(--ark-accent); }
        .pr-btn:hover { opacity: .88; transform: translateY(-1px); }
        .pr-table-wrap { overflow-x: auto; border: 1px solid var(--ark-border); border-radius: 14px; background: var(--ark-card); }
        .pr-table { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 620px; }
        .pr-table th, .pr-table td { padding: 11px 14px; text-align: left; border-bottom: 1px solid var(--ark-line); color: var(--ark-text-dim); vertical-align: top; }
        .pr-table thead th { color: var(--ark-text-heading); font-weight: 700; font-size: 13px; background: var(--ark-bg-2); }
        .pr-table td.num, .pr-table th.num { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .pr-table td.c, .pr-table th.c { text-align: center; }
        .pr-table tr.grp td { color: var(--ark-accent-2); font-weight: 700; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; background: rgba(79,209,138,0.04); }
        .pr-table tr:last-child td { border-bottom: none; }
        .pr-terms { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
        .pr-terms li { display: flex; gap: 10px; font-size: 14px; color: var(--ark-text-muted); line-height: 1.6; }
        .pr-terms li::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--ark-accent); flex-shrink: 0; margin-top: 9px; }
        .pr-nav { position: sticky; top: 72px; z-index: 5; background: var(--ark-nav); backdrop-filter: blur(12px); border-bottom: 1px solid var(--ark-border); }
        .pr-nav .pr-wrap { display: flex; gap: 6px; overflow-x: auto; padding-top: 10px; padding-bottom: 10px; }
        .pr-nav a { white-space: nowrap; font-size: 14px; color: var(--ark-text-muted); text-decoration: none; padding: 6px 12px; border-radius: 999px; border: 1px solid var(--ark-border); }
        .pr-nav a:hover { color: var(--ark-text); border-color: var(--ark-border-strong); }
        .pr-note { background: var(--ark-bg-2); border: 1px solid var(--ark-border); border-radius: 12px; padding: 16px 18px; font-size: 14px; color: var(--ark-text-muted); line-height: 1.6; margin-top: 18px; }
        details.pr-details > summary { cursor: pointer; list-style: none; color: var(--ark-accent-2); font-weight: 600; font-size: 15px; margin: 28px 0 14px; }
        details.pr-details > summary::-webkit-details-marker { display: none; }
        details.pr-details > summary::after { content: " ↓"; }
        details.pr-details[open] > summary::after { content: " ↑"; }
      `}</style>

      {/* Hero */}
      <section style={{ padding: "96px 0 40px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,209,138,0.12), transparent)", pointerEvents: "none" }} />
        <div className="pr-wrap" style={{ position: "relative", textAlign: "center" }}>
          <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>{t(UI.badge)}</span>
          </div>
          <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.04em", lineHeight: 1.08, margin: "0 0 18px" }}>
            <span className="heading-gradient">{t(UI.h1)}</span>
          </h1>
          <p style={{ fontSize: 17, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 640, margin: "0 auto" }}>{t(UI.sub)}</p>
        </div>
      </section>

      <nav className="pr-nav" aria-label={t(UI.badge)}>
        <div className="pr-wrap">
          {UI.nav.map((n) => <a key={n.id} href={`#${n.id}`}>{t(n.l)}</a>)}
        </div>
      </nav>

      {/* 1. Подписка */}
      <Section id="subscription" title={t(UI.subTitle)} lead={t(UI.subLead)}>
        <div className="pr-grid3" style={{ paddingTop: 12 }}>
          {SUBSCRIPTION.map((p) => (
            <div key={p.code} id={p.code} className={`pr-card${p.recommended ? " rec" : ""}`}>
              {p.recommended && <span className="pr-flag">{t(UI.recommended)}</span>}
              <div className="pr-name">{p.name}</div>
              <div className="pr-price">{fmt(p.price)} <small>{sum} {t(UI.mo)}</small></div>
              <div className="pr-meta">{t(p.seats)}</div>
              <div className="pr-aud">{t(p.audience)}</div>
              <ul className="pr-list">
                {p.highlights.map((h) => <li key={h.ru}><Yes />{t(h)}</li>)}
              </ul>
              <Link href={`/contact?plan=${p.code}`} className={`pr-btn${p.recommended ? " primary" : ""}`}>{t(UI.choose)} {p.name}</Link>
            </div>
          ))}
        </div>

        <details className="pr-details">
          <summary>{t(UI.compare)}</summary>
          <div className="pr-table-wrap">
            <table className="pr-table">
              <thead>
                <tr><th></th>{SUBSCRIPTION.map((p) => <th key={p.code} className="c">{p.name}</th>)}</tr>
              </thead>
              <tbody>
                {SUBSCRIPTION_COMPARE.map((r, i) =>
                  r.group ? (
                    <tr key={i} className="grp"><td colSpan={4}>{t(r.group)}</td></tr>
                  ) : (
                    <tr key={i}>
                      <td>{r.label && t(r.label)}</td>
                      {r.cells!.map((c, j) => (
                        <td key={j} className="c">{c === true ? <Yes /> : c === false ? <No /> : t(c)}</td>
                      ))}
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </details>

        <div className="pr-grid2" style={{ marginTop: 8 }}>
          <div>
            <h3 className="pr-h3">{t(UI.addons)}</h3>
            <div className="pr-table-wrap">
              <table className="pr-table" style={{ minWidth: 0 }}>
                <tbody>
                  {SUBSCRIPTION_ADDONS.map((a) => (
                    <tr key={a.label.ru}><td>{t(a.label)}</td><td className="num">{t(a.price)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="pr-meta" style={{ marginTop: 8 }}>{t(UI.addonPrice)}</p>
          </div>
          <div>
            <h3 className="pr-h3">{t(UI.terms)}</h3>
            <ul className="pr-terms">{SUBSCRIPTION_TERMS.map((x) => <li key={x.ru}>{t(x)}</li>)}</ul>
          </div>
        </div>
      </Section>

      {/* 2. По заявкам */}
      <Section id="on-demand" title={t(UI.odTitle)} lead={t(UI.odLead)}>
        <div className="pr-grid3">
          {[
            { name: UI.callout, price: fmt(ON_DEMAND.callout), suffix: sum, note: UI.calloutNote },
            { name: UI.fixed, price: `${lang === "uz" ? "" : t(UI.from) + " "}${fmt(ON_DEMAND.fixedFrom)}${lang === "uz" ? " " + t(UI.from) : ""}`, suffix: sum, note: UI.fixedNote },
            { name: UI.hourly, price: fmt(ON_DEMAND.hourly), suffix: `${sum} ${t(UI.perHour)}`, note: UI.hourlyNote },
          ].map((c) => (
            <div key={c.name.ru} className="pr-card">
              <div className="pr-name">{t(c.name)}</div>
              <div className="pr-price">{c.price} <small>{c.suffix}</small></div>
              <div className="pr-aud" style={{ marginBottom: 0 }}>{t(c.note)}</div>
            </div>
          ))}
        </div>
        <div className="pr-note"><strong style={{ color: "var(--ark-text)" }}>{t(UI.example)}:</strong> {t(ON_DEMAND.example)}</div>

        <h3 className="pr-h3">{t(UI.hourCards)}</h3>
        <div className="pr-grid2">
          {ON_DEMAND.hourCards.map((h) => (
            <div key={h.hours} className="pr-card">
              <div className="pr-name">{h.hours} {t(UI.hours)}</div>
              <div className="pr-price">{fmt(h.price)} <small>{sum}</small></div>
              <div className="pr-meta">{t(UI.hourComes)}: {fmt(h.perHour)} {sum}</div>
            </div>
          ))}
        </div>

        <h3 className="pr-h3">{t(UI.priceList)}</h3>
        <div className="pr-table-wrap">
          <table className="pr-table">
            <thead><tr><th>{t(UI.work)}</th><th>{t(UI.unit)}</th><th className="num">{t(UI.price)}</th></tr></thead>
            <tbody>
              {ON_DEMAND.prices.map((p) => (
                <tr key={p.label.ru}><td>{t(p.label)}</td><td>{t(p.unit)}</td><td className="num">{fmt(p.price)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="pr-h3">{t(UI.terms)}</h3>
        <ul className="pr-terms">{ON_DEMAND.terms.map((x) => <li key={x.ru}>{t(x)}</li>)}</ul>
        <div style={{ marginTop: 22, maxWidth: 320 }}>
          <Link href="/contact?plan=on-demand" className="pr-btn primary">{t(UI.call)}</Link>
        </div>
      </Section>

      {/* 3. Проекты */}
      <Section id="projects" title={t(UI.prTitle)} lead={t(UI.prLead)}>
        <div className="pr-table-wrap">
          <table className="pr-table">
            <thead><tr><th>{t(UI.work)}</th><th>{t(UI.unit)}</th><th className="num">{t(UI.price)}</th></tr></thead>
            <tbody>
              {PROJECTS.flatMap((g) => [
                <tr key={g.group.ru} className="grp"><td colSpan={3}>{t(g.group)}</td></tr>,
                ...g.items.map((p) => (
                  <tr key={p.label.ru}><td>{t(p.label)}</td><td>{t(p.unit)}</td><td className="num">{p.price ? fmt(p.price) : t(UI.byEstimate)}</td></tr>
                )),
              ])}
            </tbody>
          </table>
        </div>
        <ul className="pr-terms" style={{ marginTop: 18 }}>{PROJECT_TERMS.map((x) => <li key={x.ru}>{t(x)}</li>)}</ul>
      </Section>

      {/* 4. GoARKAN */}
      <Section id="goarkan" title={t(UI.gaTitle)} lead={t(UI.gaLead)}>
        <div className="pr-grid3">
          {GOARKAN_PLANS.map((p, i) => (
            <div key={p.code} className={`pr-card${i === 1 ? " rec" : ""}`}>
              <div className="pr-name">{t(p.name)}</div>
              <div className="pr-price">{fmt(p.price)} <small>{sum} {t(UI.mo)}</small></div>
              <div className="pr-meta">{t(p.staff)} · {t(UI.storage)} {p.storage}</div>
              <div className="pr-aud">{t(p.setup)}</div>
              <ul className="pr-list">
                {GOARKAN_FEATURES.map((f, j) => (
                  <li key={f.ru} style={p.features[j] ? undefined : { color: "var(--ark-text-faint)" }}>
                    {p.features[j] ? <Yes /> : <No />}{t(f)}
                  </li>
                ))}
              </ul>
              <Link href={`/contact?plan=goarkan-${p.code}`} className={`pr-btn${i === 1 ? " primary" : ""}`}>{t(UI.choose)}</Link>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 18 }}><Link href="/goarkan" style={{ color: "var(--ark-accent-2)", fontWeight: 600 }}>{t(UI.gaMore)} →</Link></p>
      </Section>

      {/* 5. Боты */}
      <Section id="bots" title={t(UI.botTitle)} lead={t(UI.botLead)}>
        <div className="pr-grid3">
          {BOT_PLANS.map((b) => (
            <div key={b.code} className={`pr-card${b.recommended ? " rec" : ""}`}>
              <div className="pr-name">{b.name}</div>
              <div className="pr-price">{b.priceFrom && lang !== "uz" ? `${t(UI.from)} ` : ""}{fmt(b.price)}{b.priceFrom && lang === "uz" ? ` ${t(UI.from)}` : ""} <small>{sum}</small></div>
              <div className="pr-meta">{t(UI.term)}: {t(b.term)}</div>
              <ul className="pr-list" style={{ marginTop: 12 }}>
                <li><Yes />{t(b.does)}</li>
                <li><Yes />{t(UI.integrations)}: {t(b.integrations)}</li>
                <li><Yes />{t(UI.support)}: {t(b.support)}</li>
              </ul>
              <Link href={`/contact?plan=bot-${b.code}`} className={`pr-btn${b.recommended ? " primary" : ""}`}>{t(UI.order)}</Link>
            </div>
          ))}
        </div>
        <div className="pr-note">{t(BOT_NOTE)}</div>
      </Section>

      {/* Что выбрать */}
      <Section id="choose" title={t(UI.chooseTitle)}>
        <div className="pr-table-wrap">
          <table className="pr-table">
            <thead><tr><th>{t(UI.situation)}</th><th>{t(UI.solution)}</th><th className="num">{t(UI.guide)}</th></tr></thead>
            <tbody>
              {CHOOSER.map((c) => (
                <tr key={c.situation.ru}>
                  <td>{t(c.situation)}</td>
                  <td><a href={c.href} style={{ color: "var(--ark-accent-2)" }}>{t(c.solution)}</a></td>
                  <td className="num">{t(c.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="pr-h3">{t(UI.general)}</h3>
        <ul className="pr-terms">{GENERAL_TERMS.map((x) => <li key={x.ru}>{t(x)}</li>)}</ul>
      </Section>

      {/* CTA */}
      <section style={{ padding: "64px 0 96px" }}>
        <div className="pr-wrap">
          <div className="pr-card" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 20, fontWeight: 600, color: "var(--ark-text)", marginBottom: 6 }}>{t(UI.ctaTitle)}</div>
              <p style={{ fontSize: 15, color: "var(--ark-text-muted)", margin: 0 }}>{t(UI.ctaBody)}</p>
            </div>
            <Link href="/contact" className="btn grad-border" style={{ background: "var(--ark-surface)", color: "var(--ark-text)", flexShrink: 0 }}>
              {t(UI.ctaBtn)} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
