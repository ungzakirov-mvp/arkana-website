import { Resend } from "resend";

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "production") {
      console.error("[email] RESEND_API_KEY not set in production");
    }
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const FROM_ADDRESS = "ARKANA <noreply@arkana.uz>";
const TO_ADDRESS = process.env.CONTACT_TO_EMAIL ?? "info@arkana.uz";

export interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message?: string;
}

// Internal notification to ARKANA team
async function sendInternalNotification(data: ContactPayload): Promise<void> {
  const client = getResend();
  if (!client) return;

  const phoneLine = data.phone ? `\nPhone: ${data.phone}` : "";
  const messageLine = data.message ? `\n\nMessage:\n${data.message}` : "";

  await client.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    subject: `New contact: ${data.name} @ ${data.company}`,
    text: [
      `New inquiry via arkana.uz`,
      ``,
      `Name: ${data.name}`,
      `Company: ${data.company}`,
      `Email: ${data.email}${phoneLine}${messageLine}`,
      ``,
      `Reply directly to this email to respond.`,
    ].join("\n"),
    replyTo: data.email,
  });
}

// Confirmation to the person who submitted the form
async function sendConfirmation(data: ContactPayload): Promise<void> {
  const client = getResend();
  if (!client) return;

  await client.emails.send({
    from: FROM_ADDRESS,
    to: data.email,
    subject: "We received your message — ARKANA",
    text: [
      `Hi ${data.name},`,
      ``,
      `Thank you for reaching out to ARKANA. We have received your inquiry and a member of our team will contact you within 4 business hours to discuss your IT needs.`,
      ``,
      `What happens next:`,
      `1. A technical lead reviews your situation`,
      `2. We schedule a free 30-minute IT assessment call`,
      `3. We present a tailored proposal with no obligation`,
      ``,
      `In the meantime, feel free to reply to this email with any questions.`,
      ``,
      `Best regards,`,
      `The ARKANA Team`,
      `info@arkana.uz`,
      `https://arkana.uz`,
    ].join("\n"),
  });
}

export interface EmailResult {
  ok: boolean;
  error?: string;
}

// Send both emails with retry on transient failures
export async function sendContactEmails(data: ContactPayload): Promise<EmailResult> {
  const client = getResend();

  if (!client) {
    // Dev mode — log and continue
    console.log(
      "[email:dev]",
      JSON.stringify({ to: TO_ADDRESS, replyTo: data.email, data }, null, 2)
    );
    return { ok: true };
  }

  const attempt = async (fn: () => Promise<void>, label: string): Promise<void> => {
    const maxRetries = 2;
    let lastError: unknown;

    for (let i = 0; i <= maxRetries; i++) {
      try {
        await fn();
        return;
      } catch (err) {
        lastError = err;
        if (i < maxRetries) {
          // Exponential back-off: 500ms, 1000ms
          await new Promise((r) => setTimeout(r, 500 * 2 ** i));
          console.warn(`[email] retrying ${label} (attempt ${i + 2}/${maxRetries + 1})`);
        }
      }
    }

    throw lastError;
  };

  try {
    // Fire both in parallel; allow confirmation to fail without blocking notification
    const [notifyResult, confirmResult] = await Promise.allSettled([
      attempt(() => sendInternalNotification(data), "internal-notification"),
      attempt(() => sendConfirmation(data), "confirmation"),
    ]);

    const notifyFailed = notifyResult.status === "rejected";
    const confirmFailed = confirmResult.status === "rejected";

    if (notifyFailed) {
      // Internal notification failure is critical — surface to caller
      console.error("[email] internal notification failed:", notifyResult.reason);
      return {
        ok: false,
        error: "Email delivery failed. Please try again or contact us directly.",
      };
    }

    if (confirmFailed) {
      // Confirmation failure is non-critical — log but succeed
      console.warn("[email] confirmation email failed (non-critical):", confirmResult.reason);
    }

    console.log(
      JSON.stringify({
        event: "contact_submitted",
        company: data.company,
        ts: new Date().toISOString(),
        confirmationSent: !confirmFailed,
      })
    );

    return { ok: true };
  } catch (err) {
    console.error("[email] unexpected error:", err);
    return {
      ok: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
