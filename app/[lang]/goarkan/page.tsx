import type { Metadata } from "next";
import { buildMeta, PAGE_META } from "@/lib/page-meta";
import { GoArkanPage } from "@/components/sections/GoArkanPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMeta(lang, "/goarkan", PAGE_META["/goarkan"]);
}

export default function GoArkan() {
  return <GoArkanPage />;
}
