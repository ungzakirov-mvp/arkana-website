import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Headset, BarChart3, Server, Cog } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "IT Services — ARKANA",
  description:
    "Explore ARKANA's full range of IT services: IT outsourcing, managed IT, infrastructure support, and IT service management for businesses in Uzbekistan.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    href: "/services/it-outsourcing",
    icon: Headset,
    title: "IT Outsourcing",
    tagline: "A complete IT team, without the hiring.",
    body: "Named engineers assigned to your account. L1–L3 helpdesk, device management, procurement, vendor management, and strategic IT planning — all under one roof.",
    highlights: ["Named support team", "L1/L2/L3 coverage", "Vendor management", "IT strategy"],
  },
  {
    href: "/services/managed-it",
    icon: BarChart3,
    title: "Managed IT Services",
    tagline: "Defined processes for your entire environment.",
    body: "Monitoring with alert thresholds, monthly patch schedule, quarterly recovery testing, and regular business reviews. Every action reported through GOARKAN.",
    highlights: ["Defined monitoring", "Patch schedule", "Security baseline", "Monthly reports"],
  },
  {
    href: "/services/infrastructure",
    icon: Server,
    title: "Infrastructure Support",
    tagline: "Infrastructure that runs when you need it.",
    body: "Server and network management, cloud environment management, firewall configuration, and quarterly recovery testing. The technical foundation documented and maintained.",
    highlights: ["Server management", "Cloud management", "Network security", "Recovery testing"],
  },
  {
    href: "/services/itsm",
    icon: Cog,
    title: "IT Service Management",
    tagline: "Process-driven IT operations that scale.",
    body: "Request tracking, asset inventory, incident management, and change management — all through GOARKAN. Monthly performance reports from the system that logs everything.",
    highlights: ["GOARKAN platform", "Incident management", "Monthly reporting", "Change control"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-hero">
        <div className="max-w-[75rem] mx-auto px-6">
          <span className="eyebrow mb-6">Our Services</span>
          <h1
            className="text-[48px] sm:text-[60px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6 max-w-[640px]"
            style={{ color: "#FFFFFF" }}
          >
            Everything IT.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #2563FF 0%, #7B5FFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              One engagement.
            </span>
          </h1>
          <p className="text-[18px] leading-[1.65] max-w-[540px] mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
            From your first helpdesk ticket to enterprise infrastructure
            strategy — ARKANA handles it all under one roof, one contract, one
            relationship.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] text-[14px] font-[700] text-white bg-gradient-brand shadow-accent hover:shadow-accent-hover hover:-translate-y-px transition-all duration-150"
          >
            Start with a free assessment
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Service cards */}
      <section className="section-y" style={{ background: "#0A1021" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map(({ href, icon: Icon, title, tagline, body, highlights }) => (
              <div
                key={href}
                className="group rounded-[22px] p-8 hover:-translate-y-1 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-6"
                  style={{ background: "rgba(37,99,255,0.15)", border: "1px solid rgba(37,99,255,0.20)" }}
                >
                  <Icon size={22} style={{ color: "#4A9EFF" }} />
                </div>
                <h2 className="text-[22px] font-[800] mb-2" style={{ color: "#FFFFFF" }}>
                  {title}
                </h2>
                <p className="text-[14px] font-[600] mb-4" style={{ color: "#4A9EFF" }}>
                  {tagline}
                </p>
                <p className="text-[14.5px] leading-[1.65] mb-6" style={{ color: "rgba(255,255,255,0.50)" }}>
                  {body}
                </p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1 rounded-full text-[12px] font-[600]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <Link
                  href={href}
                  className="inline-flex items-center gap-2 text-[13.5px] font-[700] group-hover:gap-3 transition-all duration-150"
                  style={{ color: "#4A9EFF" }}
                >
                  Learn more
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
