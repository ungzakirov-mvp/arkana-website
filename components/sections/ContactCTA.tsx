"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

const COPY: Record<string, {
  badge: string; h2a: string; h2b: string; sub: string;
  btn1: string; btn2: string; note: string;
}> = {
  ru: {
    badge: "Начните прямо сейчас",
    h2a: "Ваш IT-отдел под ключ",
    h2b: "без накладных расходов",
    sub: "Запросите коммерческое предложение. Подготовим за один рабочий день — с учётом вашей инфраструктуры и задач.",
    btn1: "Получить коммерческое предложение",
    btn2: "Посмотреть тарифы",
    note: "Без обязательств · Результат за 1 день",
  },
  en: {
    badge: "Get started",
    h2a: "Your IT department, turnkey",
    h2b: "without overhead",
    sub: "Request a commercial proposal. We'll prepare it in one business day — tailored to your infrastructure and goals.",
    btn1: "Get a commercial proposal",
    btn2: "View pricing",
    note: "No obligations · Response in 1 day",
  },
  uz: {
    badge: "Boshlang",
    h2a: "Kalit ostida IT bo'lim",
    h2b: "qo'shimcha xarajatlarsiz",
    sub: "Tijorat taklifi so'rang. Bir ish kuni ichida tayyorlaymiz — infratuzilmangiz va vazifalaringizni hisobga olgan holda.",
    btn1: "Tijorat taklifi olish",
    btn2: "Tariflarni ko'rish",
    note: "Majburiyatsiz · 1 kun ichida javob",
  },
};

export function ContactCTA() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <section style={{ padding: "96px 0", position: "relative", overflow: "hidden" }}>
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
                {c.badge}
              </span>
            </div>

            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20 }}>
              <span className="heading-gradient">{c.h2a}</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>{c.h2b}</span>
            </h2>

            <p style={{ fontSize: 17, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 500, margin: "0 auto 40px" }}>
              {c.sub}
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
                {c.btn1}
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
                {c.btn2}
                <ArrowRight size={15} />
              </Link>
            </div>

            <p style={{ fontSize: 12, color: "var(--ark-text-muted)", marginTop: 24 }}>
              {c.note}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
