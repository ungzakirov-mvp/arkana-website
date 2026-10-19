import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeTrust } from "@/components/home/HomeTrust";
import { HomeEnterprise } from "@/components/home/HomeEnterprise";
import { HomeClients } from "@/components/home/HomeClients";
import { HomeComparison } from "@/components/home/HomeComparison";
import { HomePlatform } from "@/components/home/HomePlatform";
import { HomeDashboard } from "@/components/home/HomeDashboard";
import { HomeOperationFlow } from "@/components/home/HomeOperationFlow";
import { HomeJourney } from "@/components/home/HomeJourney";
import { HomeContact } from "@/components/home/HomeContact";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";
import { getSettings } from "@/lib/cms-api";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

export const metadata: Metadata = {
  title: { absolute: "IT-аутсорсинг в Ташкенте — обслуживание компьютеров и сетей | ARKANA" },
  description:
    "IT-аутсорсинг для бизнеса в Ташкенте: обслуживание компьютеров по подписке, выезд компьютерного мастера, сети и серверы, ЭЦП и Didox, цифровой офис GoARKAN, Telegram-боты.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "IT-аутсорсинг в Ташкенте | ARKANA",
    description:
      "IT-обслуживание по подписке или разовый выезд. Сети, серверы, ЭЦП, GoARKAN и Telegram-боты.",
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
      <HomePlatform />
      <HomeDashboard />
      <HomeEnterprise />
      <HomeOperationFlow />
      <HomeClients />
      <HomeComparison />
      <HomeJourney />
      <HomeContact settings={settings} />
    </>
  );
}
