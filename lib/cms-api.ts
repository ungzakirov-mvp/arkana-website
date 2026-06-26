/**
 * GoARKAN Public Website API client — P0-4 / P0-6 / P0-7
 *
 * Single source of truth for ALL website data.
 * No static pricing. No hardcoded contacts. No standalone lead storage.
 *
 * Required env vars:
 *   GOARKAN_API_URL        — e.g. http://192.168.112.11
 *   GOARKAN_TENANT_DOMAIN  — e.g. arkana.uz (sent as X-Tenant-Domain header)
 *
 * All fetch calls use Next.js ISR via `next: { revalidate }`.
 * Stale-on-error: if GoARKAN is unreachable, cache serves last-known-good data.
 */

const API_BASE  = process.env.GOARKAN_API_URL ?? "http://192.168.112.11";
const TENANT    = process.env.GOARKAN_TENANT_DOMAIN ?? "arkana.uz";
const HEADERS   = { "X-Tenant-Domain": TENANT } as const;

// ─── Shared fetch helper ──────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  params?: Record<string, string>,
  revalidate = 3600,
): Promise<T | null> {
  try {
    const url = new URL(`${API_BASE}${path}`);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }
    const res = await fetch(url.toString(), {
      headers: HEADERS,
      next: { revalidate },
    });
    if (!res.ok) {
      console.error(`[cms-api] ${path} → HTTP ${res.status}`);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (err) {
    console.error(`[cms-api] ${path} fetch failed:`, err);
    return null;
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface I18nString {
  ru?: string;
  uz?: string;
  en?: string;
}

export interface ContactPhone {
  label: string;
  value: string;
  href: string;
}

export interface ContactEmail {
  label?: string;
  value: string;
  href: string;
}

export interface SiteSettings {
  company_name: string;
  short_name: string;
  logo_url?: string;
  logo_dark_url?: string;
  favicon_url?: string;
  primary_color?: string;
  phones: ContactPhone[];
  emails: ContactEmail[];
  telegram?: string;
  telegram_href?: string;
  whatsapp?: string;
  address?: string;
  google_maps_url?: string;
  working_hours: Record<string, string>;
  socials: Record<string, string>;
  copyright_text?: string;
  footer_text?: string;
  seo_title: I18nString;
  seo_description: I18nString;
  og_image_url?: string;
  robots_default?: string;
  ga4_id?: string;
  gtm_id?: string;
  yandex_metrika_id?: string;
  google_site_verify?: string;
  default_lang: string;
  available_langs: string[];
  announcement_text?: I18nString;
  announcement_enabled: boolean;
  emergency_text?: I18nString;
  emergency_enabled: boolean;
  homepage_blocks: Array<{ type: string; enabled: boolean; order: number }>;
}

export interface PlanFeature {
  text: string;
  is_included: boolean;
  sort_order?: number;
}

export interface Plan {
  id: number;
  slug: string;
  name: string;
  description?: string;
  price_monthly: number | null;
  max_workstations: number | null;
  ticket_limit_monthly?: number | null;
  is_popular: boolean;
  sort_order: number;
  website_badge?: string | null;
  website_show_contact_sales: boolean;
  features: PlanFeature[];
  // Computed on client
  price_label?: string;
  cta_label?: string;
  cta_href?: string;
  // Display-only service count chips (derived from ticket_limit, max_workstations, etc.)
  services?: { count: string; label: string }[];
}

export interface CaseStudy {
  id: number;
  company_name: string;
  company_logo?: string | null;
  industry?: string | null;
  title: I18nString;
  challenge: I18nString;
  solution: I18nString;
  result: I18nString;
  metrics: Array<{ label: I18nString; value: string }>;
  images: string[];
  sort_order: number;
}

export interface ClientLogo {
  id: number;
  name: string;
  logo_url?: string | null;
  industry?: string | null;
  website?: string | null;
  sort_order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  photo_url?: string | null;
  position: string;
  bio: string;
  linkedin_url?: string | null;
  sort_order: number;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover_url?: string | null;
  tags: string[];
  published_at: string | null;
}

export interface BlogPostFull extends BlogPost {
  body_md: string;
  seo_title?: string;
  seo_desc?: string;
  og_image?: string;
}

export interface BlogListResponse {
  total: number;
  items: BlogPost[];
}

export interface HomepageData {
  settings: SiteSettings;
  pricing: Plan[];
  cases: CaseStudy[];
  clients: ClientLogo[];
  faq: FaqItem[];
}

// ─── API functions ────────────────────────────────────────────────────────────

/** Fetch website settings (contacts, brand, SEO, analytics IDs). */
export async function getSettings(lang = "ru"): Promise<SiteSettings | null> {
  return apiFetch<SiteSettings>("/api/public/website/settings", { lang }, 900);
}

/** Fetch pricing plans from GoARKAN subscription plans table. No static fallback. */
export async function getPricing(lang = "ru"): Promise<Plan[]> {
  const data = await apiFetch<Plan[]>("/api/public/website/pricing", { lang }, 3600);
  if (!data) return [];

  return data.map((p) => ({
    ...p,
    price_label: p.price_monthly != null
      ? `от ${p.price_monthly.toLocaleString("ru-RU")} сум`
      : "Индивидуально",
    cta_label: p.website_show_contact_sales ? "Связаться" : "Начать",
    cta_href: "/contact",
    services: _deriveServices(p),
  }));
}

/** Fetch published case studies. */
export async function getCases(lang = "ru"): Promise<CaseStudy[]> {
  return (await apiFetch<CaseStudy[]>("/api/public/website/cases", { lang }, 3600)) ?? [];
}

/** Fetch companies with show_on_website = true. */
export async function getClients(): Promise<ClientLogo[]> {
  return (await apiFetch<ClientLogo[]>("/api/public/website/clients", {}, 3600)) ?? [];
}

/** Fetch team members with show_on_website = true. */
export async function getTeam(lang = "ru"): Promise<TeamMember[]> {
  return (await apiFetch<TeamMember[]>("/api/public/website/team", { lang }, 3600)) ?? [];
}

/** Fetch FAQ items (optionally scoped to a page slug). */
export async function getFaq(lang = "ru", page = "global"): Promise<FaqItem[]> {
  return (await apiFetch<FaqItem[]>("/api/public/website/faq", { lang, page }, 3600)) ?? [];
}

/** Fetch blog posts. */
export async function getBlog(
  lang = "ru",
  opts: { category?: string; limit?: number; offset?: number } = {},
): Promise<BlogListResponse> {
  const params: Record<string, string> = { lang };
  if (opts.category) params.category = opts.category;
  if (opts.limit)    params.limit    = String(opts.limit);
  if (opts.offset)   params.offset   = String(opts.offset);
  return (await apiFetch<BlogListResponse>("/api/public/website/blog", params, 1800)) ?? { total: 0, items: [] };
}

/** Fetch a single blog post by slug. */
export async function getBlogPost(slug: string, lang = "ru"): Promise<BlogPostFull | null> {
  return apiFetch<BlogPostFull>(`/api/public/website/blog/${slug}`, { lang }, 1800);
}

/**
 * Fetch all homepage data in a single request.
 * Use this on the homepage to avoid waterfall fetches.
 */
export async function getHomepageData(lang = "ru"): Promise<HomepageData | null> {
  return apiFetch<HomepageData>("/api/public/website/homepage", { lang }, 900);
}

// ─── Lead submission — P0-7 ──────────────────────────────────────────────────

export interface LeadInput {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message?: string;
  plan_slug?: string;
  interested_in?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
}

export interface LeadResult {
  ok: boolean;
  lead_id?: number;
  message?: string;
  error?: string;
}

/** Submit a lead from the website contact form directly to GoARKAN CRM. */
export async function submitLead(data: LeadInput): Promise<LeadResult> {
  try {
    const res = await fetch(`${API_BASE}/api/public/website/leads`, {
      method: "POST",
      headers: { ...HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({})) as Record<string, unknown>;

    if (res.ok) {
      return {
        ok: true,
        lead_id: json.lead_id as number | undefined,
        message: (json.message as string) ?? "Заявка принята",
      };
    }

    if (res.status === 429) {
      return { ok: false, error: "Слишком много запросов. Попробуйте позже." };
    }

    const detail = (json.detail as string) ?? `HTTP ${res.status}`;
    return { ok: false, error: detail };
  } catch (err) {
    console.error("[cms-api] submitLead failed:", err);
    return { ok: false, error: "Ошибка соединения. Попробуйте позже." };
  }
}

// ─── Analytics (cookieless) ───────────────────────────────────────────────────

export async function trackEvent(payload: {
  session_id: string;
  event_type: string;
  page_slug?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}): Promise<void> {
  try {
    await fetch(`${API_BASE}/api/public/website/analytics`, {
      method: "POST",
      headers: { ...HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Analytics is non-critical — swallow errors silently
  }
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function _deriveServices(p: Plan): { count: string; label: string }[] {
  const services: { count: string; label: string }[] = [];
  if (p.ticket_limit_monthly != null) {
    services.push({ count: String(p.ticket_limit_monthly), label: "заявок в месяц" });
  }
  if (p.max_workstations != null) {
    services.push({ count: `до ${p.max_workstations}`, label: "рабочих мест" });
  }
  return services;
}

// ─── i18n helper ─────────────────────────────────────────────────────────────

/** Pick the right language from an i18n string. Falls back: lang → ru → en → first. */
export function t(field: I18nString | undefined | null, lang: string): string {
  if (!field) return "";
  return (
    field[lang as keyof I18nString] ??
    field.ru ??
    field.en ??
    Object.values(field).find(Boolean) ??
    ""
  );
}
