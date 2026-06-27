import type { Metadata } from "next";
import { AboutPage } from "@/components/sections/AboutPage";

export const metadata: Metadata = {
  title: "О компании ARKANA | Технологический партнёр в Ташкенте",
  description:
    "ARKANA — технологический партнёр для бизнеса в Ташкенте и Узбекистане. Именные инженеры, задокументированные процессы, SLA в договоре и полная прозрачность через GoARKAN.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "О компании ARKANA | Технологический партнёр в Ташкенте",
    description:
      "ARKANA — технологический партнёр для бизнеса в Узбекистане. Именные технические руководители, прозрачные процессы и полный контроль через GoARKAN.",
    url: "/about",
  },
};

export default function About() {
  return <AboutPage />;
}
