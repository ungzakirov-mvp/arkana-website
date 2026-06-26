import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { itOutsourcingSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "IT-аутсорсинг в Узбекистане — Полный IT-отдел | ARKANA",
  description:
    "Передайте весь IT-отдел на аутсорсинг ARKANA. Именной технический руководитель, фиксированная стоимость и ежемесячная отчётность. Обслуживаем бизнес по всему Узбекистану.",
  alternates: { canonical: "/services/it-outsourcing" },
  openGraph: {
    title: "IT-аутсорсинг в Узбекистане | ARKANA",
    description:
      "Именной технический руководитель. Фиксированное время реакции. Ежемесячная отчётность. ARKANA берёт весь ваш IT на себя.",
    url: "/services/it-outsourcing",
  },
};

const included = [
  "Именной технический руководитель на вашем аккаунте",
  "Инженеры поддержки, знающие вашу среду",
  "Мониторинг инфраструктуры с настроенными порогами оповещений",
  "Учёт всех обращений через GoARKAN",
  "Управление доступом и защита рабочих мест",
  "Управление отношениями с поставщиками",
  "Ежемесячные отчёты о производительности из GoARKAN",
  "Ежеквартальный бизнес-обзор с техническим руководителем",
];

export default function ITOutsourcingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itOutsourcingSchema) }}
      />

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
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>IT-аутсорсинг</div>
            <h1
              className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
              style={{ color: "var(--ark-text-heading)" }}
            >
              Весь ваш IT-отдел.
              <br />
              Одна команда. Один договор.
            </h1>
            <p className="text-[17px] leading-[1.65] mb-8" style={{ color: "var(--ark-text-sub)" }}>
              Именной технический руководитель и инженеры поддержки, закреплённые за вашим
              аккаунтом — инфраструктура, поддержка пользователей, безопасность и управление
              поставщиками. Одна фиксированная стоимость в месяц.
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
              Запросить бесплатный аудит
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

      <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg-2)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <h2 className="text-[32px] font-[800] mb-10" style={{ color: "var(--ark-text-heading)" }}>
            Как работает IT-аутсорсинг с ARKANA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Именное закрепление",
                body: "Технический руководитель и инженеры поддержки закрепляются за вашим аккаунтом. Они изучают вашу среду — не только ваши заявки.",
              },
              {
                step: "02",
                title: "Персональная ответственность",
                body: "Один технический руководитель отвечает за весь ваш IT. Вы знаете, кому звонить. Он знает вашу среду, команду и приоритеты.",
              },
              {
                step: "03",
                title: "Прозрачная отчётность",
                body: "Ежемесячные отчёты из GoARKAN: решённые заявки, время реакции по категориям, изменения инфраструктуры. Реальные данные из системы.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="rounded-[18px] p-7"
                style={{ background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}
              >
                <div className="text-[28px] font-[900] mb-4" style={{ color: "var(--ark-accent-glow)" }}>
                  {step}
                </div>
                <h3 className="text-[16px] font-[700] mb-3" style={{ color: "var(--ark-text-heading)" }}>
                  {title}
                </h3>
                <p className="text-[14px] leading-[1.65]" style={{ color: "var(--ark-text-sub)" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
