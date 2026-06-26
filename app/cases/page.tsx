import type { Metadata } from "next";
import { CasesPage } from "@/components/sections/CasesPage";

export const metadata: Metadata = {
  title: "Кейсы — результаты работы ARKANA",
  description: "Реальные кейсы IT-аутсорсинга от ARKANA. Как мы помогаем бизнесу сократить расходы на IT и повысить надёжность инфраструктуры.",
  alternates: { canonical: "/cases" },
};

export default function Cases() {
  return <CasesPage />;
}
