import type { Metadata } from "next";
import { buildMeta, PAGE_META } from "@/lib/page-meta";
import { PricingSection } from "@/components/sections/PricingSection";
import { SITE_URL, buildBreadcrumbSchema } from "@/lib/seo";
import { SCHEMA_SERVICES } from "@/lib/pricing";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMeta(lang, "/pricing", PAGE_META["/pricing"]);
}

const catalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${SITE_URL}/pricing#catalog`,
  name: "Услуги ARKANA",
  url: `${SITE_URL}/pricing`,
  itemListElement: SCHEMA_SERVICES.map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name, areaServed: { "@type": "City", name: "Tashkent" } },
    seller: { "@id": `${SITE_URL}/#organization` },
  })),
};

const breadcrumbs = buildBreadcrumbSchema([
  { name: "Главная", url: "/" },
  { name: "Услуги и тарифы", url: "/pricing" },
]);

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PricingSection />
    </>
  );
}
