"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TicketCheck, HardDrive, BarChart2, Users, ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const TABS = [
  {
    label: "Service Desk",
    icon: TicketCheck,
    img: "/portal/dashboard.jpeg",
    desc: "Управление заявками и инцидентами в режиме реального времени. Приоритизация, SLA-контроль, эскалации — всё прозрачно для клиента.",
    metrics: ["Среднее время решения: 2.4ч", "SLA: 99.9%", "Открытых заявок: 19"],
  },
  {
    label: "Активы",
    icon: HardDrive,
    img: "/portal/assets.jpeg",
    desc: "Полный учёт IT-активов компании: оборудование, лицензии, подписки и контракты. Ничего не теряется.",
    metrics: ["Активов в учёте: 147", "Истекает в этом месяце: 3", "Общая стоимость: учтена"],
  },
  {
    label: "Аналитика",
    icon: BarChart2,
    img: "/portal/tickets.jpeg",
    desc: "Ежемесячные и квартальные отчёты по инцидентам, SLA, нагрузке команды и состоянию IT.",
    metrics: ["Отчётов в месяц: 2", "SLA-исполнение: 99.9%", "Инцидентов: ↓18%"],
  },
  {
    label: "Команда",
    icon: Users,
    img: "/portal/companies.jpeg",
    desc: "Именные инженеры. Статус в реальном времени, текущие задачи и зона ответственности.",
    metrics: ["Инженеров: 12", "Онлайн сейчас: 8", "Время ответа: <2ч"],
  },
];

export function Platform() {
  const [active, setActive] = useState(0);

  return (
    <section style={{
      padding: "96px 0",
      background: "var(--ark-bg-2)",
      borderTop: "1px solid transparent",
      borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1",
    }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>
              Платформа GoARKAN
            </span>
          </div>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
            <span className="heading-gradient">Каждое обращение, устройство</span>
            <br />
            <span style={{ color: "var(--ark-text)" }}>и показатель — под контролем</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--ark-text-muted)", maxWidth: 520, margin: "0 auto", lineHeight: 1.65 }}>
            GoARKAN — наша ITSM-платформа. Клиент видит всё: заявки, активы, SLA, отчёты.
            Никаких чёрных ящиков.
          </p>
        </motion.div>

        {/* Tab bar */}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 24, flexWrap: "wrap" }}>
          {TABS.map(({ label, icon: Icon }, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                border: "1px solid",
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            borderRadius: 16,
            background: "var(--ark-card)",
            border: "1px solid var(--ark-border)",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* Browser chrome */}
          <div style={{
            padding: "10px 16px",
            borderBottom: "1px solid var(--ark-border)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(0,0,0,0.15)",
          }}>
            <div style={{ display: "flex", gap: 5 }}>
              {["#ef4444","#f59e0b","#22c55e"].map(c => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "block" }} />
              ))}
            </div>
            <div style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--ark-border)",
              borderRadius: 5,
              padding: "3px 12px",
              fontSize: 11,
              color: "var(--ark-text-muted)",
              display: "flex",
              alignItems: "center",
              gap: 5,
              maxWidth: 280,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "block" }} />
              goarkan.uz · {TABS[active].label.toLowerCase()}
            </div>
          </div>

          {/* Screenshot */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{ position: "relative", aspectRatio: "16/9" }}
            >
              <Image
                src={TABS[active].img}
                alt={`GoARKAN — ${TABS[active].label}`}
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                quality={90}
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom info bar */}
          <div style={{
            padding: "14px 20px",
            borderTop: "1px solid var(--ark-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.5, marginBottom: 6 }}>
                {TABS[active].desc}
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {TABS[active].metrics.map((m) => (
                  <span key={m} style={{ fontSize: 11.5, color: "var(--ark-accent-2)", fontWeight: 600 }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <a href="/goarkan" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              background: "var(--ark-accent)",
              textDecoration: "none",
              flexShrink: 0,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Подробнее
              <ArrowRight size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
