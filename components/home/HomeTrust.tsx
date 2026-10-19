"use client";

import { useApp } from "@/components/providers/ThemeLanguageProvider";

const ITEMS: Record<string, string[]> = {
  ru: ["IT-обслуживание по подписке", "Выезд мастера по Ташкенту", "Сроки реакции в договоре", "Заявки из Telegram", "Цифровой офис GoARKAN", "ЭЦП, E-IMZO, Didox", "Microsoft 365", "Сети и Wi-Fi", "Серверы и бэкапы", "IP-телефония", "Telegram-боты под ключ", "Паспорт IT-инфраструктуры", "Отчёт руководителю каждый месяц", "Без НДС"],
  uz: ["Obuna bo'yicha IT xizmat", "Toshkent bo'ylab usta chaqirish", "Javob muddatlari shartnomada", "Telegram orqali arizalar", "GoARKAN raqamli ofisi", "ERI, E-IMZO, Didox", "Microsoft 365", "Tarmoq va Wi-Fi", "Serverlar va zaxira", "IP-telefoniya", "Tayyor Telegram-botlar", "IT infratuzilma pasporti", "Har oy rahbarga hisobot", "QQSsiz"],
  en: ["IT support subscription", "Call-outs across Tashkent", "Response times in contract", "Tickets via Telegram", "GoARKAN digital office", "E-signature, E-IMZO, Didox", "Microsoft 365", "Networks and Wi-Fi", "Servers and backups", "IP telephony", "Turnkey Telegram bots", "IT infrastructure passport", "Monthly management report", "VAT-exempt"],
  zh: ["IT订阅服务", "塔什干上门服务", "响应时间写入合同", "Telegram提交工单", "GoARKAN数字办公室", "电子签名 E-IMZO Didox", "Microsoft 365", "网络与Wi-Fi", "服务器与备份", "IP电话", "Telegram机器人定制", "IT基础设施档案", "每月管理报告", "免增值税"],
};

export function HomeTrust() {
  const { lang } = useApp();
  const items = ITEMS[lang] ?? ITEMS.ru;
  const track = [...items, ...items, ...items, ...items];

  return (
    <div
      className="trust-ticker"
      style={{
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        padding: "22px 0",
        background: "#0b1210",
        borderTop:    "1px solid rgba(238,242,238,0.08)",
        borderBottom: "1px solid rgba(238,242,238,0.08)",
        maskImage:         "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:   "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "trustScroll 70s linear infinite",
          willChange: "transform",
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 24,
              paddingRight: 24,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9fb0a6",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: "#4fd18a",
                fontSize: 6,
                opacity: 0.5,
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
