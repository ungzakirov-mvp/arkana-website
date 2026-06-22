"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { checkRateLimit } from "@/lib/ratelimit";
import { sendContactEmails } from "@/lib/email";

const ContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .regex(/^[\p{L}\s\-'.]+$/u, "Name contains invalid characters"),
  company: z
    .string()
    .min(1, "Company name is required")
    .max(200, "Company name is too long"),
  email: z
    .string()
    .email("Invalid email address")
    .max(254, "Email is too long")
    .toLowerCase(),
  phone: z
    .string()
    .max(30, "Phone number is too long")
    .regex(/^[\d\s+\-()\s]*$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .max(2000, "Message is too long")
    .optional()
    .or(z.literal("")),
  // Honeypot — must be empty; bots fill all fields
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
  // ── 1. Honeypot check ─────────────────────────────────────────────────────
  const honeypot = formData.get("website");
  if (honeypot && honeypot !== "") {
    // Silent success — bots shouldn't know they were blocked
    return { status: "spam" };
  }

  // ── 2. Rate limiting ──────────────────────────────────────────────────────
  const headersList = await headers();
  // Prefer x-forwarded-for (set by Vercel); fall back to a generic key
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  const rateLimit = await checkRateLimit(ip);

  if (!rateLimit.allowed) {
    return {
      status: "rate_limited",
      resetAt: rateLimit.resetAt.toISOString(),
    };
  }

  // ── 3. Input validation ───────────────────────────────────────────────────
  const raw = {
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    website: honeypot ?? "",
  };

  const parsed = ContactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const [field, errs] of Object.entries(
      parsed.error.flatten().fieldErrors
    )) {
      if (errs) fieldErrors[field] = errs;
    }
    return { status: "error", errors: fieldErrors };
  }

  const { name, company, email, phone, message } = parsed.data;

  // ── 4. Send emails ────────────────────────────────────────────────────────
  const emailResult = await sendContactEmails({
    name,
    company,
    email,
    phone: phone || undefined,
    message: message || undefined,
  });

  if (!emailResult.ok) {
    return {
      status: "error",
      errors: {},
      message: emailResult.error ?? "Something went wrong. Please try again.",
    };
  }

  return { status: "success" };
}
