"use client";

import Link from "@/components/ui/LocaleLink";
import { Minus, ArrowRight } from "lucide-react";
import { IconPlanStart, IconPlanBusiness, IconPlanEnterprise, IconTick } from "@/components/ui/ArkIcons";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import { LeadForm, selectPlan } from "@/components/lead/LeadForm";
import {
  tr, type L,
  SUBSCRIPTION, SUBSCRIPTION_STATS, SUBSCRIPTION_COMPARE, SUBSCRIPTION_ADDONS, SUBSCRIPTION_TERMS,
  ON_DEMAND, PROJECTS, PROJECT_TERMS,
  GOARKAN_PLANS, GOARKAN_FEATURES, BOT_PLANS, BOT_NOTE, GENERAL_TERMS, CHOOSER,
} from "@/lib/pricing";

const UI = {
  badge: { ru: "Услуги и тарифы", uz: "Xizmatlar va tariflar", en: "Services and plans" },
  h1: { ru: "IT-услуги для бизнеса в Ташкенте", uz: "Toshkentda biznes uchun IT xizmatlar", en: "IT services for business in Tashkent" },
  sub: {
    ru: "Подписка на IT-обслуживание, разовые выезды, проекты, цифровой офис GoARKAN и Telegram-боты. Стоимость считаем под вашу компанию — пришлём расчёт в течение рабочего дня.",
    uz: "IT xizmatga obuna, bir martalik tashriflar, loyihalar, GoARKAN raqamli ofisi va Telegram-botlar. Narxni kompaniyangiz uchun hisoblaymiz — bir ish kuni ichida yuboramiz.",
    en: "IT support subscription, one-off call-outs, projects, the GoARKAN digital office and Telegram bots. We price it for your company and send a quote within one business day.",
  },
  nav: [
    { id: "subscription", l: { ru: "Подписка", uz: "Obuna", en: "Subscription" } },
    { id: "on-demand", l: { ru: "По заявкам", uz: "Ariza bo'yicha", en: "Pay per job" } },
    { id: "projects", l: { ru: "Проекты", uz: "Loyihalar", en: "Projects" } },
    { id: "goarkan", l: { ru: "GoARKAN", uz: "GoARKAN", en: "GoARKAN" } },
    { id: "bots", l: { ru: "Боты", uz: "Botlar", en: "Bots" } },
    { id: "lead-form", l: { ru: "Получить расчёт", uz: "Hisob olish", en: "Get a quote" } },
  ],
  onRequest: { ru: "Цена по запросу", uz: "Narx so'rov bo'yicha", en: "Price on request" },
  quoteIn: { ru: "расчёт за 1 рабочий день", uz: "1 ish kunida hisob", en: "quote in 1 business day" },
  included: { ru: "Что входит", uz: "Nima kiradi", en: "What's included" },
  upTo: { ru: "до ", uz: "", en: "up to " },
  quote: { ru: "Узнать стоимость", uz: "Narxni bilish", en: "Get the price" },
  recommended: { ru: "Чаще выбирают", uz: "Ko'proq tanlanadi", en: "Most chosen" },
  subTitle: { ru: "Подписка — ваш IT-отдел за фиксированную сумму", uz: "Obuna — belgilangan narxdagi IT bo'limingiz", en: "Subscription — your IT department for a fixed fee" },
  subLead: {
    ru: "Один платёж в месяц: поддержка сотрудников, выезды, серверы и Microsoft 365, сроки реакции в договоре, отчёт руководителю и GoARKAN. Сумма зависит от числа рабочих мест и серверов.",
    uz: "Oyiga bitta to'lov: xodimlarni qo'llab-quvvatlash, tashriflar, serverlar va Microsoft 365, shartnomadagi javob muddatlari, rahbarga hisobot va GoARKAN. Summa ish o'rinlari va serverlar soniga bog'liq.",
    en: "One monthly payment: staff support, on-site visits, servers and Microsoft 365, contractual response times, management report and GoARKAN. The fee depends on seats and servers.",
  },
  compare: { ru: "Сравнить пакеты подробно", uz: "Paketlarni batafsil solishtirish", en: "Compare plans in detail" },
  addons: { ru: "Можно добавить к любому пакету", uz: "Har qanday paketga qo'shish mumkin", en: "Add to any plan" },
  terms: { ru: "Условия", uz: "Shartlar", en: "Terms" },
  odTitle: { ru: "По заявкам — платите только за сделанное", uz: "Ariza bo'yicha — faqat bajarilgan ish uchun", en: "Pay per job — only for what's done" },
  odLead: {
    ru: "Без абонентской платы. Вызвали мастера — сделали — подписали акт. Цена каждой работы фиксирована и известна до начала.",
    uz: "Abonent to'lovisiz. Usta chaqirdingiz — bajardik — dalolatnoma imzoladik. Har bir ish narxi qat'iy va oldindan ma'lum.",
    en: "No monthly fee. Call us, we fix it, you sign the act. Every job has a fixed price agreed upfront.",
  },
  odCards: [
    { t: { ru: "Выезд по Ташкенту", uz: "Toshkent bo'ylab tashrif", en: "Call-out in Tashkent" }, d: { ru: "Один выезд — сколько угодно работ", uz: "Bitta tashrif — istalgancha ish", en: "Any number of jobs per visit" } },
    { t: { ru: "Фиксированный прайс", uz: "Qat'iy narxlar", en: "Fixed price list" }, d: { ru: "200+ типовых работ с ценой до начала", uz: "Narxi oldindan ma'lum 200+ ish", en: "200+ standard jobs, priced upfront" } },
    { t: { ru: "Карта часов", uz: "Soatlar kartasi", en: "Hour pack" }, d: { ru: "Пакет часов на 3 месяца, выезды включены", uz: "3 oylik soatlar paketi, tashriflar kiritilgan", en: "3-month hour pack, call-outs included" } },
  ],
  works: { ru: "Что делаем по заявкам", uz: "Ariza bo'yicha nima qilamiz", en: "What we do per job" },
  work: { ru: "Работа", uz: "Ish", en: "Job" },
  unit: { ru: "Единица", uz: "Birlik", en: "Unit" },
  call: { ru: "Вызвать специалиста", uz: "Mutaxassis chaqirish", en: "Call an engineer" },
  prTitle: { ru: "Проекты — фиксированная цена за результат", uz: "Loyihalar — natija uchun qat'iy narx", en: "Projects — fixed price for the result" },
  prLead: { ru: "Внедрили, настроили, сдали по акту. Смету согласуем до старта, без вашего согласия она не растёт.", uz: "Joriy etdik, sozladik, dalolatnoma bilan topshirdik. Smeta oldindan kelishiladi va roziligingizsiz oshmaydi.", en: "Rolled out, configured, signed off. The estimate is agreed upfront and never grows without your approval." },
  gaTitle: { ru: "GoARKAN — цифровой офис вашей компании", uz: "GoARKAN — kompaniyangizning raqamli ofisi", en: "GoARKAN — your company's digital office" },
  gaLead: {
    ru: "Заявки сотрудников, учёт техники и склада, документооборот с электронной подписью и дашборд руководителя — в браузере и в Telegram. В подписку уже включён: START — Service Desk, BUSINESS — Офис, ENTERPRISE — Цифровой офис.",
    uz: "Xodimlar arizalari, texnika va ombor hisobi, elektron imzoli hujjat aylanishi va rahbar paneli — brauzerda va Telegramda. Obunaga allaqachon kiritilgan: START — Service Desk, BUSINESS — Ofis, ENTERPRISE — Raqamli ofis.",
    en: "Staff requests, asset and stock records, e-docs with electronic signature and a management dashboard — in the browser and Telegram. Already in subscriptions: START — Service Desk, BUSINESS — Office, ENTERPRISE — Digital Office.",
  },
  gaMore: { ru: "Подробнее о GoARKAN", uz: "GoARKAN haqida batafsil", en: "More about GoARKAN" },
  storage: { ru: "Хранилище", uz: "Xotira", en: "Storage" },
  botTitle: { ru: "Telegram-боты под ключ", uz: "Tayyor Telegram-botlar", en: "Turnkey Telegram bots" },
  botLead: { ru: "Бот, который принимает заявки, собирает данные или уведомляет сотрудников — с фиксированной ценой и понятным сроком.", uz: "Arizalarni qabul qiluvchi, ma'lumot yig'uvchi yoki xodimlarni xabardor qiluvchi bot — qat'iy narx va aniq muddatda.", en: "A bot that takes requests, collects data or notifies staff — with a fixed price and a clear deadline." },
  term: { ru: "Срок", uz: "Muddat", en: "Timeline" },
  integrations: { ru: "Интеграции", uz: "Integratsiyalar", en: "Integrations" },
  support: { ru: "Сопровождение", uz: "Kuzatuv", en: "Support" },
  chooseTitle: { ru: "Что выбрать — за минуту", uz: "Bir daqiqada tanlang", en: "Pick in a minute" },
  situation: { ru: "Ваша ситуация", uz: "Vaziyatingiz", en: "Your situation" },
  solution: { ru: "Решение", uz: "Yechim", en: "Solution" },
  general: { ru: "Как считаем стоимость", uz: "Narx qanday hisoblanadi", en: "How we price" },
  formTitle: { ru: "Получить расчёт стоимости", uz: "Narx hisobini olish", en: "Get a price quote" },
  formSub: { ru: "Напишите, сколько сотрудников и что нужно, — пришлём расчёт на одну страницу в течение рабочего дня.", uz: "Nechta xodim va nima kerakligini yozing — bir ish kuni ichida bir sahifalik hisob yuboramiz.", en: "Tell us your headcount and what you need — we'll send a one-page quote within one business day." },
};

