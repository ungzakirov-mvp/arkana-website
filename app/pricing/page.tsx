import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/PricingSection";
import { getPricing } from "@/lib/cms-api";

export const metadata: Metadata = {
  title: "Тарифы IT-аутсорсинга",
  description: "Тарифы на IT-аутсорсинг для бизнеса в Ташкенте. START от 3 000 000 сум/мес, OPERATIONS от 6 000 000 сум/мес. SLA в договоре, Service Desk, мониторинг включены.",
  alternates: { canonical: "/pricing" },
};

export default async function PricingPage() {
  const plans = await getPricing("ru");
  return <PricingSection plans={plans} />;
}
