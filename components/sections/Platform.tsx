"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, TicketCheck, HardDrive, FileText } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const features = [
  {
    icon: TicketCheck,
    title: "Сервис-деск",
    body: "Каждый запрос, эскалация и решение — отслеживаются и видны.",
  },
  {
    icon: HardDrive,
    title: "Активы и инвентарь",
    body: "Точно знайте, что у вас есть, где это находится и когда истекает срок.",
  },
  {
    icon: FileText,
    title: "Ежемесячные отчёты",
    body: "Структурированные ИТ-отчёты по расписанию — без необходимости напоминать.",
  },
];

const TICKETS = [
  { title: "VPN-доступ — А. Каримов", time: "2 ч. назад", status: "Открыта" },
  { title: "Настройка ноутбука — новый сотрудник", time: "5 ч. назад", status: "В работе" },
  { title: "Миграция почты — Финансы", time: "Вчера", status: "Решена" },
  { title: "Обновление правил фаервола", time: "2 дня назад", status: "Решена" },
];

const STATUS: Record<string, { color: string; bg: string }> = {
  "Открыта":  { color: "#1A6BFF", bg: "rgba(26,107,255,0.12)" },
  "В работе": { color: "rgba(11,21,64,0.55)", bg: "rgba(11,21,64,0.06)" },
  "Решена":   { color: "rgba(11,21,64,0.30)", bg: "rgba(11,21,64,0.04)" },
};

export function Platform() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: "#F2F6FF", padding: "96px 0" }} ref={ref}>
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}
          className="max-lg:grid-cols-1"
        >
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="eyebrow" style={{ marginBottom: 20, display: "inline-flex" }}>
              Платформа
            </span>
            <h2
              style={{
                fontSize: "clamp(30px, 3.0vw, 44px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#0B1540",
                marginTop: 16,
                marginBottom: 20,
              }}
            >
              GOARKAN — ваш
              <br />
              ИТ-портал.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(11,21,64,0.55)", lineHeight: 1.65, marginBottom: 36 }}>
              Мы создали собственную платформу управления сервисами, чтобы у клиентов была полная видимость каждой заявки, актива и действия.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
              {features.map(({ icon: Icon, title, body }) => (
                <div key={title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      background: "rgba(26,107,255,0.08)",
                      border: "1px solid rgba(26,107,255,0.16)",
                      borderRadius: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={17} style={{ color: "#1A6BFF" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#0B1540", marginBottom: 3 }}>{title}</p>
                    <p style={{ fontSize: 13, color: "rgba(11,21,64,0.50)", lineHeight: 1.55 }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://goarkan.uz"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 700,
                color: "#1A6BFF",
                textDecoration: "none",
                borderBottom: "1.5px solid rgba(26,107,255,0.30)",
                paddingBottom: 2,
              }}
            >
              Посетить GOARKAN
              <ArrowUpRight size={14} />
            </a>
          </motion.div>

          {/* Right: GOARKAN mockup */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.15, duration: 0.85, ease: EASE }}
          >
            <div
              style={{
                background: "#0B1540",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(11,21,64,0.20), 0 4px 16px rgba(11,21,64,0.10)",
              }}
            >
              {/* Window chrome */}
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  {["#FF5F57","#FFBD2E","#28CA41"].map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginLeft: 6 }}>
                  GOARKAN — Сервис-деск
                </span>
                <div
                  style={{
                    marginLeft: "auto",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#1A6BFF",
                    background: "rgba(26,107,255,0.15)",
                    border: "1px solid rgba(26,107,255,0.25)",
                    padding: "2px 8px",
                    borderRadius: 20,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  LIVE
                </div>
              </div>

              {/* Tickets */}
              <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
                {TICKETS.map(({ title, time, status }) => {
                  const s = STATUS[status] ?? STATUS["Решена"];
                  return (
                    <div
                      key={title}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 10,
                        padding: "11px 14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <div>
                        <p style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 2 }}>
                          {title}
                        </p>
                        <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.28)" }}>{time}</p>
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: s.color,
                          background: s.bg,
                          padding: "3px 8px",
                          borderRadius: 20,
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
