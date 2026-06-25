import type { Metadata } from "next";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Free IT Assessment Tashkent | Contact ARKANA",
  description:
    "Book a free 45-minute IT assessment with ARKANA's Technical Lead in Tashkent. Written summary of your IT environment delivered within five business days.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Free IT Assessment — Contact ARKANA",
    description:
      "45-minute session. Written summary within five business days. No obligation. Start with a free IT assessment in Tashkent.",
    url: "/contact",
  },
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
