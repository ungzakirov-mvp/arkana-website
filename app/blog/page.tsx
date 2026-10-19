import type { Metadata } from "next";
import { BlogPage } from "@/components/sections/BlogPage";

export const metadata: Metadata = {
  title: "Блог — IT-аутсорсинг, безопасность, облако",
  description: "Полезные статьи от ARKANA: IT-аутсорсинг, кибербезопасность, Microsoft 365, инфраструктура, оптимизация IT-затрат для бизнеса.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://arkana.uz/blog",
    siteName: "ARKANA",
    title: "Блог ARKANA — полезно об IT для бизнеса в Узбекистане",
    description: "IT-аутсорсинг, кибербезопасность, Microsoft 365, инфраструктура, оптимизация IT-затрат. Практичные статьи от инженеров ARKANA.",
    images: [{ url: "https://arkana.uz/og-image.png", width: 1200, height: 630, alt: "Блог ARKANA — IT для бизнеса" }],
  },
};

export default function Blog() {
  return <BlogPage />;
}
