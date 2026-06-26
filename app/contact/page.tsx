import type { Metadata } from "next";
import { ContactPageSection } from "@/components/sections/ContactPageSection";
import { getSettings } from "@/lib/cms-api";

export const metadata: Metadata = {
  title: "Контакты — Получить коммерческое предложение | ARKANA",
  description:
    "Свяжитесь с ARKANA. Подготовим коммерческое предложение в течение одного рабочего дня. Ташкент, Узбекистан.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Контакты ARKANA — Коммерческое предложение",
    description: "Получите коммерческое предложение за один рабочий день. Без обязательств.",
    url: "/contact",
  },
};

export default async function ContactPage() {
  const settings = await getSettings("ru");
  return <ContactPageSection settings={settings} />;
}
