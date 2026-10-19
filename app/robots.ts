import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"], // /_next/ не закрываем: Google должен видеть CSS и JS
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
