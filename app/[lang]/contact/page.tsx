import type { Metadata } from "next";
import { buildMeta, PAGE_META } from "@/lib/page-meta";
import { ContactPageSection } from "@/components/sections/ContactPageSection";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMeta(lang, "/contact", PAGE_META["/contact"]);
}

export default function ContactPage() {
  return <ContactPageSection />;
}
