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
        body: "Именные инженеры, закреплённые за вашим аккаунтом. Поддержка L1–L3, управление устройствами, закупки, работа с поставщиками и стратегическое IT-планирование — всё под одной крышей.",
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
    h1a: "All your IT.",
    h1b: "One contract.",
    sub: "From the first helpdesk ticket to corporate infrastructure strategy — ARKANA handles everything under one contract and one point of contact.",
    cta: "Get a commercial proposal",
    learnMore: "Learn more",
    services: [
      {
        title: "IT Outsourcing",
        tagline: "A full IT team without hiring staff.",
        body: "Named engineers assigned to your account. L1–L3 support, device management, procurement, vendor management, and strategic IT planning — all under one roof.",
        highlights: ["Named team", "L1/L2/L3 coverage", "Vendor management", "IT strategy"],
      },
      {
        title: "Cybersecurity",
        tagline: "Security controls your business can sustain.",
        body: "Endpoint protection, access management, quarterly backup testing, employee training, and incident response. Everything configured and maintained on schedule.",
        highlights: ["Endpoint protection", "Access management", "Backup testing", "Monthly reports"],
      },
      {
        title: "Infrastructure",
        tagline: "Infrastructure that works when you need it.",
        body: "Server and network management, cloud environments, firewalls, and quarterly recovery testing. The technical foundation documented and maintained.",
        highlights: ["Server management", "Cloud environments", "Network security", "Recovery testing"],
      },
      {
        title: "IT Service Management",
        tagline: "Process-driven IT management that scales.",
        body: "Ticket tracking, asset inventory, incident and change management — all through GoARKAN. Monthly performance reports from the system that records everything.",
        highlights: ["GoARKAN platform", "Incident management", "Monthly reporting", "Change control"],
      },
    ],
  },
  uz: {
    heroBadge: "Bizning xizmatlar",
    h1a: "Barcha IT xizmat.",
    h1b: "Bitta shartnoma.",
    sub: "Birinchi xizmat ko'rsatish so'rovidan korporativ infratuzilma strategiyasiga qadar — ARKANA hamma narsani bitta shartnoma va bitta aloqa nuqtasi bilan o'z zimmasiga oladi.",
    cta: "Tijorat taklifi olish",
    learnMore: "Batafsil",
    services: [
      {
        title: "IT Autsorsing",
        tagline: "Xodim yollamasdan to'liq IT jamoasi.",
        body: "Hisobingizga biriktirilgan nominal muhandislar. L1–L3 qo'llab-quvvatlash, qurilmalarni boshqarish, xaridlar, vendor bilan ishlash va strategik IT rejalash — hammasi bir joyda.",
        highlights: ["Nominal jamoa", "L1/L2/L3 qamrov", "Vendor boshqaruvi", "IT strategiya"],
      },
      {
        title: "Kiberxavfsizlik",
        tagline: "Biznesingiz qo'llab-quvvatlay oladigan xavfsizlik nazorati.",
        body: "Qurilma himoyasi, kirish boshqaruvi, choraklik zaxira nusxalashni sinovdan o'tkazish, xodimlarni o'qitish va hodisalarga munosabat. Hammasi jadvalga ko'ra sozlangan va qo'llab-quvvatlanadi.",
        highlights: ["Qurilma himoyasi", "Kirish boshqaruvi", "Zaxira sinovi", "Oylik hisobotlar"],
      },
      {
        title: "Infratuzilma",
        tagline: "Kerak bo'lganda ishlaydigan infratuzilma.",
        body: "Server va tarmoq boshqaruvi, bulut muhitlari, xavfsizlik devorlari va choraklik tiklash sinovi. Texnik asos hujjatlashtirilgan va qo'llab-quvvatlanadi.",
        highlights: ["Server boshqaruvi", "Bulut muhitlari", "Tarmoq xavfsizligi", "Tiklash sinovi"],
      },
      {
        title: "IT Xizmat Boshqaruvi",
        tagline: "Kengayadigan jarayon asosida IT boshqaruvi.",
        body: "Ariza kuzatish, aktiv inventarizatsiyasi, hodisa va o'zgarishlarni boshqarish — hammasi GoARKAN orqali. Hamma narsani qayd etadigan tizimdan oylik samaradorlik hisobotlari.",
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
              padding: "12px 28px", borderRadius: 12,
              background: "var(--ark-accent)", color: "#ffffff",
              fontSize: 14, fontWeight: 700, textDecoration: "none",
            }}
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
                  className="group rounded-[22px] p-8 hover:-translate-y-1 transition-all duration-200"
                  style={{ background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}
                >
                  <div
                    className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-6"
                    style={{ background: "var(--ark-accent-glow)", border: "1px solid var(--ark-border)" }}
                  >
                    <Icon size={22} style={{ color: "var(--ark-accent-2)" }} />
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
                    className="inline-flex items-center gap-2 text-[13.5px] font-[700] group-hover:gap-3 transition-all duration-150"
                    style={{ color: "var(--ark-accent-2)" }}
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
