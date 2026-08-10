"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M2.5 7L5.5 10L11.5 4" stroke="#4fd18a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M4 4L10 10M10 4L4 10" stroke="#9a7070" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const COPY = {
  ru: {
    eyebrow:    "Сравнение",
    h2:         "Свой IT-отдел — это дорого, уязвимо и непрозрачно",
    callout:    "Один штатный IT-специалист — от 6 млн сум/мес. Это один человек без резерва, без SLA и без замены во время отпуска.",
    paramLabel: "Параметр",
    col1:       "Свой IT-отдел",
    col2:       "ARKANA",
    rows: [
      { label: "Стоимость",       own: "Оклады + налоги + найм + обучение + увольнение.",           arkana: "Фиксированный платёж в месяц. Без сюрпризов." },
      { label: "Команда",         own: "1–2 сотрудника. Болеют, уходят в отпуск, увольняются.",     arkana: "Команда инженеров + персональный менеджер. Всегда на связи." },
      { label: "Ответственность", own: "Формально есть. По факту — «сам виноват».",                  arkana: "SLA в договоре со штрафными санкциями за нарушение." },
      { label: "Прозрачность",    own: "Что делали, сколько времени — почти никогда неизвестно.",    arkana: "Все работы фиксируются в GoARKAN в реальном времени." },
      { label: "Документация",    own: "Хранится у сотрудника. Уходит вместе с ним.",               arkana: "Полный реестр: сеть, техника, пароли, схемы." },
      { label: "Отчётность",      own: "Отсутствует или составляется вручную раз в квартал.",        arkana: "Автоматический отчёт каждый месяц без запросов." },
      { label: "Масштабирование", own: "Новый сотрудник — 2–4 месяца поиска и адаптации.",           arkana: "Расширение ресурсов в течение одного рабочего дня." },
      { label: "Платформа",       own: "Нет. Отдельные чаты, письма, таблицы.",                     arkana: "GoARKAN: Service Desk, активы, SLA, отчёты — всё в одном." },
    ],
    verdict: "Собственный отдел — один человек с налогами, отпуском и риском увольнения. ARKANA — команда инженеров, собственная ITSM-платформа и SLA в договоре за фиксированную ежемесячную стоимость.",
    cta:     "Получить коммерческое предложение",
  },
  uz: {
    eyebrow:    "Taqqoslash",
    h2:         "O'z IT bo'limi — qimmat, zaif va shaffof emas",
    callout:    "Bitta shtatli IT mutaxassis — oyiga 6 mln so'mdan. Bu bitta odam — zaxirasiz, SLAsiz va ta'tilda almashinuvchisiz.",
    paramLabel: "Parametr",
    col1:       "O'z IT bo'limi",
    col2:       "ARKANA",
    rows: [
      { label: "Narx",            own: "Maoshlar + soliqlar + yollash + o'qitish + ishdan bo'shatish.", arkana: "Belgilangan oylik to'lov. Hech qanday kutilmagan xarajat yo'q." },
      { label: "Jamoa",           own: "1–2 xodim. Kasallik, ta'til, ishdan ketish.",                   arkana: "Muhandislar jamoasi + shaxsiy menejer. Har doim aloqada." },
      { label: "Mas'uliyat",      own: "Qog'ozda bor. Amalda — «o'zing aybdorsan».",                   arkana: "Shartnomada buzilish uchun jarima sanksiyalari bilan SLA." },
      { label: "Shaffoflik",      own: "Nima qilindi, qancha vaqt — deyarli hech qachon noma'lum.",    arkana: "Barcha ishlar real vaqtda GoARKAN'da qayd etiladi." },
      { label: "Hujjatlar",       own: "Xodimda saqlanadi. U ketsa — yo'qoladi.",                      arkana: "To'liq reestr: tarmoq, texnika, parollar, sxemalar." },
      { label: "Hisobot",         own: "Yo'q yoki chorakda bir marta qo'lda tuziladi.",                 arkana: "Har oyda so'rovsiz avtomatik hisobot." },
      { label: "Kengaytirish",    own: "Yangi xodim — 2–4 oy qidiruv va moslashuv.",                   arkana: "Bir ish kuni ichida resurslarni kengaytirish." },
      { label: "Platforma",       own: "Yo'q. Alohida chat, xat, jadvallar.",                          arkana: "GoARKAN: Service Desk, aktivlar, SLA, hisobotlar — hammasi bitta joyda." },
    ],
    verdict: "O'z bo'lim — soliqlar, ta'til va ketish xavfi bilan bitta odam. ARKANA — muhandislar jamoasi, o'z ITSM platformasi va shartnomadagi SLA — belgilangan oylik to'lov evaziga.",
    cta:     "Taklif so'rash",
  },
  en: {
    eyebrow:    "Comparison",
    h2:         "An in-house IT department is expensive, fragile, and opaque",
    callout:    "One in-house IT specialist in Tashkent: from $500/month — before taxes, training costs, or sick-day replacements.",
    paramLabel: "Parameter",
    col1:       "In-house IT",
    col2:       "ARKANA",
    rows: [
      { label: "Cost",            own: "Salaries + taxes + hiring + training + severance.",            arkana: "One fixed monthly fee. No surprises, ever." },
      { label: "Team",            own: "1–2 people. Sick leave, vacations, resignations.",             arkana: "Full team of engineers + dedicated service manager. Always available." },
      { label: "Accountability",  own: "On paper — yes. In practice — 'not our problem'.",             arkana: "Contractual SLA with financial penalties for every breach." },
      { label: "Visibility",      own: "What was done, how long it took — almost never known.",        arkana: "Every task logged in GoARKAN in real time." },
      { label: "Documentation",   own: "Lives with the employee. Leaves when they do.",                arkana: "Full registry: network, hardware, credentials, diagrams." },
      { label: "Reporting",       own: "Nonexistent, or assembled manually once a quarter.",           arkana: "Automated monthly report — delivered without asking." },
      { label: "Scaling",         own: "A new hire takes 2–4 months of search and onboarding.",       arkana: "Scale resources up within one business day." },
      { label: "Platform",        own: "None. Separate chats, emails, spreadsheets.",                  arkana: "GoARKAN: Service Desk, assets, SLA, reports — all in one place." },
    ],
    verdict: "An in-house department means one person — with taxes, vacation, and the risk of resignation. ARKANA means a full engineering team, an ITSM platform, and a contractual SLA at a fixed monthly cost.",
    cta:     "Request a proposal",
  },
};

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function HomeComparison() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const { ref, visible } = useReveal();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="compare" style={{ position: "relative", zIndex: 2, padding: "0 clamp(20px,4vw,64px) 120px", maxWidth: 1280, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `opacity .4s ${EASE}, transform .4s ${EASE}` }}>
        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
          {c.eyebrow}
        </div>
        <h2 style={{ fontSize: "clamp(26px,3.4vw,42px)", fontWeight: 800, margin: "0 0 24px", maxWidth: 660, lineHeight: 1.15, letterSpacing: "-0.01em", fontFamily: "var(--font-manrope), sans-serif" }}>
          {c.h2}
        </h2>

        {/* Callout strip */}
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 12,
          background: "rgba(210,160,100,0.06)", border: "1px solid rgba(210,160,100,0.2)",
          borderRadius: 12, padding: "13px 18px", marginBottom: 44, maxWidth: 680,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="8" cy="8" r="6.5" stroke="#c4945a" strokeWidth="1.3"/>
            <path d="M8 5v4" stroke="#c4945a" strokeWidth="1.3" strokeLinecap="round"/>
            <circle cx="8" cy="11.25" r="0.6" fill="#c4945a"/>
          </svg>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#c09868", margin: 0 }}>{c.callout}</p>
        </div>
      </div>

      {/* Table */}
      <div className="compare-scroll">
        <div className="compare-inner" style={{ border: "1px solid rgba(238,242,238,0.1)", borderRadius: 20, overflow: "hidden", background: "#0b1210", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}>

          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", background: "#0d1714", borderBottom: "1px solid rgba(238,242,238,0.08)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--font-mono, monospace)" }}>
            <div style={{ padding: "14px 20px", color: "#596863" }}>{c.paramLabel}</div>
            <div style={{ padding: "14px 20px", color: "#b08888", borderLeft: "1px solid rgba(238,242,238,0.06)" }}>{c.col1}</div>
            <div style={{ padding: "14px 20px", color: "#4fd18a", borderLeft: "1px solid rgba(79,209,138,0.2)", background: "rgba(79,209,138,0.03)" }}>{c.col2}</div>
          </div>

          {c.rows.map((row, i) => (
            <div
              key={row.label}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(14px)",
                transition: `opacity .5s ${EASE} ${i * 45}ms, transform .5s ${EASE} ${i * 45}ms`,
              }}
            >
              <div
                style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", borderBottom: "1px solid rgba(238,242,238,0.05)", transition: "background 120ms" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(238,242,238,0.018)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}
              >
                <div style={{ padding: "17px 20px", fontSize: 13, color: "#eef2ee", fontWeight: 600, display: "flex", alignItems: "center" }}>{row.label}</div>
                <div style={{ padding: "17px 20px", borderLeft: "1px solid rgba(238,242,238,0.05)", display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <XIcon />
                  <span style={{ fontSize: 13.5, lineHeight: 1.55, color: "#9e8080" }}>{row.own}</span>
                </div>
                <div style={{ padding: "17px 20px", borderLeft: "1px solid rgba(79,209,138,0.12)", background: "rgba(79,209,138,0.025)", display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <CheckIcon />
                  <span style={{ fontSize: 13.5, lineHeight: 1.55, color: "#cce8d8" }}>{row.arkana}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verdict + CTA */}
      <div
        className="compare-verdict"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: `opacity .5s ${EASE} 420ms, transform .5s ${EASE} 420ms`,
          marginTop: 36,
          background: "linear-gradient(135deg, rgba(79,209,138,0.07), rgba(79,209,138,0.03))",
          border: "1px solid rgba(79,209,138,0.16)",
          borderRadius: 18,
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap" as const,
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: 14, lineHeight: 1.68, color: "#a8d4bc", maxWidth: 640, margin: 0 }}>
          {c.verdict}
        </p>
        <Link
          href="/contact"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 26px", borderRadius: 100,
            background: "#4fd18a", color: "#05080a",
            fontSize: 14, fontWeight: 700, textDecoration: "none",
            whiteSpace: "nowrap" as const, flexShrink: 0,
            transition: "background 150ms cubic-bezier(0.4,0,0.2,1), box-shadow 150ms cubic-bezier(0.4,0,0.2,1), transform 100ms cubic-bezier(0.4,0,0.2,1)",
          }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#7ee3ac"; el.style.boxShadow = "0 8px 24px rgba(79,209,138,0.35)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#4fd18a"; el.style.boxShadow = "none"; }}
          onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
          onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        >
          {c.cta}
          <ArrowRight size={15} />
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .compare-scroll {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .compare-scroll::-webkit-scrollbar { display: none; }
          .compare-inner { min-width: 540px; }
          .compare-verdict { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}
