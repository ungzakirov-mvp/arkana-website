"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import type { SiteSettings } from "@/lib/cms-api";

const EASE = "cubic-bezier(.16,1,.3,1)";

const COPY = {
  ru: {
    eyebrow:       "Контакты",
    h2:            "Начните работать с технологическим партнёром.",
    sub:           "Расскажите о бизнесе — подготовим предложение за один рабочий день. Без обязательств.",
    cta1:          "Получить предложение",
    cta2:          "Получить консультацию",
    labelEmail:    "Email",
    labelTelegram: "Telegram",
    labelPhone:    "Телефон",
    trust: [
      { icon: "shield", text: "SLA в договоре" },
      { icon: "clock",  text: "Ответ за 1 рабочий день" },
      { icon: "lock",   text: "Конфиденциально" },
    ],
  },
  uz: {
    eyebrow:       "Aloqa",
    h2:            "Texnologik hamkor bilan ishlashni boshlang.",
    sub:           "Biznesingiz haqida aytib bering — bir ish kuni ichida taklif tayyorlaymiz. Majburiyatsiz.",
    cta1:          "Taklif so'rash",
    cta2:          "Maslahat so'rash",
    labelEmail:    "Email",
    labelTelegram: "Telegram",
    labelPhone:    "Telefon",
    trust: [
      { icon: "shield", text: "Shartnomada SLA" },
      { icon: "clock",  text: "1 ish kunida javob" },
      { icon: "lock",   text: "Maxfiylik kafolati" },
    ],
  },
  en: {
    eyebrow:       "Contact",
    h2:            "Ready to work with a technology partner?",
    sub:           "Tell us about your business — we'll have a proposal ready within one business day. No strings attached.",
    cta1:          "Request a Proposal",
    cta2:          "Book a Call",
    labelEmail:    "Email",
    labelTelegram: "Telegram",
    labelPhone:    "Phone",
    trust: [
      { icon: "shield", text: "Contractual SLA" },
      { icon: "clock",  text: "Response in 1 business day" },
      { icon: "lock",   text: "Confidential" },
    ],
  },
} as const;

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export function HomeContact({ settings }: { settings?: SiteSettings | null }) {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const { ref, visible } = useReveal();

  const email       = settings?.emails?.[0]?.value ?? "info@arkana.uz";
  const telegram    = settings?.telegram           ?? "@arkana_uz";
  const telegramHref = settings?.telegram_href     ?? "https://t.me/arkana_uz";
  const phones = settings?.phones?.length ? settings.phones : [
    { label: "Телефон", value: "+998 99 998 17 77", href: "tel:+998999981777" },
    { label: "Телефон", value: "+998 50 120 88 88", href: "tel:+998501208888" },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      style={{
        position: "relative", zIndex: 2, padding: "120px clamp(20px,4vw,64px)",
        borderTop: "1px solid rgba(238,242,238,0.08)", background: "#0b1210",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)",
        transition: `opacity .4s ${EASE}, transform .4s ${EASE}`,
      }}
    >
      <div className="contact-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 60, alignItems: "end" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>{c.eyebrow}</div>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,54px)", fontWeight: 800, margin: "0 0 24px", lineHeight: 1.1, letterSpacing: "-0.01em", fontFamily: "var(--font-manrope), sans-serif" }}>
            {c.h2}
          </h2>
          <p style={{ fontSize: 16, color: "#9fb0a6", maxWidth: 480, margin: "0 0 36px", lineHeight: 1.6 }}>
            {c.sub}
          </p>
          {/* Trust micro-signals */}
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 28 }}>
            {c.trust.map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                {icon === "shield" && (
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2L3 5v5.5c0 3.87 2.98 7.5 7 8.5 4.02-1 7-4.63 7-8.5V5L10 2z" fill="rgba(79,209,138,0.1)" stroke="#4fd18a" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 10.5l2 2 4-4" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
                {icon === "clock" && (
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="#4fd18a" strokeWidth="1.4"/><path d="M10 6.5V10.5l2.5 2" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
                {icon === "lock" && (
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="4" y="9" width="12" height="9" rx="2" stroke="#4fd18a" strokeWidth="1.4"/><path d="M7 9V6.5a3 3 0 0 1 6 0V9" stroke="#4fd18a" strokeWidth="1.4" strokeLinecap="round"/></svg>
                )}
                <span style={{ fontSize: 12.5, color: "#748078" }}>{text}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              padding: "16px 32px", background: "#4fd18a", color: "#05080a",
              borderRadius: 100, fontWeight: 700, fontSize: 15, display: "inline-block", textDecoration: "none",
              transition: "background 150ms cubic-bezier(0.4,0,0.2,1), box-shadow 150ms cubic-bezier(0.4,0,0.2,1), transform 100ms cubic-bezier(0.4,0,0.2,1)",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#7ee3ac"; el.style.boxShadow = "0 6px 20px rgba(79,209,138,0.35)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#4fd18a"; el.style.boxShadow = "none"; }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              {c.cta1}
            </Link>
            <Link href="/contact" style={{
              padding: "16px 32px", border: "1px solid rgba(238,242,238,0.16)", color: "#eef2ee",
              borderRadius: 100, fontWeight: 700, fontSize: 15, display: "inline-block", textDecoration: "none",
              transition: "border-color 150ms cubic-bezier(0.4,0,0.2,1), color 150ms cubic-bezier(0.4,0,0.2,1), transform 100ms cubic-bezier(0.4,0,0.2,1)",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#4fd18a"; el.style.color = "#4fd18a"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(238,242,238,0.16)"; el.style.color = "#eef2ee"; }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = "scale(0.97)"; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              {c.cta2}
            </Link>
          </div>
        </div>

        <div className="contact-info" style={{ fontSize: 14, display: "flex", flexDirection: "column", gap: 16, borderLeft: "1px solid rgba(238,242,238,0.1)", paddingLeft: 32 }}>
          <div>
            <span style={{ color: "#748078", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.labelEmail}</span><br />
            <a href={`mailto:${email}`} className="contact-link">{email}</a>
          </div>
          <div>
            <span style={{ color: "#748078", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.labelTelegram}</span><br />
            <a href={telegramHref} className="contact-link">{telegram}</a>
          </div>
          <div>
            <span style={{ color: "#748078", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>{c.labelPhone}</span><br />
            {phones.map(p => (
              <a key={p.href} href={p.href} className="contact-link" style={{ display: "block" }}>{p.value}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
