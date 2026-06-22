import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ARKANA — IT Outsourcing & Managed Services in Uzbekistan",
    template: "%s | ARKANA",
  },
  description:
    "ARKANA is your external IT department. We handle IT outsourcing, managed services, infrastructure support, and IT service management for businesses across Uzbekistan.",
  keywords: [
    "IT outsourcing Uzbekistan",
    "IT outsourcing Tashkent",
    "managed IT services",
    "IT support",
    "infrastructure management",
    "ITSM",
    "ARKANA",
  ],
  authors: [{ name: "ARKANA", url: baseUrl }],
  creator: "ARKANA",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US"],
    url: baseUrl,
    siteName: "ARKANA",
    title: "ARKANA — IT Outsourcing & Managed Services",
    description:
      "Your external IT department. Dedicated team, modern processes, and full transparency through the GOARKAN platform.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ARKANA — IT Outsourcing & Managed Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARKANA — IT Outsourcing & Managed Services",
    description:
      "Your external IT department. Dedicated team, modern processes, and full transparency.",
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#0A0A0F]">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
