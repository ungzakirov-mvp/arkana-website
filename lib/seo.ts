export const SITE_URL = "https://arkana.uz";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "ARKANA",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "IT outsourcing company providing managed IT services to businesses in Tashkent, Uzbekistan.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tashkent",
    addressCountry: "UZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "info@arkana.uz",
    availableLanguage: ["Uzbek", "Russian", "English"],
  },
  sameAs: [
    "https://www.linkedin.com/company/arkana-uz",
    "https://t.me/arkana_uz",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "ARKANA",
  description:
    "IT outsourcing company providing managed IT services to businesses in Tashkent, Uzbekistan.",
  url: SITE_URL,
  email: "info@arkana.uz",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tashkent",
    addressRegion: "Tashkent City",
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
  areaServed: {
    "@type": "Country",
    name: "Uzbekistan",
  },
};

export const itOutsourcingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/it-outsourcing#service`,
  name: "Full IT Outsourcing",
  provider: { "@type": "Organization", name: "ARKANA", url: SITE_URL },
  description:
    "Complete IT department management — infrastructure, user support, security, and vendor management — with a named Technical Lead and monthly reporting.",
  serviceType: "IT Outsourcing",
  areaServed: { "@type": "Country", name: "Uzbekistan" },
  url: `${SITE_URL}/services/it-outsourcing`,
};

export const infrastructureSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/infrastructure#service`,
  name: "IT Infrastructure Management",
  provider: { "@type": "Organization", name: "ARKANA", url: SITE_URL },
  description:
    "Server, network, cloud, and backup management for businesses in Uzbekistan. Defined monitoring thresholds, monthly patch schedule, quarterly recovery testing.",
  serviceType: "IT Infrastructure Management",
  areaServed: { "@type": "Country", name: "Uzbekistan" },
  url: `${SITE_URL}/services/infrastructure`,
};

export const cybersecuritySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/managed-it#service`,
  name: "Cybersecurity & Managed IT Services",
  provider: { "@type": "Organization", name: "ARKANA", url: SITE_URL },
  description:
    "Endpoint protection, access management, tested backup strategy, employee security awareness, patch management, and incident response procedures for businesses in Uzbekistan.",
  serviceType: "Cybersecurity",
  areaServed: { "@type": "Country", name: "Uzbekistan" },
  url: `${SITE_URL}/services/managed-it`,
};

export const itsmSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services/itsm#service`,
  name: "IT Service Management & GOARKAN Platform",
  provider: { "@type": "Organization", name: "ARKANA", url: SITE_URL },
  description:
    "IT service management through GOARKAN — ARKANA's proprietary platform for request management, asset tracking, knowledge documentation, and performance reporting.",
  serviceType: "IT Service Management",
  areaServed: { "@type": "Country", name: "Uzbekistan" },
  url: `${SITE_URL}/services/itsm`,
};
