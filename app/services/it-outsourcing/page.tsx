import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { itOutsourcingSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "IT Outsourcing Uzbekistan — Full IT Department | ARKANA",
  description:
    "Outsource your entire IT function to ARKANA. One named Technical Lead, defined response targets, and monthly reporting. Serving businesses across Uzbekistan.",
  alternates: { canonical: "/services/it-outsourcing" },
  openGraph: {
    title: "Full IT Outsourcing Uzbekistan | ARKANA",
    description:
      "One named Technical Lead. Defined response targets. Monthly reporting. ARKANA takes your entire IT function off your plate.",
    url: "/services/it-outsourcing",
  },
};

const included = [
  "Named Technical Lead assigned to your account",
  "Support engineers who know your environment",
  "Infrastructure monitoring with defined alert thresholds",
  "User support tracked through GOARKAN",
  "Access management and endpoint protection",
  "Vendor relationship management",
  "Monthly performance reports from GOARKAN",
  "Quarterly business review with your Technical Lead",
];

export default function ITOutsourcingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itOutsourcingSchema) }}
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
            <span className="eyebrow mb-5">IT Outsourcing</span>
            <h1
              className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
              style={{ color: "#FFFFFF" }}
            >
              Your entire IT function.
              <br />
              One team. One engagement.
            </h1>
            <p className="text-[17px] leading-[1.65] mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
              A named Technical Lead and support engineers assigned to your
              account — covering infrastructure, user support, security, and
              vendor management. One monthly cost. One person responsible for
              all of it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] text-[14px] font-[700] text-white bg-gradient-brand shadow-accent hover:shadow-accent-hover hover:-translate-y-px transition-all duration-150"
            >
              Get a free assessment
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

      <section className="section-y" style={{ background: "#0F172A" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <h2 className="text-[32px] font-[800] mb-10" style={{ color: "#FFFFFF" }}>
            How IT outsourcing with ARKANA works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Named assignment",
                body: "A Technical Lead and support engineers are assigned to your account. They learn your environment — not just your tickets.",
              },
              {
                step: "02",
                title: "Named ownership",
                body: "One Technical Lead is responsible for your IT. You know who to call. They know your environment, your team, and your priorities.",
              },
              {
                step: "03",
                title: "Reported performance",
                body: "Monthly reports from GOARKAN: requests resolved, response times by category, infrastructure changes, open items. Numbers from the system.",
              },
            ].map(({ step, title, body }) => (
              <div
                key={step}
                className="rounded-[18px] p-7"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-[28px] font-[900] mb-4" style={{ color: "rgba(37,99,255,0.30)" }}>
                  {step}
                </div>
                <h3 className="text-[16px] font-[700] mb-3" style={{ color: "#FFFFFF" }}>
                  {title}
                </h3>
                <p className="text-[14px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.50)" }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
