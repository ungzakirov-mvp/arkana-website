"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const TESTIMONIALS = [
  {
    quote: "Перешли на аутсорсинг к ARKANA год назад. IT-проблемы перестали отвлекать от бизнеса. Реакция быстрая, всё прозрачно через GoARKAN.",
    author: "Директор, торговая компания",
    sector: "Ритейл • 45 рабочих мест",
    rating: 5,
  },
  {
    quote: "Сократили расходы на IT на 35% по сравнению с содержанием штатного отдела. При этом качество поддержки выросло.",
    author: "CEO, производственная компания",
    sector: "Производство • 120 рабочих мест",
    rating: 5,
  },
  {
    quote: "Особенно ценим прозрачность. В GoARKAN видим каждую заявку, каждый актив, каждый показатель SLA в реальном времени.",
    author: "IT-директор, медцентр",
    sector: "Медицина • 80 рабочих мест",
    rating: 5,
  },
];

export function WhyChoose() {
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
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}
        >
          <div>
            <div className="ark-badge" style={{ marginBottom: 20 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>
                Клиенты о нас
              </span>
            </div>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              <span className="heading-gradient">Что говорят</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>наши клиенты</span>
            </h2>
          </div>
          <Link href="/cases" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 14, fontWeight: 600, color: "var(--ark-accent-2)", textDecoration: "none",
          }}>
            Все кейсы
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Testimonials grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="max-md:grid-cols-1 max-lg:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              style={{
                padding: "28px 24px",
                borderRadius: 14,
                background: "var(--ark-card)",
                border: "1px solid var(--ark-card-border)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#fbbf24">
                    <path d="M7 0l1.8 5.4H14l-4.6 3.4 1.8 5.4L7 11 2.8 14.2l1.8-5.4L0 5.4h5.2z" />
                  </svg>
                ))}
              </div>

              <blockquote style={{ fontSize: 14.5, color: "var(--ark-text)", lineHeight: 1.65, fontStyle: "italic", flex: 1, margin: 0 }}>
                "{t.quote}"
              </blockquote>

              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ark-text)", marginBottom: 2 }}>
                  {t.author}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--ark-text-muted)" }}>
                  {t.sector}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
