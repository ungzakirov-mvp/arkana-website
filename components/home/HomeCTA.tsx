"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const COPY: Record<string, { h2a: string; h2b: string; body: string; cta1: string; cta2: string }> = {
  ru: {
    h2a:  "Начните работать",
    h2b:  "с технологическим партнёром.",
    body: "Расскажите о вашем бизнесе — подготовим коммерческое предложение за один рабочий день. Без обязательств.",
    cta1: "Получить коммерческое предложение",
    cta2: "Получить консультацию",
  },
  uz: {
    h2a:  "Texnologiya hamkori bilan",
    h2b:  "ishlay boshlang.",
    body: "Biznesingiz haqida ayting — bir ish kunida tijorat taklifi tayyorlaymiz. Majburiyatsiz.",
    cta1: "Tijorat taklifi olish",
    cta2: "Konsultatsiya olish",
  },
  en: {
    h2a:  "Start working with",
    h2b:  "a technology partner.",
    body: "Tell us about your business. We will prepare a proposal within one business day. No obligation.",
    cta1: "Get a commercial proposal",
    cta2: "Get a consultation",
  },
};

export function HomeCTA() {
  const { lang } = useApp();
  const copy = COPY[lang] ?? COPY.ru;

  return (
    <section style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 40px 120px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 64, flexWrap: "wrap" }}
        >
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(3rem, 6vw, 5.5rem)", lineHeight: 1, letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: "0 0 20px" }}>
              {copy.h2a}
              <br />
              <span style={{ color: "var(--ark-text-sub)" }}>{copy.h2b}</span>
            </h2>
            <p style={{ fontSize: 15, color: "var(--ark-text-sub)", lineHeight: 1.65, letterSpacing: "-0.01em", margin: 0 }}>
              {copy.body}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 28px", borderRadius: 8, background: "var(--ark-accent)", color: "#ffffff", fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em", textDecoration: "none", whiteSpace: "nowrap" }}>
              {copy.cta1}
            </Link>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "13px 28px", borderRadius: 8, border: "1px solid var(--ark-border)", background: "transparent", color: "var(--ark-text-muted)", fontWeight: 500, fontSize: 14, letterSpacing: "-0.01em", textDecoration: "none", whiteSpace: "nowrap" }}>
              {copy.cta2}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
