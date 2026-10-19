import { LandingPage, landingMetadata } from "@/components/sections/LandingPage";

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return landingMetadata("development", params);
}

export default function Page() {
  return <LandingPage slug="development" />;
}
