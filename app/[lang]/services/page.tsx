import type { Metadata } from "next";
import { buildMeta, PAGE_META } from "@/lib/page-meta";
import { ServicesPage } from "@/components/sections/ServicesPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMeta(lang, "/services", PAGE_META["/services"]);
}

export default function Services() {
  return <ServicesPage />;
}
