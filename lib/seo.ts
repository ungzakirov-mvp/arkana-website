export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

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
    "Технологический партнёр для бизнеса в Ташкенте и Узбекистане. IT-аутсорсинг, кибербезопасность, управление инфраструктурой и ITSM через платформу GoARKAN.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Мирзо Улугбека 97",
    addressLocality: "Ташкент",
    addressRegion: "Ташкент",
    addressCountry: "UZ",
  },
  email: "info@arkana.uz",
  telephone: "+998712000000",
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@arkana.uz",
      availableLanguage: ["Uzbek", "Russian", "English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@arkana.uz",
      availableLanguage: ["Uzbek", "Russian", "English"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/arkana-uz",
    "https://t.me/arkana_uz",
  ],
};

// ─── LocalBusiness ────────────────────────────────────────────────────────────

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#business`,
  name: "ARKANA",
  description:
    "IT-аутсорсинг и технологический партнёр для бизнеса в Ташкенте. Управляемые IT-услуги, кибербезопасность, Service Desk, GoARKAN ITSM-платформа.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-3d.png`,
  image: `${SITE_URL}/og-image.png`,
  email: "info@arkana.uz",
  telephone: "+998712000000",
  priceRange: "$$",
  currenciesAccepted: "UZS",
  paymentAccepted: "Bank Transfer, Invoice",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Мирзо Улугбека 97",
    addressLocality: "Ташкент",
    addressRegion: "Ташкент",
    postalCode: "100000",
    addressCountry: "UZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 41.2995,
    longitude: 69.2401,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  areaServed: [
    { "@type": "City", name: "Tashkent" },
    { "@type": "Country", name: "Uzbekistan" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IT Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Outsourcing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cybersecurity" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Infrastructure Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Service Management" } },
    ],
  },
};

// ─── Service schemas ──────────────────────────────────────────────────────────

export const itOutsourcingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/it-outsourcing#service`,
  name: "IT-аутсорсинг в Ташкенте",
  alternateName: "Full IT Outsourcing Tashkent",
  provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "ARKANA" },
  description:
    "Полная передача IT-функции: именная команда инженеров, поддержка L1–L3, управление устройствами и поставщиками, стратегическое IT-планирование. SLA в договоре.",
  serviceType: "IT Outsourcing",
  areaServed: [
    { "@type": "City", name: "Tashkent" },
    { "@type": "Country", name: "Uzbekistan" },
  ],
  url: `${SITE_URL}/services/it-outsourcing`,
};

export const infrastructureSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/infrastructure#service`,
  name: "Управление IT-инфраструктурой в Ташкенте",
  alternateName: "IT Infrastructure Management Tashkent",
  provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "ARKANA" },
  description:
    "Управление серверами, сетью и облачными средами для бизнеса в Узбекистане. Мониторинг, патчинг, ежеквартальное тестирование восстановления.",
  serviceType: "IT Infrastructure Management",
  areaServed: [
    { "@type": "City", name: "Tashkent" },
    { "@type": "Country", name: "Uzbekistan" },
  ],
  url: `${SITE_URL}/services/infrastructure`,
};

export const cybersecuritySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/managed-it#service`,
  name: "Кибербезопасность для бизнеса в Ташкенте",
  alternateName: "Cybersecurity Services Tashkent",
  provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "ARKANA" },
  description:
    "Защита конечных точек, управление доступом, тестирование резервных копий, обучение сотрудников и реагирование на инциденты для бизнеса в Узбекистане.",
  serviceType: "Cybersecurity",
  areaServed: [
    { "@type": "City", name: "Tashkent" },
    { "@type": "Country", name: "Uzbekistan" },
  ],
  url: `${SITE_URL}/services/managed-it`,
};

export const itsmSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/itsm#service`,
  name: "IT Service Management — GoARKAN",
  alternateName: "ITSM Tashkent",
  provider: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "ARKANA" },
  description:
    "IT-сервис менеджмент через платформу GoARKAN: учёт заявок, инвентаризация активов, управление инцидентами, ежемесячные отчёты.",
  serviceType: "IT Service Management",
  areaServed: [
    { "@type": "City", name: "Tashkent" },
    { "@type": "Country", name: "Uzbekistan" },
  ],
  url: `${SITE_URL}/services/itsm`,
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

export function buildArticleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
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
    inLanguage: "ru",
    isPartOf: { "@type": "Blog", url: `${SITE_URL}/blog` },
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
