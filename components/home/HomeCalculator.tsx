"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Uzbekistan market assumptions (UZS)
const ENGINEER_COST = 14_000_000;   // Fully loaded: salary + taxes + benefits
const OVERHEAD_PER_SEAT = 350_000;  // Hardware, software, overhead per employee

function calcInternal(seats: number): number {
  const engineers = Math.max(1, Math.ceil(seats / 25));
  return engineers * ENGINEER_COST + seats * OVERHEAD_PER_SEAT;
}

function calcArkana(seats: number): number {
  if (seats <= 25) return 3_000_000;   // START
  if (seats <= 75) return 6_000_000;   // OPERATIONS
  return 12_000_000;                    // ENTERPRISE approximate
}

function planName(seats: number): string {
  if (seats <= 25) return "START";
  if (seats <= 75) return "OPERATIONS";
  return "ENTERPRISE";
}

function fmt(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return (Number.isInteger(m) ? m : m.toFixed(1)) + " млн сум";
  }
  return n.toLocaleString("ru-RU") + " сум";
}

export function HomeCalculator() {
  const [seats, setSeats] = useState(30);

  const internal = calcInternal(seats);
  const arkana   = calcArkana(seats);
  const savings  = internal - arkana;
  const pct      = Math.round((savings / internal) * 100);

  return (
    <section style={{ background: "var(--ark-bg)", paddingBottom: 120, borderTop: "1px solid var(--ark-divider)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ padding: "80px 0 64px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16 }}>
            Калькулятор экономии
          </div>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1, letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: 0 }}>
            Сколько вы на самом деле
            <br />
            <span style={{ color: "var(--ark-text-hint)" }}>платите за IT.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, borderRadius: 12, overflow: "hidden", border: "1px solid var(--ark-border)" }}>

          {/* LEFT — slider */}
          <div style={{ padding: "48px 48px 56px", background: "var(--ark-surface)" }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ark-text-muted)", letterSpacing: "-0.01em" }}>
                  Сотрудников / рабочих мест
                </span>
                <span style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "2.25rem", letterSpacing: "-0.05em", color: "var(--ark-text-heading)", lineHeight: 1 }}>
                  {seats}
                </span>
              </div>

              <input
                type="range" min={5} max={200} step={5} value={seats}
                onChange={e => setSeats(Number(e.target.value))}
                style={{
                  width: "100%", appearance: "none", WebkitAppearance: "none",
                  height: 2, borderRadius: 2, outline: "none", cursor: "pointer",
                  background: `linear-gradient(to right, var(--ark-accent) ${((seats - 5) / 195) * 100}%, var(--ark-border) ${((seats - 5) / 195) * 100}%)`,
                }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: "var(--ark-text-faint)" }}>5</span>
                <span style={{ fontSize: 11, color: "var(--ark-text-faint)" }}>200</span>
              </div>
            </div>

            {/* Assumptions */}
            <div style={{ borderTop: "1px solid var(--ark-divider)", paddingTop: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-faint)", marginBottom: 14 }}>
                Допущения
              </div>
              {[
                `1 IT-инженер на 25 сотрудников`,
                `14 000 000 сум/мес — полная стоимость инженера`,
                `350 000 сум/мес — накладные расходы на сотрудника`,
                `ARKANA ${planName(seats)}: ${fmt(arkana)} (фиксировано)`,
              ].map(a => (
                <div key={a} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "baseline" }}>
                  <span style={{ color: "var(--ark-border-strong)", fontSize: 11, flexShrink: 0 }}>—</span>
                  <span style={{ fontSize: 12, color: "var(--ark-text-label)", letterSpacing: "-0.01em", lineHeight: 1.5 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — results */}
          <div style={{ padding: "48px 48px 56px", borderLeft: "1px solid var(--ark-border)" }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              <div style={{ padding: "24px 20px", borderRadius: 8, border: "1px solid var(--ark-border)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 10 }}>
                  Штатный IT
                </div>
                <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", letterSpacing: "-0.04em", color: "var(--ark-text-muted)", lineHeight: 1, marginBottom: 4 }}>
                  {fmt(internal)}
                </div>
                <div style={{ fontSize: 11, color: "var(--ark-text-faint)" }}>в месяц</div>
              </div>

              <div style={{ padding: "24px 20px", borderRadius: 8, border: "1px solid var(--ark-border-strong)", background: "var(--ark-accent-glow)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--ark-accent)" }} />
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-sub)", marginBottom: 10 }}>
                  ARKANA
                </div>
                <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", letterSpacing: "-0.04em", color: "var(--ark-text-heading)", lineHeight: 1, marginBottom: 4 }}>
                  {fmt(arkana)}
                </div>
                <div style={{ fontSize: 11, color: "var(--ark-text-hint)" }}>в месяц · {planName(seats)}</div>
              </div>
            </div>

            {/* Savings hero */}
            <motion.div
              key={savings}
              initial={{ opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ padding: "28px 24px", borderRadius: 8, border: "1px solid var(--ark-border)", marginBottom: 28 }}
            >
              <div style={{ fontSize: 12, color: "var(--ark-text-hint)", letterSpacing: "-0.01em", marginBottom: 8 }}>
                Расчётная ежемесячная экономия
              </div>
              <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.05em", color: "var(--ark-text-heading)", lineHeight: 1, marginBottom: 6 }}>
                {fmt(savings)}
              </div>
              <div style={{ fontSize: 12, color: "var(--ark-text-label)", letterSpacing: "-0.01em" }}>
                {pct}% дешевле штатного IT · {fmt(savings * 12)} в год
              </div>
            </motion.div>

            <Link href="/contact" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "12px 24px", borderRadius: 7, background: "var(--ark-accent)",
              color: "#ffffff", fontWeight: 700, fontSize: 13,
              letterSpacing: "-0.01em", textDecoration: "none",
            }}>
              Получить точную стоимость для {seats} сотрудников
            </Link>

          </div>
        </div>

        <p style={{ fontSize: 11, color: "var(--ark-text-faint)", marginTop: 12, letterSpacing: "-0.01em", lineHeight: 1.6 }}>
          * Только оценочные данные. Реальная экономия зависит от текущих IT-расходов и сложности инфраструктуры. Запросите бесплатный аудит для точных цифр.
        </p>

      </div>
    </section>
  );
}
