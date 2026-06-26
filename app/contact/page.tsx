import type { Metadata } from "next";
import { ContactPageSection } from "@/components/sections/ContactPageSection";
import { getSettings } from "@/lib/cms-api";

export const metadata: Metadata = {
  title: "Контакты — Запросить IT-аудит",
  description:
    "Свяжитесь с ARKANA для бесплатного IT-аудита. Ответим за 2 часа, аудит — за 5 рабочих дней. Ташкент, Узбекистан.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Контакты ARKANA — Бесплатный IT-аудит",
    description: "Запросите бесплатный IT-аудит. Ответ за 2 часа, результат за 5 дней.",
    url: "/contact",
  },
};

export default async function ContactPage() {
  const settings = await getSettings("ru");
  return <ContactPageSection settings={settings} />;
}
