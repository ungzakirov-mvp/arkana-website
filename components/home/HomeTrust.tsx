"use client";

import { useApp } from "@/components/providers/ThemeLanguageProvider";

const ITEMS: Record<string, string[]> = {
  ru: [
    "95% SLA выполнение",
    "< 30 мин первый ответ",
    "Мониторинг 24/7",
    "Партнёр Microsoft 365",
    "Платформа GoARKAN",
    "Персональный менеджер",
    "Запуск за 14 дней",
    "SLA в договоре",
    "Защита конечных точек",
    "Реестр активов",
    "Сетевые операции",
    "Сертифицированные инженеры",
    "Прозрачная отчётность",
    "IT Аутсорсинг",
    "Непрерывность бизнеса",
  ],
  uz: [
    "95% SLA bajarish",
    "< 30 daqiqa birinchi javob",
    "24/7 Monitoring",
    "Microsoft 365 hamkor",
    "GoARKAN platforma",
    "Shaxsiy menejer",
    "14 kunda ishga tushirish",
    "Shartnomadagi SLA",
    "Endpoint himoyasi",
    "Aktivlar reestri",
    "Tarmoq operatsiyalari",
    "Sertifikatlangan muhandislar",
    "Shaffof hisobot",
    "IT Autsorsingi",
    "Biznes uzluksizligi",
  ],
  en: [
    "95% SLA Compliance",
    "< 30 min Response SLA",
    "24/7 Monitoring",
    "Microsoft 365 Partner",
    "GoARKAN Platform",
    "Dedicated Service Manager",
    "14-Day Onboarding",
    "Contractual SLA",
    "Endpoint Protection",
    "Asset Registry Included",
    "Network Operations",
    "Certified Engineers",
    "Transparent Reporting",
    "IT Outsourcing",
    "Business Continuity",
  ],
};

export function HomeTrust() {
  const { lang } = useApp();
  const items = ITEMS[lang] ?? ITEMS.ru;
  const track = [...items, ...items, ...items, ...items];

  return (
    <div
      className="trust-ticker"
      style={{
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        padding: "22px 0",
        background: "#0b1210",
        borderTop:    "1px solid rgba(238,242,238,0.08)",
        borderBottom: "1px solid rgba(238,242,238,0.08)",
        maskImage:         "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:   "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "trustScroll 70s linear infinite",
          willChange: "transform",
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 24,
              paddingRight: 24,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9fb0a6",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: "#4fd18a",
                fontSize: 6,
                opacity: 0.5,
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
