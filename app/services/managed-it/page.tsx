import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { cybersecuritySchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Кибербезопасность для бизнеса | ARKANA — Ташкент",
  description:
    "ARKANA выстраивает и поддерживает базовую безопасность для бизнеса в Узбекистане: защита конечных точек, управление доступом, тестирование резервных копий, реагирование на инциденты.",
  alternates: { canonical: "/services/managed-it" },
  openGraph: {
    title: "Кибербезопасность для бизнеса | ARKANA",
    description:
      "Защита конечных точек, управление доступом, ежеквартальное тестирование резервного копирования, обучение сотрудников, управление патчами и реагирование на инциденты — для бизнеса в Узбекистане.",
    url: "/services/managed-it",
  },
};

const included = [
  "Защита конечных точек — централизованная настройка и мониторинг",
  "Многофакторная аутентификация и управление доступом",
  "Ежедневный мониторинг резервного копирования, ежеквартальное тестирование восстановления",
  "Повышение осведомлённости сотрудников в области безопасности — ежеквартально",
  "Расписание патчей: ежемесячные плановые, критические — в течение 48 часов",
  "Процедура реагирования на инциденты — документируется и проверяется ежегодно",
  "Аудит доступа при найме, смене роли или увольнении сотрудника",
  "Ежемесячный отчёт о состоянии безопасности через GoARKAN",
];

export default function ManagedITPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cybersecuritySchema) }}
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
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>Кибербезопасность</div>
            <h1
              className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
              style={{ color: "var(--ark-text-heading)" }}
            >
              Безопасность, которую
              <br />
              ваш бизнес реально
              <br />
              сможет поддерживать.
            </h1>
            <p className="text-[17px] leading-[1.65] mb-8" style={{ color: "var(--ark-text-sub)" }}>
              Большинство компаний страдают от одних и тех же проблем: один скомпрометированный
              аккаунт, одна непропатченная система, одна резервная копия, которую никогда не
              проверяли. ARKANA выстраивает защиту от этих рисков и поддерживает её по
              чёткому расписанию.
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
              Найти уязвимости в вашей безопасности
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
