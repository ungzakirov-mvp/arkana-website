import type { Metadata } from "next";
import { GoArkanPage } from "@/components/sections/GoArkanPage";

export const metadata: Metadata = {
  title: "GoARKAN — ITSM-платформа для управления IT",
  description: "GoARKAN — собственная ITSM-платформа ARKANA. Service Desk, управление активами, аналитика, отчёты. Клиент видит всё в реальном времени.",
  alternates: { canonical: "/goarkan" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://arkana.uz/goarkan",
    siteName: "ARKANA",
    title: "GoARKAN — ITSM-платформа для бизнеса в Узбекистане",
    description: "Service Desk, управление заявками и активами, SLA-аналитика. Клиент видит всё в реальном времени. Собственная разработка ARKANA.",
    images: [{ url: "https://arkana.uz/og-image.png", width: 1200, height: 630, alt: "GoARKAN — ITSM-платформа ARKANA" }],
  },
};

export default function GoArkan() {
  return <GoArkanPage />;
}
