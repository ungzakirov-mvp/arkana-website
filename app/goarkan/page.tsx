import type { Metadata } from "next";
import { GoArkanPage } from "@/components/sections/GoArkanPage";

export const metadata: Metadata = {
  title: "GoARKAN — ITSM-платформа для управления IT",
  description: "GoARKAN — собственная ITSM-платформа ARKANA. Service Desk, управление активами, аналитика, отчёты. Клиент видит всё в реальном времени.",
  alternates: { canonical: "/goarkan" },
};

export default function GoArkan() {
  return <GoArkanPage />;
}
