"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/components/providers/ThemeLanguageProvider";
import { Menu, X, ChevronDown } from "lucide-react";

const SERVICE_LINKS: Record<string, { label: string; href: string }[]> = {
  ru: [
    { label: "IT-аутсорсинг",        href: "/services/it-outsourcing" },
    { label: "IT Service Management", href: "/services/itsm" },
    { label: "Инфраструктура",        href: "/services/infrastructure" },
    { label: "Кибербезопасность",     href: "/services/managed-it" },
    { label: "Все услуги",            href: "/services" },
  ],
  en: [
    { label: "IT Outsourcing",        href: "/services/it-outsourcing" },
    { label: "IT Service Management", href: "/services/itsm" },
    { label: "Infrastructure",        href: "/services/infrastructure" },
    { label: "Cybersecurity",         href: "/services/managed-it" },
    { label: "All Services",          href: "/services" },
  ],
  uz: [
    { label: "IT-autsorsing",         href: "/services/it-outsourcing" },
    { label: "IT Xizmat Boshqaruvi",  href: "/services/itsm" },
    { label: "Infratuzilma",          href: "/services/infrastructure" },
    { label: "Kiberxavfsizlik",       href: "/services/managed-it" },
    { label: "Barcha xizmatlar",      href: "/services" },
  ],
  zh: [
    { label: "IT外包",                href: "/services/it-outsourcing" },
    { label: "IT服务管理",            href: "/services/itsm" },
    { label: "基础设施",              href: "/services/infrastructure" },
    { label: "网络安全",              href: "/services/managed-it" },
    { label: "全部服务",              href: "/services" },
  ],
};

const NAV_LABELS: Record<string, Record<string, string>> = {
  ru: { services: "Услуги", pricing: "Тарифы", goarkan: "GoARKAN", cases: "Кейсы", blog: "Блог", contact: "Контакты", cta: "Получить предложение", audit: "Получить предложение" },
  en: { services: "Services", pricing: "Pricing", goarkan: "GoARKAN", cases: "Cases", blog: "Blog", contact: "Contact", cta: "Get a Proposal", audit: "Get a Proposal" },
  uz: { services: "Xizmatlar", pricing: "Tariflar", goarkan: "GoARKAN", cases: "Loyihalar", blog: "Blog", contact: "Aloqa", cta: "Taklif so'rash", audit: "Taklif so'rash" },
  zh: { services: "服务", pricing: "定价", goarkan: "GoARKAN", cases: "案例", blog: "博客", contact: "联系我们", cta: "获取方案", audit: "获取方案" },
};

