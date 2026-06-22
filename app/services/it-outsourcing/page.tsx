import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "IT Outsourcing — ARKANA",
  description:
    "Full IT outsourcing services for businesses in Uzbekistan. Dedicated L1–L3 support team, device management, vendor management, and IT strategy — all in one partnership.",
};

const included = [
  "L1, L2, and L3 helpdesk support",
  "Device setup, management, and procurement",
  "User account and access management",
  "Software licensing and procurement",
  "Vendor relationship management",
  "IT strategy and quarterly roadmap reviews",
  "On-site support when needed",
  "Escalation to senior engineers 24/7",
];

export default function ITOutsourcingPage() {
  return (
    <>
      <section className="pt-36 pb-24 bg-gradient-hero">
        <div className="max-w-[75rem] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-[12.5px] font-[600] text-[#8A8A9E] hover:text-[#3D3D4E] transition-colors mb-6"
            >
              ← All Services
            </Link>
            <span className="eyebrow mb-5">IT Outsourcing</span>
            <h1 className="text-[44px] sm:text-[56px] font-[800] leading-[1.07] tracking-[-0.02em] text-gradient-ink mt-4 mb-6">
              A complete IT team.
              <br />
              Without the hiring.
            </h1>
            <p className="text-[17px] text-[#3D3D4E] leading-[1.65] mb-8">
              Dedicated engineers who know your systems, your team, and your
              business goals. We do not just fix tickets — we own your IT
              outcomes end to end, under a named SLA.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] text-[14px] font-[700] text-white bg-gradient-brand shadow-accent hover:shadow-accent-hover hover:-translate-y-px transition-all duration-150"
            >
              Get a free assessment
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="bg-white border border-[#E0E4FF] rounded-[24px] p-8 shadow-card">
            <p className="text-[12px] font-[700] uppercase tracking-[0.07em] text-[#8A8A9E] mb-5">
              What is included
            </p>
            <ul className="flex flex-col gap-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={17}
                    className="text-[#00C2AA] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-[14px] text-[#3D3D4E]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="max-w-[75rem] mx-auto px-6">
          <h2 className="text-[32px] font-[800] text-gradient-ink mb-10">
            How IT outsourcing with ARKANA works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Dedicated assignment", body: "Engineers are assigned specifically to your account. They learn your environment, not just your tickets." },
              { step: "02", title: "Named ownership", body: "One technical lead is accountable for your IT. You always know who to call — and they know who you are." },
              { step: "03", title: "Visible performance", body: "Monthly reports, SLA data, and full ticket history through GOARKAN. No black box, ever." },
            ].map(({ step, title, body }) => (
              <div key={step} className="bg-[#FAFAFA] border border-[rgba(0,0,0,0.07)] rounded-[18px] p-7">
                <div className="text-[28px] font-[900] text-[#E0E4FF] mb-4">{step}</div>
                <h3 className="text-[16px] font-[700] text-[#0A0A0F] mb-3">{title}</h3>
                <p className="text-[14px] text-[#3D3D4E] leading-[1.65]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
