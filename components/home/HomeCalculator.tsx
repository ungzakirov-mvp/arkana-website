"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const ENGINEER_COST = 14_000_000;
const OVERHEAD_PER_SEAT = 350_000;

function calcInternal(seats: number): number {
  const engineers = Math.max(1, Math.ceil(seats / 25));
  return engineers * ENGINEER_COST + seats * OVERHEAD_PER_SEAT;
}

function calcArkana(seats: number): number {
  if (seats <= 25) return 3_000_000;
  if (seats <= 75) return 6_000_000;
  return 12_000_000;
}

function planName(seats: number): string {
  if (seats <= 25) return "START";
  if (seats <= 75) return "OPERATIONS";
  return "ENTERPRISE";
}

function fmt(n: number, lang: string): string {
  const suffix = lang === "uz" ? " so'm" : lang === "en" ? " UZS" : " сум";
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    const val = Number.isInteger(m) ? m : m.toFixed(1);
    return lang === "en" ? `${val}M UZS` : `${val} млн${lang === "uz" ? " so'm" : " сум"}`;
  }
  return n.toLocaleString("ru-RU") + suffix;
}

const COPY: Record<string, {
  label: string;
  h2a: string;
  h2b: string;
  seats: string;
  assumptions: string;
  a1: string; a2: string; a3: string;
  inhouse: string;
  perMonth: string;
  savings: string;
  cheaper: string;
  perYear: string;
  cta: (seats: number) => string;
  disclaimer: string;
}> = {
  ru: {
    label: "Калькулятор экономии",
    h2a: "Сколько вы на самом деле",
    h2b: "платите за IT.",
    seats: "Сотрудников / рабочих мест",
    assumptions: "Допущения",
    a1: "1 IT-инженер на 25 сотрудников",
    a2: "14 000 000 сум/мес — полная стоимость инженера",
    a3: "350 000 сум/мес — накладные расходы на сотрудника",
    inhouse: "Штатный IT",
    perMonth: "в месяц",
    savings: "Расчётная ежемесячная экономия",
    cheaper: "дешевле штатного IT",
    perYear: "в год",
    cta: (s) => `Получить точную стоимость для ${s} сотрудников`,
    disclaimer: "* Только оценочные данные. Реальная экономия зависит от текущих IT-расходов и сложности инфраструктуры. Запросите бесплатный аудит для точных цифр.",
  },
  en: {
    label: "Savings Calculator",
    h2a: "How much are you actually",
    h2b: "paying for IT?",
    seats: "Employees / workstations",
    assumptions: "Assumptions",
    a1: "1 IT engineer per 25 employees",
    a2: "14,000,000 UZS/mo — fully loaded engineer cost",
    a3: "350,000 UZS/mo — overhead per employee",
    inhouse: "In-house IT",
    perMonth: "per month",
    savings: "Estimated monthly savings",
    cheaper: "cheaper than in-house IT",
    perYear: "per year",
    cta: (s) => `Get exact pricing for ${s} employees`,
    disclaimer: "* Estimates only. Actual savings depend on your current IT costs and infrastructure complexity. Request a free audit for precise figures.",
  },
  uz: {
    label: "Tejash kalkulyatori",
    h2a: "IT uchun aslida",
    h2b: "qancha to'laysiz?",
    seats: "Xodimlar / ish joylari",
    assumptions: "Taxminlar",
    a1: "25 xodimga 1 IT-muhandis",
    a2: "14 000 000 so'm/oy — muhandisning to'liq narxi",
    a3: "350 000 so'm/oy — xodim boshiga qo'shimcha xarajatlar",
    inhouse: "Shtat IT",
    perMonth: "oyiga",
    savings: "Taxminiy oylik tejash",
    cheaper: "shtat IT'dan arzon",
    perYear: "yillik",
    cta: (s) => `${s} xodim uchun aniq narxni oling`,
    disclaimer: "* Faqat taxminiy ma'lumotlar. Haqiqiy tejash joriy IT xarajatlari va infratuzilma murakkabligiga bog'liq. Aniq raqamlar uchun bepul audit so'rang.",
  },
};

export function HomeCalculator() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const [seats, setSeats] = useState(30);

  const internal = calcInternal(seats);
  const arkana   = calcArkana(seats);
  const savings  = internal - arkana;
  const pct      = Math.round((savings / internal) * 100);

  return (
    <section style={{ background: "var(--ark-bg)", paddingBottom: 120, borderTop: "1px solid var(--ark-divider)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        <div style={{ padding: "80px 0 64px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16 }}>
            {c.label}
          </div>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1, letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: 0 }}>
            {c.h2a}
            <br />
            <span style={{ color: "var(--ark-text-hint)" }}>{c.h2b}</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, borderRadius: 12, overflow: "hidden", border: "1px solid var(--ark-border)" }}>

          {/* LEFT — slider */}
          <div style={{ padding: "48px 48px 56px", background: "var(--ark-surface)" }}>
            <div style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ark-text-muted)", letterSpacing: "-0.01em" }}>
                  {c.seats}
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

            <div style={{ borderTop: "1px solid var(--ark-divider)", paddingTop: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-faint)", marginBottom: 14 }}>
                {c.assumptions}
              </div>
              {[
                c.a1,
                c.a2,
                c.a3,
                `ARKANA ${planName(seats)}: ${fmt(arkana, lang)}`,
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
                  {c.inhouse}
                </div>
                <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", letterSpacing: "-0.04em", color: "var(--ark-text-muted)", lineHeight: 1, marginBottom: 4 }}>
                  {fmt(internal, lang)}
                </div>
                <div style={{ fontSize: 11, color: "var(--ark-text-faint)" }}>{c.perMonth}</div>
              </div>

              <div style={{ padding: "24px 20px", borderRadius: 8, border: "1px solid var(--ark-border-strong)", background: "var(--ark-accent-glow)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--ark-accent)" }} />
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-sub)", marginBottom: 10 }}>
                  ARKANA
                </div>
                <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.25rem, 2vw, 1.75rem)", letterSpacing: "-0.04em", color: "var(--ark-text-heading)", lineHeight: 1, marginBottom: 4 }}>
                  {fmt(arkana, lang)}
                </div>
                <div style={{ fontSize: 11, color: "var(--ark-text-hint)" }}>{c.perMonth} · {planName(seats)}</div>
              </div>
            </div>

            <motion.div
              key={savings}
              initial={{ opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ padding: "28px 24px", borderRadius: 8, border: "1px solid var(--ark-border)", marginBottom: 28 }}
            >
              <div style={{ fontSize: 12, color: "var(--ark-text-hint)", letterSpacing: "-0.01em", marginBottom: 8 }}>
                {c.savings}
              </div>
              <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.05em", color: "var(--ark-text-heading)", lineHeight: 1, marginBottom: 6 }}>
                {fmt(savings, lang)}
              </div>
              <div style={{ fontSize: 12, color: "var(--ark-text-label)", letterSpacing: "-0.01em" }}>
                {pct}% {c.cheaper} · {fmt(savings * 12, lang)} {c.perYear}
              </div>
            </motion.div>

            <Link href="/contact" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "12px 24px", borderRadius: 7, background: "var(--ark-accent)",
              color: "#ffffff", fontWeight: 700, fontSize: 13,
              letterSpacing: "-0.01em", textDecoration: "none",
            }}>
              {c.cta(seats)}
            </Link>
          </div>
        </div>

        <p style={{ fontSize: 11, color: "var(--ark-text-faint)", marginTop: 12, letterSpacing: "-0.01em", lineHeight: 1.6 }}>
          {c.disclaimer}
        </p>

      </div>
    </section>
  );
}
