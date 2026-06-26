import type { Metadata } from "next";
import { BlogPage } from "@/components/sections/BlogPage";

export const metadata: Metadata = {
  title: "Блог — IT-аутсорсинг, безопасность, облако",
  description: "Полезные статьи от ARKANA: IT-аутсорсинг, кибербезопасность, Microsoft 365, инфраструктура, оптимизация IT-затрат для бизнеса.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return <BlogPage />;
}
