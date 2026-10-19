import { LandingPage, landingMetadata } from "@/components/sections/LandingPage";

export const metadata = landingMetadata("microsoft-365");

export default function Page() {
  return <LandingPage slug="microsoft-365" />;
}
