import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart } from "lucide-react";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "About ARKANA | IT Outsourcing Company, Tashkent",
  description:
    "ARKANA is a Tashkent-based IT outsourcing company. Named engineers, documented processes, and the GOARKAN platform — for businesses across Uzbekistan.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About ARKANA | IT Outsourcing Company, Tashkent, Uzbekistan",
    description:
      "ARKANA provides IT outsourcing to businesses in Uzbekistan. Named Technical Leads, defined service processes, and full operational transparency through GOARKAN.",
    url: "/about",
  },
};

const values = [
  {
    icon: Target,
    accent: "#2563FF",
    title: "Accountability",
    body: "Every client has a named technical lead who owns the relationship. When something goes wrong, you always know who is responsible — and they know your name.",
  },
  {
    icon: Eye,
    accent: "#00C2AA",
    title: "Transparency",
    body: "We built GOARKAN precisely because we believe clients should have complete visibility into their IT. No black boxes. No asking for updates.",
  },
  {
    icon: Heart,
    accent: "#7B5FFF",
    title: "Partnership",
    body: "We are not a vendor. We are an extension of your team — aligned to your business goals, not just your support tickets.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 bg-gradient-hero">
        <div className="max-w-[75rem] mx-auto px-6">
          <span className="eyebrow mb-6">About ARKANA</span>
          <h1
            className="text-[48px] sm:text-[60px] font-[800] leading-[1.07] tracking-[-0.02em] mt-4 mb-6"
            style={{ color: "#FFFFFF" }}
          >
            Your IT partner.
            <br />
            <span style={{ color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>
              Not your IT vendor.
            </span>
          </h1>
          <p className="text-[18px] leading-[1.65] max-w-[580px]" style={{ color: "rgba(255,255,255,0.55)" }}>
            ARKANA is an IT outsourcing and managed services company based in
            Tashkent, Uzbekistan. We work with businesses across the country to
            replace unreliable, reactive IT with structured, named partnerships.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-y" style={{ background: "#0A1021" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow mb-5">Our Story</span>
              <h2
                className="text-[34px] font-[800] mt-4 mb-6 leading-[1.15]"
                style={{ color: "#FFFFFF" }}
              >
                Built to fix what was broken about IT outsourcing.
              </h2>
              <div className="flex flex-col gap-4 text-[16px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.55)" }}>
                <p>
                  ARKANA was founded with a simple observation: most IT
                  outsourcing in Uzbekistan was either too cheap to be reliable,
                  or too expensive and impersonal to be useful for growing
                  businesses.
                </p>
                <p>
                  We built ARKANA to occupy the space in between — bringing
                  enterprise-grade processes and named team models to companies
                  that cannot justify a full internal IT department, but need
                  more than a break-fix vendor.
                </p>
                <p>
                  We also built GOARKAN — our own service management platform —
                  because we believed clients deserved real transparency into the
                  work being done on their behalf.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div
                className="rounded-[24px] p-8"
                style={{ background: "linear-gradient(135deg, #0D1535 0%, #0A1535 100%)", border: "1px solid rgba(37,99,255,0.20)" }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>
                  Our platform
                </p>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", marginBottom: 12 }}>
                  GOARKAN
                </h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.50)", lineHeight: 1.65, marginBottom: 20 }}>
                  We built our own service management platform so clients have
                  complete visibility into every ticket, asset, and action. Used
                  daily by our engineering team to deliver services.
                </p>
                <a
                  href="https://goarkan.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700, color: "#4A9EFF", textDecoration: "none" }}
                >
                  Visit GOARKAN →
                </a>
              </div>

              <div
                className="rounded-[20px] p-7"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.50)", lineHeight: 1.7, fontStyle: "italic" }}>
                  "We are not just another IT company. We are the IT department
                  your business deserves — but never had."
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 12, fontWeight: 600 }}>
                  — ARKANA Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-y" style={{ background: "#0F172A" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="max-w-[500px] mb-14">
            <span className="eyebrow mb-4">Our Values</span>
            <h2 className="text-[34px] font-[800] mt-4 mb-4 leading-[1.15]" style={{ color: "#FFFFFF" }}>
              What guides every decision we make.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, accent, title, body }) => (
              <div
                key={title}
                className="rounded-[20px] p-7"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-5"
                  style={{ background: `${accent}20`, border: `1px solid ${accent}30` }}
                >
                  <Icon size={20} style={{ color: accent }} />
                </div>
                <h3 className="text-[17px] font-[700] mb-3" style={{ color: "#FFFFFF" }}>
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

      {/* Team */}
      <section className="section-y" style={{ background: "#0A1021" }}>
        <div className="max-w-[75rem] mx-auto px-6">
          <div className="max-w-[500px] mb-12">
            <span className="eyebrow mb-4">Our Team</span>
            <h2 className="text-[34px] font-[800] mt-4 mb-4 leading-[1.15]" style={{ color: "#FFFFFF" }}>
              The people behind your IT.
            </h2>
            <p className="text-[16px] leading-[1.65]" style={{ color: "rgba(255,255,255,0.50)" }}>
              Our team of certified engineers, project managers, and technical
              leads delivers consistent, accountable IT services.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { name: "[Team Member]", role: "Founder & Technical Director", initials: "A", from: "#2563FF", to: "#7B5FFF" },
              { name: "[Team Member]", role: "Head of Operations", initials: "D", from: "#7B5FFF", to: "#9B35CC" },
              { name: "[Team Member]", role: "Lead Infrastructure Engineer", initials: "S", from: "#00C2AA", to: "#0099FF" },
            ].map(({ name, role, initials, from, to }) => (
              <div
                key={name + role}
                className="rounded-[18px] p-6"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-[20px] font-[900] text-white mb-4"
                  style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
                >
                  {initials}
                </div>
                <p className="text-[15px] font-[700]" style={{ color: "#FFFFFF" }}>
                  {name}
                </p>
                <p className="text-[13px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-16" style={{ background: "#0F172A", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-[75rem] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[20px] font-[800] mb-1" style={{ color: "#FFFFFF" }}>
              Want to work with us?
            </p>
            <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.45)" }}>
              We are always looking for exceptional engineers and IT professionals.
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
