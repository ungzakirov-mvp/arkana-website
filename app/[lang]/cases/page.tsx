import type { Metadata } from "next";
import { buildMeta, PAGE_META } from "@/lib/page-meta";
import { CasesPage } from "@/components/sections/CasesPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return buildMeta(lang, "/cases", PAGE_META["/cases"]);
}

export default function Cases() {
  return <CasesPage />;
}
