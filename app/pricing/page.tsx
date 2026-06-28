import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";

export const metadata: Metadata = {
  title: "Тарифы — ARKANA | IT-аутсорсинг в Ташкенте",
  description: "Выберите уровень IT для вашего бизнеса. Тарифы START, OPERATIONS, ENTERPRISE. Фиксированная стоимость, SLA в договоре, полный доступ к GoARKAN.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <PricingSection />;
}
