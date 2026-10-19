"use client";

import { useApp } from "@/components/providers/ThemeLanguageProvider";

const ITEMS: Record<string, string[]> = {
  ru: ["IT-подписка от 8,5 млн сум", "Выезд по Ташкенту 100 000 сум", "Сроки реакции в договоре", "Заявки из Telegram", "Цифровой офис GoARKAN", "ЭЦП, E-IMZO, Didox", "Microsoft 365", "Сети и Wi-Fi", "Серверы и бэкапы", "IP-телефония", "Telegram-боты под ключ", "Паспорт IT-инфраструктуры", "Отчёт руководителю каждый месяц", "Без НДС"],
  uz: ["IT obuna 8,5 mln so'mdan", "Toshkent bo'ylab tashrif 100 000 so'm", "Javob muddatlari shartnomada", "Telegram orqali arizalar", "GoARKAN raqamli ofisi", "ERI, E-IMZO, Didox", "Microsoft 365", "Tarmoq va Wi-Fi", "Serverlar va zaxira", "IP-telefoniya", "Tayyor Telegram-botlar", "IT infratuzilma pasporti", "Har oy rahbarga hisobot", "QQSsiz"],
  en: ["IT subscription from 8.5M UZS", "Call-out in Tashkent 100,000 UZS", "Response times in contract", "Tickets via Telegram", "GoARKAN digital office", "E-signature, E-IMZO, Didox", "Microsoft 365", "Networks and Wi-Fi", "Servers and backups", "IP telephony", "Turnkey Telegram bots", "IT infrastructure passport", "Monthly management report", "VAT-exempt"],
  zh: ["IT订阅850万苏姆起", "塔什干上门10万苏姆", "响应时间写入合同", "Telegram提交工单", "GoARKAN数字办公室", "电子签名 E-IMZO Didox", "Microsoft 365", "网络与Wi-Fi", "服务器与备份", "IP电话", "Telegram机器人定制", "IT基础设施档案", "每月管理报告", "免增值税"],
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
