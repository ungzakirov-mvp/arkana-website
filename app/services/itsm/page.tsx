import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { itsmSchema, buildBreadcrumbSchema } from "@/lib/seo";

const breadcrumb = buildBreadcrumbSchema([
  { name: "Главная", url: "/" },
  { name: "Услуги", url: "/services" },
  { name: "IT Service Management", url: "/services/itsm" },
]);

export const metadata: Metadata = {
  title: "IT Service Management | Платформа GoARKAN | ARKANA",
  description:
    "Управление IT-сервисами через GoARKAN. Учёт заявок, инвентаризация активов, отчётность о производительности. IT Service Desk для бизнеса в Узбекистане.",
  alternates: { canonical: "/services/itsm" },
  openGraph: {
    title: "IT Service Management | GoARKAN | ARKANA",
    description:
      "Каждая заявка учтена. Каждый актив зафиксирован. Ежемесячные отчёты о производительности из GoARKAN — собственной платформы ARKANA для управления сервисами.",
    url: "/services/itsm",
  },
};

const included = [
  "Управление заявками — от подачи до закрытия",
  "Инвентаризация активов — обновляется при каждом изменении оборудования",
  "База знаний: схемы сети, конфигурации, инструкции",
  "Ежемесячные отчёты на основе операционных данных GoARKAN",
  "Ежеквартальный обзор: объём, целевые показатели, прогноз затрат",
  "Классификация приоритетов инцидентов с заданным временем реакции",
  "Управление изменениями — документируется до применения",
  "Клиентский портал — статус заявок виден в любое время",
];

export default function ITSMPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itsmSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="pt-36 pb-24" style={{ background: "var(--ark-bg)" }}>
        <div className="max-w-[75rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-[600] transition-colors mb-6"
              style={{ color: "var(--ark-text-hint)" }}
            >
              ← Все услуги
            </Link>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>IT Service Management и GoARKAN</div>
            <h1
              className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
              style={{ color: "var(--ark-text-heading)" }}
            >
              Система,
              <br />
              стоящая за сервисом.
            </h1>
            <p className="text-[17px] leading-[1.65] mb-8" style={{ color: "var(--ark-text-sub)" }}>
              Каждый месяц GoARKAN формирует отчёт о производительности по вашему аккаунту —
              на основе данных системы, зафиксировавшей каждую заявку, изменение активов,
              оповещение инфраструктуры и применённый патч за этот период. Отчёт отражает то,
              что было на самом деле.
            </p>
            <Link
              href="/goarkan"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 28px", borderRadius: 12,
                background: "var(--ark-accent)", color: "#ffffff",
                fontSize: 14, fontWeight: 700, textDecoration: "none",
              }}
            >
              Посмотреть, как работает GoARKAN
              <ArrowRight size={15} />
            </Link>
          </div>

          <div
            className="rounded-[24px] p-8"
            style={{ background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}
          >
            <p className="text-[12px] font-[700] uppercase tracking-[0.07em] mb-5" style={{ color: "var(--ark-text-hint)" }}>
              Что охватывает GoARKAN
            </p>
            <ul className="flex flex-col gap-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                  <span className="text-[14px]" style={{ color: "var(--ark-text)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
