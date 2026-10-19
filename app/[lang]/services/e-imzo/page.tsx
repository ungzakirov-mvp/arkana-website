import { LandingPage, landingMetadata } from "@/components/sections/LandingPage";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return landingMetadata("e-imzo", params);
}

export default function Page() {
  return <LandingPage slug="e-imzo" />;
}
