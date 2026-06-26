"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { checkRateLimit } from "@/lib/ratelimit";
import { submitLead } from "@/lib/cms-api";

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать не менее 2 символов")
    .max(100, "Имя слишком длинное")
    .regex(/^[\p{L}\s\-'.]+$/u, "Недопустимые символы в имени"),
  company: z
    .string()
    .min(1, "Название компании обязательно")
    .max(200, "Название компании слишком длинное"),
  email: z
    .string()
    .email("Некорректный email")
    .max(254, "Email слишком длинный")
    .toLowerCase(),
  phone: z
    .string()
    .max(30, "Телефон слишком длинный")
    .regex(/^[\d\s+\-()\s]*$/, "Некорректный формат телефона")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .max(2000, "Сообщение слишком длинное")
    .optional()
    .or(z.literal("")),
  website: z.literal("", { error: "Bot detected" }),
});

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; errors: Record<string, string[]>; message?: string }
  | { status: "rate_limited"; resetAt: string }
  | { status: "spam" };

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // ── 1. Honeypot ──────────────────────────────────────────────────────────
  const honeypot = formData.get("website");
  if (honeypot && honeypot !== "") return { status: "spam" };

  // ── 2. Rate limiting ─────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const rateLimit = await checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return { status: "rate_limited", resetAt: rateLimit.resetAt.toISOString() };
  }

  // ── 3. Validation ────────────────────────────────────────────────────────
  const raw = {
    name:    formData.get("name"),
    company: formData.get("company"),
    email:   formData.get("email"),
    phone:   formData.get("phone"),
    message: formData.get("message"),
    website: honeypot ?? "",
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const [field, errs] of Object.entries(parsed.error.flatten().fieldErrors)) {
      if (errs) fieldErrors[field] = errs;
    }
    return { status: "error", errors: fieldErrors };
  }

  const { name, company, email, phone, message } = parsed.data;

  // ── 4. Create lead (GoARKAN → Sales Queue, fallback to email) ────────────
  const leadResult = await submitLead({
    name,
    company,
    email,
    phone: phone || undefined,
    message: message || undefined,
    landing_page: headersList.get("referer") ?? undefined,
  });

  if (!leadResult.ok) {
    return {
      status: "error",
      errors: {},
      message: "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.",
    };
  }

  return { status: "success" };
}
