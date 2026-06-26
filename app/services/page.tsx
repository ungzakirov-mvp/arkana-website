import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Headset, BarChart3, Server, Cog } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Услуги IT-аутсорсинга | ARKANA — Ташкент",
  description:
    "Полный спектр IT-услуг для бизнеса в Узбекистане: IT-аутсорсинг, управляемый IT-сервис, поддержка инфраструктуры и управление IT-сервисами через GoARKAN.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    href: "/services/it-outsourcing",
    icon: Headset,
    title: "IT-аутсорсинг",
    tagline: "Полная IT-команда без найма сотрудников.",
    body: "Именные инженеры, закреплённые за вашим аккаунтом. Поддержка L1–L3, управление устройствами, закупки, работа с поставщиками и стратегическое IT-планирование — всё под одной крышей.",
    highlights: ["Именная команда", "Покрытие L1/L2/L3", "Управление поставщиками", "IT-стратегия"],
  },
  {
    href: "/services/managed-it",
    icon: BarChart3,
    title: "Кибербезопасность",
    tagline: "Контроль безопасности, который ваш бизнес сможет поддерживать.",
    body: "Защита конечных точек, управление доступом, ежеквартальное тестирование резервного копирования, обучение сотрудников и реагирование на инциденты. Всё настроено и поддерживается по расписанию.",
    highlights: ["Защита конечных точек", "Управление доступом", "Тестирование резервных копий", "Ежемесячные отчёты"],
  },
  {
    href: "/services/infrastructure",
    icon: Server,
    title: "Инфраструктура",
    tagline: "Инфраструктура, работающая тогда, когда это нужно.",
    body: "Управление серверами и сетью, облачными средами, межсетевыми экранами и ежеквартальное тестирование восстановления. Техническая основа задокументирована и поддерживается.",
    highlights: ["Управление серверами", "Облачные среды", "Сетевая безопасность", "Тестирование восстановления"],
  },
  {
    href: "/services/itsm",
    icon: Cog,
    title: "IT Service Management",
    tagline: "Процессный IT-менеджмент, который масштабируется.",
    body: "Учёт заявок, инвентаризация активов, управление инцидентами и изменениями — всё через GoARKAN. Ежемесячные отчёты о производительности из системы, фиксирующей всё.",
    highlights: ["Платформа GoARKAN", "Управление инцидентами", "Ежемесячная отчётность", "Контроль изменений"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20" style={{ background: "var(--ark-bg)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 24 }}>Наши услуги</div>
          <h1
            className="text-[48px] sm:text-[60px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6 max-w-[640px]"
            style={{ color: "var(--ark-text-heading)" }}
          >
            Весь IT-сервис.
            <br />
            <span style={{ color: "var(--ark-accent)" }}>
              Один договор.
            </span>
          </h1>
          <p className="text-[18px] leading-[1.65] max-w-[540px] mb-10" style={{ color: "var(--ark-text-sub)" }}>
            От первой заявки в Service Desk до стратегии корпоративной инфраструктуры —
            ARKANA берёт всё на себя по одному договору и одному контакту.
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
            Начать с бесплатного аудита
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg-2)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map(({ href, icon: Icon, title, tagline, body, highlights }) => (
              <div
                key={href}
                className="group rounded-[22px] p-8 hover:-translate-y-1 transition-all duration-200"
                style={{
                  background: "var(--ark-card)",
                  border: "1px solid var(--ark-card-border)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-6"
                  style={{ background: "var(--ark-accent-glow)", border: "1px solid var(--ark-border)" }}
                >
                  <Icon size={22} style={{ color: "var(--ark-accent-2)" }} />
                </div>
                <h2 className="text-[22px] font-[800] mb-2" style={{ color: "var(--ark-text-heading)" }}>
                  {title}
                </h2>
                <p className="text-[14px] font-[600] mb-4" style={{ color: "var(--ark-accent-2)" }}>
                  {tagline}
                </p>
                <p className="text-[14.5px] leading-[1.65] mb-6" style={{ color: "var(--ark-text-sub)" }}>
                  {body}
                </p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1 rounded-full text-[12px] font-[600]"
                      style={{
                        background: "var(--ark-surface)",
                        border: "1px solid var(--ark-border)",
                        color: "var(--ark-text-muted)",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <Link
                  href={href}
                  className="inline-flex items-center gap-2 text-[13.5px] font-[700] group-hover:gap-3 transition-all duration-150"
                  style={{ color: "var(--ark-accent-2)" }}
                >
                  Подробнее
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
