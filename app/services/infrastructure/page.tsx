import { LandingPage, landingMetadata } from "@/components/sections/LandingPage";

export const metadata = landingMetadata("infrastructure");

export default function Page() {
  return <LandingPage slug="infrastructure" />;
}
