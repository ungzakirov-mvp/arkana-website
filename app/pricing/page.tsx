import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";

export const metadata: Metadata = {
  title: "Тарифы — ARKANA | IT-аутсорсинг в Ташкенте",
  description: "Выберите уровень IT для вашего бизнеса. Тарифы START, OPERATIONS, ENTERPRISE. Фиксированная стоимость, SLA в договоре, полный доступ к GoARKAN.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://arkana.uz/pricing",
    siteName: "ARKANA",
    title: "Тарифы IT-аутсорсинга в Ташкенте — ARKANA",
    description: "START, OPERATIONS, ENTERPRISE. Фиксированная стоимость, SLA в договоре. Полный IT-отдел от 3 000 000 сум/мес.",
    images: [{ url: "https://arkana.uz/og-image.png", width: 1200, height: 630, alt: "Тарифы ARKANA — IT-аутсорсинг в Ташкенте" }],
  },
};

export default function PricingPage() {
  return <PricingSection />;
}
