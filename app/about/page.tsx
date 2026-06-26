import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "О компании ARKANA | IT-аутсорсинг, Ташкент",
  description:
    "ARKANA — IT-аутсорсинговая компания в Ташкенте. Именные инженеры, задокументированные процессы и платформа GoARKAN для прозрачности работы. Для бизнеса по всему Узбекистану.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "О компании ARKANA | IT-аутсорсинг, Ташкент",
    description:
      "ARKANA предоставляет IT-аутсорсинг для бизнеса в Узбекистане. Именные технические руководители, прозрачные процессы и полный контроль через GoARKAN.",
    url: "/about",
  },
};

const values = [
  {
    icon: Target,
    accent: "#6366f1",
    title: "Ответственность",
    body: "За каждым клиентом закреплён именной технический руководитель. Когда что-то идёт не так — вы всегда знаете, кто отвечает. И он знает вас по имени.",
  },
  {
    icon: Eye,
    accent: "#22c55e",
    title: "Прозрачность",
    body: "Мы создали GoARKAN именно потому, что клиенты должны иметь полный доступ к информации о своём IT. Никаких чёрных ящиков. Не нужно спрашивать об обновлениях.",
  },
  {
    icon: Heart,
    accent: "#818cf8",
    title: "Партнёрство",
    body: "Мы не подрядчик. Мы — продолжение вашей команды, ориентированное на цели вашего бизнеса, а не только на закрытие заявок.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24" style={{ background: "var(--ark-bg)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 24 }}>О компании</div>
          <h1
            className="text-[48px] sm:text-[60px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
            style={{ color: "var(--ark-text-heading)" }}
          >
            Ваш IT-партнёр.
            <br />
            <span style={{ color: "var(--ark-text-hint)", fontWeight: 700 }}>
              Не просто подрядчик.
            </span>
          </h1>
          <p className="text-[18px] leading-[1.65] max-w-[580px]" style={{ color: "var(--ark-text-sub)" }}>
            ARKANA — IT-аутсорсинговая компания в Ташкенте. Мы помогаем бизнесу по всему Узбекистану
            заменить ненадёжную реактивную IT-поддержку на структурированное именное партнёрство.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg-2)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>Наша история</div>
              <h2
                className="text-[34px] font-[800] mt-4 mb-6 leading-[1.15]"
                style={{ color: "var(--ark-text-heading)" }}
              >
                Создана, чтобы исправить IT-аутсорсинг.
              </h2>
              <div className="flex flex-col gap-4 text-[16px] leading-[1.7]" style={{ color: "var(--ark-text-sub)" }}>
                <p>
                  ARKANA основана на простом наблюдении: большинство IT-аутсорсинга в Узбекистане
                  либо слишком дёшев, чтобы быть надёжным, либо слишком дорог и безлик, чтобы
                  быть полезным для растущего бизнеса.
                </p>
                <p>
                  Мы построили ARKANA, чтобы занять это пространство — принести корпоративные
                  процессы и именную модель команды компаниям, которым не нужен полноценный
                  IT-отдел, но нужно больше, чем ситуативный ремонт.
                </p>
                <p>
                  Мы также создали GoARKAN — собственную платформу управления сервисами —
                  потому что считаем: клиенты заслуживают настоящей прозрачности в работе,
                  выполняемой от их имени.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div
                className="rounded-[24px] p-8"
                style={{ background: "var(--ark-card)", border: "1px solid var(--ark-border)" }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ark-text-hint)", marginBottom: 12 }}>
                  Наша платформа
                </p>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "var(--ark-text-heading)", marginBottom: 12 }}>
                  GoARKAN
                </h3>
                <p style={{ fontSize: 14, color: "var(--ark-text-sub)", lineHeight: 1.65, marginBottom: 20 }}>
                  Мы создали собственную платформу управления сервисами, чтобы клиенты
                  имели полный контроль над каждой заявкой, активом и действием.
                  Используется нашей командой инженеров ежедневно.
                </p>
                <a
                  href="https://goarkan.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "var(--ark-accent-2)", textDecoration: "none" }}
                >
                  Перейти на GoARKAN →
                </a>
              </div>

              <div
                className="rounded-[20px] p-7"
                style={{ background: "var(--ark-surface)", border: "1px solid var(--ark-border)" }}
              >
                <p style={{ fontSize: 14, color: "var(--ark-text-sub)", lineHeight: 1.7, fontStyle: "italic" }}>
                  «Мы не просто очередная IT-компания. Мы — IT-отдел, которого ваш бизнес
                  заслуживает, но которого у него никогда не было.»
                </p>
                <p style={{ fontSize: 12, color: "var(--ark-text-faint)", marginTop: 12, fontWeight: 600 }}>
                  — Команда ARKANA
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="max-w-[500px] mb-14">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>Наши ценности</div>
            <h2 className="text-[34px] font-[800] mt-4 mb-4 leading-[1.15]" style={{ color: "var(--ark-text-heading)" }}>
              То, что определяет каждое наше решение.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, accent, title, body }) => (
              <div
                key={title}
                className="rounded-[20px] p-7"
                style={{ background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}
              >
                <div
                  className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-5"
                  style={{ background: "var(--ark-accent-glow)", border: "1px solid var(--ark-border)" }}
                >
                  <Icon size={20} style={{ color: accent }} />
                </div>
                <h3 className="text-[17px] font-[700] mb-3" style={{ color: "var(--ark-text-heading)" }}>
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

      {/* Team */}
      <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg-2)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="max-w-[500px] mb-12">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>Наша команда</div>
            <h2 className="text-[34px] font-[800] mt-4 mb-4 leading-[1.15]" style={{ color: "var(--ark-text-heading)" }}>
              Люди, стоящие за вашим IT.
            </h2>
            <p className="text-[16px] leading-[1.65]" style={{ color: "var(--ark-text-sub)" }}>
              Команда сертифицированных инженеров, менеджеров проектов и технических
              руководителей, обеспечивающих стабильный и ответственный IT-сервис.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "Технический директор", role: "Основатель и руководитель направления", initials: "A", from: "#6366f1", to: "#818cf8" },
              { name: "Руководитель операций", role: "Управление сервисными процессами", initials: "D", from: "#818cf8", to: "#a78bfa" },
              { name: "Ведущий инженер", role: "Инфраструктура и безопасность", initials: "S", from: "#22c55e", to: "#0ea5e9" },
            ].map(({ name, role, initials, from, to }) => (
              <div
                key={name + role}
                className="rounded-[18px] p-6"
                style={{ background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-[20px] font-[900] text-white mb-4"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                >
                  {initials}
                </div>
                <p className="text-[15px] font-[700]" style={{ color: "var(--ark-text-heading)" }}>
                  {name}
                </p>
                <p className="text-[13px] mt-1" style={{ color: "var(--ark-text-muted)" }}>
                  {role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16" style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)" }}>
        <div className="max-w-[75rem] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[20px] font-[800] mb-1" style={{ color: "var(--ark-text-heading)" }}>
              Хотите работать с нами?
            </p>
            <p className="text-[14px]" style={{ color: "var(--ark-text-muted)" }}>
              Мы всегда в поиске исключительных инженеров и IT-специалистов.
            </p>
          </div>
          <Link
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 12,
              background: "var(--ark-accent)", color: "#ffffff",
              fontSize: 13.5, fontWeight: 700, textDecoration: "none", flexShrink: 0,
            }}
          >
            Связаться с нами
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
