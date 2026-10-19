import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { notFound } from "next/navigation";
import { LANGS, isLang } from "@/lib/locale";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { QuickContact } from "@/components/lead/QuickContact";
import { ThemeLanguageProvider } from "@/components/providers/ThemeLanguageProvider";
import { organizationSchema, localBusinessSchema, SITE_URL } from "@/lib/seo";
import { getSettings } from "@/lib/cms-api";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});


const GA_ID       = process.env.NEXT_PUBLIC_GA_ID;
const METRIKA_ID  = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ARKANA — IT-аутсорсинг в Ташкенте",
    template: "%s | ARKANA",
  },
  description:
    "IT-аутсорсинг для бизнеса в Ташкенте: обслуживание компьютеров по подписке, выезд мастера, сети и серверы, ЭЦП и Didox, GoARKAN и Telegram-боты.",
  keywords: [
    "IT-аутсорсинг Ташкент",
    "IT-аутсорсинг Узбекистан",
    "IT аутсорсинг Ташкент",
    "managed IT services Tashkent",
    "IT поддержка бизнеса Ташкент",
    "обслуживание компьютеров Ташкент",
    "компьютерный мастер выезд Ташкент",
    "установка E-IMZO",
    "разработка телеграм бота Ташкент",
    "IT xizmatlari Toshkent",
    "ARKANA",
    "GoARKAN",
  ],
  authors: [{ name: "ARKANA", url: SITE_URL }],
  creator: "ARKANA",
  publisher: "ARKANA",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US", "uz_UZ"],
    url: SITE_URL,
    siteName: "ARKANA",
    title: "ARKANA — IT-аутсорсинг для бизнеса в Ташкенте",
    description:
      "IT-обслуживание по подписке или разовый выезд. Сети, серверы, ЭЦП, GoARKAN и Telegram-боты.",
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
    description: "IT-аутсорсинг для бизнеса в Ташкенте. Service Desk, GoARKAN, Telegram-боты.",
    images: [`${SITE_URL}/og-image.png`],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const siteSettings = await getSettings(lang === "zh" ? "en" : lang);

  return (
    <html lang={lang} className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>

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
        className="text-base antialiased"
        style={{
          fontFamily: "var(--font-manrope, var(--font-inter)), sans-serif",
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

        <ThemeLanguageProvider lang={lang}>
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer settings={siteSettings} />
            <QuickContact />
          </div>
        </ThemeLanguageProvider>
      </body>
    </html>
  );
}
