"use client";

import { useRef, useEffect, useState } from "react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

const STAGES = {
  ru: [
    {
      n: "01", title: "Оценка",
      desc: "Аудит инфраструктуры, анализ рисков, формирование технического задания. Без обязательств.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="8" stroke="#4fd18a" strokeWidth="1.5"/><path d="M21 21l-4.35-4.35" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round"/><path d="M8.5 11h5M11 8.5v5" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    },
    {
      n: "02", title: "Подключение",
      desc: "Перенос учётных записей, интеграция в GoARKAN, обучение сотрудников. Срок: 14 рабочих дней.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round"/><rect x="8" y="2" width="8" height="8" rx="2" stroke="#4fd18a" strokeWidth="1.5"/><path d="M12 10v4M10 13.5l2 2 2-2" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      n: "03", title: "Операции",
      desc: "Service Desk, удалённая и выездная поддержка, управление инцидентами по SLA.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 10.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" stroke="#4fd18a" strokeWidth="1.5"/><path d="M20.5 20.5l-5-5" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 8.5V10.5l1.5 1.5" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      n: "04", title: "Мониторинг",
      desc: "Проактивный контроль 24/7. Обнаружение аномалий до того, как они становятся инцидентами.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#4fd18a" strokeWidth="1.5"/><path d="M8 21h8M12 17v4" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 10l3 3 4-5 3 3" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      n: "05", title: "Оптимизация",
      desc: "Ежемесячный анализ метрик, выявление узких мест, предложения по снижению затрат.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 17l5-5 4 3 5-7" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="19" cy="7" r="1.5" fill="#4fd18a"/><path d="M21 21H3" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    },
    {
      n: "06", title: "Развитие",
      desc: "Технологический roadmap, масштабирование инфраструктуры вместе с ростом бизнеса.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.8l-4.9 2.4.9-5.5L4 7.8 9.5 7 12 2z" stroke="#4fd18a" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    },
  ],
  uz: [
    {
      n: "01", title: "Baholash",
      desc: "Infratuzilma auditi, xavf tahlili, texnik vazifa shakllantirilishi. Majburiyatsiz.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#4fd18a" strokeWidth="1.5"/><path d="M21 21l-4.35-4.35" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    },
    {
      n: "02", title: "Ulash",
      desc: "Hisoblarni o'tkazish, GoARKAN'ga integratsiya, xodimlarni o'qitish. Muddat: 14 ish kuni.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3" stroke="#4fd18a" strokeWidth="1.5"/><rect x="8" y="2" width="8" height="8" rx="2" stroke="#4fd18a" strokeWidth="1.5"/></svg>,
    },
    {
      n: "03", title: "Operatsiyalar",
      desc: "Service Desk, masofaviy va joyida qo'llab-quvvatlash, SLA bo'yicha hodisalarni boshqarish.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14.5 10.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" stroke="#4fd18a" strokeWidth="1.5"/></svg>,
    },
    {
      n: "04", title: "Monitoring",
      desc: "24/7 faol nazorat. Muammolar hodisaga aylanishidan oldin aniqlanadi.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#4fd18a" strokeWidth="1.5"/><path d="M6 10l3 3 4-5 3 3" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      n: "05", title: "Optimallashtirish",
      desc: "Oylik metrika tahlili, muammoli joylarni aniqlash, xarajatlarni kamaytirish takliflari.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 3 5-7" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      n: "06", title: "Rivojlanish",
      desc: "Texnologik yo'l xaritasi, biznes o'sishi bilan birga infratuzilmani kengaytirish.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.8l-4.9 2.4.9-5.5L4 7.8 9.5 7 12 2z" stroke="#4fd18a" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    },
  ],
  en: [
    {
      n: "01", title: "Assessment",
      desc: "Infrastructure audit, risk analysis, technical scope definition. No commitment required.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#4fd18a" strokeWidth="1.5"/><path d="M21 21l-4.35-4.35" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    },
    {
      n: "02", title: "Onboarding",
      desc: "Account migration, GoARKAN integration, employee training. Timeline: 14 business days.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3" stroke="#4fd18a" strokeWidth="1.5"/><rect x="8" y="2" width="8" height="8" rx="2" stroke="#4fd18a" strokeWidth="1.5"/></svg>,
    },
    {
      n: "03", title: "Operations",
      desc: "Service Desk, remote and on-site support, incident management within contracted SLA.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14.5 10.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" stroke="#4fd18a" strokeWidth="1.5"/></svg>,
    },
    {
      n: "04", title: "Monitoring",
      desc: "Proactive 24/7 surveillance. Anomalies detected before they become incidents.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#4fd18a" strokeWidth="1.5"/><path d="M6 10l3 3 4-5 3 3" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      n: "05", title: "Optimisation",
      desc: "Monthly metrics review, bottleneck identification, cost-reduction recommendations.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 3 5-7" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      n: "06", title: "Continuous Growth",
      desc: "Technology roadmap, scaling infrastructure in step with your business growth.",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.8l-4.9 2.4.9-5.5L4 7.8 9.5 7 12 2z" stroke="#4fd18a" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    },
  ],
  zh: [
    {
      n: "01", title: "评估",
      desc: "基础设施审计、风险分析、技术范围界定。无需任何承诺。",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#4fd18a" strokeWidth="1.5"/><path d="M21 21l-4.35-4.35" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    },
    {
      n: "02", title: "交接入驻",
      desc: "账户迁移、GoARKAN系统集成、员工培训。周期：14个工作日。",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3" stroke="#4fd18a" strokeWidth="1.5"/><rect x="8" y="2" width="8" height="8" rx="2" stroke="#4fd18a" strokeWidth="1.5"/></svg>,
    },
    {
      n: "03", title: "日常运营",
      desc: "服务台、远程与现场支持，按合同约定SLA处理事件。",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14.5 10.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" stroke="#4fd18a" strokeWidth="1.5"/></svg>,
    },
    {
      n: "04", title: "主动监控",
      desc: "7×24小时主动监控，在异常演变为事故之前提前发现并处置。",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#4fd18a" strokeWidth="1.5"/><path d="M6 10l3 3 4-5 3 3" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      n: "05", title: "持续优化",
      desc: "月度指标复盘、瓶颈识别，并提出降本增效建议。",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 17l5-5 4 3 5-7" stroke="#4fd18a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    },
    {
      n: "06", title: "持续成长",
      desc: "技术路线图规划，随业务增长同步扩展基础设施。",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.5 5 5.5.8-4 3.9.9 5.5L12 14.8l-4.9 2.4.9-5.5L4 7.8 9.5 7 12 2z" stroke="#4fd18a" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    },
  ],
} as const;

const COPY = {
  ru: { eyebrow: "Как мы работаем", heading: "От первого разговора до постоянного улучшения.", sub: "Предсказуемый процесс на каждом этапе. Без импровизации." },
  uz: { eyebrow: "Qanday ishlashimiz", heading: "Birinchi muloqotdan doimiy rivojlanishgacha.", sub: "Har bir bosqichda aniq va bashorat qilinadigan jarayon." },
  en: { eyebrow: "How We Work", heading: "From first conversation to continuous improvement.", sub: "A predictable process at every stage. No improvisation." },
  zh: { eyebrow: "我们的工作方式", heading: "从第一次沟通到持续优化改进。", sub: "每个阶段流程清晰可预期，不依赖即兴发挥。" },
} as const;

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

export function HomeOperationFlow() {
  const { lang } = useApp();
  const stages = STAGES[lang] ?? STAGES.ru;
  const c = COPY[lang] ?? COPY.ru;
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        position: "relative", zIndex: 2,
        padding: "100px clamp(20px,4vw,64px) 80px",
        background: "linear-gradient(to bottom, #0b1210, #05080a)",
        borderTop: "1px solid rgba(238,242,238,0.06)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          maxWidth: 600, marginBottom: 64,
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
          transition: `opacity .5s ${EASE}, transform .5s ${EASE}`,
        }}>
          <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>{c.eyebrow}</div>
          <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, margin: "0 0 16px", letterSpacing: "-0.02em", fontFamily: "var(--font-manrope), sans-serif", lineHeight: 1.12 }}>
            {c.heading}
          </h2>
          <p style={{ fontSize: 15, color: "#9fb0a6", margin: 0, lineHeight: 1.65 }}>{c.sub}</p>
        </div>

        {/* Flow stages */}
        <div className="flow-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 0, position: "relative",
        }}>
          {/* Connector line behind cards */}
          <div style={{
            position: "absolute", top: 38, left: "calc(100% / 12)", right: "calc(100% / 12)",
            height: 1, zIndex: 0, overflow: "hidden",
            background: "linear-gradient(to right, rgba(79,209,138,0.08), rgba(79,209,138,0.3) 40%, rgba(79,209,138,0.3) 60%, rgba(79,209,138,0.08))",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, transparent 0%, rgba(79,209,138,0.6) var(--line-progress, 0%), transparent calc(var(--line-progress, 0%) + 20%))",
              animation: visible ? "flowLine 3s ease-out forwards" : "none",
            }} />
          </div>

          {stages.map((stage, i) => (
            <div
              key={stage.n}
              className="flow-stage"
              style={{
                position: "relative", zIndex: 1, padding: "0 10px",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(24px)",
                transition: `opacity .5s ${EASE} ${i * 80}ms, transform .5s ${EASE} ${i * 80}ms`,
              }}
            >
              {/* Step icon circle */}
              <div style={{
                width: 52, height: 52, borderRadius: "50%", margin: "0 auto 20px",
                background: "#0b1210", border: "1px solid rgba(79,209,138,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 0 4px #0b1210, 0 0 0 5px rgba(79,209,138,0.08)",
                transition: "border-color 200ms ease, box-shadow 200ms ease, background 200ms ease",
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(79,209,138,0.55)"; el.style.background = "rgba(79,209,138,0.07)"; el.style.boxShadow = "0 0 0 4px #0b1210, 0 0 16px rgba(79,209,138,0.2)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(79,209,138,0.2)"; el.style.background = "#0b1210"; el.style.boxShadow = "0 0 0 4px #0b1210, 0 0 0 5px rgba(79,209,138,0.08)"; }}
              >
                {stage.icon}
              </div>

              {/* Stage content */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 10, color: "rgba(79,209,138,0.5)", fontWeight: 700, marginBottom: 6, letterSpacing: "0.06em" }}>{stage.n}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#eef2ee", marginBottom: 8, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{stage.title}</div>
                <div style={{ fontSize: 12, color: "#748078", lineHeight: 1.6 }}>{stage.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes flowLine {
          from { background: linear-gradient(to right, transparent 0%, rgba(79,209,138,0.6) 0%, transparent 20%); }
          to   { background: linear-gradient(to right, transparent 80%, rgba(79,209,138,0.6) 100%, transparent 120%); }
        }
        @media (max-width: 1024px) {
          .flow-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 40px 0 !important; }
          .flow-grid > div:nth-child(3)::after, .flow-grid > div:nth-child(6)::after { display: none; }
        }
        @media (max-width: 600px) {
          .flow-grid { grid-template-columns: 1fr 1fr !important; gap: 32px 0 !important; }
        }
      `}</style>
    </section>
  );
}
