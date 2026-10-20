/**
 * Доставка заявки с сайта. Сайт полностью статичный и с GoARKAN не связан.
 * Заявка принята, если дошла хотя бы в один канал:
 *  1. Telegram-бот в рабочий чат — основной.  env: TELEGRAM_LEADS_BOT_TOKEN, TELEGRAM_LEADS_CHAT_ID (через запятую)
 *  2. Письмо через Resend — резервный.         env: RESEND_API_KEY, CONTACT_TO_EMAIL (по умолчанию info@arkana.uz)
 */

export type Lead = {
  name: string;
  phone: string;
  company?: string;
  email?: string;
  message?: string;
  service?: string;
  plan_slug?: string;
  lang?: string;
  landing_page?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

function rows(l: Lead): [string, string][] {
  const r: [string, string | undefined][] = [
    ["Имя", l.name],
    ["Телефон", l.phone],
    ["Компания", l.company],
    ["Email", l.email],
    ["Что нужно", l.service],
    ["Тариф", l.plan_slug],
    ["Сообщение", l.message],
    ["Страница", l.landing_page],
    ["Откуда", l.referrer],
    ["UTM", [l.utm_source, l.utm_medium, l.utm_campaign, l.utm_content].filter(Boolean).join(" / ") || undefined],
    ["Язык", l.lang],
  ];
  return r.filter((x): x is [string, string] => !!x[1] && !!x[1].trim()).map(([k, v]) => [k, v.trim()]);
}

async function sendTelegram(l: Lead): Promise<boolean> {
  const token = process.env.TELEGRAM_LEADS_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_LEADS_CHAT_ID ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!token || chats.length === 0) {
    console.warn("[leads] Telegram не настроен: TELEGRAM_LEADS_BOT_TOKEN / TELEGRAM_LEADS_CHAT_ID");
    return false;
  }
  const tel = l.phone.replace(/[^\d+]/g, "");
  const text = [
    "<b>🔥 Новая заявка с arkana.uz</b>",
    "",
    ...rows(l).map(([k, v]) => `<b>${k}:</b> ${esc(v)}`),
    tel ? `\n<a href="tel:${tel}">Позвонить</a>` : "",
  ].join("\n");
  const results = await Promise.allSettled(
    chats.map((chat_id) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id, text, parse_mode: "HTML", disable_web_page_preview: true }),
        signal: AbortSignal.timeout(8000),
      }).then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return true;
      }),
    ),
  );
  const ok = results.some((r) => r.status === "fulfilled");
  if (!ok) console.error("[leads] Telegram не доставил:", results);
  return ok;
}

async function sendEmail(l: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[leads] почта не настроена: RESEND_API_KEY");
    return false;
  }
  const html =
    `<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8"/></head><body>` +
    `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">` +
    `<h2 style="color:#1f9d5a;margin-bottom:20px">Новая заявка с сайта ARKANA</h2>` +
    `<table style="width:100%;border-collapse:collapse">` +
    rows(l).map(([k, v]) =>
      `<tr><td style="padding:10px 12px;background:#f8f9fa;font-weight:600;color:#64748b;font-size:13px;width:30%">${k}</td>` +
      `<td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#1e293b;font-size:14px">${esc(v)}</td></tr>`).join("") +
    `</table></div></body></html>`;
  try {
    const { Resend } = await import("resend");
    const { error } = await new Resend(apiKey).emails.send({
      from: "ARKANA Website <noreply@arkana.uz>",
      to: [process.env.CONTACT_TO_EMAIL ?? "info@arkana.uz"],
      subject: `Новая заявка: ${l.name}${l.company ? ` — ${l.company}` : ""}`,
      html,
      ...(l.email ? { replyTo: l.email } : {}),
    });
    if (error) {
      console.error("[leads] Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[leads] Resend failed:", err instanceof Error ? err.message : err);
    return false;
  }
}

export async function deliverLead(l: Lead): Promise<{ ok: boolean }> {
  const [tg, mail] = await Promise.allSettled([sendTelegram(l), sendEmail(l)]);
  const ok = (tg.status === "fulfilled" && tg.value) || (mail.status === "fulfilled" && mail.value);
  if (!ok) console.error("[leads] заявка не доставлена ни в один канал");
  return { ok };
}
