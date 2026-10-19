import type { Metadata } from "next";
import { buildMeta, PAGE_META } from "@/lib/page-meta";
import { BlogPage } from "@/components/sections/BlogPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMeta(lang, "/blog", PAGE_META["/blog"]);
}

export default function Blog() {
  return <BlogPage />;
}
