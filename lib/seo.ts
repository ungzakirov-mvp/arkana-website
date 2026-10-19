import { COMPANY } from "@/lib/company";

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
    "IT-аутсорсинг для бизнеса в Ташкенте: абонентское обслуживание, разовые выезды, сети и серверы, цифровой офис GoARKAN и Telegram-боты.",
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
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
    "IT-аутсорсинг в Ташкенте: подписка от 8,5 млн сум/мес, выезд компьютерного мастера 100 000 сум, сети и серверы, GoARKAN, Telegram-боты.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-3d.png`,
  image: `${SITE_URL}/og-image.png`,
  email: COMPANY.email,
  telephone: COMPANY.phones,
  priceRange: "от 100 000 сум",
  currenciesAccepted: "UZS",
  paymentAccepted: "Bank Transfer, Invoice",
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.locality,
    addressRegion: COMPANY.address.locality,
    addressCountry: COMPANY.address.country,
  },
  // TODO: geo — поставить точные координаты офиса из Google Maps
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
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT-аутсорсинг и абонентское обслуживание" }, price: 8500000, priceCurrency: "UZS" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Выезд компьютерного мастера по Ташкенту" }, price: 100000, priceCurrency: "UZS" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Сети, серверы, Wi-Fi, IP-телефония" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Цифровой офис GoARKAN" }, price: 1500000, priceCurrency: "UZS" },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Разработка Telegram-ботов" }, price: 9900000, priceCurrency: "UZS" },
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
