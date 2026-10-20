import { LandingPage, landingMetadata } from "@/components/sections/LandingPage";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return landingMetadata("microsoft-365", params);
}

export default function Page() {
  return <LandingPage slug="microsoft-365" />;
}
