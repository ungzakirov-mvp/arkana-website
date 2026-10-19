import type { MetadataRoute } from "next";
import { LANGS, localizePath } from "@/lib/locale";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

/** [путь, приоритет, частота] — каждая страница в 4 языковых версиях с hreflang. */
const PAGES: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
  ["/", 1.0, "weekly"],
  ["/services/it-outsourcing", 0.9, "monthly"],
  ["/services/on-demand", 0.9, "monthly"],
  ["/pricing", 0.9, "weekly"],
  ["/services/e-imzo", 0.8, "monthly"],
  ["/services/infrastructure", 0.8, "monthly"],
  ["/services/telegram-bots", 0.8, "monthly"],
  ["/services/microsoft-365", 0.7, "monthly"],
  ["/services/development", 0.7, "monthly"],
  ["/services", 0.8, "monthly"],
  ["/goarkan", 0.8, "monthly"],
  ["/contact", 0.8, "monthly"],
  ["/cases", 0.6, "monthly"],
  ["/about", 0.6, "monthly"],
  ["/blog", 0.6, "weekly"],
];

/** Статьи блога — только на русском. */
const POSTS = ["it-outsourcing-vs-staff", "cybersecurity-threats-2026", "m365-migration-guide", "when-to-replace-servers", "cut-it-costs", "sla-guide"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => `${BASE}${p === "/" ? "" : p}`;
  const pages = PAGES.flatMap(([path, priority, changeFrequency]) => {
    const languages = Object.fromEntries(LANGS.map((l) => [l, url(localizePath(path, l))]));
    return LANGS.map((l) => ({
      url: url(localizePath(path, l)),
      lastModified: now,
      changeFrequency,
      priority: l === "ru" ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: { languages: { ...languages, "x-default": url(path) } },
    }));
  });
  const posts = POSTS.map((slug) => ({ url: `${BASE}/blog/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 }));
  return [...pages, ...posts];
}
