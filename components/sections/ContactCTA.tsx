"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactCTA() {
  return (
    <section style={{ padding: "96px 0", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div aria-hidden="true" style={{
        position: "absolute",
        bottom: "-20%", left: "50%",
        transform: "translateX(-60%)",
        width: 760, height: 668,
        background: "radial-gradient(ellipse, rgba(99,102,241,0.15), transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{
          background: "linear-gradient(to right, rgba(99,102,241,0.12), rgba(79,70,229,0.08))",
          borderRadius: 20,
          padding: "72px 56px",
          textAlign: "center",
          border: "1px solid rgba(99,102,241,0.25)",
        }} className="max-sm:px-8 max-sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>
                Начните прямо сейчас
              </span>
            </div>

            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20 }}>
              <span className="heading-gradient">Ваш IT-отдел под ключ</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>без накладных расходов</span>
            </h2>

            <p style={{ fontSize: 17, color: "var(--ark-text-muted)", lineHeight: 1.65, marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
              Запросите бесплатный IT-аудит. За 5 дней получите полный отчёт об инфраструктуре
              и конкретное предложение под ваш бизнес.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn" style={{
                background: "linear-gradient(to bottom, #6366f1, #4f46e5)",
                backgroundSize: "100% 100%",
                backgroundPosition: "bottom",
                color: "white",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundSize = "100% 150%")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundSize = "100% 100%")}
              >
                <Calendar size={15} />
                Запросить бесплатный аудит
              </Link>
              <Link href="/pricing" className="btn grad-border" style={{
                background: "linear-gradient(to bottom, var(--ark-surface), rgba(17,24,39,0.6))",
                backgroundSize: "100% 100%",
                backgroundPosition: "bottom",
                color: "var(--ark-text-muted)",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundSize = "100% 150%")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundSize = "100% 100%")}
              >
                Посмотреть тарифы
                <ArrowRight size={15} />
              </Link>
            </div>

            <p style={{ fontSize: 12, color: "var(--ark-text-muted)", marginTop: 24 }}>
              Без обязательств · Бесплатно · Результат за 5 дней
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
