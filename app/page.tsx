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

export const metadata: Metadata = {
  title: "ARKANA — IT Outsourcing & Managed Services in Uzbekistan",
  description:
    "ARKANA is your external IT department. Dedicated team, modern processes, and full transparency through our GOARKAN platform. IT outsourcing and managed services for businesses in Uzbekistan.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ARKANA — IT Outsourcing & Managed Services",
    description:
      "Enterprise IT operations without the enterprise overhead. Dedicated team, transparent reporting, and your own named technical lead.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
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