export function Navigation() {
  const { lang, setLang } = useApp();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const labels       = NAV_LABELS[lang]    ?? NAV_LABELS.ru;
  const serviceLinks = SERVICE_LINKS[lang] ?? SERVICE_LINKS.ru;

  return (
    <header className="relative z-30 mt-4 w-full px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* ── Pill nav ─────────────────────────────────────── */}
        <div
          className="relative flex h-14 items-center justify-between gap-3 rounded-2xl px-4 transition-all duration-300"
          style={{
            background:       scrolled ? "rgba(3,7,18,0.94)" : "rgba(3,7,18,0.65)",
            backdropFilter:   "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border:           "1px solid rgba(255,255,255,0.08)",
            boxShadow:        scrolled ? "0 8px 40px rgba(0,0,0,0.5)" : "none",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.375rem", flex: 1 }}>
            <Image
              src="/logo-3d.png"
              alt="ARKANA"
              width={32}
              height={32}
              style={{ width: 32, height: 32, objectFit: "contain", display: "block" }}
              priority
            />
            <span style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: 15, color: "var(--ark-text)", letterSpacing: "-0.02em" }}>
              ARKANA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {/* Services dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                onBlur={() => setTimeout(() => setServicesOpen(false), 150)}
                className="ark-nav-link"
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "6px 12px", borderRadius: 8, fontSize: 14,
                  color: "var(--ark-text-muted)", background: "transparent",
                  border: "none",
                }}
              >
                {labels.services}
                <ChevronDown size={12} style={{
                  transition: "transform 220ms cubic-bezier(0.4,0,0.2,1)",
                  transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                }} />
              </button>
              {servicesOpen && (
                <div style={{
                  position: "absolute", left: 0, top: "calc(100% + 6px)",
                  minWidth: 220, borderRadius: 12, padding: "6px",
                  background: "#0d1117",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
                  zIndex: 100,
                  animation: "dropdownIn 160ms cubic-bezier(0.4,0,0.2,1)",
                }}>
                  {serviceLinks.map((s) => (
                    <Link key={s.href} href={s.href} className="ark-nav-link" style={{
                      display: "block", padding: "8px 12px", borderRadius: 8, fontSize: 13.5,
                      color: "var(--ark-text-muted)", textDecoration: "none",
                    }}>
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {(["pricing", "goarkan", "cases", "blog", "contact"] as const).map((key) => (
              <Link key={key} href={`/${key}`} className="ark-nav-link" style={{
                padding: "6px 12px", borderRadius: 8, fontSize: 14,
                color: "var(--ark-text-muted)", textDecoration: "none",
              }}>
                {labels[key]}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, justifyContent: "flex-end" }}>
            {/* Lang switcher — desktop */}
            <div className="hidden md:flex" style={{ gap: "2px", marginRight: 4 }}>
              {(["ru", "uz", "en", "zh"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} style={{
                  padding: "4px 9px", borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                  color: lang === l ? "#fff" : "var(--ark-text-muted)",
                  background: lang === l ? "var(--ark-accent)" : "transparent",
                  border: "none",
                  transition: "background-color 150ms cubic-bezier(0.4,0,0.2,1), color 150ms cubic-bezier(0.4,0,0.2,1)",
                }}>
                  {l}
                </button>
              ))}
            </div>

            {/* CTA */}
            <Link href="/contact" className="hidden md:inline-flex btn-sm" style={{
              background: "#4fd18a",
              color: "#05080a",
              borderRadius: 100,
              fontWeight: 700,
              minWidth: 164,
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#7ee3ac"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(79,209,138,0.3)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#4fd18a"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
            >
              {labels.cta}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--ark-text-muted)", background: "var(--ark-surface)",
                border: "1px solid rgba(255,255,255,0.08)",
                cursor: "pointer",
              }}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ───────────────────────────────────── */}
        {mobileOpen && (
          <div style={{
            marginTop: 8, borderRadius: 16, padding: 16,
            background: "rgba(3,7,18,0.97)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
          }}>
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {([
                ["services", "/services"],
                ["pricing",  "/pricing"],
                ["goarkan",  "/goarkan"],
                ["cases",    "/cases"],
                ["blog",     "/blog"],
                ["contact",  "/contact"],
              ] as const).map(([key, href]) => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{
                  padding: "12px 14px", borderRadius: 10, fontSize: 15, fontWeight: 500,
                  color: "var(--ark-text)", textDecoration: "none",
                }}>
                  {labels[key]}
                </Link>
              ))}
            </nav>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 4 }}>
                {(["ru", "uz", "en", "zh"] as const).map((l) => (
                  <button key={l} onClick={() => setLang(l)} style={{
                    padding: "6px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, textTransform: "uppercase",
                    color: lang === l ? "#fff" : "var(--ark-text-muted)",
                    background: lang === l ? "var(--ark-accent)" : "var(--ark-surface)",
                    border: "none", cursor: "pointer",
                  }}>
                    {l}
                  </button>
                ))}
              </div>
              <Link href="/contact" onClick={() => setMobileOpen(false)} style={{
                padding: "8px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                background: "var(--ark-accent)", color: "white", textDecoration: "none",
              }}>
                {labels.audit}
              </Link>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
