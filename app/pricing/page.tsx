import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";
import { getPricing } from "@/lib/cms-api";

export const metadata: Metadata = {
  title: "Тарифы — ARKANA | IT-аутсорсинг в Ташкенте",
  description: "Выберите уровень IT для вашего бизнеса. Тарифы START, OPERATIONS, ENTERPRISE. Фиксированная стоимость, SLA в договоре, полный доступ к GoARKAN.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const plans = await getPricing("ru");
  return <PricingSection plans={plans} />;
}
