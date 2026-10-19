import { submitLead, type LeadInput } from "@/lib/cms-api";

/**
 * Доставка заявки сразу в несколько каналов. Заявка принята, если дошла хотя бы в один.
 *  1. Telegram-бот в рабочий чат — основной, приходит за секунды.
 *     env: TELEGRAM_LEADS_BOT_TOKEN, TELEGRAM_LEADS_CHAT_ID (можно несколько через запятую)
 *  2. GoARKAN CRM → при недоступности письмо через Resend (логика в submitLead).
 */

export type Lead = LeadInput & { service?: string; lang?: string };

const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);

function formatLead(l: Lead): string {
  const rows: [string, string | undefined][] = [
    ["👤 Имя", l.name],
    ["📞 Телефон", l.phone],
    ["🏢 Компания", l.company],
    ["✉️ Email", l.email],
    ["🧩 Что нужно", l.service],
    ["💳 Тариф", l.plan_slug],
    ["💬 Сообщение", l.message],
    ["🌐 Страница", l.landing_page],
    ["🔗 Откуда", l.referrer],
    ["🏷 UTM", [l.utm_source, l.utm_medium, l.utm_campaign, l.utm_content].filter(Boolean).join(" / ") || undefined],
    ["🗣 Язык", l.lang],
  ];
  const tel = l.phone?.replace(/[^\d+]/g, "");
  return [
    "<b>🔥 Новая заявка с arkana.uz</b>",
    "",
    ...rows.filter(([, v]) => v && v.trim()).map(([k, v]) => `${k}: ${esc(v!.trim())}`),
    tel ? `\n<a href="tel:${tel}">Позвонить</a>` : "",
  ].join("\n");
}

async function sendTelegram(l: Lead): Promise<boolean> {
  const token = process.env.TELEGRAM_LEADS_BOT_TOKEN;
  const chats = (process.env.TELEGRAM_LEADS_CHAT_ID ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!token || chats.length === 0) {
    console.warn("[leads] Telegram не настроен: TELEGRAM_LEADS_BOT_TOKEN / TELEGRAM_LEADS_CHAT_ID");
    return false;
  }
  const text = formatLead(l);
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

export async function deliverLead(l: Lead): Promise<{ ok: boolean }> {
  const [tg, crm] = await Promise.allSettled([
    sendTelegram(l),
    submitLead({
      ...l,
      company: l.company || "—",
      email: l.email || "",
      interested_in: l.service,
      message: [l.service && `Услуга: ${l.service}`, l.message].filter(Boolean).join("\n") || undefined,
    }),
  ]);
  const tgOk = tg.status === "fulfilled" && tg.value;
  const crmOk = crm.status === "fulfilled" && crm.value.ok;
  if (!tgOk && !crmOk) console.error("[leads] заявка не доставлена ни в один канал", { tg, crm });
  return { ok: tgOk || crmOk };
}
