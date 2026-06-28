import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ThemeLanguageProvider } from "@/components/providers/ThemeLanguageProvider";
import { organizationSchema, localBusinessSchema, SITE_URL } from "@/lib/seo";
import { getSettings } from "@/lib/cms-api";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const GA_ID       = process.env.NEXT_PUBLIC_GA_ID;
const METRIKA_ID  = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IT-аутсорсинг в Ташкенте | ARKANA — Технологический партнёр",
    template: "%s | ARKANA",
  },
  description:
    "ARKANA — технологический партнёр для бизнеса в Ташкенте и Узбекистане. Полный IT-аутсорсинг, кибербезопасность, управление инфраструктурой. SLA в договоре, GoARKAN.",
  keywords: [
    "IT-аутсорсинг Ташкент",
    "IT-аутсорсинг Узбекистан",
    "IT аутсорсинг Ташкент",
    "managed IT services Tashkent",
    "IT поддержка бизнеса Ташкент",
    "кибербезопасность Ташкент",
    "обслуживание серверов Ташкент",
    "Service Desk Узбекистан",
    "ITSM платформа",
    "ARKANA",
    "GoARKAN",
  ],
  authors: [{ name: "ARKANA", url: SITE_URL }],
  creator: "ARKANA",
  publisher: "ARKANA",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ru":        SITE_URL,
      "en":        SITE_URL,
      "uz":        SITE_URL,
      "x-default": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US", "uz_UZ"],
    url: SITE_URL,
    siteName: "ARKANA",
    title: "ARKANA — IT-аутсорсинг для бизнеса в Ташкенте",
    description:
      "Технологический партнёр для бизнеса в Ташкенте. Один договор, фиксированная стоимость, SLA, GoARKAN.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ARKANA — IT-аутсорсинг, Ташкент, Узбекистан",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARKANA — IT-аутсорсинг для бизнеса в Ташкенте",
    description: "Технологический партнёр для бизнеса. SLA, Service Desk, GoARKAN.",
    images: [`${SITE_URL}/og-image.png`],
  },
  icons: {
    icon:     [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFY,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
        ? { "yandex-verification": [process.env.NEXT_PUBLIC_YANDEX_VERIFICATION] }
        : {}),
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteSettings = await getSettings("ru");

  return (
    <html lang="ru" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Theme flicker prevention */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('ark-theme')||'dark';document.documentElement.setAttribute('data-theme',t);})()`,
          }}
        />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* Yandex.Metrika */}
        {METRIKA_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
ym(${METRIKA_ID},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`,
            }}
          />
        )}
        {METRIKA_ID && (
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${METRIKA_ID}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        )}
      </head>
      <body
        className="font-inter text-base antialiased"
        style={{
          background: "var(--ark-bg)",
          color: "var(--ark-text)",
          transition: "background 0.3s, color 0.3s",
        }}
      >
        {/* Google Analytics (GA4) */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}

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
