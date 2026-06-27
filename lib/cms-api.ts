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
      ? _formatPrice(p.price_monthly, lang)
      : _customLabel(lang),
    cta_label: p.website_show_contact_sales ? _contactLabel(lang) : _startLabel(lang),
    cta_href: "/contact",
    services: _deriveServices(p, lang),
  }));
}

function _formatPrice(n: number, lang: string): string {
  const formatted = n.toLocaleString("ru-RU");
  if (lang === "uz") return `${formatted} so'mdan`;
  if (lang === "en") return `from ${formatted} UZS`;
  return `от ${formatted} сум`;
}
function _customLabel(lang: string): string {
  if (lang === "uz") return "Individual";
  if (lang === "en") return "Custom";
  return "Индивидуально";
}
function _contactLabel(lang: string): string {
  if (lang === "uz") return "Bog'lanish";
  if (lang === "en") return "Contact us";
  return "Связаться";
}
function _startLabel(lang: string): string {
  if (lang === "uz") return "Boshlash";
  if (lang === "en") return "Get started";
  return "Начать";
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
  // ── 1. Try GoARKAN CRM first ───────────────────────────────────────────────
  let goarkanOk = false;
  let goarkanLeadId: number | undefined;

  try {
    const res = await fetch(`${API_BASE}/api/public/website/leads`, {
      method: "POST",
      headers: { ...HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(8000), // 8 s hard timeout
    });

    const json = await res.json().catch(() => ({})) as Record<string, unknown>;

    if (res.ok) {
      goarkanOk = true;
      goarkanLeadId = json.lead_id as number | undefined;
      console.log("[cms-api] submitLead → GoARKAN OK, lead_id:", goarkanLeadId);
    } else if (res.status === 429) {
      return { ok: false, error: "rate_limited" };
    } else {
      const detail = (json.detail as string) ?? `HTTP ${res.status}`;
      console.error("[cms-api] submitLead → GoARKAN error:", detail, "| URL:", API_BASE);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[cms-api] submitLead → GoARKAN unreachable:", msg, "| API_BASE:", API_BASE);
  }

  if (goarkanOk) {
    return { ok: true, lead_id: goarkanLeadId, message: "Заявка принята" };
  }

  // ── 2. Fallback: email notification via Resend ─────────────────────────────
  // GoARKAN is unreachable (LAN-only / misconfigured). Send email so the lead
  // is not lost. The team receives the full data and can create the CRM record
  // manually. This is notification-only, NOT standalone lead storage.
  const emailResult = await _sendLeadEmail(data);

  if (emailResult.ok) {
    console.log("[cms-api] submitLead → email fallback OK, id:", emailResult.id);
    // Return success to user — they don't need to know which channel was used.
    return { ok: true, message: "Заявка принята (резервный канал)" };
  }

  // Both channels failed.
  console.error("[cms-api] submitLead → ALL channels failed. GoARKAN + Resend both unavailable.");
  return { ok: false, error: "Ошибка отправки. Попробуйте позже или напишите на info@arkana.uz" };
}

/** Send lead data as an email using the Resend SDK (handles UTF-8 correctly). */
async function _sendLeadEmail(data: LeadInput): Promise<{ ok: boolean; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[cms-api] _sendLeadEmail → RESEND_API_KEY not set");
    return { ok: false };
  }

  const NOTIFY_TO = process.env.CONTACT_TO_EMAIL ?? "info@arkana.uz";

  const row = (label: string, value: string) =>
    `<tr>` +
    `<td style="padding:10px 12px;background:#f8f9fa;font-weight:600;color:#64748b;font-size:13px;width:30%">${label}</td>` +
    `<td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b;font-size:14px">${value}</td>` +
    `</tr>`;

  const html =
    `<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"/></head><body>` +
    `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">` +
    `<h2 style="color:#6366f1;margin-bottom:24px">Новая заявка с сайта ARKANA</h2>` +
    `<table style="width:100%;border-collapse:collapse">` +
    row("Имя", data.name) +
    row("Компания", data.company) +
    row("Email", data.email) +
    row("Телефон", data.phone ?? "—") +
    row("Сообщение", data.message ?? "—") +
    row("Страница", data.landing_page ?? "—") +
    `</table>` +
    `<p style="margin-top:24px;font-size:12px;color:#94a3b8">` +
    `Заявка получена через резервный канал (GoARKAN недоступен). ` +
    `Создайте лид вручную в GoARKAN CRM.` +
    `</p></div></body></html>`;

  const subject =
    `Новая заявка: ${data.name} — ${data.company}`;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const { data: result, error } = await resend.emails.send({
      from: "ARKANA Website <noreply@arkana.uz>",
      to: [NOTIFY_TO],
      subject,
      html,
      replyTo: data.email,
    });

    if (error) {
      console.error("[cms-api] _sendLeadEmail → Resend SDK error:", error);
      return { ok: false };
    }

    return { ok: true, id: result?.id };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[cms-api] _sendLeadEmail → Resend SDK failed:", msg);
    return { ok: false };
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

function _deriveServices(p: Plan, lang = "ru"): { count: string; label: string }[] {
  const services: { count: string; label: string }[] = [];
  if (p.ticket_limit_monthly != null) {
    const label = lang === "uz" ? "ariza/oy" : lang === "en" ? "tickets/mo" : "заявок в месяц";
    services.push({ count: String(p.ticket_limit_monthly), label });
  }
  if (p.max_workstations != null) {
    const prefix = lang === "uz" ? "gacha" : lang === "en" ? "up to" : "до";
    const label  = lang === "uz" ? "ish joyi" : lang === "en" ? "workstations" : "рабочих мест";
    services.push({ count: `${prefix} ${p.max_workstations}`, label });
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
