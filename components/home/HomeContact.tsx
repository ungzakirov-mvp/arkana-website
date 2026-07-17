"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import type { SiteSettings } from "@/lib/cms-api";

const EASE = "cubic-bezier(.16,1,.3,1)";

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
  const { ref, visible } = useReveal();
  const email = settings?.emails?.[0]?.email ?? "info@arkana.uz";
  const telegram = settings?.telegram ?? "@arkana_uz";
  const telegramHref = settings?.telegram_href ?? "https://t.me/arkana_uz";
  const address = settings?.address ?? "г. Ташкент, ул. Мирзо Улугбека 97";

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="contact"
      style={{
        position: "relative", zIndex: 2, padding: "120px clamp(20px,4vw,64px)",
        borderTop: "1px solid rgba(238,242,238,0.08)", background: "#0b1210",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(36px)",
        transition: `opacity .7s ${EASE}, transform .7s ${EASE}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 60, alignItems: "end" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 12, letterSpacing: "0.12em", color: "#4fd18a", textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>Контакты</div>
          <h2 style={{ fontSize: "clamp(30px,4.4vw,54px)", fontWeight: 800, margin: "0 0 24px", lineHeight: 1.1, letterSpacing: "-0.01em", fontFamily: "var(--font-manrope), sans-serif" }}>
            Начните работать с технологическим партнёром.
          </h2>
          <p style={{ fontSize: 16, color: "#9fb0a6", maxWidth: 480, margin: "0 0 36px", lineHeight: 1.6 }}>
            Расскажите о бизнесе — подготовим предложение за один рабочий день. Без обязательств.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              padding: "16px 32px", background: "#4fd18a", color: "#05080a",
              borderRadius: 100, fontWeight: 700, fontSize: 15, display: "inline-block", textDecoration: "none",
              transition: "background .2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#7ee3ac"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#4fd18a"; }}
            >
              Получить предложение
            </Link>
            <Link href="/contact" style={{
              padding: "16px 32px", border: "1px solid rgba(238,242,238,0.16)", color: "#eef2ee",
              borderRadius: 100, fontWeight: 700, fontSize: 15, display: "inline-block", textDecoration: "none",
              transition: "border-color .2s, color .2s",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#4fd18a"; el.style.color = "#4fd18a"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(238,242,238,0.16)"; el.style.color = "#eef2ee"; }}
            >
              Получить консультацию
            </Link>
          </div>
        </div>

        <div style={{ fontSize: 14, display: "flex", flexDirection: "column", gap: 16, borderLeft: "1px solid rgba(238,242,238,0.1)", paddingLeft: 32 }}>
          <div>
            <span style={{ color: "#748078", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>Email</span><br />
            <a href={`mailto:${email}`} style={{ color: "#eef2ee", fontWeight: 600, textDecoration: "none" }}>{email}</a>
          </div>
          <div>
            <span style={{ color: "#748078", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>Telegram</span><br />
            <a href={telegramHref} style={{ color: "#eef2ee", fontWeight: 600, textDecoration: "none" }}>{telegram}</a>
          </div>
          <div>
            <span style={{ color: "#748078", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>Адрес</span><br />
            <span style={{ color: "#eef2ee", fontWeight: 600 }}>{address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
