"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TicketCheck, HardDrive, LayoutDashboard, Users2, ArrowRight, CheckCircle2, ShieldCheck, Zap, BarChart2, Link2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const MODULES = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    img: "/portal/dashboard.jpeg",
    urlSlug: "dashboard",
    desc: "Сводный дашборд: ключевые показатели, активные инциденты, статус команды в реальном времени.",
    features: ["KPI в реальном времени", "Статус SLA", "Активные инциденты", "Нагрузка команды"],
  },
  {
    label: "Service Desk",
    icon: TicketCheck,
    img: "/portal/tickets.jpeg",
    urlSlug: "tickets",
    desc: "Управление заявками: создание, приоритизация, SLA-контроль, эскалации, уведомления клиентам.",
    features: ["Приоритизация заявок", "SLA-контроль", "Эскалация инцидентов", "Уведомления в Telegram"],
  },
  {
    label: "Asset Management",
    icon: HardDrive,
    img: "/portal/assets.jpeg",
    urlSlug: "assets",
    desc: "Полный реестр IT-активов: оборудование, лицензии, подписки. История изменений и предупреждения о замене.",
    features: ["Инвентаризация техники", "Управление лицензиями", "История активов", "Предупреждения о замене"],
  },
  {
    label: "Client Portal",
    icon: Users2,
    img: "/portal/companies.jpeg",
    urlSlug: "portal",
    desc: "Клиентский портал: каждый клиент видит свои заявки, активы и показатели SLA в реальном времени. Никаких звонков с вопросом «как дела».",
    features: ["Заявки клиента", "Активы компании", "SLA-статистика", "Ежемесячные отчёты"],
  },
];

const BENEFITS: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: ShieldCheck, title: "Прозрачность", desc: "Клиент видит каждую заявку, каждый актив и каждый показатель работы нашей команды." },
  { Icon: Zap,        title: "Скорость",      desc: "Заявки регистрируются автоматически, SLA-таймер запускается сразу. Ничего не теряется." },
  { Icon: BarChart2,  title: "Аналитика",     desc: "Ежемесячные отчёты и реальные данные о работе IT без ручной подготовки." },
  { Icon: Link2,      title: "Интеграции",    desc: "Telegram, email, SMS для уведомлений. API для интеграции с вашими системами." },
];

export function GoArkanPage() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.12), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
            style={{ textAlign: "center" }}
          >
            <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>Наша платформа · Включено в каждый тариф</span>
            </div>
            <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.75rem)", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20 }}>
              <span className="heading-gradient">GoARKAN</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>Вы видите всё. В реальном времени.</span>
            </h1>
            <p style={{ fontSize: 17, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto 20px" }}>
              Собственная ITSM-платформа ARKANA. Каждая заявка, каждый актив, каждый показатель SLA —
              у вас перед глазами. Никаких «разберёмся» и «позвоните завтра».
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
              {["Доступ для клиента включён", "Уведомления в Telegram", "Мобильная версия", "Ежемесячные отчёты"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--ark-text-muted)" }}>
                  <CheckCircle2 size={13} style={{ color: "var(--ark-accent-2)" }} />
                  {item}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn" style={{ background: "linear-gradient(to bottom, #6366f1, #4f46e5)", color: "white", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)" }}>
                Запросить демо-доступ
                <ArrowRight size={15} />
              </Link>
              <Link href="/pricing" className="btn grad-border" style={{ background: "var(--ark-surface)", color: "var(--ark-text)" }}>
                Смотреть тарифы
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform showcase */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Module tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
            {MODULES.map(({ label, icon: Icon }, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s", border: "1px solid",
                  borderColor: active === i ? "var(--ark-accent)" : "var(--ark-border)",
                  background: active === i ? "var(--ark-accent)" : "var(--ark-bg)",
                  color: active === i ? "#fff" : "var(--ark-text-muted)",
                }}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>

          {/* Browser mockup */}
          <div style={{ borderRadius: 16, background: "var(--ark-card)", border: "1px solid var(--ark-border)", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
            {/* Browser bar */}
            <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--ark-border)", display: "flex", alignItems: "center", gap: 10, background: "rgba(0,0,0,0.15)" }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["#3d1f1f", "#3d3018", "#1a3320"].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "block" }} />)}
              </div>
              <div style={{ flex: 1, background: "var(--ark-surface)", border: "1px solid var(--ark-border)", borderRadius: 5, padding: "3px 12px", fontSize: 11, color: "var(--ark-text-muted)", display: "flex", alignItems: "center", gap: 5, maxWidth: 280 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "block" }} />
                goarkan.uz / {MODULES[active].urlSlug}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }} style={{ position: "relative", aspectRatio: "16/9" }}>
                <Image src={MODULES[active].img} alt={`GoARKAN ${MODULES[active].label}`} fill style={{ objectFit: "cover", objectPosition: "top" }} quality={90} />
              </motion.div>
            </AnimatePresence>
            <div style={{ padding: "16px 20px", borderTop: "1px solid var(--ark-border)", display: "flex", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
              <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.5, flex: 1 }}>{MODULES[active].desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {MODULES[active].features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckCircle2 size={12} style={{ color: "#22c55e" }} />
                    <span style={{ fontSize: 12.5, color: "var(--ark-text-muted)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: "64px 0 96px", borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              <span className="heading-gradient">Почему GoARKAN</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }} className="max-md:grid-cols-2 max-sm:grid-cols-1">
            {BENEFITS.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
                style={{ padding: "24px", borderRadius: 14, background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}
              >
                <div style={{ marginBottom: 14, color: "var(--ark-text-muted)" }}><Icon size={20} strokeWidth={1.5} /></div>
                <h3 style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text)", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.6 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
