import { LandingPage, landingMetadata } from "@/components/sections/LandingPage";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return landingMetadata("telegram-bots", params);
}

export default function Page() {
  return <LandingPage slug="telegram-bots" />;
}
