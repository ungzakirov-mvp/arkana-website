import { COMPANY } from "@/lib/company";

export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.arkana.uz";

// ─── Organization ─────────────────────────────────────────────────────────────

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "ARKANA",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo-3d.png`,
    width: 512,
    height: 512,
  },
  description:
    "IT-аутсорсинг для бизнеса в Ташкенте: абонентское обслуживание, разовые выезды, сети и серверы, цифровой офис GoARKAN и Telegram-боты.",
  address: {
    "@type": "PostalAddress",
    addressLocality: COMPANY.address.locality,
    addressRegion: COMPANY.address.locality,
    addressCountry: COMPANY.address.country,
  },
  email: COMPANY.email,
  telephone: COMPANY.phones[0],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: COMPANY.email,
      telephone: COMPANY.phones[0],
      availableLanguage: ["Uzbek", "Russian", "English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: COMPANY.email,
      telephone: COMPANY.phones[1],
      availableLanguage: ["Uzbek", "Russian", "English"],
    },
  ],
  sameAs: [...COMPANY.sameAs],
};

// ─── LocalBusiness ────────────────────────────────────────────────────────────

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#business`,
  name: "ARKANA",
  description:
    "IT-аутсорсинг в Ташкенте: обслуживание компьютеров по подписке, выезд компьютерного мастера, сети и серверы, GoARKAN, Telegram-боты.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-3d.png`,
  image: `${SITE_URL}/og-image.png`,
  email: COMPANY.email,
  telephone: COMPANY.phones,
  currenciesAccepted: "UZS",
  paymentAccepted: "Bank Transfer, Invoice",
  address: {
    "@type": "PostalAddress",
    addressLocality: COMPANY.address.locality,
    addressRegion: COMPANY.address.locality,
    addressCountry: COMPANY.address.country,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...COMPANY.hours.days],
    opens: COMPANY.hours.opens,
    closes: COMPANY.hours.closes,
  },
  sameAs: [...COMPANY.sameAs],
  areaServed: [
    { "@type": "City", name: "Tashkent" },
    { "@type": "Country", name: "Uzbekistan" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IT Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT-аутсорсинг и абонентское обслуживание" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Выезд компьютерного мастера по Ташкенту" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Сети, серверы, Wi-Fi, IP-телефония" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Цифровой офис GoARKAN" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Разработка Telegram-ботов" } },
    ],
  },
};

// ─── FAQ schema helper ────────────────────────────────────────────────────────

export function buildFaqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// ─── Article schema helper ────────────────────────────────────────────────────

const RU_MONTHS = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

/** «17 ноября 2026» → «2026-11-17» (schema.org требует ISO 8601). */
export function ruDateToIso(date: string): string {
  const [d, m, y] = date.trim().split(/\s+/);
  const month = RU_MONTHS.indexOf(m) + 1;
  if (!month) return date;
  return `${y}-${String(month).padStart(2, "0")}-${d.padStart(2, "0")}`;
}

export function buildArticleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  lang?: "ru" | "uz";
}) {
  const path = `${post.lang === "uz" ? "/uz" : ""}/blog/${post.slug}`;
  const iso = ruDateToIso(post.date);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}${path}`,
    datePublished: iso,
    dateModified: iso,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "ARKANA",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "ARKANA",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-3d.png` },
    },
    image: `${SITE_URL}/og-image.png`,
    inLanguage: post.lang ?? "ru",
    isPartOf: { "@type": "Blog", url: `${SITE_URL}${post.lang === "uz" ? "/uz" : ""}/blog` },
  };
}

// ─── Breadcrumb helper ────────────────────────────────────────────────────────

export function buildBreadcrumbSchema(crumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ name, url }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    })),
  };
}
