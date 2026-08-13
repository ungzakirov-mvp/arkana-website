"use client";

import { useRef, useEffect, useState } from "react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

const INDICATORS = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1.5" stroke="#4fd18a" strokeWidth="1.3"/><rect x="11" y="3" width="6" height="6" rx="1.5" stroke="#4fd18a" strokeWidth="1.3"/><rect x="3" y="11" width="6" height="6" rx="1.5" stroke="#4fd18a" strokeWidth="1.3"/><path d="M11 14h6M14 11v6" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round"/></svg>,
    title: "SLA Management",
    desc: { ru: "Каждый дедлайн фиксируется и измеряется", uz: "Har bir muddatni qayd etiladi va o'lchanadi", en: "Every deadline tracked and measured" },
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 6h12M4 10h8M4 14h6" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round"/><rect x="2" y="2" width="16" height="16" rx="2" stroke="#4fd18a" strokeWidth="1.3"/></svg>,
    title: "Audit Trail",
    desc: { ru: "Полная история каждого действия и изменения", uz: "Har bir harakat va o'zgarishning to'liq tarixi", en: "Complete history of every action and change" },
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3L17 7v6l-7 4-7-4V7l7-4z" stroke="#4fd18a" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="10" cy="10" r="2.2" stroke="#4fd18a" strokeWidth="1.3"/></svg>,
    title: "Asset Lifecycle",
    desc: { ru: "Учёт, мониторинг и замена всего оборудования", uz: "Barcha uskunalarni hisobga olish, nazorat va almashtirish", en: "Inventory, monitoring and replacement of all equipment" },
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2L3 5v5.5c0 3.87 2.98 7.5 7 8.5 4.02-1 7-4.63 7-8.5V5L10 2z" stroke="#4fd18a" strokeWidth="1.3" strokeLinejoin="round"/><path d="M7.5 10l2 2 3.5-3.5" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Security First",
    desc: { ru: "Endpoint protection и мониторинг угроз 24/7", uz: "Endpoint himoyasi va 24/7 tahdidlarni monitoring qilish", en: "Endpoint protection and 24/7 threat monitoring" },
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="#4fd18a" strokeWidth="1.3"/><path d="M7 10.5l2 2 4-4" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "ITSM Best Practices",
    desc: { ru: "Процессы по стандартам управления IT-услугами", uz: "IT xizmatlarini boshqarish standartlariga muvofiq jarayonlar", en: "Processes aligned with IT service management standards" },
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="5" width="15" height="11" rx="1.5" stroke="#4fd18a" strokeWidth="1.3"/><path d="M6 5V4a4 4 0 0 1 8 0v1" stroke="#4fd18a" strokeWidth="1.3"/><circle cx="10" cy="11" r="1.5" fill="#4fd18a" opacity="0.7"/></svg>,
    title: "Microsoft 365 Partner",
    desc: { ru: "Лицензирование, настройка и поддержка M365", uz: "M365 litsenziyalash, sozlash va qo'llab-quvvatlash", en: "M365 licensing, configuration and support" },
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 14v-2a7 7 0 0 1 14 0v2" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round"/><path d="M1 17a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H1zM14 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-2z" stroke="#4fd18a" strokeWidth="1.3"/></svg>,
    title: "Enterprise Support",
    desc: { ru: "Выделенный менеджер, фиксированное SLA", uz: "Shaxsiy menejer, belgilangan SLA", en: "Dedicated manager, fixed SLA" },
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round"/><circle cx="10" cy="10" r="4" stroke="#4fd18a" strokeWidth="1.3"/></svg>,
    title: "Operational Excellence",
    desc: { ru: "Метрики, процессы и постоянное улучшение", uz: "Ko'rsatkichlar, jarayonlar va doimiy takomillashtirish", en: "Metrics, processes and continuous improvement" },
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 9V6a5 5 0 0 1 10 0v3" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round"/><rect x="3" y="9" width="14" height="9" rx="2" stroke="#4fd18a" strokeWidth="1.3"/><circle cx="10" cy="14" r="1.5" fill="#4fd18a" opacity="0.7"/></svg>,
    title: "Compliance Ready",
    desc: { ru: "Документация и практики для аудита", uz: "Audit uchun hujjatlar va amaliyotlar", en: "Documentation and practices ready for audit" },
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z" stroke="#4fd18a" strokeWidth="1.3"/><path d="M7 10.5l2 2 4-4M4.5 4.5L10 10l5.5-5.5" stroke="#4fd18a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0"/><path d="M6 10l2.5 2.5L14 7" stroke="#4fd18a" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    title: "Business Continuity",
    desc: { ru: "Резервирование, Recovery Plan, минимум простоев", uz: "Zaxiralash, tiklash rejasi, minimal to'xtashlar", en: "Redundancy, recovery plan, minimum downtime" },
  },
];

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

