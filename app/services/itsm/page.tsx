import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { itsmSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "IT Service Desk Uzbekistan | GOARKAN Platform | ARKANA",
  description:
    "IT service management through GOARKAN. Request tracking, asset inventory, performance reporting. IT Service Desk for businesses in Uzbekistan.",
  alternates: { canonical: "/services/itsm" },
  openGraph: {
    title: "IT Service Desk Uzbekistan | GOARKAN | ARKANA",
    description:
      "Every request tracked. Every asset recorded. Monthly performance reports from GOARKAN — ARKANA's proprietary service management platform for businesses in Uzbekistan.",
    url: "/services/itsm",
  },
};

const included = [
  "Request management — tracked from submission to resolution",
  "Asset inventory updated when hardware changes, not annually",
  "Knowledge base: network diagrams, configs, runbooks",
  "Monthly reports generated from GOARKAN operational data",
  "Quarterly review: scope, performance targets, cost forecast",
  "Incident priority classification with defined response targets",
  "Change management — documented before applied",
  "Client portal — visible request status at any time",
];

export default function ITSMPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itsmSchema) }}
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
            <span className="eyebrow mb-5">IT Service Management & GOARKAN</span>
            <h1
              className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
              style={{ color: "#FFFFFF" }}
            >
              The system
              <br />
              behind the service.
            </h1>
            <p className="text-[17px] leading-[1.65] mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              Every month, GOARKAN generates a performance report for your
              account — pulled from the system that logged every request, every
              asset change, every infrastructure alert, and every patch applied
              during that month. The report reflects what happened.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] text-[14px] font-[700] text-white bg-gradient-brand shadow-accent hover:shadow-accent-hover hover:-translate-y-px transition-all duration-150"
            >
              See how GOARKAN works
              <ArrowRight size={15} />
            </Link>
          </div>

          <div
            className="rounded-[24px] p-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <p className="text-[12px] font-[700] uppercase tracking-[0.07em] mb-5" style={{ color: "rgba(255,255,255,0.30)" }}>
              What GOARKAN covers
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
