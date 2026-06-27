import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://arkana.uz";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const w = "weekly" as const;
  const m = "monthly" as const;
  const d = "daily" as const;

  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: w, priority: 1.0 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: w, priority: 0.9 },
    { url: `${BASE}/goarkan`, lastModified: now, changeFrequency: m, priority: 0.9 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: m, priority: 0.8 },
    { url: `${BASE}/services/it-outsourcing`, lastModified: now, changeFrequency: m, priority: 0.7 },
    { url: `${BASE}/services/itsm`, lastModified: now, changeFrequency: m, priority: 0.7 },
    { url: `${BASE}/services/infrastructure`, lastModified: now, changeFrequency: m, priority: 0.7 },
    { url: `${BASE}/services/managed-it`, lastModified: now, changeFrequency: m, priority: 0.7 },
    { url: `${BASE}/cases`, lastModified: now, changeFrequency: m, priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: m, priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: d, priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: m, priority: 0.8 },
    // Blog articles
    { url: `${BASE}/blog/it-outsourcing-vs-staff`, lastModified: now, changeFrequency: m, priority: 0.6 },
    { url: `${BASE}/blog/cybersecurity-threats-2026`, lastModified: now, changeFrequency: m, priority: 0.6 },
    { url: `${BASE}/blog/m365-migration-guide`, lastModified: now, changeFrequency: m, priority: 0.6 },
    { url: `${BASE}/blog/when-to-replace-servers`, lastModified: now, changeFrequency: m, priority: 0.6 },
    { url: `${BASE}/blog/cut-it-costs`, lastModified: now, changeFrequency: m, priority: 0.6 },
    { url: `${BASE}/blog/sla-guide`, lastModified: now, changeFrequency: m, priority: 0.6 },
  ];
}
