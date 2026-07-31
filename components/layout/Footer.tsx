"use client";

import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import type { SiteSettings } from "@/lib/cms-api";

const FALLBACK: Pick<SiteSettings, "company_name" | "phones" | "emails" | "telegram" | "telegram_href" | "address"> = {
  company_name: "ARKANA",
  phones: [],
  emails: [{ value: "info@arkana.uz", href: "mailto:info@arkana.uz" }],
  telegram: "@arkana_uz",
  telegram_href: "https://t.me/arkana_uz",
  address: "г. Ташкент, ул. Мирзо Улугбека 97",
};

const COPY: Record<string, {
  desc: string;
  services: string;
  company: string;
  pricing: string;
  serviceLinks: string[];
  companyLinks: string[];
  pricingLinks: string[];
  rights: string;
  privacy: string;
}> = {
  ru: {
    desc: "Технологический партнёр для бизнеса в Ташкенте. Один договор — полная ответственность за IT.",
    services: "Услуги",
    company: "Компания",
    pricing: "Тарифы",
    serviceLinks: ["IT-аутсорсинг", "IT-поддержка", "Инфраструктура", "Кибербезопасность", "Все услуги"],
    companyLinks: ["О нас", "Кейсы", "Блог", "GoARKAN", "Контакты"],
    pricingLinks: ["START", "OPERATIONS", "ENTERPRISE", "Индивидуально"],
    rights: "Все права защищены.",
    privacy: "Политика конфиденциальности",
  },
  en: {
    desc: "Technology partner for businesses in Tashkent. One contract. Full accountability for your IT.",
    services: "Services",
    company: "Company",
    pricing: "Pricing",
    serviceLinks: ["IT Outsourcing", "IT Support", "Infrastructure", "Cybersecurity", "All Services"],
    companyLinks: ["About", "Cases", "Blog", "GoARKAN", "Contact"],
    pricingLinks: ["START", "OPERATIONS", "ENTERPRISE", "Custom"],
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
  },
  uz: {
    desc: "Toshkentdagi biznes uchun texnologik hamkor. Bitta shartnoma — IT uchun to'liq mas'uliyat.",
    services: "Xizmatlar",
    company: "Kompaniya",
    pricing: "Tariflar",
    serviceLinks: ["IT-autsorsing", "IT-qo'llab-quvvatlash", "Infratuzilma", "Kiberxavfsizlik", "Barcha xizmatlar"],
    companyLinks: ["Biz haqimizda", "Loyihalar", "Blog", "GoARKAN", "Aloqa"],
    pricingLinks: ["START", "OPERATIONS", "ENTERPRISE", "Individual"],
    rights: "Barcha huquqlar himoyalangan.",
    privacy: "Maxfiylik siyosati",
  },
};

const SERVICE_HREFS = ["/services/it-outsourcing", "/services/itsm", "/services/infrastructure", "/services/managed-it", "/services"];
const COMPANY_HREFS = ["/about", "/cases", "/blog", "/goarkan", "/contact"];
const PRICING_HREFS = ["/pricing#start", "/pricing#operations", "/pricing#enterprise", "/contact"];

export function Footer({ settings }: { settings?: SiteSettings | null }) {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-8 lg:gap-12 mb-12">

          {/* Brand + contacts */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <Image src="/logo-3d.png" alt="ARKANA" width={28} height={28} style={{ width: 28, height: 28, objectFit: "contain" }} />
              <span style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--ark-text)", letterSpacing: "-0.02em" }}>{name}</span>
            </Link>
            <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 280, marginBottom: 20 }}>
              {c.desc}
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
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ark-text-muted)", marginBottom: 16 }}>{c.services}</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {c.serviceLinks.map((label, i) => (
                <Link key={SERVICE_HREFS[i]} href={SERVICE_HREFS[i]}
                  className="ark-nav-link" style={{ fontSize: 13.5, color: "var(--ark-text-muted)", textDecoration: "none" }}
                >{label}</Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--ark-text-muted)", marginBottom: 16 }}>{c.company}</div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {c.companyLinks.map((label, i) => (
                <Link key={COMPANY_HREFS[i]} href={COMPANY_HREFS[i]}
                  className="ark-nav-link" style={{ fontSize: 13.5, color: "var(--ark-text-muted)", textDecoration: "none" }}
                >{label}</Link>
              ))}
            </nav>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.1), transparent) 1", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 13, color: "var(--ark-text-muted)" }}>
            © {year} {name}. {c.rights}
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy" style={{ fontSize: 13, color: "var(--ark-text-muted)", textDecoration: "none" }}>{c.privacy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
