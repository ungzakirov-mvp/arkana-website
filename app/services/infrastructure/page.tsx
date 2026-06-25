import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { infrastructureSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "IT Infrastructure Management Tashkent | ARKANA",
  description:
    "ARKANA monitors and manages servers, networks, cloud environments, and backups for businesses in Uzbekistan. Monthly patch schedule, quarterly recovery testing.",
  alternates: { canonical: "/services/infrastructure" },
  openGraph: {
    title: "IT Infrastructure Management | ARKANA",
    description:
      "Defined alert thresholds. Monthly patch schedule. Quarterly recovery testing. ARKANA engineers monitor your environment and investigate before your team notices a problem.",
    url: "/services/infrastructure",
  },
};

const included = [
  "Server health monitoring with defined alert thresholds",
  "Monthly patch schedule across all managed systems",
  "Network equipment monitoring and configuration management",
  "Cloud environment management and cost reporting",
  "Backup jobs monitored daily, recovery tested quarterly",
  "Hardware lifecycle tracking and replacement planning",
  "Change management — every change documented before applied",
  "Monthly infrastructure report from GOARKAN",
];

export default function InfrastructurePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(infrastructureSchema) }}
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
            <span className="eyebrow mb-5">Infrastructure Management</span>
            <h1
              className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
              style={{ color: "#FFFFFF" }}
            >
              Your servers, networks,
              <br />
              and systems. Engineers
              <br />
              who know your environment.
            </h1>
            <p className="text-[17px] leading-[1.65] mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Infrastructure failures are rarely sudden surprises. They are
              usually preceded by signals that go unnoticed because nobody is
              watching. ARKANA assigns engineers to monitor your environment
              with defined alert thresholds — and investigates before your team
              notices a problem.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] text-[14px] font-[700] text-white bg-gradient-brand shadow-accent hover:shadow-accent-hover hover:-translate-y-px transition-all duration-150"
            >
              Get a free infrastructure audit
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