const Yes = () => <IconTick size={18} style={{ color: "var(--ark-accent)", flexShrink: 0 }} />;
const No = () => <Minus size={16} style={{ color: "var(--ark-text-faint)", flexShrink: 0 }} aria-hidden="true" />;

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

const PLAN_ICON = { start: IconPlanStart, business: IconPlanBusiness, enterprise: IconPlanEnterprise } as const;

function Ask({ plan, primary, label }: { plan: string; primary?: boolean; label: string }) {
  return (
    <a href="#lead-form" className={`pr-btn${primary ? " primary" : ""}`} onClick={() => selectPlan(plan)}>
      {label}
    </a>
  );
}

export function PricingSection() {
  const { lang } = useApp();
  const t = (v: L) => tr(v, lang);
  const quote = t(UI.quote);


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
        .pr-flag { position: absolute; top: -12px; left: 22px; background: var(--ark-accent); color: #05080a; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; }
        .pr-plan { position: relative; display: flex; flex-direction: column; padding: 26px 24px 24px; border-radius: 20px; background: linear-gradient(180deg, rgba(238,242,238,0.035), rgba(238,242,238,0.01)) , var(--ark-card); border: 1px solid var(--ark-border); transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
        .pr-plan:hover { transform: translateY(-4px); border-color: var(--ark-border-strong); box-shadow: 0 18px 50px rgba(0,0,0,0.35); }
        .pr-plan.rec { border-color: rgba(79,209,138,0.55); background: radial-gradient(120% 70% at 50% 0%, rgba(79,209,138,0.16), transparent 60%), var(--ark-card); box-shadow: 0 0 0 1px rgba(79,209,138,0.35), 0 20px 60px rgba(79,209,138,0.12); }
        .pr-plan.rec:hover { box-shadow: 0 0 0 1px rgba(79,209,138,0.5), 0 24px 70px rgba(79,209,138,0.18); }
        @media (min-width: 901px) { .pr-plan.rec { transform: translateY(-8px); } .pr-plan.rec:hover { transform: translateY(-12px); } }
        .pr-plan-head { display: flex; gap: 14px; align-items: center; margin-bottom: 20px; }
        .pr-plan-ico { flex-shrink: 0; width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--ark-accent); background: linear-gradient(135deg, rgba(79,209,138,0.16), rgba(79,209,138,0.04)); border: 1px solid rgba(79,209,138,0.25); }
        .pr-plan-name { font-family: Nacelle, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: 0.02em; color: var(--ark-text-heading); line-height: 1.1; }
        .pr-plan-aud { font-size: 13.5px; color: var(--ark-text-muted); margin-top: 4px; }
        .pr-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; border-radius: 14px; overflow: hidden; background: var(--ark-border); border: 1px solid var(--ark-border); margin-bottom: 22px; }
        .pr-stat { background: var(--ark-bg-2); padding: 14px 10px 12px; text-align: center; }
        .pr-plan.rec .pr-stat { background: rgba(11,18,16,0.85); }
        .pr-stat-v { font-family: Nacelle, sans-serif; font-size: 24px; font-weight: 700; color: var(--ark-text-heading); line-height: 1; letter-spacing: -0.02em; white-space: nowrap; }
        .pr-stat-v small { font-size: 12px; font-weight: 600; color: var(--ark-text-sub); margin-right: 2px; letter-spacing: 0; }
        .pr-plan.rec .pr-stat-v { color: var(--ark-accent-2); }
        .pr-stat-l { font-size: 11.5px; color: var(--ark-text-sub); margin-top: 6px; line-height: 1.25; }
        .pr-incl { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ark-text-sub); margin-bottom: 12px; }
        .pr-list-plan li { gap: 10px; }
        .pr-list-plan li svg { margin-top: 0; }
        .pr-plan-foot { margin-top: auto; padding-top: 18px; border-top: 1px dashed var(--ark-border-strong); display: flex; flex-direction: column; gap: 12px; }
        .pr-plan-price { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .pr-plan-price span { font-size: 15px; font-weight: 700; color: var(--ark-text); }
        .pr-plan-price small { font-size: 12px; color: var(--ark-text-sub); }
        .pr-plan .pr-btn { padding: 13px 16px; font-size: 15px; border-radius: 12px; }
        .pr-name { font-size: 12px; font-weight: 800; letter-spacing: .14em; color: var(--ark-accent-2); text-transform: uppercase; }
        .pr-big { font-family: Nacelle, sans-serif; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: var(--ark-text-heading); margin: 10px 0 2px; line-height: 1.2; }
        .pr-meta { font-size: 13px; color: var(--ark-text-sub); margin-bottom: 4px; }
        .pr-aud { font-size: 14px; color: var(--ark-text-muted); margin: 6px 0 16px; }
        .pr-list { list-style: none; padding: 0; margin: 0 0 22px; display: flex; flex-direction: column; gap: 9px; flex: 1; }
        .pr-list li { display: flex; gap: 9px; font-size: 14px; color: var(--ark-text-dim); line-height: 1.45; }
        .pr-list li svg { margin-top: 2px; }
        .pr-btn { display: block; text-align: center; padding: 11px 16px; border-radius: 10px; font-size: 14px; font-weight: 700; text-decoration: none; border: 1px solid var(--ark-border-strong); color: var(--ark-text); transition: opacity .15s, transform .1s; }
        .pr-btn.primary { background: var(--ark-accent); color: #05080a; border-color: var(--ark-accent); }
        .pr-btn:hover { opacity: .88; transform: translateY(-1px); }
        .pr-table-wrap { overflow-x: auto; border: 1px solid var(--ark-border); border-radius: 14px; background: var(--ark-card); }
        .pr-table { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 560px; }
        .pr-table th, .pr-table td { padding: 11px 14px; text-align: left; border-bottom: 1px solid var(--ark-line); color: var(--ark-text-dim); vertical-align: top; }
        .pr-table thead th { color: var(--ark-text-heading); font-weight: 700; font-size: 13px; background: var(--ark-bg-2); }
        .pr-table td.c, .pr-table th.c { text-align: center; }
        .pr-table td.c svg { margin: 0 auto; }
        .pr-table tr.grp td { color: var(--ark-accent-2); font-weight: 700; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; background: rgba(79,209,138,0.04); }
        .pr-table tr:last-child td { border-bottom: none; }
        .pr-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .pr-chips span { font-size: 13.5px; color: var(--ark-text-dim); padding: 8px 12px; border-radius: 10px; border: 1px solid var(--ark-border); background: var(--ark-card); }
        .pr-terms { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
        .pr-terms li { display: flex; gap: 10px; font-size: 14px; color: var(--ark-text-muted); line-height: 1.6; }
        .pr-terms li::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--ark-accent); flex-shrink: 0; margin-top: 9px; }
        .pr-nav { position: sticky; top: 72px; z-index: 5; background: var(--ark-nav); backdrop-filter: blur(12px); border-bottom: 1px solid var(--ark-border); }
        .pr-nav .pr-wrap { display: flex; gap: 6px; overflow-x: auto; padding-top: 10px; padding-bottom: 10px; }
        .pr-nav a { white-space: nowrap; font-size: 14px; color: var(--ark-text-muted); text-decoration: none; padding: 6px 12px; border-radius: 999px; border: 1px solid var(--ark-border); }
        .pr-nav a:last-child { color: #05080a; background: var(--ark-accent); border-color: var(--ark-accent); font-weight: 600; }
        .pr-nav a:hover { color: var(--ark-text); border-color: var(--ark-border-strong); }
        .pr-note { background: var(--ark-bg-2); border: 1px solid var(--ark-border); border-radius: 12px; padding: 16px 18px; font-size: 14px; color: var(--ark-text-muted); line-height: 1.6; margin-top: 18px; }
        details.pr-details > summary { cursor: pointer; list-style: none; color: var(--ark-accent-2); font-weight: 600; font-size: 15px; margin: 28px 0 14px; }
        details.pr-details > summary::-webkit-details-marker { display: none; }
        details.pr-details > summary::after { content: " ↓"; }
        details.pr-details[open] > summary::after { content: " ↑"; }
        .pr-formgrid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 32px; align-items: start; }
        @media (max-width: 900px) { .pr-formgrid { grid-template-columns: 1fr; } }
      `}</style>

      <section style={{ padding: "96px 0 40px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,209,138,0.12), transparent)", pointerEvents: "none" }} />
        <div className="pr-wrap" style={{ position: "relative", textAlign: "center" }}>
          <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>{t(UI.badge)}</span>
          </div>
          <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 5vw, 3.25rem)", letterSpacing: "-0.04em", lineHeight: 1.08, margin: "0 0 18px" }}>
            <span className="heading-gradient">{t(UI.h1)}</span>
          </h1>
          <p style={{ fontSize: 17, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 660, margin: "0 auto 26px" }}>{t(UI.sub)}</p>
          <a href="#lead-form" className="pr-btn primary" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 22px" }}>{t(UI.quote)} <ArrowRight size={16} /></a>
        </div>
      </section>

      <nav className="pr-nav" aria-label={t(UI.badge)}>
        <div className="pr-wrap">
          {UI.nav.map((n) => <a key={n.id} href={`#${n.id}`}>{t(n.l)}</a>)}
        </div>
      </nav>

      <Section id="subscription" title={t(UI.subTitle)} lead={t(UI.subLead)}>
        <div className="pr-grid3" style={{ paddingTop: 12 }}>
          {SUBSCRIPTION.map((p) => {
            const Icon = PLAN_ICON[p.code];
            return (
              <div key={p.code} id={p.code} className={`pr-plan${p.recommended ? " rec" : ""}`}>
                {p.recommended && <span className="pr-flag">{t(UI.recommended)}</span>}
                <div className="pr-plan-head">
                  <span className="pr-plan-ico"><Icon size={26} /></span>
                  <div>
                    <div className="pr-plan-name">{p.name}</div>
                    <div className="pr-plan-aud">{t(p.audience)}</div>
                  </div>
                </div>
                <div className="pr-stats">
                  {SUBSCRIPTION_STATS[p.code].map((st, i) => (
                    <div key={st.l.ru} className="pr-stat">
                      <div className="pr-stat-v">{i < 2 && <small>{t(UI.upTo)}</small>}{t(st.v)}</div>
                      <div className="pr-stat-l">{t(st.l)}</div>
                    </div>
                  ))}
                </div>
                <div className="pr-incl">{t(UI.included)}</div>
                <ul className="pr-list pr-list-plan">{p.highlights.map((h) => <li key={h.ru}><IconTick size={18} style={{ color: "var(--ark-accent)", flexShrink: 0 }} />{t(h)}</li>)}</ul>
                <div className="pr-plan-foot">
                  <div className="pr-plan-price"><span>{t(UI.onRequest)}</span><small>{t(UI.quoteIn)}</small></div>
                  <Ask plan={p.code} primary={p.recommended} label={quote} />
                </div>
              </div>
            );
          })}
        </div>

        <details className="pr-details">
          <summary>{t(UI.compare)}</summary>
          <div className="pr-table-wrap">
            <table className="pr-table">
              <thead><tr><th></th>{SUBSCRIPTION.map((p) => <th key={p.code} className="c">{p.name}</th>)}</tr></thead>
              <tbody>
                {SUBSCRIPTION_COMPARE.map((r, i) =>
                  r.group ? (
                    <tr key={i} className="grp"><td colSpan={4}>{t(r.group)}</td></tr>
                  ) : (
                    <tr key={i}>
                      <td>{r.label && t(r.label)}</td>
                      {r.cells!.map((c, j) => <td key={j} className="c">{c === true ? <Yes /> : c === false ? <No /> : t(c)}</td>)}
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
            <div className="pr-chips">{SUBSCRIPTION_ADDONS.map((a) => <span key={a.label.ru}>{t(a.label)}</span>)}</div>
          </div>
          <div>
            <h3 className="pr-h3">{t(UI.terms)}</h3>
            <ul className="pr-terms">{SUBSCRIPTION_TERMS.map((x) => <li key={x.ru}>{t(x)}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section id="on-demand" title={t(UI.odTitle)} lead={t(UI.odLead)}>
        <div className="pr-grid3">
          {UI.odCards.map((c) => (
            <div key={c.t.ru} className="pr-card">
              <div className="pr-name">{t(c.t)}</div>
              <div className="pr-aud" style={{ margin: "10px 0 0" }}>{t(c.d)}</div>
            </div>
          ))}
        </div>
        <h3 className="pr-h3">{t(UI.works)}</h3>
        <div className="pr-table-wrap">
          <table className="pr-table">
            <thead><tr><th>{t(UI.work)}</th><th>{t(UI.unit)}</th></tr></thead>
            <tbody>{ON_DEMAND.works.map((p) => <tr key={p.label.ru}><td>{t(p.label)}</td><td>{t(p.unit)}</td></tr>)}</tbody>
          </table>
        </div>
        <h3 className="pr-h3">{t(UI.terms)}</h3>
        <ul className="pr-terms">{ON_DEMAND.terms.map((x) => <li key={x.ru}>{t(x)}</li>)}</ul>
        <div style={{ marginTop: 22, maxWidth: 320 }}><Ask plan="on-demand" primary label={quote} /></div>
      </Section>

      <Section id="projects" title={t(UI.prTitle)} lead={t(UI.prLead)}>
        <div className="pr-grid2">
          {PROJECTS.map((g) => (
            <div key={g.group.ru} className="pr-card">
              <div className="pr-name" style={{ marginBottom: 12 }}>{t(g.group)}</div>
              <ul className="pr-list" style={{ marginBottom: 0 }}>{g.items.map((p) => <li key={p.label.ru}><Yes />{t(p.label)}</li>)}</ul>
            </div>
          ))}
        </div>
        <ul className="pr-terms" style={{ marginTop: 18 }}>{PROJECT_TERMS.map((x) => <li key={x.ru}>{t(x)}</li>)}</ul>
        <div style={{ marginTop: 22, maxWidth: 320 }}><Ask plan="project" label={quote} /></div>
      </Section>

      <Section id="goarkan" title={t(UI.gaTitle)} lead={t(UI.gaLead)}>
        <div className="pr-grid3">
          {GOARKAN_PLANS.map((p, i) => (
            <div key={p.code} className={`pr-card${i === 1 ? " rec" : ""}`}>
              <div className="pr-name">{t(p.name)}</div>
              <div className="pr-big">{t(p.staff)}</div>
              <div className="pr-aud">{t(UI.storage)} {p.storage} · {t(p.setup)}</div>
              <ul className="pr-list">
                {GOARKAN_FEATURES.map((f, j) => (
                  <li key={f.ru} style={p.features[j] ? undefined : { color: "var(--ark-text-faint)" }}>{p.features[j] ? <Yes /> : <No />}{t(f)}</li>
                ))}
              </ul>
              <Ask plan={`goarkan-${p.code}`} primary={i === 1} label={quote} />
            </div>
          ))}
        </div>
        <p style={{ marginTop: 18 }}><Link href="/goarkan" style={{ color: "var(--ark-accent-2)", fontWeight: 600 }}>{t(UI.gaMore)} →</Link></p>
      </Section>

      <Section id="bots" title={t(UI.botTitle)} lead={t(UI.botLead)}>
        <div className="pr-grid3">
          {BOT_PLANS.map((b) => (
            <div key={b.code} className={`pr-card${b.recommended ? " rec" : ""}`}>
              <div className="pr-name">{b.name}</div>
              <div className="pr-big">{t(UI.term)}: {t(b.term)}</div>
              <ul className="pr-list" style={{ marginTop: 12 }}>
                <li><Yes />{t(b.does)}</li>
                <li><Yes />{t(UI.integrations)}: {t(b.integrations)}</li>
                <li><Yes />{t(UI.support)}: {t(b.support)}</li>
              </ul>
              <Ask plan={`bot-${b.code}`} primary={b.recommended} label={quote} />
            </div>
          ))}
        </div>
        <div className="pr-note">{t(BOT_NOTE)}</div>
      </Section>

      <Section id="choose" title={t(UI.chooseTitle)}>
        <div className="pr-table-wrap">
          <table className="pr-table">
            <thead><tr><th>{t(UI.situation)}</th><th>{t(UI.solution)}</th></tr></thead>
            <tbody>{CHOOSER.map((c) => <tr key={c.situation.ru}><td>{t(c.situation)}</td><td><a href={c.href} style={{ color: "var(--ark-accent-2)" }}>{t(c.solution)}</a></td></tr>)}</tbody>
          </table>
        </div>
      </Section>

      <section style={{ padding: "72px 0 96px" }}>
        <div className="pr-wrap pr-formgrid">
          <div>
            <h2 className="pr-h2">{t(UI.general)}</h2>
            <ul className="pr-terms" style={{ marginTop: 16 }}>{GENERAL_TERMS.map((x) => <li key={x.ru}>{t(x)}</li>)}</ul>
          </div>
          <LeadForm title={t(UI.formTitle)} sub={t(UI.formSub)} />
        </div>
      </section>
    </>
  );
}
