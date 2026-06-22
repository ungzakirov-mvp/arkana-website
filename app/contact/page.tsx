import type { Metadata } from "next";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Contact ARKANA — Start Your Free IT Assessment",
  description:
    "Get in touch with ARKANA to start your free IT assessment. No commitment, no pressure — just an honest conversation about your infrastructure.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-24">
        <ContactCTA />
      </div>
    </>
  );
}
