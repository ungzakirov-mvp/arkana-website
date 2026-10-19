import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";
import { SITE_URL, buildBreadcrumbSchema } from "@/lib/seo";
import { SCHEMA_OFFERS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Цены на IT-обслуживание в Ташкенте — от 8,5 млн сум/мес",
  description:
    "IT-аутсорсинг в Ташкенте: подписка START 8,5 млн, BUSINESS 18,5 млн, ENTERPRISE 30 млн сум/мес. Выезд 100 000 сум, работы по фикс-прайсу, Telegram-боты от 9,9 млн. Без НДС.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Цены на IT-обслуживание в Ташкенте",
    description: "Подписка от 8,5 млн сум/мес, выезд 100 000 сум, Telegram-боты от 9,9 млн. Без НДС.",
    url: `${SITE_URL}/pricing`,
    type: "website",
  },
};

const offersSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "@id": `${SITE_URL}/pricing#catalog`,
  name: "Тарифы ARKANA",
  url: `${SITE_URL}/pricing`,
  itemListElement: SCHEMA_OFFERS.map((o) => ({
    "@type": "Offer",
    name: o.name,
    priceCurrency: "UZS",
    price: o.price,
    ...(o.unit
      ? { priceSpecification: { "@type": "UnitPriceSpecification", price: o.price, priceCurrency: "UZS", unitCode: o.unit } }
      : {}),
    seller: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "City", name: "Tashkent" },
  })),
};

const breadcrumbs = buildBreadcrumbSchema([
  { name: "Главная", url: "/" },
  { name: "Тарифы", url: "/pricing" },
]);

export default function PricingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offersSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <PricingSection />
    </>
  );
}
