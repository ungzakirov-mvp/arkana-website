"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: "8+", label: "Лет на рынке", sub: "IT-аутсорсинга Ташкента" },
  { value: "120+", label: "Клиентов", sub: "Малый и средний бизнес" },
  { value: "2000+", label: "Рабочих мест", sub: "Под нашим обслуживанием" },
  { value: "99.9%", label: "SLA исполнение", sub: "За последние 12 месяцев" },
];

export function Trust() {
  return (
    <section style={{
      padding: "96px 0",
      background: "linear-gradient(to bottom, var(--ark-bg-2), var(--ark-bg))",
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
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>
              Цифры говорят
            </span>
          </div>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            <span className="heading-gradient">ARKANA в числах</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }} className="max-md:grid-cols-2">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
              style={{
                textAlign: "center",
                padding: "32px 24px",
                borderRight: i < STATS.length - 1 ? "1px solid var(--ark-border)" : "none",
              }}
              className="max-md:border-r-0"
            >
              <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 600, letterSpacing: "-0.04em", color: "var(--ark-text)", lineHeight: 1, marginBottom: 10 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ark-text)", marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontSize: 12, color: "var(--ark-text-muted)" }}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Client logos placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ marginTop: 64, textAlign: "center" }}
        >
          <p style={{ fontSize: 12, color: "var(--ark-text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 32 }}>
            Нам доверяют компании из разных сфер бизнеса
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "24px 48px", opacity: 0.5 }}>
            {["Ритейл", "Производство", "Финансы", "Логистика", "Медицина", "Образование"].map((sector) => (
              <span key={sector} style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text-muted)", letterSpacing: "-0.01em" }}>
                {sector}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
