"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TicketCheck, HardDrive, LayoutDashboard, Users2, ArrowRight, CheckCircle2, ShieldCheck, Zap, BarChart2, Link2, ExternalLink } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

const COPY: Record<string, {
  badge: string;
  h1sub: string;
  sub: string;
  features: string[];
  cta1: string;
  cta2: string;
  benefitsTitle: string;
  platformCtaLabel: string;
  platformCta: string;
  modules: { label: string; desc: string; features: string[] }[];
  benefits: { title: string; desc: string }[];
}> = {
  ru: {
    badge: "Наша платформа · Включено в каждый тариф",
    h1sub: "Управляйте IT через собственную платформу.",
    sub: "ARKANA — единственный IT-аутсорсер в Ташкенте с собственной ITSM-системой. Каждая заявка, каждый актив, каждый показатель SLA — у вас перед глазами в реальном времени.",
    features: ["Доступ для клиента включён", "Уведомления в Telegram", "Мобильная версия", "Ежемесячные отчёты"],
    cta1: "Получить консультацию",
    cta2: "Смотреть тарифы",
    benefitsTitle: "Почему GoARKAN",
    platformCtaLabel: "Посмотрите GoARKAN в действии — демо-доступ открыт.",
    platformCta: "Открыть GoARKAN",
    modules: [
      { label: "Dashboard",        desc: "Сводный дашборд: ключевые показатели, активные инциденты, статус команды в реальном времени.",                                                              features: ["KPI в реальном времени", "Статус SLA", "Активные инциденты", "Нагрузка команды"] },
      { label: "Service Desk",     desc: "Управление заявками: создание, приоритизация, SLA-контроль, эскалации, уведомления клиентам.",                                                             features: ["Приоритизация заявок", "SLA-контроль", "Эскалация инцидентов", "Уведомления в Telegram"] },
      { label: "Asset Management", desc: "Полный реестр IT-активов: оборудование, лицензии, подписки. История изменений и предупреждения о замене.",                                                 features: ["Инвентаризация техники", "Управление лицензиями", "История активов", "Предупреждения о замене"] },
      { label: "Client Portal",    desc: "Клиентский портал: каждый клиент видит свои заявки, активы и показатели SLA в реальном времени. Никаких звонков с вопросом «как дела».",                 features: ["Заявки клиента", "Активы компании", "SLA-статистика", "Ежемесячные отчёты"] },
    ],
    benefits: [
      { title: "Прозрачность", desc: "Клиент видит каждую заявку, каждый актив и каждый показатель работы нашей команды." },
      { title: "Скорость",     desc: "Заявки регистрируются автоматически, SLA-таймер запускается сразу. Ничего не теряется." },
      { title: "Аналитика",   desc: "Ежемесячные отчёты и реальные данные о работе IT без ручной подготовки." },
      { title: "Интеграции",  desc: "Telegram, email, SMS для уведомлений. API для интеграции с вашими системами." },
    ],
  },
  en: {
    badge: "Our platform · Included in every plan",
    h1sub: "Manage your IT through a purpose-built platform.",
    sub: "ARKANA comes with its own ITSM system — built in-house, not bolted on. Every ticket, every asset, every SLA metric is visible to you at all times, in real time.",
    features: ["Client access included", "Telegram notifications", "Mobile version", "Monthly reports"],
    cta1: "Talk to us",
    cta2: "View pricing",
    benefitsTitle: "Why GoARKAN",
    platformCtaLabel: "See GoARKAN in action — demo access is open.",
    platformCta: "Open GoARKAN",
    modules: [
      { label: "Dashboard",        desc: "Summary dashboard: key metrics, active incidents, team status in real time.",                                                                               features: ["Real-time KPIs", "SLA status", "Active incidents", "Team load"] },
      { label: "Service Desk",     desc: "Ticket management: creation, prioritisation, SLA control, escalations, and client notifications.",                                                         features: ["Ticket prioritisation", "SLA control", "Incident escalation", "Telegram notifications"] },
      { label: "Asset Management", desc: "Full IT asset registry: hardware, licences, subscriptions. Change history and replacement alerts.",                                                        features: ["Hardware inventory", "Licence management", "Asset history", "Replacement alerts"] },
      { label: "Client Portal",    desc: "Client portal: every client sees their own tickets, assets, and SLA metrics in real time. No need to call and ask for updates.",                          features: ["Client tickets", "Company assets", "SLA statistics", "Monthly reports"] },
    ],
    benefits: [
      { title: "Transparency", desc: "The client sees every ticket, every asset, and every performance metric of our team." },
      { title: "Speed",        desc: "Tickets are logged automatically and the SLA timer starts immediately. Nothing is lost." },
      { title: "Analytics",   desc: "Monthly reports and real IT performance data with no manual preparation." },
      { title: "Integrations", desc: "Telegram, email, SMS for notifications. API for integration with your systems." },
    ],
  },
  uz: {
    badge: "Bizning platforma · Har bir tarifga kiritilgan",
    h1sub: "IT'ingizni o'z platformangiz orqali boshqaring.",
    sub: "ARKANA Toshkentda o'z ITSM tizimiga ega yagona IT-autsorsing kompaniyasi. Har bir ariza, aktiv va SLA ko'rsatkichi — doimo ko'z oldingizda, real vaqtda.",
    features: ["Mijoz kirishi kiritilgan", "Telegram xabarnomalar", "Mobil versiya", "Oylik hisobotlar"],
    cta1: "Konsultatsiya so'rash",
    cta2: "Tariflarni ko'rish",
    benefitsTitle: "Nima uchun GoARKAN",
    platformCtaLabel: "GoARKAN'ni harakatda ko'ring — demo kirish ochiq.",
    platformCta: "GoARKAN'ni ochish",
    modules: [
      { label: "Dashboard",        desc: "Umumiy panel: asosiy ko'rsatkichlar, faol hodisalar, real vaqtda jamoa holati.",                                                                           features: ["Real vaqt KPI", "SLA holati", "Faol hodisalar", "Jamoa yuklanishi"] },
      { label: "Service Desk",     desc: "Arizalarni boshqarish: yaratish, ustuvorlik belgilash, SLA nazorati, eskalatsiyalar, mijozlarga xabarnomalar.",                                           features: ["Arizalarni ustuvorlash", "SLA nazorati", "Hodisa eskalatsiyasi", "Telegram xabarnomalar"] },
      { label: "Asset Management", desc: "To'liq IT aktivlar reestri: uskunalar, litsenziyalar, obunalar. O'zgarishlar tarixi va almashtirish ogohlantirishlari.",                                  features: ["Uskunalar inventarizatsiyasi", "Litsenziyalarni boshqarish", "Aktivlar tarixi", "Almashtirish ogohlantirishlari"] },
      { label: "Client Portal",    desc: "Mijoz portali: har bir mijoz o'z arizalari, aktivlari va SLA ko'rsatkichlarini real vaqtda ko'radi. Holat so'rash uchun qo'ng'iroq kerak emas.",        features: ["Mijoz arizalari", "Kompaniya aktivlari", "SLA statistikasi", "Oylik hisobotlar"] },
    ],
    benefits: [
      { title: "Shaffoflik",    desc: "Mijoz jamoamizning har bir ariza, aktiv va ishlash ko'rsatkichini ko'radi." },
      { title: "Tezlik",        desc: "Arizalar avtomatik qayd etiladi va SLA taymer darhol boshlanadi. Hech narsa yo'qolmaydi." },
      { title: "Tahlil",        desc: "Qo'lda tayyorlamasdan oylik hisobotlar va haqiqiy IT ishlash ma'lumotlari." },
      { title: "Integratsiyalar", desc: "Xabarnomalar uchun Telegram, email, SMS. Tizimlaringiz bilan integratsiya uchun API." },
    ],
  },
};

