"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    num: "01",
    title: "IT-аудит за 5 дней",
    desc: "Инвентаризация оборудования, анализ инфраструктуры, оценка рисков. Бесплатно.",
  },
  {
    num: "02",
    title: "Подбор тарифа",
    desc: "Предлагаем оптимальный пакет под размер компании, задачи и бюджет.",
  },
  {
    num: "03",
    title: "Договор и SLA",
    desc: "Фиксируем ответственность, время реакции и гарантии результата в договоре.",
  },
  {
    num: "04",
    title: "Запуск за 1 неделю",
    desc: "Команда подключается, настраивает мониторинг и берёт инфраструктуру под контроль.",
  },
];

export function Process() {
  return (
    <section style={{
      padding: "96px 0",
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
              Как мы работаем
            </span>
          </div>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
            <span className="heading-gradient">От аудита до запуска</span>
            <br />
            <span style={{ color: "var(--ark-text)" }}>за одну неделю</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1 }} className="max-md:grid-cols-1 max-lg:grid-cols-2">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              style={{
                padding: "32px 28px",
                borderRadius: 0,
                borderRight: i < STEPS.length - 1 ? "1px solid var(--ark-border)" : "none",
                position: "relative",
              }}
              className="max-lg:border-r-0 max-lg:border-b"
            >
              {/* Step number */}
              <div style={{
                fontFamily: "Nacelle, sans-serif",
                fontSize: 48,
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "var(--ark-text-dim)",
                marginBottom: 16,
                lineHeight: 1,
              }}>
                {step.num}
              </div>

              {/* Accent line */}
              <div style={{
                width: 32, height: 2,
                background: "var(--ark-accent)",
                borderRadius: 1,
                marginBottom: 20,
              }} />

              <h3 style={{ fontFamily: "Nacelle, sans-serif", fontSize: 16, fontWeight: 600, color: "var(--ark-text)", marginBottom: 10, lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.65 }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
