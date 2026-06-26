"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const PRICING_PREVIEW = [
  { name: "Старт", price: "от $15", per: "/ рабочее место / мес", users: "До 15 мест", highlight: false },
  { name: "Бизнес", price: "от $12", per: "/ рабочее место / мес", users: "15–50 мест", highlight: true },
  { name: "Корпоратив", price: "от $10", per: "/ рабочее место / мес", users: "50–150 мест", highlight: false },
];

const COMMON_FEATURES = [
  "Именные инженеры",
  "Service Desk (GoARKAN)",
  "SLA-гарантия",
  "Ежемесячные отчёты",
  "Мониторинг 24/7",
];

export function Showcase() {
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
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>
              Тарифы
            </span>
          </div>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
            <span className="heading-gradient">Предсказуемая стоимость</span>
            <br />
            <span style={{ color: "var(--ark-text)" }}>без скрытых расходов</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--ark-text-muted)", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
            Фиксированный ежемесячный платёж. Всё включено.
          </p>
        </motion.div>

        {/* Pricing preview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }} className="max-md:grid-cols-1">
          {PRICING_PREVIEW.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              style={{
                padding: "28px 24px",
                borderRadius: 16,
                background: plan.highlight ? "linear-gradient(to bottom right, rgba(99,102,241,0.15), rgba(99,102,241,0.05))" : "var(--ark-card)",
                border: plan.highlight ? "1px solid rgba(99,102,241,0.4)" : "1px solid var(--ark-card-border)",
                position: "relative",
              }}
            >
              {plan.highlight && (
                <div style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "3px 14px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  background: "var(--ark-accent)",
                  color: "white",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}>
                  Популярный
                </div>
              )}
              <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 18, fontWeight: 600, color: "var(--ark-text)", marginBottom: 4 }}>
                {plan.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--ark-text-muted)", marginBottom: 20 }}>{plan.users}</div>
              <div>
                <span style={{ fontFamily: "Nacelle, sans-serif", fontSize: 32, fontWeight: 600, color: "var(--ark-text)", letterSpacing: "-0.03em" }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: 12, color: "var(--ark-text-muted)", marginLeft: 4 }}>{plan.per}</span>
              </div>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                {COMMON_FEATURES.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle2 size={13} style={{ color: "var(--ark-accent-2)", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--ark-text-muted)" }}>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/pricing" className="btn" style={{
            background: "linear-gradient(to bottom, #6366f1, #4f46e5)",
            backgroundSize: "100% 100%",
            backgroundPosition: "bottom",
            color: "white",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundSize = "100% 150%")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundSize = "100% 100%")}
          >
            Выбрать тариф
            <ArrowRight size={15} />
          </Link>
          <p style={{ fontSize: 12, color: "var(--ark-text-muted)", marginTop: 14 }}>
            Бесплатный аудит перед выбором тарифа
          </p>
        </div>
      </div>
    </section>
  );
}
