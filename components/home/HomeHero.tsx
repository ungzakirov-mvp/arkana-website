"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const BENEFITS_KEYS = ["sla", "one_place", "it_dev", "partner"] as const;

const BENEFITS: Record<string, Record<string, string>> = {
  ru: { sla: "Работа по SLA", one_place: "Всё в одном месте", it_dev: "Развитие IT", partner: "Технологический партнёр" },
  en: { sla: "SLA-backed service", one_place: "Everything in one place", it_dev: "IT development", partner: "Technology partner" },
  uz: { sla: "SLA bo'yicha ish", one_place: "Hammasi bir joyda", it_dev: "IT rivojlanishi", partner: "Texnologiya hamkori" },
};

const COPY: Record<string, { location: string; h1a: string; h1b: string; body: string; cta1: string }> = {
  ru: {
    location: "Ташкент, Узбекистан",
    h1a: "Технологический партнёр",
    h1b: "для развития вашего бизнеса.",
    body: "Один договор. Фиксированная стоимость. Полная ответственность. Ваш IT работает предсказуемо — вы видите всё через GoARKAN.",
    cta1: "Получить коммерческое предложение",
  },
  uz: {
    location: "Toshkent, O'zbekiston",
    h1a: "Texnologiya hamkori",
    h1b: "biznesingiz rivojlanishi uchun.",
    body: "Bitta shartnoma. Belgilangan narx. To'liq javobgarlik. IT'ingiz taxmin qilinadigan tarzda ishlaydi — GoARKAN orqali hamma narsani ko'rasiz.",
    cta1: "Tijorat taklifi olish",
  },
  en: {
    location: "Tashkent, Uzbekistan",
    h1a: "Technology partner",
    h1b: "for your business growth.",
    body: "One contract. Fixed cost. Full accountability. Your IT operates predictably — you see everything through GoARKAN.",
    cta1: "Get a commercial proposal",
  },
};

export function HomeHero() {
  const { lang, theme } = useApp();
  const copy = COPY[lang] ?? COPY.ru;
  const benefits = BENEFITS_KEYS.map((k) => (BENEFITS[lang] ?? BENEFITS.ru)[k]);
  const isDark = theme === "dark";

  return (
    <section style={{ background: "var(--ark-bg)", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 40px 56px", display: "flex", alignItems: "center", gap: 0, minHeight: 440 }}>

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

          <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(40px, 5vw, 68px)", lineHeight: 1.04, letterSpacing: "-0.04em", color: "var(--ark-text-heading)", margin: "0 0 28px" }}>
            {copy.h1a}
            <br />
            <span style={{ color: "var(--ark-text-sub)" }}>{copy.h1b}</span>
          </h1>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 0", marginBottom: 28, alignItems: "center" }}>
            {benefits.map((b, i) => (
              <span key={b} style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ark-text-muted)", letterSpacing: "-0.01em", padding: "0 10px" }}>{b}</span>
                {i < benefits.length - 1 && <span style={{ width: 1, height: 12, background: "var(--ark-border)", flexShrink: 0 }} />}
              </span>
            ))}
          </div>

          <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--ark-text-sub)", margin: "0 0 36px", letterSpacing: "-0.01em", maxWidth: 440 }}>
            {copy.body}
          </p>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "11px 22px", borderRadius: 7,
              background: "var(--ark-accent)", color: "#ffffff",
              fontWeight: 700, fontSize: 13.5, letterSpacing: "-0.01em", textDecoration: "none",
              boxShadow: isDark ? "0 0 24px rgba(99,102,241,0.35)" : "0 2px 12px rgba(99,102,241,0.22)",
            }}>
              {copy.cta1}
            </Link>
          </div>
        </motion.div>

        {/* RIGHT — logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="max-md:hidden"
          style={{ flex: "1 1 auto", display: "flex", justifyContent: "center", alignItems: "flex-end", paddingBottom: 0, minWidth: 0 }}
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
