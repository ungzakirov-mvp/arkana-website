"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

export interface ServicePageCopy {
  eyebrow: { ru: string; uz: string; en: string };
  h1: { ru: string; uz: string; en: string };
  desc: { ru: string; uz: string; en: string };
  ctaLabel: { ru: string; uz: string; en: string };
  ctaHref: string;
  includedLabel: { ru: string; uz: string; en: string };
  included: { ru: string; uz: string; en: string }[];
  steps?: { step: string; title: { ru: string; uz: string; en: string }; body: { ru: string; uz: string; en: string } }[];
  stepsHeading?: { ru: string; uz: string; en: string };
  backLabel: { ru: string; uz: string; en: string };
}

export function ServicePageLayout({ copy, schemas }: { copy: ServicePageCopy; schemas?: React.ReactNode }) {
  const { lang } = useApp();
  const t = <T extends { ru: string; uz: string; en: string }>(obj: T) => obj[lang as keyof T] ?? obj.ru;

  return (
    <>
      {schemas}

      <section className="pt-36 pb-24" style={{ background: "var(--ark-bg)" }}>
        <div className="max-w-[75rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-[600] transition-colors mb-6"
              style={{ color: "var(--ark-text-hint)" }}
            >
              ← {t(copy.backLabel)}
            </Link>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 20 }}>
              {t(copy.eyebrow)}
            </div>
            <h1
              className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
              style={{ color: "var(--ark-text-heading)" }}
              dangerouslySetInnerHTML={{ __html: t(copy.h1) }}
            />
            <p className="text-[17px] leading-[1.65] mb-8" style={{ color: "var(--ark-text-sub)" }}>
              {t(copy.desc)}
            </p>
            <Link
              href={copy.ctaHref}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "12px 28px", borderRadius: 12,
                background: "var(--ark-accent)", color: "#ffffff",
                fontSize: 14, fontWeight: 700, textDecoration: "none",
              }}
            >
              {t(copy.ctaLabel)}
              <ArrowRight size={15} />
            </Link>
          </div>

          <div
            className="rounded-[24px] p-8"
            style={{ background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}
          >
            <p className="text-[12px] font-[700] uppercase tracking-[0.07em] mb-5" style={{ color: "var(--ark-text-hint)" }}>
              {t(copy.includedLabel)}
            </p>
            <ul className="flex flex-col gap-3">
              {copy.included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="flex-shrink-0 mt-0.5" style={{ color: "#22c55e" }} />
                  <span className="text-[14px]" style={{ color: "var(--ark-text)" }}>{t(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {copy.steps && copy.stepsHeading && (
        <section className="py-20 lg:py-28" style={{ background: "var(--ark-bg-2)", borderTop: "1px solid var(--ark-divider)" }}>
          <div className="max-w-[75rem] mx-auto px-6">
            <h2 className="text-[32px] font-[800] mb-10" style={{ color: "var(--ark-text-heading)" }}>
              {t(copy.stepsHeading)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copy.steps.map(({ step, title, body }) => (
                <div
                  key={step}
                  className="rounded-[18px] p-7"
                  style={{ background: "var(--ark-card)", border: "1px solid var(--ark-card-border)" }}
                >
                  <div className="text-[28px] font-[900] mb-4" style={{ color: "var(--ark-accent-glow)" }}>
                    {step}
                  </div>
                  <h3 className="text-[16px] font-[700] mb-3" style={{ color: "var(--ark-text-heading)" }}>
                    {t(title)}
                  </h3>
                  <p className="text-[14px] leading-[1.65]" style={{ color: "var(--ark-text-sub)" }}>
                    {t(body)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTA />
    </>
  );
}
