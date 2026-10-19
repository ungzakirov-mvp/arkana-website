import type { Metadata } from "next";
import { ServicesPage } from "@/components/sections/ServicesPage";

export const metadata: Metadata = {
  title: "IT-услуги для бизнеса в Ташкенте",
  description:
    "IT-обслуживание по подписке, выезд компьютерного мастера, E-IMZO и Didox, сети и серверы, Telegram-боты и цифровой офис GoARKAN. Один договор, акт и счёт по каждой работе.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return <ServicesPage />;
}
