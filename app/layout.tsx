import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "IT Outsourcing Tashkent | ARKANA — Managed IT Services",
    template: "%s | ARKANA",
  },
  description:
    "ARKANA provides managed IT outsourcing for businesses in Tashkent, Uzbekistan. Named engineers, defined processes, monthly reporting. Get a free IT assessment.",
  keywords: [
    "IT outsourcing Uzbekistan",
    "IT outsourcing Tashkent",
    "managed IT services Uzbekistan",
    "IT support Uzbekistan",
    "IT infrastructure management",
    "IT service desk Uzbekistan",
    "ARKANA",
  ],
  authors: [{ name: "ARKANA", url: baseUrl }],
  creator: "ARKANA",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US", "uz_UZ"],
    url: baseUrl,
    siteName: "ARKANA",
    title: "ARKANA — IT Outsourcing for Businesses in Tashkent",
    description:
      "Named engineers. Defined processes. Monthly reporting. ARKANA manages your entire IT function — infrastructure, support, security, and vendor management.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ARKANA — IT Outsourcing & Managed IT Services, Tashkent, Uzbekistan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARKANA — IT Outsourcing for Businesses in Tashkent",
    description:
      "Named engineers. Defined processes. Monthly reporting. Your IT department — without the overhead.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-[#0A0A0F]">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
