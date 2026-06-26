"use client";

import { useApp } from "@/components/providers/ThemeLanguageProvider";

const SECTORS: Record<string, { abbr: string; name: string }[]> = {
  ru: [
    { abbr: "RIT", name: "Ритейл" },
    { abbr: "PRO", name: "Производство" },
    { abbr: "MED", name: "Медицина" },
    { abbr: "EDU", name: "Образование" },
    { abbr: "LOG", name: "Логистика" },
    { abbr: "FIN", name: "Финансы" },
    { abbr: "STR", name: "Строительство" },
    { abbr: "SRV", name: "Услуги" },
  ],
  en: [
    { abbr: "RIT", name: "Retail" },
    { abbr: "PRO", name: "Manufacturing" },
    { abbr: "MED", name: "Healthcare" },
    { abbr: "EDU", name: "Education" },
    { abbr: "LOG", name: "Logistics" },
    { abbr: "FIN", name: "Finance" },
    { abbr: "STR", name: "Construction" },
    { abbr: "SRV", name: "Services" },
  ],
  uz: [
    { abbr: "RIT", name: "Chakana savdo" },
    { abbr: "PRO", name: "Ishlab chiqarish" },
    { abbr: "MED", name: "Tibbiyot" },
    { abbr: "EDU", name: "Ta'lim" },
    { abbr: "LOG", name: "Logistika" },
    { abbr: "FIN", name: "Moliya" },
    { abbr: "STR", name: "Qurilish" },
    { abbr: "SRV", name: "Xizmatlar" },
  ],
};

const COPY: Record<string, {
  banner: string;
  metrics: { value: string; label: string }[];
}> = {
  ru: {
    banner: "Обслуживаем бизнес в Ташкенте и по всему Узбекистану",
    metrics: [
      { value: "< 2 ч",  label: "Первый ответ по SLA" },
      { value: "99.9%",  label: "Доступность по договору" },
      { value: "24/7",   label: "Мониторинг инфраструктуры" },
      { value: "5 дней", label: "Запуск с момента подписания" },
      { value: "0",      label: "Скрытых платежей" },
      { value: "100%",   label: "SLA зафиксирован в договоре" },
    ],
  },
  uz: {
    banner: "Toshkent va butun O'zbekiston bo'yicha biznesga xizmat ko'rsatamiz",
    metrics: [
      { value: "< 2 soat", label: "SLA bo'yicha birinchi javob" },
      { value: "99.9%",    label: "Shartnoma bo'yicha mavjudlik" },
      { value: "24/7",     label: "Infratuzilma monitoringi" },
      { value: "5 kun",    label: "Imzolashdan ishga tushirishgacha" },
      { value: "0",        label: "Yashirin to'lovlar" },
      { value: "100%",     label: "SLA shartnomada belgilangan" },
    ],
  },
  en: {
    banner: "Serving businesses in Tashkent and across Uzbekistan",
    metrics: [
      { value: "< 2 h",   label: "First response per SLA" },
      { value: "99.9%",   label: "Contracted availability" },
      { value: "24/7",    label: "Infrastructure monitoring" },
      { value: "5 days",  label: "Go-live from signing" },
      { value: "0",       label: "Hidden fees" },
      { value: "100%",    label: "SLA contractually binding" },
    ],
  },
};

export function HomeTrust() {
  const { lang } = useApp();
  const copy = COPY[lang] ?? COPY.ru;
  const sectors = SECTORS[lang] ?? SECTORS.ru;

  return (
    <section style={{ background: "var(--ark-bg)" }}>

      {/* Industry sectors row */}
      <div style={{ borderTop: "1px solid var(--ark-divider)", borderBottom: "1px solid var(--ark-divider)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ padding: "20px 0 18px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ark-text-faint)", marginBottom: 16, textAlign: "center" }}>
              {copy.banner}
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
              {sectors.map(({ abbr, name }, i) => (
                <div key={abbr} style={{ padding: "8px 24px", borderRight: i < sectors.length - 1 ? "1px solid var(--ark-divider)" : "none", display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 5, background: "var(--ark-bg-2)", border: "1px solid var(--ark-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, fontWeight: 800, letterSpacing: "0.02em", color: "var(--ark-text-hint)", flexShrink: 0 }}>
                    {abbr}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-text-hint)", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SLA commitments bar */}
      <div style={{ borderBottom: "1px solid var(--ark-divider)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {copy.metrics.map(({ value, label }, i) => (
              <div key={label} style={{ flex: "1 1 16%", padding: "28px 12px", borderRight: i < copy.metrics.length - 1 ? "1px solid var(--ark-divider)" : "none", textAlign: "center" }}>
                <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.4rem, 1.8vw, 2rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "var(--ark-text-heading)", marginBottom: 5 }}>
                  {value}
                </div>
                <div style={{ fontSize: 10, fontWeight: 500, color: "var(--ark-text-label)", letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.35 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
