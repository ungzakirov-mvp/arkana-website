import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "About ARKANA — IT Outsourcing & Managed Services",
  description:
    "ARKANA is a premium IT outsourcing and managed services company based in Tashkent, Uzbekistan. Learn about our team, our values, and the GOARKAN platform we built.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Target,
    iconBg: "bg-[#2B5BFF]/10",
    iconColor: "text-[#2B5BFF]",
    title: "Accountability",
    body: "Every client has a named technical lead who owns the relationship. When something goes wrong, you always know who is responsible — and they know your name.",
  },
  {
    icon: Eye,
    iconBg: "bg-[#00C2AA]/10",
    iconColor: "text-[#00C2AA]",
    title: "Transparency",
    body: "We built GOARKAN precisely because we believe clients should have complete visibility into their IT. No black boxes. No asking for updates.",
  },
  {
    icon: Heart,
    iconBg: "bg-[#6B35FF]/10",
    iconColor: "text-[#6B35FF]",
    title: "Partnership",
    body: "We are not a vendor. We are an extension of your team — aligned to your business goals, not just your support tickets.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 bg-gradient-hero">
        <div className="max-w-[75rem] mx-auto px-6 max-w-[720px]">
          <span className="eyebrow mb-6">About ARKANA</span>
          <h1 className="text-[48px] sm:text-[60px] font-[800] leading-[1.07] tracking-[-0.02em] text-gradient-ink mt-4 mb-6">
            Your IT partner.
            <br />
            Not your IT vendor.
          </h1>
          <p className="text-[18px] text-[#3D3D4E] leading-[1.65] max-w-[580px]">
            ARKANA is an IT outsourcing and managed services company based in
            Tashkent, Uzbekistan. We work with businesses across the country to
            replace unreliable, reactive IT with structured, dedicated
            partnerships.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-y bg-white">
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow mb-5">Our Story</span>
              <h2 className="text-[34px] font-[800] text-gradient-ink mt-4 mb-6 leading-[1.15]">
                Built to fix what was broken about IT outsourcing.
              </h2>
              <div className="flex flex-col gap-4 text-[16px] text-[#3D3D4E] leading-[1.7]">
                <p>
                  ARKANA was founded with a simple observation: most IT
                  outsourcing in Uzbekistan was either too cheap to be reliable,
                  or too expensive and impersonal to be useful for growing
                  businesses.
                </p>
                <p>
                  We built ARKANA to occupy the space in between — bringing
                  enterprise-grade processes and dedicated team models to
                  companies that cannot justify a full internal IT department,
                  but need more than a break-fix vendor.
                </p>
                <p>
                  We also built GOARKAN — our own service management platform —
                  because we believed clients deserved real transparency into the
                  work being done on their behalf. Not just monthly invoices and
                  the occasional call.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="bg-gradient-dark rounded-[24px] p-8">
                <p className="text-[13px] font-[700] uppercase tracking-[0.07em] text-white/40 mb-3">
                  Our platform
                </p>
                <h3 className="text-[22px] font-[800] text-white mb-3">
                  GOARKAN
                </h3>
                <p className="text-[14px] text-white/60 leading-[1.65] mb-5">
                  We built our own service management platform so clients have
                  complete visibility into every ticket, asset, and action. Used
                  daily by our engineering team to deliver services.
                </p>
                <a
                  href="https://goarkan.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-[700] text-[#00C2AA] hover:gap-3 transition-all duration-150"
                >
                  Visit GOARKAN →
                </a>
              </div>

              <div className="bg-[#FAFAFA] border border-[#E0E4FF] rounded-[20px] p-7">
                <p className="text-[14px] text-[#3D3D4E] leading-[1.7] italic">
                  "We are not just another IT company. We are the IT department
                  your business deserves — but never had."
                </p>
                <p className="text-[12px] text-[#8A8A9E] mt-3 font-[600]">
                  — ARKANA Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y bg-gradient-section">
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="max-w-[500px] mb-14">
            <span className="eyebrow mb-4">Our Values</span>
            <h2 className="text-[34px] font-[800] text-gradient-ink mt-4 mb-4 leading-[1.15]">
              What guides every decision we make.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, iconBg, iconColor, title, body }) => (
              <div
                key={title}
                className="bg-white border border-[rgba(0,0,0,0.07)] rounded-[20px] p-7"
              >
                <div className={`w-11 h-11 ${iconBg} rounded-[12px] flex items-center justify-center mb-5`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <h3 className="text-[17px] font-[700] text-[#0A0A0F] mb-3">{title}</h3>
                <p className="text-[14px] text-[#3D3D4E] leading-[1.65]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="section-y bg-white">
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="max-w-[500px] mb-12">
            <span className="eyebrow mb-4">Our Team</span>
            <h2 className="text-[34px] font-[800] text-gradient-ink mt-4 mb-4 leading-[1.15]">
              The people behind your IT.
            </h2>
            <p className="text-[16px] text-[#3D3D4E] leading-[1.65]">
              Our team of certified engineers, project managers, and technical
              leads is dedicated to delivering consistent, accountable IT
              services.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "[Team Member]", role: "Founder & Technical Director", initials: "A", from: "#2B5BFF", to: "#6B35FF" },
              { name: "[Team Member]", role: "Head of Operations", initials: "D", from: "#6B35FF", to: "#9B35CC" },
              { name: "[Team Member]", role: "Lead Infrastructure Engineer", initials: "S", from: "#00C2AA", to: "#0099FF" },
            ].map(({ name, role, initials, from, to }) => (
              <div
                key={name + role}
                className="bg-[#FAFAFA] border border-[#E0E4FF] rounded-[18px] p-6"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-[20px] font-[900] text-white mb-4"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                >
                  {initials}
                </div>
                <p className="text-[15px] font-[700] text-[#0A0A0F]">{name}</p>
                <p className="text-[13px] text-[#8A8A9E] mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-[#F0F4FF]">
        <div className="max-w-[75rem] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[20px] font-[800] text-[#0A0A0F] mb-1">
              Want to work with us?
            </p>
            <p className="text-[14px] text-[#3D3D4E]">
              We are always looking for exceptional engineers and IT
              professionals.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] text-[13.5px] font-[700] text-white bg-gradient-brand shadow-accent hover:-translate-y-px transition-all duration-150 flex-shrink-0"
          >
            Get in touch
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
