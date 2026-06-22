import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "IT Service Management — ARKANA",
  description:
    "ITIL-aligned IT service management for businesses in Uzbekistan. Structured incident handling, change management, SLA reporting, and continuous improvement.",
};

const included = [
  "ITIL-aligned service process design",
  "Incident and problem management",
  "Change and release management",
  "Service catalog definition",
  "SLA design and performance reporting",
  "GOARKAN ITSM platform configuration",
  "Knowledge base creation and maintenance",
  "Quarterly continuous improvement reviews",
];

export default function ITSMPage() {
  return (
    <>
      <section className="pt-36 pb-24 bg-gradient-hero">
        <div className="max-w-[75rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-[12.5px] font-[600] text-[#8A8A9E] hover:text-[#3D3D4E] transition-colors mb-6">
              ← All Services
            </Link>
            <span className="eyebrow mb-5">IT Service Management</span>
            <h1 className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] text-gradient-ink mt-4 mb-6">
              Process-driven IT
              <br />
              operations that scale.
            </h1>
            <p className="text-[17px] text-[#3D3D4E] leading-[1.65] mb-8">
              ITIL-aligned workflows, incident management, change control, and
              SLA reporting — structured IT operations that are accountable to
              your business, not improvised on the fly.
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
