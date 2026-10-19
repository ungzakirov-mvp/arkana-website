import type { Metadata } from "next";
import { buildMeta, PAGE_META } from "@/lib/page-meta";
import { ContactPageSection } from "@/components/sections/ContactPageSection";
import { getSettings } from "@/lib/cms-api";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMeta(lang, "/contact", PAGE_META["/contact"]);
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const settings = await getSettings(lang === "zh" ? "en" : lang);
  return <ContactPageSection settings={settings} />;
}
