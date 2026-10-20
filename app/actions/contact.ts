"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { checkRateLimit } from "@/lib/ratelimit";
import { deliverLead } from "@/lib/leads";

const optStr = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Укажите имя")
    .max(100, "Имя слишком длинное")
    .regex(/^[\p{L}\s\-'.ʻʼ’]+$/u, "Недопустимые символы в имени"),
  phone: z
    .string()
    .trim()
    .max(30, "Телефон слишком длинный")
    .regex(/^[\d\s+\-()]+$/, "Некорректный формат телефона")
    .refine((v) => v.replace(/\D/g, "").length >= 9, "Укажите номер полностью"),
  company: optStr(200),
  email: z.string().trim().email("Некорректный email").max(254).toLowerCase().optional().or(z.literal("")),
  message: optStr(2000),
  service: optStr(100),
  plan: optStr(60),
  lang: optStr(5),
  page: optStr(300),
  ref: optStr(300),
  utm_source: optStr(100),
  utm_medium: optStr(100),
  utm_campaign: optStr(150),
  utm_content: optStr(150),
  website: z.literal("", { error: "Bot detected" }),
});

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; errors: Record<string, string[]>; message?: string }
  | { status: "rate_limited"; resetAt: string }
  | { status: "spam" };

const FIELDS = ["name", "phone", "company", "email", "message", "service", "plan", "lang", "page", "ref", "utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

export async function submitContact(_prev: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // 1. Honeypot
  const honeypot = formData.get("website");
  if (honeypot && honeypot !== "") return { status: "spam" };

  // 2. Rate limit
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() ?? h.get("x-real-ip") ?? "unknown";
  const rl = await checkRateLimit(ip);
  if (!rl.allowed) return { status: "rate_limited", resetAt: rl.resetAt.toISOString() };

  // 3. Validation
  const raw: Record<string, unknown> = { website: honeypot ?? "" };
  for (const f of FIELDS) raw[f] = formData.get(f) ?? "";
  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) if (v) errors[k] = v;
    return { status: "error", errors };
  }
  const d = parsed.data;

  // 4. Доставка: Telegram + почта (сайт с GoARKAN не связан)
  const res = await deliverLead({
    name: d.name,
    phone: d.phone,
    company: d.company || undefined,
    email: d.email || undefined,
    message: d.message || undefined,
    service: d.service || undefined,
    plan_slug: d.plan || undefined,
    lang: d.lang || undefined,
    landing_page: d.page || h.get("referer") || undefined,
    referrer: d.ref || undefined,
    utm_source: d.utm_source || undefined,
    utm_medium: d.utm_medium || undefined,
    utm_campaign: d.utm_campaign || undefined,
    utm_content: d.utm_content || undefined,
  });

  if (!res.ok) {
    return {
      status: "error",
      errors: {},
      message: "Не удалось отправить заявку. Позвоните +998 99 998 17 77 или напишите в Telegram @arkana_uz",
    };
  }
  return { status: "success" };
}
