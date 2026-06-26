import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeTrust } from "@/components/home/HomeTrust";
import { HomePlatform } from "@/components/home/HomePlatform";
import { HomeComparison } from "@/components/home/HomeComparison";
import { HomePricing } from "@/components/home/HomePricing";
import { HomeCases } from "@/components/home/HomeCases";
import { HomeCalculator } from "@/components/home/HomeCalculator";
import { HomeCTA } from "@/components/home/HomeCTA";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";
import { getPricing } from "@/lib/cms-api";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

export const metadata: Metadata = {
  title: "IT-аутсорсинг в Ташкенте | ARKANA — Managed IT Services",
  description:
    "ARKANA — полный IT-аутсорсинг для бизнеса в Ташкенте. Фиксированная стоимость, SLA в договоре, прозрачность через GoARKAN. Бесплатный аудит за 5 дней.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "ARKANA — IT Department as a Service",
    description:
      "ARKANA — полный IT-аутсорсинг для бизнеса в Ташкенте. Фиксированная стоимость, SLA в договоре, прозрачность через GoARKAN.",
    url: baseUrl,
  },
};

const schemas = [organizationSchema, localBusinessSchema];

export default async function HomePage() {
  const plans = await getPricing("ru");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <HomeHero />
      <HomeTrust />
      <HomePlatform />
      <HomeComparison />
      <HomePricing plans={plans.length > 0 ? plans : undefined} />
      <HomeCases />
      <HomeCalculator />
      <HomeCTA />
    </>
  );
}
