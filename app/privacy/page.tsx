import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ARKANA",
  description: "ARKANA privacy policy and data handling practices.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 max-w-[75rem] mx-auto px-6">
      <div className="max-w-[680px]">
        <span className="eyebrow mb-6">Legal</span>
        <h1 className="text-[40px] font-[800] text-gradient-ink mt-4 mb-10">
          Privacy Policy
        </h1>
        <div className="prose prose-neutral max-w-none text-[#3D3D4E] text-[15px] leading-[1.75]">
          <p className="text-[#8A8A9E] text-[13px] mb-8">
            Last updated: January 2026
          </p>
          <p>
            ARKANA ("we", "our", or "us") is committed to protecting your
            privacy. This policy explains how we collect, use, and protect
            information you provide when using arkana.uz.
          </p>
          <h2 className="text-[20px] font-[700] text-[#0A0A0F] mt-10 mb-4">
            Information we collect
          </h2>
          <p>
            We collect information you voluntarily provide through our contact
            form: name, company name, email address, and phone number. We do not
            collect data automatically beyond standard server logs.
          </p>
          <h2 className="text-[20px] font-[700] text-[#0A0A0F] mt-10 mb-4">
            How we use it
          </h2>
          <p>
            Information is used solely to respond to your inquiry and to
            schedule a free IT assessment if requested. We do not sell, share,
            or distribute your personal information to third parties.
          </p>
          <h2 className="text-[20px] font-[700] text-[#0A0A0F] mt-10 mb-4">
            Contact
          </h2>
          <p>
            For privacy questions, contact us at{" "}
            <a href="mailto:info@arkana.uz" className="text-[#2B5BFF]">
              info@arkana.uz
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
