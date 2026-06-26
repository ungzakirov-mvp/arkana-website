"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const PILL_KEYS = ["service_desk", "it_outsourcing", "asset_mgmt", "remote_support"] as const;

const PILL_LABELS: Record<string, Record<string, string>> = {
  ru: {
    service_desk:    "Service Desk",
    it_outsourcing:  "IT-аутсорсинг",
    asset_mgmt:      "Управление активами",
    remote_support:  "Удалённая поддержка",
  },
  uz: {
    service_desk:    "Service Desk",
    it_outsourcing:  "IT-autsorsing",
    asset_mgmt:      "Aktivlarni boshqarish",
    remote_support:  "Masofaviy qo'llab-quvvatlash",
  },
  en: {
    service_desk:    "Service Desk",
    it_outsourcing:  "IT Outsourcing",
    asset_mgmt:      "Asset Management",
    remote_support:  "Remote Support",
  },
};

const HERO_COPY: Record<string, { location: string; h1a: string; h1b: string; body: string; cta1: string; cta2: string }> = {
  ru: {
    location: "Ташкент, Узбекистан",
    h1a: "IT-отдел",
    h1b: "как услуга.",
    body: "Один договор. Фиксированная стоимость. Полная ответственность. Каждая заявка, актив и SLA — у вас перед глазами через GoARKAN.",
    cta1: "Запросить предложение",
    cta2: "Тарифы",
  },
  uz: {
    location: "Toshkent, O'zbekiston",
    h1a: "IT bo'lim",
    h1b: "xizmat sifatida.",
    body: "Bitta shartnoma. Belgilangan narx. To'liq javobgarlik. Har bir so'rov, aktiv va SLA — GoARKAN orqali ko'z oldingizda.",
    cta1: "Taklif so'rash",
    cta2: "Tariflar",
  },
  en: {
    location: "Tashkent, Uzbekistan",
    h1a: "IT Department",
    h1b: "as a Service.",
    body: "One contract. Fixed cost. Full accountability. Every incident, asset, and SLA visible through GoARKAN in real time.",
    cta1: "Get Proposal",
    cta2: "View Pricing",
  },
};

export function HomeHero() {
  const { lang, theme } = useApp();
  const copy = HERO_COPY[lang] ?? HERO_COPY.ru;
  const pills = PILL_KEYS.map((k) => (PILL_LABELS[lang] ?? PILL_LABELS.ru)[k]);
  const isDark = theme === "dark";

  return (
    <section style={{
      background: "var(--ark-bg)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "12px 40px 56px",
        display: "flex",
        alignItems: "center",
        gap: 0,
        minHeight: 440,
      }}>

        {/* LEFT — text */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ flex: "0 0 auto", width: "min(520px, 52%)", paddingBottom: 72, paddingTop: 16, zIndex: 1 }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 36 }}>
            <span style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-text-sub)", letterSpacing: "0.04em" }}>
              {copy.location}
            </span>
          </div>

          <h1 style={{
            fontFamily: "Nacelle, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(46px, 5vw, 76px)",
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
            color: "var(--ark-text-heading)",
            margin: "0 0 28px",
          }}>
            {copy.h1a}
            <br />
            <span style={{ color: "var(--ark-text-hint)" }}>{copy.h1b}</span>
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0", marginBottom: 28, alignItems: "center" }}>
            {pills.map((p, i) => (
              <span key={p} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ark-text-muted)", letterSpacing: "-0.01em", padding: "0 10px" }}>{p}</span>
                {i < pills.length - 1 && (
                  <span style={{ width: 1, height: 12, background: "var(--ark-border)", flexShrink: 0 }} />
                )}
              </span>
            ))}
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--ark-text-sub)", margin: "0 0 36px", letterSpacing: "-0.01em", maxWidth: 440 }}>
            {copy.body}
          </p>

          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "11px 22px", borderRadius: 7,
              background: "var(--ark-accent)", color: "#ffffff",
              fontWeight: 700, fontSize: 13.5, letterSpacing: "-0.01em", textDecoration: "none",
              boxShadow: isDark ? "0 0 24px rgba(99,102,241,0.35)" : "0 2px 12px rgba(99,102,241,0.22)",
            }}>
              {copy.cta1}
            </Link>
            <Link href="/pricing" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "11px 22px", borderRadius: 7,
              border: "1px solid var(--ark-border-strong)",
              color: "var(--ark-text-muted)",
              fontWeight: 500, fontSize: 13.5, letterSpacing: "-0.01em", textDecoration: "none",
            }}>
              {copy.cta2}
            </Link>
          </div>
        </motion.div>

        {/* RIGHT — logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="max-md:hidden"
          style={{
            flex: "1 1 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingBottom: 0,
            minWidth: 0,
          }}
        >
          <Image
            src="/logo-3d.png"
            alt="ARKANA"
            width={480}
            height={480}
            priority
            style={{
              width: "min(420px, 40vw)",
              height: "auto",
              display: "block",
              filter: isDark
                ? "drop-shadow(0 0 32px rgba(79,109,255,0.5)) drop-shadow(0 4px 24px rgba(0,0,0,0.4))"
                : "drop-shadow(0 8px 32px rgba(0,0,80,0.10))",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
