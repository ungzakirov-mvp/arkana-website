"use client";

import { useRef, useEffect, useState } from "react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

const COPY = {
  ru: {
    eyebrow:    "Сравнение",
    h2:         "Почему ARKANA выгоднее собственного IT-отдела",
    paramLabel: "Параметр",
    col1:       "Свой IT-отдел",
    col2:       "ARKANA",
    rows: [
      { label: "Стоимость",       own: "Оклады + налоги + найм + обучение + увольнение",           arkana: "Фиксированный платёж в месяц. Без сюрпризов." },
      { label: "Команда",         own: "1–2 сотрудника, болеют, уходят в отпуск, увольняются",     arkana: "Команда инженеров + именной менеджер, всегда доступны" },
      { label: "Ответственность", own: "Формально есть, по факту — «сам виноват»",                  arkana: "SLA в договоре со штрафными санкциями" },
      { label: "Контроль",        own: "Непрозрачно: что делали, сколько времени — неизвестно",     arkana: "Все работы фиксируются в GoARKAN в реальном времени" },
      { label: "Документация",    own: "Хранится у сотрудника, уходит вместе с ним",               arkana: "Полный реестр: сеть, техника, пароли, схемы" },
      { label: "Отчётность",      own: "Отсутствует или составляется вручную раз в квартал",        arkana: "Автоматический отчёт каждый месяц" },
      { label: "Масштабирование", own: "Найм нового сотрудника — 2–4 месяца",                       arkana: "Расширение ресурсов в течение одного рабочего дня" },
      { label: "Оборудование",    own: "Бюджет на закупку, поддержку и утилизацию — ваш",           arkana: "Рекомендации по оптимальным решениям, закупка под ключ" },
    ],
  },
  uz: {
    eyebrow:    "Taqqoslash",
    h2:         "Nima uchun ARKANA o'z IT bo'limidan foydali",
    paramLabel: "Parametr",
    col1:       "O'z IT bo'limi",
    col2:       "ARKANA",
    rows: [
      { label: "Narx",            own: "Maoshlar + soliqlar + yollash + o'qitish + ishdan bo'shatish", arkana: "Oylik belgilangan to'lov. Kutilmagan xarajatsiz." },
      { label: "Jamoa",           own: "1–2 xodim, kasallashadi, ta'tilga chiqadi, ketadi",            arkana: "Muhandislar jamoasi + shaxsiy menejer, doim mavjud" },
      { label: "Mas'uliyat",      own: "Rasmiy bor, amalda — «o'zing aybdorsan»",                      arkana: "Shartnomada jarima sanksiyalari bilan SLA" },
      { label: "Nazorat",         own: "Noaniq: nima qilishdi, qancha vaqt — noma'lum",               arkana: "Barcha ishlar real vaqtda GoARKAN'da qayd etiladi" },
      { label: "Hujjatlar",       own: "Xodimda saqlanadi, u ketganda yo'qoladi",                     arkana: "To'liq ro'yxat: tarmoq, texnika, parollar, sxemalar" },
      { label: "Hisobot",         own: "Yo'q yoki chorakda bir marta qo'lda tuziladi",                 arkana: "Har oy avtomatik hisobot" },
      { label: "Kengaytirish",    own: "Yangi xodim yollash — 2–4 oy",                                arkana: "Bir ish kuni ichida resurslarni kengaytirish" },
      { label: "Uskunalar",       own: "Sotib olish, qo'llab-quvvatlash va utilizatsiya — sizniki",   arkana: "Optimal yechimlar bo'yicha tavsiyalar, kalit ostida xarid" },
    ],
  },
  en: {
    eyebrow:    "Comparison",
    h2:         "Why ARKANA outperforms an in-house IT department",
    paramLabel: "Parameter",
    col1:       "In-house IT",
    col2:       "ARKANA",
    rows: [
      { label: "Cost",            own: "Salaries + taxes + hiring + training + severance",            arkana: "Fixed monthly fee. No surprises." },
      { label: "Team",            own: "1–2 employees, sick days, vacations, resignations",           arkana: "Team of engineers + named manager, always available" },
      { label: "Accountability",  own: "Nominally yes, in practice — 'not my fault'",                 arkana: "SLA in the contract with penalty clauses" },
      { label: "Visibility",      own: "Opaque: what was done, how long it took — unknown",           arkana: "All work logged in GoARKAN in real time" },
      { label: "Documentation",   own: "Stored with the employee, leaves with them",                  arkana: "Complete registry: network, hardware, passwords, diagrams" },
      { label: "Reporting",       own: "Absent or compiled manually once a quarter",                  arkana: "Automatic report every month" },
      { label: "Scaling",         own: "Hiring a new employee — 2–4 months",                         arkana: "Resource expansion within one business day" },
      { label: "Equipment",       own: "Budget for purchase, support and disposal — yours",           arkana: "Recommendations for optimal solutions, turnkey procurement" },
    ],
  },
} as const;

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
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
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(36px)", transition: `opacity .7s ${EASE}, transform .7s ${EASE}` }}>
        <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{c.eyebrow}</div>
        <h2 style={{ fontSize: "clamp(28px,3.6vw,44px)", fontWeight: 800, margin: "0 0 48px", maxWidth: 680, lineHeight: 1.15, letterSpacing: "-0.01em", fontFamily: "var(--font-manrope), sans-serif" }}>
          {c.h2}
        </h2>
      </div>
      <div className="compare-scroll">
        <div className="compare-inner" style={{ border: "1px solid rgba(238,242,238,0.08)", borderRadius: 24, overflow: "hidden", background: "#0b1210" }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", background: "#0f1a16", borderBottom: "1px solid rgba(238,242,238,0.08)", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 700 }}>
            <div style={{ padding: "16px 20px", color: "#748078" }}>{c.paramLabel}</div>
            <div style={{ padding: "16px 20px", color: "#a8837a", borderLeft: "1px solid rgba(238,242,238,0.08)" }}>{c.col1}</div>
            <div style={{ padding: "16px 20px", color: "#4fd18a", borderLeft: "1px solid rgba(238,242,238,0.08)" }}>{c.col2}</div>
          </div>
          {c.rows.map((row, i) => (
            <div key={row.label} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: `opacity .6s ${EASE} ${i * 60}ms, transform .6s ${EASE} ${i * 60}ms`,
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", borderBottom: "1px solid rgba(238,242,238,0.06)" }}>
                <div style={{ padding: 20, fontSize: 13, color: "#eef2ee", fontWeight: 700 }}>{row.label}</div>
                <div style={{ padding: 20, fontSize: 14, lineHeight: 1.5, color: "#a8837a", borderLeft: "1px solid rgba(238,242,238,0.06)" }}>{row.own}</div>
                <div style={{ padding: 20, fontSize: 14, lineHeight: 1.5, color: "#c3d0c8", borderLeft: "1px solid rgba(238,242,238,0.06)" }}>{row.arkana}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
