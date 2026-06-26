"use client";

import Link from "next/link";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import type { SiteSettings } from "@/lib/cms-api";

const COPY: Record<string, {
  label: string; h2: string; body: string;
  emailLabel: string; telegramLabel: string; addressLabel: string; hoursLabel: string;
  cta: string; ctaSub: string;
}> = {
  ru: {
    label: "Контакты",
    h2: "Свяжитесь с нами",
    body: "Расскажите о вашем бизнесе — мы подготовим коммерческое предложение и ответим в течение рабочего дня.",
    emailLabel: "Email",
    telegramLabel: "Telegram",
    addressLabel: "Адрес",
    hoursLabel: "Режим работы",
    cta: "Перейти к форме",
    ctaSub: "или напишите напрямую",
  },
  en: {
    label: "Contact",
    h2: "Get in touch",
    body: "Tell us about your business — we will prepare a commercial proposal and reply within one business day.",
    emailLabel: "Email",
    telegramLabel: "Telegram",
    addressLabel: "Address",
    hoursLabel: "Working hours",
    cta: "Go to form",
    ctaSub: "or write to us directly",
  },
  uz: {
    label: "Aloqa",
    h2: "Biz bilan bog'laning",
    body: "Biznesingiz haqida ayting — tijorat taklifini tayyorlaymiz va bir ish kuni ichida javob beramiz.",
    emailLabel: "Email",
    telegramLabel: "Telegram",
    addressLabel: "Manzil",
    hoursLabel: "Ish vaqti",
    cta: "Formaga o'tish",
    ctaSub: "yoki to'g'ridan-to'g'ri yozing",
  },
};

const FALLBACK = {
  email: "info@arkana.uz",
  emailHref: "mailto:info@arkana.uz",
  telegram: "@arkana_uz",
  telegramHref: "https://t.me/arkana_uz",
  address: "г. Ташкент, ул. Мирзо Улугбека 97",
  hours: "Пн–Пт: 9:00–18:00",
};

export function HomeContact({ settings }: { settings?: SiteSettings | null }) {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  const email      = settings?.emails?.[0]?.value    ?? FALLBACK.email;
  const emailHref  = settings?.emails?.[0]?.href     ?? FALLBACK.emailHref;
  const tg         = settings?.telegram               ?? FALLBACK.telegram;
  const tgHref     = settings?.telegram_href          ?? FALLBACK.telegramHref;
  const address    = settings?.address                ?? FALLBACK.address;
  const hoursEntry = settings?.working_hours ? Object.entries(settings.working_hours)[0] : null;
  const hours      = hoursEntry ? `${hoursEntry[0]}: ${hoursEntry[1]}` : FALLBACK.hours;

  const contacts = [
    { label: c.emailLabel,    value: email,    href: emailHref },
    { label: c.telegramLabel, value: tg,       href: tgHref    },
    { label: c.addressLabel,  value: address,  href: "#"       },
    { label: c.hoursLabel,    value: hours,    href: "#"       },
  ];

  return (
    <section id="contact" style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)", padding: "100px 0 120px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="max-lg:flex max-lg:flex-col max-lg:gap-12">

          {/* Left — copy + contacts */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16 }}>
              {c.label}
            </div>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 3.5vw, 3.25rem)", lineHeight: 1.1, letterSpacing: "-0.04em", color: "var(--ark-text-heading)", margin: "0 0 20px" }}>
              {c.h2}
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ark-text-sub)", margin: "0 0 48px", letterSpacing: "-0.01em", maxWidth: 400 }}>
              {c.body}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid var(--ark-divider)" }}>
              {contacts.map(({ label, value, href }) => (
                <a key={label} href={href}
                  style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--ark-divider)", textDecoration: "none" }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ark-text-faint)", paddingTop: 1 }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ark-text-muted)", letterSpacing: "-0.01em" }}>{value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — CTA box */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ padding: "48px 40px", borderRadius: 12, border: "1px solid var(--ark-border)", background: "var(--ark-bg-2)", display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.5rem", letterSpacing: "-0.04em", color: "var(--ark-text-heading)", lineHeight: 1.2 }}>
                {c.ctaSub}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href={emailHref} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: 8, border: "1px solid var(--ark-border)", textDecoration: "none", color: "var(--ark-text)", fontSize: 14, fontWeight: 500 }}>
                  <span>{email}</span>
                  <span style={{ fontSize: 11, color: "var(--ark-text-faint)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Email</span>
                </a>
                <a href={tgHref} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderRadius: 8, border: "1px solid var(--ark-border)", textDecoration: "none", color: "var(--ark-text)", fontSize: 14, fontWeight: 500 }}>
                  <span>{tg}</span>
                  <span style={{ fontSize: 11, color: "var(--ark-text-faint)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Telegram</span>
                </a>
              </div>
              <div style={{ borderTop: "1px solid var(--ark-divider)", paddingTop: 24 }}>
                <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 24px", borderRadius: 8, background: "var(--ark-accent)", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none", letterSpacing: "-0.01em" }}>
                  {c.cta}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
