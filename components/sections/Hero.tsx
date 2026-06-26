"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const PROOF = [
  { value: "8+", label: "лет на рынке" },
  { value: "120+", label: "компаний-клиентов" },
  { value: "99.9%", label: "SLA гарантия" },
  { value: "<2ч", label: "время реакции" },
];

const INCLUDED = [
  "Service Desk 24/7 через GoARKAN",
  "Именной инженер за вашей компанией",
  "SLA-договор с штрафными санкциями",
  "Без скрытых расходов и «согласования работ»",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ paddingTop: 88, paddingBottom: 80 }}>
      {/* Background */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18), transparent)",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%236366f1' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} className="max-lg:grid-cols-1 max-lg:gap-10">

          {/* ── LEFT ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            {/* Badge */}
            <div className="ark-badge" style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ark-accent-2)", letterSpacing: "0.05em" }}>
                IT-аутсорсинг · Ташкент · от 5 до 200 рабочих мест
              </span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: "Nacelle, sans-serif", fontWeight: 600,
              fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
              lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 20,
            }}>
              <span className="heading-gradient">IT вашей компании</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>— наша ответственность,</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>фиксированная цена.</span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--ark-text-muted)", marginBottom: 20, maxWidth: 460 }}>
              Берём IT вашего бизнеса под ключ: инфраструктура, заявки, безопасность, отчётность.
              Вы видите всё в реальном времени через GoARKAN.
            </p>

            {/* Included list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
              {INCLUDED.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <CheckCircle2 size={14} style={{ color: "var(--ark-accent-2)", flexShrink: 0 }} />
                  <span style={{ fontSize: 13.5, color: "var(--ark-text)", lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <Link href="/contact" className="btn" style={{
                background: "linear-gradient(to bottom, #6366f1, #4338ca)",
                color: "white",
                fontSize: 14,
                padding: "12px 24px",
                boxShadow: "0 4px 16px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.16)",
              }}>
                Получить бесплатный аудит
                <ArrowRight size={15} />
              </Link>
              <Link href="/pricing" className="btn grad-border" style={{
                background: "rgba(255,255,255,0.04)",
                color: "var(--ark-text)",
                fontSize: 14,
                padding: "12px 24px",
              }}>
                Тарифы от $15 / мест
              </Link>
            </div>

            {/* Social proof */}
            <div style={{ borderTop: "1px solid var(--ark-border)", paddingTop: 20 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ark-text-muted)", marginBottom: 12 }}>
                Нам доверяют
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {PROOF.map(({ value, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.5rem", color: "var(--ark-text)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                      {value}
                    </div>
                    <div style={{ fontSize: 11.5, color: "var(--ark-text-muted)", marginTop: 3 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT — real GoARKAN screenshot ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="max-lg:hidden"
            style={{ position: "relative" }}
          >
            {/* Glow */}
            <div style={{
              position: "absolute", inset: -32, borderRadius: 32,
              background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.22), transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Browser chrome */}
            <div style={{
              borderRadius: 14,
              background: "#0d1117",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
              overflow: "hidden",
              position: "relative",
            }}>
              {/* Browser bar */}
              <div style={{
                padding: "9px 14px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(0,0,0,0.3)",
              }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {["#ef4444","#f59e0b","#22c55e"].map(c => (
                    <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "block" }} />
                  ))}
                </div>
                <div style={{
                  flex: 1, background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 5, padding: "2px 10px",
                  fontSize: 10.5, color: "rgba(255,255,255,0.4)",
                  display: "flex", alignItems: "center", gap: 5,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "block" }} />
                  goarkan.uz / dashboard
                </div>
              </div>

              {/* Real screenshot */}
              <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
                <Image
                  src="/portal/dashboard.jpeg"
                  alt="GoARKAN — панель управления IT-инфраструктурой клиента"
                  width={640}
                  height={360}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  priority
                />
              </div>
            </div>

            {/* Floating badge — SLA */}
            <div style={{
              position: "absolute", bottom: -14, right: -14,
              borderRadius: 10, padding: "8px 16px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.95), rgba(67,56,202,0.95))",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 24px rgba(99,102,241,0.5)",
            }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", marginBottom: 1 }}>SLA этого месяца</p>
              <p style={{ fontFamily: "Nacelle, sans-serif", fontSize: 18, fontWeight: 600, color: "#fff", lineHeight: 1 }}>99.9%</p>
            </div>

            {/* Floating badge — response time */}
            <div style={{
              position: "absolute", top: 60, left: -20,
              borderRadius: 10, padding: "8px 14px",
              background: "rgba(17,24,39,0.9)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 1 }}>Первый ответ</p>
              <p style={{ fontFamily: "Nacelle, sans-serif", fontSize: 18, fontWeight: 600, color: "#22c55e", lineHeight: 1 }}>{"< 2 часов"}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
