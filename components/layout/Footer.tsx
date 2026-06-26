"use client";

import Link from "next/link";
import type { SiteSettings } from "@/lib/cms-api";

const FALLBACK: Pick<SiteSettings, "company_name" | "phones" | "emails" | "telegram" | "telegram_href" | "address"> = {
  company_name: "ARKANA",
  phones: [],
  emails: [{ value: "info@arkana.uz", href: "mailto:info@arkana.uz" }],
  telegram: "@arkana_uz",
  telegram_href: "https://t.me/arkana_uz",
  address: "г. Ташкент, ул. Мирзо Улугбека 97",
};

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const year = new Date().getFullYear();
  const name    = settings?.company_name ?? FALLBACK.company_name;
  const phones  = settings?.phones?.length  ? settings.phones  : FALLBACK.phones;
  const emails  = settings?.emails?.length  ? settings.emails  : FALLBACK.emails;
  const tg      = settings?.telegram      ?? FALLBACK.telegram;
  const tgHref  = settings?.telegram_href ?? FALLBACK.telegram_href;
  const address = settings?.address       ?? FALLBACK.address;

  return (
    <footer style={{ borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1", padding: "48px 0 32px" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-12 mb-12">

          {/* Brand + contacts */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #4338ca)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: 14 }}>A</span>
              <span style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--ark-text)", letterSpacing: "-0.02em" }}>{name}</span>
            </Link>
            <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 280, marginBottom: 20 }}>
              IT-аутсорсинг для бизнеса в Ташкенте. Ответственность за результат, а не за часы.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {emails.map((e) => (
                <a key={e.href} href={e.href} style={{ fontSize: 13, color: "var(--ark-text-muted)", textDecoration: "none" }}>{e.value}</a>
              ))}
              {phones.map((p) => (
                <a key={p.href} href={p.href} style={{ fontSize: 13, color: "var(--ark-text-muted)", textDecoration: "none" }}>{p.value}</a>
              ))}
              {tg && <a href={tgHref ?? "#"} style={{ fontSize: 13, color: "var(--ark-text-muted)", textDecoration: "none" }}>{tg}</a>}
              {address && <span style={{ fontSize: 13, color: "var(--ark-text-muted)" }}>{address}</span>}
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ark-text-muted)", marginBottom: 16 }}>Услуги</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["IT-аутсорсинг",    "/services/it-outsourcing"],
                ["IT-поддержка",     "/services/itsm"],
                ["Инфраструктура",   "/services/infrastructure"],
                ["Кибербезопасность", "/services/managed-it"],
                ["Все услуги",       "/services"],
              ].map(([label, href]) => (
                <Link key={href} href={href}
                  style={{ fontSize: 13.5, color: "var(--ark-text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ark-text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ark-text-muted)")}
                >{label}</Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ark-text-muted)", marginBottom: 16 }}>Компания</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["О нас",    "/about"],
                ["Кейсы",    "/cases"],
                ["Блог",     "/blog"],
                ["GoARKAN",  "/goarkan"],
                ["Контакты", "/contact"],
              ].map(([label, href]) => (
                <Link key={href} href={href}
                  style={{ fontSize: 13.5, color: "var(--ark-text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ark-text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ark-text-muted)")}
                >{label}</Link>
              ))}
            </nav>
          </div>

          {/* Pricing */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ark-text-muted)", marginBottom: 16 }}>Тарифы</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["START",        "/pricing#start"],
                ["OPERATIONS",   "/pricing#operations"],
                ["ENTERPRISE",   "/pricing#enterprise"],
                ["Индивидуально", "/contact"],
              ].map(([label, href]) => (
                <Link key={href} href={href}
                  style={{ fontSize: 13.5, color: "var(--ark-text-muted)", textDecoration: "none", transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ark-text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ark-text-muted)")}
                >{label}</Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.1), transparent) 1", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: "var(--ark-text-muted)" }}>
            © {year} {name}. Все права защищены.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy" style={{ fontSize: 13, color: "var(--ark-text-muted)", textDecoration: "none" }}>Политика конфиденциальности</Link>
            <span style={{ fontSize: 13, color: "var(--ark-text-muted)" }}>Powered by GoARKAN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
