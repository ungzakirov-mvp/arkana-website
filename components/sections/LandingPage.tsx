import type { Metadata } from "next";
import { ServiceLanding } from "@/components/sections/ServiceLanding";
import { LANDINGS } from "@/lib/landings";
import { SITE_URL, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo";
import { buildMeta, type MetaByLang } from "@/lib/page-meta";

const cut = (t: string, n = 158) => (t.length <= n ? t : t.slice(0, t.lastIndexOf(" ", n)) + "…");

/** Метаданные посадочной на языке страницы: RU — из meta, остальные — из h1/sub. */
export async function landingMetadata(slug: string, params: Promise<{ lang: string }>): Promise<Metadata> {
  const { lang } = await params;
  const d = LANDINGS[slug];
  const city = { uz: " — Toshkent", en: " in Tashkent", zh: " — Tashkent" } as const;
  const t: MetaByLang = {
    ru: d.meta,
    uz: { title: d.h1.uz + city.uz, description: cut(d.sub.uz) },
    en: { title: d.h1.en + city.en, description: cut(d.sub.en) },
  };
  return buildMeta(lang, `/services/${slug}`, t);
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
