import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Infrastructure Support — ARKANA",
  description:
    "Server management, network architecture, cloud migration, and disaster recovery for businesses in Uzbekistan. ARKANA designs, builds, and maintains your IT infrastructure.",
};

const included = [
  "Physical and virtual server management",
  "Network design, setup, and maintenance",
  "Cloud infrastructure setup and migration",
  "Firewall configuration and security hardening",
  "Backup and disaster recovery systems",
  "Capacity planning and hardware lifecycle",
  "VPN and remote access infrastructure",
  "Data center and server room support",
];

export default function InfrastructurePage() {
  return (
    <>
      <section className="pt-36 pb-24 bg-gradient-hero">
        <div className="max-w-[75rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-[12.5px] font-[600] text-[#8A8A9E] hover:text-[#3D3D4E] transition-colors mb-6">
              ← All Services
            </Link>
            <span className="eyebrow mb-5">Infrastructure Support</span>
            <h1 className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] text-gradient-ink mt-4 mb-6">
              Infrastructure that runs
              <br />
              when you need it.
            </h1>
            <p className="text-[17px] text-[#3D3D4E] leading-[1.65] mb-8">
              We design, build, and maintain the technical foundation your
              business depends on — from servers and networks to cloud
              environments and disaster recovery systems.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] text-[14px] font-[700] text-white bg-gradient-brand shadow-accent hover:shadow-accent-hover hover:-translate-y-px transition-all duration-150">
              Get a free assessment <ArrowRight size={15} />
            </Link>
          </div>
          <div className="bg-white border border-[#E0E4FF] rounded-[24px] p-8 shadow-card">
            <p className="text-[12px] font-[700] uppercase tracking-[0.07em] text-[#8A8A9E] mb-5">What is included</p>
            <ul className="flex flex-col gap-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="text-[#00C2AA] flex-shrink-0 mt-0.5" />
                  <span className="text-[14px] text-[#3D3D4E]">{item}</span>
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
