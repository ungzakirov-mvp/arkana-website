"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    badge: "Get started today",
    h2a: "Your IT department, fully managed",
    h2b: "without the overhead",
    sub: "Request a proposal and we'll have it ready within one business day — scoped to your infrastructure and business needs.",
    btn1: "Request a proposal",
    btn2: "View pricing",
    note: "No obligation · Response within 1 business day",
  },
  uz: {
    badge: "Hozir boshlang",
    h2a: "To'liq boshqariladigan IT",
    h2b: "qo'shimcha xarajatlarsiz",
    sub: "Taklif so'rang. Infratuzilmangiz va vazifalaringizga moslashtirilgan holda bir ish kuni ichida tayyorlaymiz.",
    btn1: "Taklif so'rash",
    btn2: "Tariflarni ko'rish",
    note: "Majburiyatsiz · 1 ish kuni ichida javob",
  },
  zh: {
    badge: "立即开始",
    h2a: "全面托管的IT部门",
    h2b: "告别额外管理负担",
    sub: "申请商务方案，我们将在一个工作日内为您量身定制，充分考虑您的基础设施与业务需求。",
    btn1: "申请商务方案",
    btn2: "查看定价",
    note: "无需承诺 · 1个工作日内回复",
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
        background: "radial-gradient(ellipse, rgba(79,209,138,0.1), transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(79,209,138,0.07), rgba(79,209,138,0.03))",
          borderRadius: 20,
          padding: "72px 56px",
          textAlign: "center",
          border: "1px solid rgba(79,209,138,0.16)",
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
              <Link
                href="/contact"
                className="btn"
                style={{ background: "#4fd18a", color: "#05080a" }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#7ee3ac"; el.style.boxShadow = "0 8px 24px rgba(79,209,138,0.35)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#4fd18a"; el.style.boxShadow = "none"; }}
                onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
                onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                {c.btn1}
              </Link>
              <Link
                href="/pricing"
                className="btn grad-border"
                style={{ background: "var(--ark-surface)", color: "var(--ark-text-muted)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--ark-text)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--ark-text-muted)"; }}
              >
                {c.btn2}
                <ArrowRight size={15} />
              </Link>
            </div>

            <p style={{ fontSize: 13, color: "var(--ark-text-muted)", marginTop: 24, opacity: 0.7 }}>
              {c.note}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
