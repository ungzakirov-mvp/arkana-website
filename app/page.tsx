import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeComparison } from "@/components/home/HomeComparison";
import { HomePlatform } from "@/components/home/HomePlatform";
import { HomeCases } from "@/components/home/HomeCases";
import { HomePricing } from "@/components/home/HomePricing";
import { HomeContact } from "@/components/home/HomeContact";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";
import { getPricing, getSettings } from "@/lib/cms-api";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

export const metadata: Metadata = {
  title: "ARKANA — Технологический партнёр для вашего бизнеса в Ташкенте",
  description:
    "ARKANA — IT-аутсорсинг и управление технологиями для бизнеса в Ташкенте. Фиксированная стоимость, SLA в договоре, полная прозрачность через GoARKAN.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ARKANA — Технологический партнёр для вашего бизнеса",
    description:
      "IT-аутсорсинг для бизнеса в Ташкенте. Фиксированная стоимость. SLA в договоре. Прозрачность через GoARKAN.",
    url: baseUrl,
  },
};

const schemas = [organizationSchema, localBusinessSchema];

export default async function HomePage() {
  const [plans, settings] = await Promise.all([
    getPricing("ru"),
    getSettings("ru"),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <HomeHero />
      <HomeComparison />
      <HomePlatform />
      <HomeCases />
      <HomePricing plans={plans.length > 0 ? plans : undefined} />
      <HomeContact settings={settings} />
    </>
  );
}
