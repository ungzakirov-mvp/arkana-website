import { LandingPage, landingMetadata } from "@/components/sections/LandingPage";

export const metadata = landingMetadata("on-demand");

export default function Page() {
  return <LandingPage slug="on-demand" />;
}
