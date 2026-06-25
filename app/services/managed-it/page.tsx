import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { cybersecuritySchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cybersecurity & Managed IT Services Uzbekistan | ARKANA",
  description:
    "ARKANA builds and maintains a security baseline for businesses in Uzbekistan — endpoint protection, access management, tested backups, and incident response.",
  alternates: { canonical: "/services/managed-it" },
  openGraph: {
    title: "Cybersecurity & Managed IT Services | ARKANA",
    description:
      "Endpoint protection, access management, quarterly backup testing, employee security awareness, patch management, and incident response — for businesses in Uzbekistan.",
    url: "/services/managed-it",
  },
};

const included = [
  "Endpoint protection configured and monitored centrally",
  "Multi-factor authentication and access management",
  "Backup jobs monitored daily, recovery tested quarterly",
  "Employee security awareness — quarterly sessions",
  "Patch schedule: monthly routine, 48-hour critical",
  "Incident response procedure documented and reviewed annually",
  "Access audit when staff join, change roles, or leave",
  "Security status reported monthly through GOARKAN",
];

export default function ManagedITPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cybersecuritySchema) }}
      />

      <section className="pt-36 pb-24 bg-gradient-hero">
        <div className="max-w-[75rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-[600] transition-colors mb-6"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              ← All Services
            </Link>
            <span className="eyebrow mb-5">Cybersecurity</span>
            <h1
              className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
              style={{ color: "#FFFFFF" }}
            >
              Security controls your
              <br />
              business can actually
              <br />
              maintain.
            </h1>
            <p className="text-[17px] leading-[1.65] mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Most businesses are affected by the same failures: one compromised
              account, one unpatched system, one backup that was never tested.
              ARKANA builds the controls that prevent those failures — and
              maintains them on a defined schedule.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] text-[14px] font-[700] text-white bg-gradient-brand shadow-accent hover:shadow-accent-hover hover:-translate-y-px transition-all duration-150"
            >
              Find out where your security gaps are
              <ArrowRight size={15} />
            </Link>
          </div>

          <div
            className="rounded-[24px] p-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <p className="text-[12px] font-[700] uppercase tracking-[0.07em] mb-5" style={{ color: "rgba(255,255,255,0.30)" }}>
              What is included
            </p>
            <ul className="flex flex-col gap-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="flex-shrink-0 mt-0.5" style={{ color: "#00C2AA" }} />
                  <span className="text-[14px]" style={{ color: "rgba(255,255,255,0.70)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
