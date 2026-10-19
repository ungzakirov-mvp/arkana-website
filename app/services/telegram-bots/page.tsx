import { LandingPage, landingMetadata } from "@/components/sections/LandingPage";

export const metadata = landingMetadata("telegram-bots");

export default function Page() {
  return <LandingPage slug="telegram-bots" />;
}
