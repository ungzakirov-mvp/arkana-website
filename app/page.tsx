import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeTrust } from "@/components/home/HomeTrust";
import { HomeComparison } from "@/components/home/HomeComparison";
import { HomePlatform } from "@/components/home/HomePlatform";
import { HomeJourney } from "@/components/home/HomeJourney";
import { HomeCases } from "@/components/home/HomeCases";
import { HomeContact } from "@/components/home/HomeContact";
import { HomeCTA } from "@/components/home/HomeCTA";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";
import { getSettings } from "@/lib/cms-api";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

export const metadata: Metadata = {
  title: "ARKANA — Технологический партнёр для вашего бизнеса в Ташкенте",
  description:
    "ARKANA — технологический партнёр для бизнеса в Ташкенте. Один договор, фиксированная стоимость, SLA в договоре, полная прозрачность через GoARKAN.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ARKANA — Технологический партнёр для вашего бизнеса",
    description:
      "Технологический партнёр для бизнеса в Ташкенте. Один договор. Фиксированная стоимость. SLA в договоре. Прозрачность через GoARKAN.",
    url: baseUrl,
  },
};

const schemas = [organizationSchema, localBusinessSchema];

export default async function HomePage() {
  const settings = await getSettings("ru");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <HomeHero />
      <HomeTrust />
      <HomeComparison />
      <HomePlatform />
      <HomeJourney />
      <HomeCases />
<HomeContact settings={settings} />
      <HomeCTA />
    </>
  );
}
