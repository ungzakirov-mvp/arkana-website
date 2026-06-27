import type { Metadata } from "next";
import { ServicesPage } from "@/components/sections/ServicesPage";

export const metadata: Metadata = {
  title: "Услуги | ARKANA — Технологический партнёр для бизнеса",
  description:
    "IT-аутсорсинг, кибербезопасность, управление инфраструктурой и ITSM для бизнеса в Узбекистане. Один договор, фиксированная стоимость, SLA в договоре.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return <ServicesPage />;
}