const MODULE_ICONS = [LayoutDashboard, TicketCheck, HardDrive, Users2];
const MODULE_SLUGS = ["dashboard", "tickets", "assets", "portal"];
const MODULE_IMGS  = ["/portal/dashboard.jpeg", "/portal/tickets.jpeg", "/portal/assets.jpeg", "/portal/companies.jpeg"];

const BENEFIT_ICONS: LucideIcon[] = [ShieldCheck, Zap, BarChart2, Link2];

export function GoArkanPage() {
  const [active, setActive] = useState(0);
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79,209,138,0.08), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{ textAlign: "center" }}
          >
            <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>{c.badge}</span>
            </div>
            <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.75rem)", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20 }}>
              <span className="heading-gradient">GoARKAN</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>{c.h1sub}</span>
            </h1>
            <p style={{ fontSize: 17, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 580, margin: "0 auto 24px" }}>
              {c.sub}
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
              {c.features.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ark-text-muted)" }}>
                  <CheckCircle2 size={13} style={{ color: "#4fd18a" }} />
                  {item}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="btn"
                style={{ background: "#4fd18a", color: "#05080a" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#7ee3ac"; el.style.boxShadow = "0 8px 24px rgba(79,209,138,0.35)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#4fd18a"; el.style.boxShadow = "none"; }}
                onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                {c.cta1}
                <ArrowRight size={15} />
              </Link>
              <Link href="/pricing" className="btn grad-border" style={{ background: "var(--ark-surface)", color: "var(--ark-text)" }}>
                {c.cta2}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform showcase */}
      <section style={{ padding: "0 0 64px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Module tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
            {c.modules.map(({ label }, i) => {
              const Icon = MODULE_ICONS[i];
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                    cursor: "pointer",
                    border: "1px solid",
                    borderColor: active === i ? "var(--ark-accent)" : "var(--ark-border)",
                    background: active === i ? "var(--ark-accent)" : "var(--ark-bg)",
                    color: active === i ? "#fff" : "var(--ark-text-muted)",
                    transition: "background 180ms cubic-bezier(0.4,0,0.2,1), border-color 180ms cubic-bezier(0.4,0,0.2,1), color 180ms cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <Icon size={13} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Browser mockup */}
          <div style={{ borderRadius: 16, background: "var(--ark-card)", border: "1px solid var(--ark-border)", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
            {/* Browser bar */}
            <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--ark-border)", display: "flex", alignItems: "center", gap: 10, background: "rgba(0,0,0,0.15)" }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#3d1f1f", "#3d3018", "#1a3320"].map(col => <span key={col} style={{ width: 10, height: 10, borderRadius: "50%", background: col, display: "block" }} />)}
              </div>
              <div style={{ flex: 1, background: "var(--ark-surface)", border: "1px solid var(--ark-border)", borderRadius: 5, padding: "3px 12px", fontSize: 11, color: "var(--ark-text-muted)", display: "flex", alignItems: "center", gap: 5, maxWidth: 280 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ark-text-faint)", display: "block" }} />
                goarkan.uz / {MODULE_SLUGS[active]}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} style={{ position: "relative", aspectRatio: "16/9" }}>
                <Image src={MODULE_IMGS[active]} alt={`GoARKAN ${c.modules[active].label}`} fill style={{ objectFit: "cover", objectPosition: "top" }} quality={90} />
              </motion.div>
            </AnimatePresence>
            <div style={{ padding: "16px 20px", borderTop: "1px solid var(--ark-border)", display: "flex", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
              <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.5, flex: 1 }}>{c.modules[active].desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {c.modules[active].features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle2 size={12} style={{ color: "#4fd18a" }} />
                    <span style={{ fontSize: 12.5, color: "var(--ark-text-muted)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform open CTA */}
      <section style={{ padding: "16px 0 80px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontSize: 14, color: "var(--ark-text-muted)", marginBottom: 20, opacity: 0.8 }}>
            {c.platformCtaLabel}
          </p>
          <a
            href="https://goarkan.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: "#4fd18a", color: "#05080a",
              display: "inline-flex", alignItems: "center", gap: 8,
              fontWeight: 700, textDecoration: "none",
              transition: "background 150ms cubic-bezier(0.4,0,0.2,1), box-shadow 150ms cubic-bezier(0.4,0,0.2,1), transform 100ms cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#7ee3ac"; el.style.boxShadow = "0 8px 28px rgba(79,209,138,0.4)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#4fd18a"; el.style.boxShadow = "none"; }}
            onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
            onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
          >
            {c.platformCta}
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "64px 0 96px", borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              <span className="heading-gradient">{c.benefitsTitle}</span>
            </h2>
          </div>
          <div style={{ display: "grid", gap: 24 }} className="grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            {c.benefits.map(({ title, desc }, i) => {
              const Icon = BENEFIT_ICONS[i];
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
                  style={{
                    padding: "24px", borderRadius: 14,
                    background: "var(--ark-card)", border: "1px solid var(--ark-card-border)",
                    transition: "transform 200ms cubic-bezier(0.4,0,0.2,1), box-shadow 200ms cubic-bezier(0.4,0,0.2,1), border-color 200ms cubic-bezier(0.4,0,0.2,1)",
                    willChange: "transform",
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.25)"; el.style.borderColor = "rgba(79,209,138,0.18)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = ""; el.style.borderColor = "var(--ark-card-border)"; }}
                >
                  <div style={{ marginBottom: 14, color: "#4fd18a" }}><Icon size={20} strokeWidth={1.5} /></div>
                  <h3 style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text)", marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.6 }}>{desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
