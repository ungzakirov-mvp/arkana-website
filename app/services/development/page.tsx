import { LandingPage, landingMetadata } from "@/components/sections/LandingPage";

export const metadata = landingMetadata("development");

export default function Page() {
  return <LandingPage slug="development" />;
}
