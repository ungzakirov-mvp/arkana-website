"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Plan } from "@/lib/cms-api";

const SUBTITLES: Record<string, string> = {
  start:      "Малый бизнес",
  operations: "Растущий бизнес",
  enterprise: "Крупный бизнес",
};

const FALLBACK_PLANS: Plan[] = [
  {
    id: 1, slug: "start", name: "START", is_popular: false, sort_order: 1,
    max_workstations: 25, price_label: "от 3 000 000", price_monthly: 3000000,
    cta_label: "Начать с START", cta_href: "/contact", website_show_contact_sales: false,
    features: [
      { text: "Service Desk (GoARKAN)", is_included: true },
      { text: "SLA — реакция 2 часа", is_included: true },
      { text: "Именной инженер", is_included: false },
    ],
    services: [
      { count: "до 25", label: "Рабочих мест" },
      { count: "40", label: "Заявок в мес." },
    ],
  },
  {
    id: 2, slug: "operations", name: "OPERATIONS", is_popular: true, sort_order: 2,
    max_workstations: 75, price_label: "от 6 000 000", price_monthly: 6000000,
    cta_label: "Начать с OPERATIONS", cta_href: "/contact", website_show_contact_sales: false,
    features: [
      { text: "Service Desk (GoARKAN)", is_included: true },
      { text: "SLA — реакция 1 час", is_included: true },
      { text: "Именной инженер", is_included: true },
    ],
    services: [
      { count: "до 75", label: "Рабочих мест" },
      { count: "100", label: "Заявок в мес." },
    ],
  },
  {
    id: 3, slug: "enterprise", name: "ENTERPRISE", is_popular: false, sort_order: 3,
    max_workstations: null, price_label: "Индивидуально", price_monthly: null,
    cta_label: "Связаться с нами", cta_href: "/contact", website_show_contact_sales: true,
    features: [
      { text: "Выделенная команда", is_included: true },
      { text: "Индивидуальный SLA", is_included: true },
      { text: "Кибербезопасность", is_included: true },
    ],
    services: [],
  },
];

export function HomePricing({ plans = [] }: { plans?: Plan[] }) {
  const activePlans = plans.length > 0 ? plans : FALLBACK_PLANS;
  const startPrice = activePlans.find(p => p.slug === "start")?.price_label ?? "от 3 000 000";

  return (
    <section id="pricing" style={{ background: "var(--ark-bg)", padding: "120px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16 }}>Тарифы</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1, letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: 0 }}>
              {startPrice}
              <span style={{ color: "var(--ark-text-hint)" }}> сум/мес.</span>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ark-text-sub)", margin: "0 0 6px", maxWidth: 340, letterSpacing: "-0.01em" }}>
              Фиксированная стоимость. Всё включено. SLA зафиксирован в договоре со штрафными санкциями.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3" style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--ark-border)" }}>
          {activePlans.map((plan, i) => (
            <motion.div
              key={plan.slug}
              id={plan.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                background: plan.is_popular ? "var(--ark-bg-2)" : "var(--ark-bg)",
                borderRight: i < activePlans.length - 1 ? "1px solid var(--ark-border)" : "none",
                padding: "36px 32px 40px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {plan.is_popular && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--ark-accent)" }} />
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: plan.is_popular ? "var(--ark-text)" : "var(--ark-text-hint)" }}>
                  {plan.name}
                </span>
                {plan.is_popular && (
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-accent-2)", border: "1px solid var(--ark-accent-glow)", padding: "2px 7px", borderRadius: 4 }}>
                    Популярный
                  </span>
                )}
              </div>

              <div style={{ fontSize: 12, color: "var(--ark-text-faint)", marginBottom: 20, letterSpacing: "-0.01em" }}>
                {SUBTITLES[plan.slug] ?? ""}
              </div>

              {/* Price */}
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: plan.price_monthly == null ? "clamp(1.5rem, 2.5vw, 2rem)" : "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1, letterSpacing: "-0.04em", color: "var(--ark-text-heading)" }}>
                  {plan.price_label}
                </span>
                {plan.price_monthly != null && (
                  <span style={{ fontSize: 12, color: "var(--ark-text-label)", letterSpacing: "-0.01em", marginLeft: 6 }}>сум/мес</span>
                )}
              </div>

              {/* Service counts */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, margin: "16px 0 20px" }}>
                {(plan.services ?? []).map(({ count, label }) => (
                  <div key={label} style={{ padding: "10px 12px", borderRadius: 7, background: "var(--ark-surface)", border: "1px solid var(--ark-border)" }}>
                    <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: 20, color: "var(--ark-text-heading)", lineHeight: 1, marginBottom: 3 }}>{count}</div>
                    <div style={{ fontSize: 10, color: "var(--ark-text-hint)", letterSpacing: "-0.01em", lineHeight: 1.3 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={`${plan.cta_href}?plan=${plan.slug}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "10px 20px", borderRadius: 7,
                  background: plan.is_popular ? "var(--ark-accent)" : "var(--ark-surface)",
                  color: plan.is_popular ? "#ffffff" : "var(--ark-text-muted)",
                  fontWeight: plan.is_popular ? 700 : 500, fontSize: 13,
                  letterSpacing: "-0.01em", textDecoration: "none",
                  margin: "0 0 24px",
                  border: plan.is_popular ? "none" : "1px solid var(--ark-border)",
                }}
              >
                {plan.cta_label}
              </Link>

              {/* Features */}
              {plan.features.length > 0 && (
                <div style={{ borderTop: "1px solid var(--ark-divider)", paddingTop: 20 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", color: "var(--ark-text-faint)", marginBottom: 12 }}>Включено</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {plan.features.map(f => (
                      <div key={f.text} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                        <span style={{ flexShrink: 0, width: 14, fontSize: 12, color: f.is_included ? "var(--ark-text-sub)" : "var(--ark-text-faint)", lineHeight: 1.5 }}>
                          {f.is_included ? "—" : "✕"}
                        </span>
                        <span style={{ fontSize: 13, color: f.is_included ? "var(--ark-text-muted)" : "var(--ark-text-faint)", lineHeight: 1.5, letterSpacing: "-0.01em" }}>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, padding: "14px 20px", borderRadius: 8, border: "1px solid var(--ark-border)" }}>
          <span style={{ fontSize: 13, color: "var(--ark-text-label)", letterSpacing: "-0.01em" }}>Нестандартная инфраструктура? Специфические требования?</span>
          <Link href="/contact" style={{ fontSize: 13, fontWeight: 600, color: "var(--ark-accent-2)", textDecoration: "none", letterSpacing: "-0.01em" }}>
            Обсудить условия →
          </Link>
        </div>

      </div>
    </section>
  );
}