const COPY = {
  ru: { eyebrow: "Стандарты работы", heading: "Практики зрелой IT-организации.", sub: "Не декларации. Измеримые процессы, которые работают каждый день." },
  uz: { eyebrow: "Ish standartlari", heading: "Yetuk IT-tashkilotning amaliyotlari.", sub: "E'lonlar emas. Har kuni ishlayotgan o'lchanadigan jarayonlar." },
  en: { eyebrow: "Operating Standards", heading: "Practices of a mature IT organisation.", sub: "Not declarations. Measurable processes running every day." },
} as const;

export function HomeEnterprise() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const { ref, visible } = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="enterprise-section"
      style={{
        position: "relative", zIndex: 2,
        padding: "100px clamp(20px,4vw,64px)",
        borderTop: "1px solid rgba(238,242,238,0.06)",
        background: "linear-gradient(to bottom, #05080a, #0b1210 60%, #05080a)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
          transition: `opacity .5s ${EASE}, transform .5s ${EASE}`,
          marginBottom: 56,
        }}>
          <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>
            {c.eyebrow}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 40, flexWrap: "wrap" }}>
            <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em", fontFamily: "var(--font-manrope), sans-serif", lineHeight: 1.15, maxWidth: 480 }}>
              {c.heading}
            </h2>
            <p style={{ fontSize: 15, color: "#9fb0a6", margin: 0, maxWidth: 380, lineHeight: 1.6, paddingBottom: 4 }}>
              {c.sub}
            </p>
          </div>
        </div>

        {/* Indicators grid */}
        <div className="enterprise-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
        }}>
          {INDICATORS.map((ind, i) => (
            <div
              key={ind.title}
              className="enterprise-card"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity .45s ${EASE} ${80 + i * 40}ms, transform .45s ${EASE} ${80 + i * 40}ms, border-color 180ms ease, background 180ms ease`,
                background: "rgba(15,26,22,0.6)",
                border: "1px solid rgba(238,242,238,0.07)",
                borderRadius: 14,
                padding: "18px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(79,209,138,0.2)";
                el.style.background = "rgba(79,209,138,0.04)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(238,242,238,0.07)";
                el.style.background = "rgba(15,26,22,0.6)";
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: "rgba(79,209,138,0.08)",
                border: "1px solid rgba(79,209,138,0.14)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {ind.icon}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#eef2ee", marginBottom: 4, letterSpacing: "-0.01em" }}>
                  {ind.title}
                </div>
                <div style={{ fontSize: 11.5, color: "#748078", lineHeight: 1.5 }}>
                  {ind.desc[lang] ?? ind.desc.ru}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .enterprise-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .enterprise-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .enterprise-section { padding-top: 72px !important; padding-bottom: 72px !important; }
        }
        @media (max-width: 480px) {
          .enterprise-section { padding-top: 56px !important; padding-bottom: 56px !important; }
        }
      `}</style>
    </section>
  );
}
