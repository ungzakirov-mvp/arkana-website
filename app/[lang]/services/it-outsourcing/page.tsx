import { LandingPage, landingMetadata } from "@/components/sections/LandingPage";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return landingMetadata("it-outsourcing", params);
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <LandingPage slug="it-outsourcing" lang={lang} />;
}
