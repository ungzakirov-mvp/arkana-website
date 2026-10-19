import type { Metadata } from "next";
import { ServiceLanding } from "@/components/sections/ServiceLanding";
import { LANDINGS } from "@/lib/landings";
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";

/** Серверная обёртка посадочной: метаданные + schema (Service, FAQPage, Breadcrumbs). */
export function landingMetadata(slug: string): Metadata {
  const d = LANDINGS[slug];
  return {
    title: d.meta.title,
    description: d.meta.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: d.meta.title, description: d.meta.description, url: `${SITE_URL}/services/${slug}`, type: "website" },
  };
}

export function LandingPage({ slug }: { slug: string }) {
  const d = LANDINGS[slug];
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}/services/${slug}#service`,
      name: d.h1.ru,
      description: d.meta.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "City", name: "Tashkent" },
      url: `${SITE_URL}/services/${slug}`,
    },
    buildFaqSchema(d.faq.map((f) => ({ q: f.q.ru, a: f.a.ru }))),
    buildBreadcrumbSchema([
      { name: "Главная", url: "/" },
      { name: "Услуги", url: "/services" },
      { name: d.h1.ru, url: `/services/${slug}` },
    ]),
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      <ServiceLanding slug={slug} />
    </>
  );
}
