import type { Metadata } from "next";
import { buildMeta, PAGE_META } from "@/lib/page-meta";
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


export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMeta(lang, "/", PAGE_META["/"], { absoluteTitle: true });
}

const schemas = [organizationSchema, localBusinessSchema];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const settings = await getSettings(lang === "zh" ? "en" : lang);

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
