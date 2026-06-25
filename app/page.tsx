import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { WhyArkana } from "@/components/sections/WhyArkana";
import { Services } from "@/components/sections/Services";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Platform } from "@/components/sections/Platform";
import { Showcase } from "@/components/sections/Showcase";
import { Process } from "@/components/sections/Process";
import { Trust } from "@/components/sections/Trust";
import { ContactCTA } from "@/components/sections/ContactCTA";
import {
  itOutsourcingSchema,
  infrastructureSchema,
  cybersecuritySchema,
  itsmSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "IT Outsourcing Tashkent | ARKANA — Managed IT Services",
  description:
    "ARKANA provides managed IT outsourcing for businesses in Tashkent, Uzbekistan. Named engineers, defined processes, monthly reporting. Book a free IT assessment.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ARKANA — IT Outsourcing for Businesses in Tashkent",
    description:
      "Named engineers. Defined processes. Monthly reporting. ARKANA manages your entire IT function — infrastructure, support, security, and vendor management.",
    url: "/",
  },
};

// Homepage lists all four services so it carries all four Service schemas.
const servicesSchema = [
  itOutsourcingSchema,
  infrastructureSchema,
  cybersecuritySchema,
  itsmSchema,
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <Hero />
      <WhyArkana />
      <Services />
      <WhyChoose />
      <Platform />
      <Showcase />
      <Process />
      <Trust />
      <ContactCTA />
    </>
  );
}
