import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { infrastructureSchema, buildBreadcrumbSchema } from "@/lib/seo";

const breadcrumb = buildBreadcrumbSchema([
  { name: "Главная", url: "/" },
  { name: "Услуги", url: "/services" },
  { name: "Инфраструктура", url: "/services/infrastructure" },
]);

export const metadata: Metadata = {
  title: "Управление IT-инфраструктурой | ARKANA — Ташкент",
  description:
    "ARKANA мониторит и управляет серверами, сетями, облачными средами и резервными копиями для бизнеса в Узбекистане. Ежемесячный патчинг, ежеквартальное тестирование восстановления.",
  alternates: { canonical: "/services/infrastructure" },
  openGraph: {
    title: "Управление IT-инфраструктурой | ARKANA",
    description:
      "Настроенные пороги оповещений. Ежемесячный план патчинга. Ежеквартальное тестирование восстановления. Инженеры ARKANA мониторят вашу среду и реагируют до того, как ваша команда заметит проблему.",
    url: "/services/infrastructure",
  },
};

const included = [
  "Мониторинг состояния серверов с настроенными порогами оповещений",
  "Ежемесячный план обновлений для всех управляемых систем",
  "Мониторинг и управление конфигурацией сетевого оборудования",
  "Управление облачной средой и отчётность по затратам",
  "Ежедневный мониторинг резервного копирования, ежеквартальное тестирование восстановления",
  "Отслеживание жизненного цикла оборудования и планирование замены",
  "Управление изменениями — каждое изменение документируется до применения",
  "Ежемесячный отчёт по инфраструктуре из GoARKAN",
];

export default function InfrastructurePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(infrastructureSchema) }} />
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
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>Управление инфраструктурой</div>
            <h1
              className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
              style={{ color: "var(--ark-text-heading)" }}
            >
              Серверы, сети, системы.
              <br />
              Инженеры, знающие
              <br />
              вашу среду.
            </h1>
            <p className="text-[17px] leading-[1.65] mb-8" style={{ color: "var(--ark-text-sub)" }}>
              Сбои инфраструктуры редко бывают внезапными. Им предшествуют сигналы, которые
              остаются незамеченными, потому что никто не следит. ARKANA назначает инженеров
              для мониторинга вашей среды с заданными порогами — и реагирует прежде, чем
              ваша команда заметит проблему.
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
              Запросить бесплатный аудит инфраструктуры
              <ArrowRight size={15} />
            </Link>
          </div>

          <div
            className="rounded-[24px] p-8"
            style={{ background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}
          >
            <p className="text-[12px] font-[700] uppercase tracking-[0.07em] mb-5" style={{ color: "var(--ark-text-hint)" }}>
              Что включено
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
