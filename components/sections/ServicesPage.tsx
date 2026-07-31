"use client";

import Link from "next/link";
import { ArrowRight, Headset, BarChart3, Server, Cog } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import type { LucideIcon } from "lucide-react";

const COPY: Record<string, {
  heroBadge: string; h1a: string; h1b: string; sub: string; cta: string; learnMore: string;
  services: { title: string; tagline: string; body: string; highlights: string[] }[];
}> = {
  ru: {
    heroBadge: "Наши услуги",
    h1a: "Весь IT-сервис.",
    h1b: "Один договор.",
    sub: "От первой заявки в Service Desk до стратегии корпоративной инфраструктуры — ARKANA берёт всё на себя по одному договору и одному контакту.",
    cta: "Получить коммерческое предложение",
    learnMore: "Подробнее",
    services: [
      {
        title: "IT-аутсорсинг",
        tagline: "Полная IT-команда без найма сотрудников.",
        body: "Персональный сервис-менеджер и инженерная команда, закреплённые за вашим аккаунтом. Поддержка L1–L3, управление устройствами, закупки, работа с поставщиками и стратегическое IT-планирование — всё под одной крышей.",
        highlights: ["Именная команда", "Покрытие L1/L2/L3", "Управление поставщиками", "IT-стратегия"],
      },
      {
        title: "Кибербезопасность",
        tagline: "Контроль безопасности, который ваш бизнес сможет поддерживать.",
        body: "Защита конечных точек, управление доступом, ежеквартальное тестирование резервного копирования, обучение сотрудников и реагирование на инциденты. Всё настроено и поддерживается по расписанию.",
        highlights: ["Защита конечных точек", "Управление доступом", "Тестирование резервных копий", "Ежемесячные отчёты"],
      },
      {
        title: "Инфраструктура",
        tagline: "Инфраструктура, работающая тогда, когда это нужно.",
        body: "Управление серверами и сетью, облачными средами, межсетевыми экранами и ежеквартальное тестирование восстановления. Техническая основа задокументирована и поддерживается.",
        highlights: ["Управление серверами", "Облачные среды", "Сетевая безопасность", "Тестирование восстановления"],
      },
      {
        title: "IT Service Management",
        tagline: "Процессный IT-менеджмент, который масштабируется.",
        body: "Учёт заявок, инвентаризация активов, управление инцидентами и изменениями — всё через GoARKAN. Ежемесячные отчёты о производительности из системы, фиксирующей всё.",
        highlights: ["Платформа GoARKAN", "Управление инцидентами", "Ежемесячная отчётность", "Контроль изменений"],
      },
    ],
  },
  en: {
    heroBadge: "Our services",
    h1a: "Complete IT coverage.",
    h1b: "One contract.",
    sub: "From the first helpdesk ticket to enterprise infrastructure strategy — ARKANA handles everything under a single contract with one point of accountability.",
    cta: "Request a proposal",
    learnMore: "Learn more",
    services: [
      {
        title: "IT Outsourcing",
        tagline: "A complete IT team — without the headcount.",
        body: "A dedicated service manager and engineering team assigned to your account. L1–L3 support, device management, procurement, vendor relations, and strategic IT planning — all under one contract.",
        highlights: ["Dedicated account team", "L1/L2/L3 coverage", "Vendor management", "IT roadmap"],
      },
      {
        title: "Cybersecurity",
        tagline: "Security your business can actually maintain.",
        body: "Endpoint protection, access controls, quarterly backup verification, employee training, and incident response — configured once, maintained continuously.",
        highlights: ["Endpoint protection", "Access management", "Backup testing", "Monthly reports"],
      },
      {
        title: "Infrastructure",
        tagline: "Infrastructure that holds up under pressure.",
        body: "Server and network management, cloud environments, firewalls, and quarterly recovery testing. Every layer documented, monitored, and maintained.",
        highlights: ["Server management", "Cloud environments", "Network security", "Recovery testing"],
      },
      {
        title: "IT Service Management",
        tagline: "Process-driven IT management that scales with you.",
        body: "Ticket tracking, asset inventory, incident and change management — all running through GoARKAN. Monthly performance reports from the system that logs everything.",
        highlights: ["GoARKAN platform", "Incident management", "Monthly reporting", "Change control"],
      },
    ],
  },
  uz: {
    heroBadge: "Bizning xizmatlar",
    h1a: "Barcha IT xizmatlari.",
    h1b: "Bitta shartnoma.",
    sub: "Birinchi arizadan korporativ infratuzilma strategiyasiga qadar — ARKANA hamma narsani bitta shartnoma va bitta mas'ul shaxs bilan hal qiladi.",
    cta: "Taklif so'rash",
    learnMore: "Batafsil",
    services: [
      {
        title: "IT Autsorsing",
        tagline: "To'liq IT jamoasi — qo'shimcha xodimarsiz.",
        body: "Hisobingizga biriktirilgan shaxsiy xizmat menejeri va muhandislar jamoasi. L1–L3 qo'llab-quvvatlash, qurilmalarni boshqarish, xaridlar, vendor bilan ishlash va strategik IT rejalash — hammasi bir shartnomada.",
        highlights: ["Shaxsiy jamoa", "L1/L2/L3 qamrov", "Vendor boshqaruvi", "IT strategiya"],
      },
      {
        title: "Kiberxavfsizlik",
        tagline: "Biznesingiz amalda qo'llab-quvvatlay oladigan himoya.",
        body: "Qurilma himoyasi, kirish boshqaruvi, choraklik zaxira tekshiruvi, xodimlarni o'qitish va hodisalarga tezkor munosabat — bir marta sozlanadi, doimiy qo'llab-quvvatlanadi.",
        highlights: ["Qurilma himoyasi", "Kirish boshqaruvi", "Zaxira sinovi", "Oylik hisobotlar"],
      },
      {
        title: "Infratuzilma",
        tagline: "Kerak bo'lganda ishdan to'xtamaydigan infratuzilma.",
        body: "Server va tarmoq boshqaruvi, bulut muhitlari, xavfsizlik devorlari va choraklik tiklash sinovi. Har bir qatlam hujjatlashtirilgan, kuzatiladigan va qo'llab-quvvatlanadigan.",
        highlights: ["Server boshqaruvi", "Bulut muhitlari", "Tarmoq xavfsizligi", "Tiklash sinovi"],
      },
      {
        title: "IT Xizmat Boshqaruvi",
        tagline: "Biznesingiz bilan birga kengayadigan IT boshqaruvi.",
        body: "Ariza kuzatish, aktiv inventarizatsiyasi, hodisa va o'zgarishlarni boshqarish — hammasi GoARKAN orqali. Barcha harakatlarni qayd etadigan tizimdan oylik hisobotlar.",
        highlights: ["GoARKAN platformasi", "Hodisa boshqaruvi", "Oylik hisobot", "O'zgarish nazorati"],
      },
    ],
  },
};

