import type { Metadata } from "next";
import { buildMeta, PAGE_META } from "@/lib/page-meta";
import { AboutPage } from "@/components/sections/AboutPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMeta(lang, "/about", PAGE_META["/about"]);
}

export default function About() {
  return <AboutPage />;
}
