import type { Metadata } from "next";
import { CasesPage } from "@/components/sections/CasesPage";

export const metadata: Metadata = {
  title: "Кейсы — результаты работы ARKANA",
  description: "Реальные кейсы IT-аутсорсинга от ARKANA. Как мы помогаем бизнесу сократить расходы на IT и повысить надёжность инфраструктуры.",
  alternates: { canonical: "/cases" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://arkana.uz/cases",
    siteName: "ARKANA",
    title: "Кейсы ARKANA — реальные результаты IT-аутсорсинга",
    description: "Как ARKANA помогает бизнесу в Ташкенте снизить IT-расходы и повысить надёжность. Реальные кейсы, цифры, результаты.",
    images: [{ url: "https://arkana.uz/og-image.png", width: 1200, height: 630, alt: "Кейсы ARKANA — IT-аутсорсинг в Ташкенте" }],
  },
};

export default function Cases() {
  return <CasesPage />;
}