const SERVICE_HREFS = [
  "/services/it-outsourcing",
  "/services/managed-it",
  "/services/infrastructure",
  "/services/itsm",
];
const SERVICE_ICONS: LucideIcon[] = [Headset, BarChart3, Server, Cog];

export function ServicesPage() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20" style={{ background: "var(--ark-bg)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 24 }}>
            {c.heroBadge}
          </div>
          <h1
            className="text-[48px] sm:text-[60px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6 max-w-[640px]"
            style={{ color: "var(--ark-text-heading)" }}
          >
            {c.h1a}
            <br />
            <span style={{ color: "var(--ark-accent)" }}>{c.h1b}</span>
          </h1>
          <p className="text-[18px] leading-[1.65] max-w-[540px] mb-10" style={{ color: "var(--ark-text-sub)" }}>
            {c.sub}
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "13px 28px", borderRadius: 100,
              background: "#4fd18a", color: "#05080a",
              fontSize: 14, fontWeight: 700, textDecoration: "none",
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
      </section>

      {/* Service cards */}
      <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg-2)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {c.services.map(({ title, tagline, body, highlights }, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <div
                  key={SERVICE_HREFS[i]}
                  className="group rounded-[24px] p-8"
                  style={{
                    background: "var(--ark-card)",
                    border: "1px solid var(--ark-card-border)",
                    transition: "transform 220ms cubic-bezier(0.4,0,0.2,1), box-shadow 220ms cubic-bezier(0.4,0,0.2,1), border-color 220ms cubic-bezier(0.4,0,0.2,1)",
                    willChange: "transform",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-5px)";
                    el.style.boxShadow = "0 20px 48px rgba(0,0,0,0.32), 0 0 0 1px rgba(79,209,138,0.12)";
                    el.style.borderColor = "rgba(79,209,138,0.22)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = "";
                    el.style.borderColor = "var(--ark-card-border)";
                  }}
                >
                  {/* Card header: icon + number */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                    <div
                      style={{
                        width: 48, height: 48, borderRadius: 14,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "linear-gradient(135deg, rgba(79,209,138,0.14), rgba(79,209,138,0.05))",
                        border: "1px solid rgba(79,209,138,0.22)",
                        boxShadow: "0 0 24px rgba(79,209,138,0.1)",
                      }}
                    >
                      <Icon size={22} style={{ color: "#4fd18a" }} />
                    </div>
                    <span style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: 12, color: "rgba(79,209,138,0.28)",
                      fontWeight: 600, letterSpacing: "0.04em",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="text-[22px] font-[800] mb-2" style={{ color: "var(--ark-text-heading)" }}>{title}</h2>
                  <p className="text-[14px] font-[600] mb-4" style={{ color: "var(--ark-accent-2)" }}>{tagline}</p>
                  <p className="text-[14.5px] leading-[1.65] mb-6" style={{ color: "var(--ark-text-sub)" }}>{body}</p>

                  <div className="flex flex-wrap gap-2 mb-7">
                    {highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-full text-[12px] font-[600]"
                        style={{ background: "var(--ark-surface)", border: "1px solid var(--ark-border)", color: "var(--ark-text-muted)" }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={SERVICE_HREFS[i]}
                    className="inline-flex items-center gap-2 text-[13.5px] font-[700] group-hover:gap-3"
                    style={{
                      color: "var(--ark-accent-2)",
                      transition: "gap 180ms cubic-bezier(0.4,0,0.2,1), color 150ms cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    {c.learnMore}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
