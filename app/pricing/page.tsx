import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";
import { SITE_URL, buildBreadcrumbSchema } from "@/lib/seo";
import { SCHEMA_SERVICES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Услуги и тарифы IT-обслуживания в Ташкенте",
  description:
    "IT-аутсорсинг в Ташкенте: подписка START, BUSINESS, ENTERPRISE, выезд компьютерного мастера, сети и серверы, GoARKAN, Telegram-боты. Расчёт стоимости за 1 рабочий день.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Услуги и тарифы IT-обслуживания в Ташкенте",
    description: "Подписка на IT-обслуживание, разовые выезды, проекты, GoARKAN и Telegram-боты. Расчёт за 1 рабочий день.",
    url: `${SITE_URL}/pricing`,
    type: "website",
  },
};

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
