import type { Metadata } from "next";
import { ServicesPage } from "@/components/sections/ServicesPage";

export const metadata: Metadata = {
  title: "Услуги | ARKANA — Технологический партнёр для бизнеса",
  description:
    "IT-аутсорсинг, кибербезопасность, управление инфраструктурой и ITSM для бизнеса в Узбекистане. Один договор, фиксированная стоимость, SLA в договоре.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://arkana.uz/services",
    siteName: "ARKANA",
    title: "Услуги IT-аутсорсинга ARKANA — Ташкент, Узбекистан",
    description: "IT-аутсорсинг, кибербезопасность, управление инфраструктурой, ITSM. Один договор — полное IT-обслуживание с SLA.",
    images: [{ url: "https://arkana.uz/og-image.png", width: 1200, height: 630, alt: "Услуги ARKANA — IT-аутсорсинг в Узбекистане" }],
  },
};

export default function Services() {
  return <ServicesPage />;
}
