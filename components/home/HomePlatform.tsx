"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const COPY: Record<string, {
  label: string;
  h2a: string;
  h2b: string;
  body: string;
  cta: string;
  features: { title: string; desc: string }[];
}> = {
  ru: {
    label: "Платформа GoARKAN",
    h2a:   "Ваш IT-отдел,",
    h2b:   "виден полностью.",
    body:  "GoARKAN — собственная ITSM-платформа ARKANA. Клиентский доступ включён в каждый тариф. Вы видите то, что видим мы.",
    cta:   "Подробнее о GoARKAN",
    features: [
      { title: "Service Desk",           desc: "Каждая заявка назначена, отслежена и закрыта с SLA-таймером." },
      { title: "Управление активами",    desc: "Полный реестр оборудования и лицензий с историей изменений." },
      { title: "Клиентский портал",      desc: "Ваши заявки, SLA-статистика и активы — в реальном времени." },
      { title: "Ежемесячные отчёты",     desc: "Отчёт по фактическим данным: заявки, инциденты, инфраструктура." },
      { title: "База знаний",            desc: "Сетевые схемы, конфигурации, инструкции — всегда актуальны." },
      { title: "Управление изменениями", desc: "Каждое изменение документируется и согласовывается до применения." },
    ],
  },
  uz: {
    label: "GoARKAN Platformasi",
    h2a:   "Sizning IT bo'limingiz,",
    h2b:   "to'liq ko'rinadi.",
    body:  "GoARKAN — ARKANA ning o'z ITSM platformasi. Mijoz kirish huquqi har bir tarifga kiritilgan.",
    cta:   "GoARKAN haqida batafsil",
    features: [
      { title: "Service Desk",           desc: "Har bir so'rov biriktirilgan, kuzatilgan va SLA-taymeri bilan yopilgan." },
      { title: "Aktivlar boshqaruvi",    desc: "Uskunalar va litsenziyalarning to'liq reestri, o'zgarishlar tarixi bilan." },
      { title: "Mijoz portali",          desc: "So'rovlar, SLA statistikasi va aktivlar — real vaqtda." },
      { title: "Oylik hisobotlar",       desc: "Haqiqiy ma'lumotlarga asoslangan hisobot: so'rovlar, hodisalar, infratuzilma." },
      { title: "Bilimlar bazasi",        desc: "Tarmoq sxemalari, konfiguratsiyalar, ko'rsatmalar — har doim yangilangan." },
      { title: "O'zgarishlar boshqaruvi", desc: "Har bir o'zgarish qo'llanishdan oldin hujjatlashtiriladi va kelishiladi." },
    ],
  },
  en: {
    label: "GoARKAN Platform",
    h2a:   "Your IT department,",
    h2b:   "fully visible.",
    body:  "GoARKAN is our proprietary ITSM platform. Client access is included in every plan. No black boxes.",
    cta:   "Learn about GoARKAN",
    features: [
      { title: "Service Desk",     desc: "Every ticket assigned, tracked, and closed with an SLA timer." },
      { title: "Asset Management", desc: "Full hardware and software registry with change history." },
      { title: "Client Portal",    desc: "Your tickets, SLA stats, and assets — in real time." },
      { title: "Monthly Reports",  desc: "Reports on actual data: tickets, incidents, infrastructure." },
      { title: "Knowledge Base",   desc: "Network diagrams, configs, runbooks — always up to date." },
      { title: "Change Management",desc: "Every change documented and approved before applied." },
    ],
  },
};

export function HomePlatform() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <section className="py-16 lg:py-24" style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-16">
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16 }}>
              {c.label}
            </div>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1.02, letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: 0 }}>
              {c.h2a}
              <br />
              <span style={{ color: "var(--ark-text-hint)" }}>{c.h2b}</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingBottom: 4 }}>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ark-text-sub)", margin: 0, letterSpacing: "-0.01em" }}>
              {c.body}
            </p>
            <Link
              href="/goarkan"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 600, color: "var(--ark-accent-2)", textDecoration: "none",
                letterSpacing: "-0.01em",
              }}
            >
              {c.cta}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 1, border: "1px solid var(--ark-border)", borderRadius: 12, overflow: "hidden" }}>
          {c.features.map(({ title, desc }, i) => (
            <div
              key={title}
              style={{
                padding: "32px 28px",
                background: i % 2 === 0 ? "var(--ark-bg-2)" : "var(--ark-bg)",
                borderBottom: i < 3 ? "1px solid var(--ark-border)" : "none",
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ark-accent-2)", marginBottom: 10, opacity: 0.6 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--ark-text)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                {title}
              </h3>
              <p style={{ fontSize: 13, color: "var(--ark-text-sub)", lineHeight: 1.65, margin: 0, letterSpacing: "-0.01em" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
