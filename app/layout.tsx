import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ThemeLanguageProvider } from "@/components/providers/ThemeLanguageProvider";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";
import { getSettings } from "@/lib/cms-api";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "IT-аутсорсинг в Ташкенте | ARKANA — Managed IT Services",
    template: "%s | ARKANA",
  },
  description:
    "ARKANA — полный IT-аутсорсинг для бизнеса в Ташкенте. Берём на себя всю IT-инфраструктуру, поддержку, безопасность. SLA, Service Desk, прозрачная отчётность.",
  keywords: [
    "IT-аутсорсинг Ташкент",
    "IT-аутсорсинг Узбекистан",
    "managed IT services",
    "IT поддержка бизнеса",
    "обслуживание серверов",
    "кибербезопасность",
    "ARKANA",
    "GoARKAN",
  ],
  authors: [{ name: "ARKANA", url: baseUrl }],
  creator: "ARKANA",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US", "uz_UZ"],
    url: baseUrl,
    siteName: "ARKANA",
    title: "ARKANA — IT-аутсорсинг для бизнеса в Ташкенте",
    description:
      "Полная IT-инфраструктура под ключ. Фиксированная стоимость, SLA, Service Desk, ежемесячная отчётность. Ваш IT-отдел — без накладных расходов.",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ARKANA — IT-аутсорсинг, Ташкент, Узбекистан",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARKANA — IT-аутсорсинг для бизнеса в Ташкенте",
    description:
      "Полная IT-инфраструктура под ключ. SLA, Service Desk, прозрачная отчётность.",
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSettings("ru");

  return (
    <html lang="ru" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('ark-theme')||'dark';document.documentElement.setAttribute('data-theme',t);})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className="font-inter text-base antialiased"
        style={{
          background: "var(--ark-bg)",
          color: "var(--ark-text)",
          transition: "background 0.3s, color 0.3s",
        }}
      >
        <ThemeLanguageProvider>
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer settings={siteSettings} />
          </div>
        </ThemeLanguageProvider>
      </body>
    </html>
  );
}
