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
    body: "Dedicated engineers assigned to your account. L1–L3 helpdesk, device management, procurement, vendor management, and strategic IT planning — all under one roof.",
    highlights: ["Dedicated support team", "L1/L2/L3 coverage", "Vendor management", "IT strategy"],
  },
  {
    href: "/services/managed-it",
    icon: BarChart3,
    title: "Managed IT Services",
    tagline: "Proactive care for your entire environment.",
    body: "24/7 monitoring, patch management, security updates, and regular business reviews. We catch problems before your users notice — and report everything we do.",
    highlights: ["24/7 monitoring", "Patch management", "Security baseline", "Monthly reports"],
  },
  {
    href: "/services/infrastructure",
    icon: Server,
    title: "Infrastructure Support",
    tagline: "Infrastructure that runs when you need it.",
    body: "Server and network management, cloud migration, firewall configuration, and disaster recovery design. We build and maintain the technical foundation your business depends on.",
    highlights: ["Server management", "Cloud migration", "Network security", "Disaster recovery"],
  },
  {
    href: "/services/itsm",
    icon: Cog,
    title: "IT Service Management",
    tagline: "Process-driven IT operations that scale.",
    body: "ITIL-aligned processes, incident and change management, SLA definition, and structured service delivery — IT that is accountable and transparent.",
    highlights: ["ITIL processes", "Incident management", "SLA reporting", "Change control"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-hero">
        <div className="max-w-[75rem] mx-auto px-6">
          <span className="eyebrow mb-6">Our Services</span>
          <h1 className="text-[48px] sm:text-[60px] font-[800] leading-[1.07] tracking-[-0.02em] text-gradient-ink mt-4 mb-6 max-w-[640px]">
            Everything IT.
            <br />
            One trusted partner.
          </h1>
          <p className="text-[18px] text-[#3D3D4E] leading-[1.65] max-w-[540px] mb-10">
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
      <section className="section-y bg-white">
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map(({ href, icon: Icon, title, tagline, body, highlights }) => (
              <div
                key={href}
                className="group bg-[#FAFAFA] border border-[rgba(0,0,0,0.07)] rounded-[22px] p-8 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200"
              >
                <div className="w-12 h-12 bg-[#2B5BFF]/[0.08] rounded-[14px] flex items-center justify-center mb-6">
                  <Icon size={22} className="text-[#2B5BFF]" />
                </div>
                <h2 className="text-[22px] font-[800] text-[#0A0A0F] mb-2">{title}</h2>
                <p className="text-[14px] font-[600] text-[#2B5BFF] mb-4">{tagline}</p>
                <p className="text-[14.5px] text-[#3D3D4E] leading-[1.65] mb-6">{body}</p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {highlights.map((h) => (
                    <span
                      key={h}
                      className="px-3 py-1 bg-[#F0F4FF] border border-[#E0E4FF] rounded-full text-[12px] font-[600] text-[#3D3D4E]"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <Link
                  href={href}
                  className="inline-flex items-center gap-2 text-[13.5px] font-[700] text-[#2B5BFF] group-hover:gap-3 transition-all duration-150"
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
