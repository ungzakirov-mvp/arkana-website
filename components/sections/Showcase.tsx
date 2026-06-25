"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "service-desk",
    label: "Сервис-деск",
    description:
      "Все обращения в одном месте. Статус, приоритет, назначенный инженер и время решения — без необходимости что-то уточнять.",
    content: (
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-[700] text-[#0B1540]">Все заявки</span>
          <span className="text-[10px] font-[600] text-[#1A6BFF] bg-[rgba(26,107,255,0.08)] border border-[rgba(26,107,255,0.18)] px-2.5 py-1 rounded-full">
            3 открытых
          </span>
        </div>
        {[
          { title: "Запрос VPN-доступа — А. Каримов", meta: "2 часа назад · Высокий приоритет", status: "Открыта", sc: "text-[#1A6BFF] bg-[rgba(26,107,255,0.08)]" },
          { title: "Настройка ноутбука для нового сотрудника", meta: "5 часов назад · Средний", status: "В работе", sc: "text-[#D97706] bg-amber-50" },
          { title: "Миграция почты — Финансовый отдел", meta: "Вчера · Низкий", status: "Решена", sc: "text-[rgba(11,21,64,0.40)] bg-[rgba(11,21,64,0.05)]" },
          { title: "Принтер не отвечает — 3 этаж", meta: "2 дня назад · Низкий", status: "Решена", sc: "text-[rgba(11,21,64,0.40)] bg-[rgba(11,21,64,0.05)]" },
        ].map(({ title, meta, status, sc }) => (
          <div
            key={title}
            className="flex items-center justify-between bg-[#F8FAFC] border border-[rgba(0,0,0,0.07)] rounded-[10px] px-4 py-3 mb-2"
          >
            <div>
              <p className="text-[12px] font-[600] text-[#0B1540]">{title}</p>
              <p className="text-[10.5px] text-[rgba(11,21,64,0.45)] mt-0.5">{meta}</p>
            </div>
            <span className={`text-[10px] font-[700] px-2.5 py-1 rounded-full flex-shrink-0 ml-3 ${sc}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "assets",
    label: "Активы",
    description:
      "Знайте, что принадлежит вашей компании. Каждое устройство, местоположение, пользователь и дата гарантии — всегда актуально.",
    content: (
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-[700] text-[#0B1540]">Инвентарь активов</span>
          <span className="text-[10px] text-[rgba(11,21,64,0.45)]">124 устройства</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Ноутбуки", count: "67", color: "bg-[rgba(11,21,64,0.06)] text-[#0B1540]" },
            { label: "Мониторы", count: "34", color: "bg-[rgba(90,63,255,0.08)] text-[#5A3FFF]" },
            { label: "Серверы", count: "12", color: "bg-[rgba(0,194,170,0.08)] text-[#00C2AA]" },
          ].map(({ label, count, color }) => (
            <div key={label} className={`${color} rounded-[10px] p-3 text-center`}>
              <p className="text-[18px] font-[800]">{count}</p>
              <p className="text-[10px] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
        {[
          { device: "MacBook Pro 14\" M3", user: "Д. Юсупов", status: "Активен", warranty: "Янв 2027" },
          { device: "Dell XPS 15 9530", user: "Н. Рашидова", status: "Активен", warranty: "Авг 2026" },
          { device: "HP EliteBook 840 G10", user: "— (резервный)", status: "Доступен", warranty: "Мар 2026" },
        ].map(({ device, user, status, warranty }) => (
          <div
            key={device}
            className="flex items-center justify-between bg-[#F8FAFC] border border-[rgba(0,0,0,0.07)] rounded-[10px] px-4 py-3 mb-2"
          >
            <div>
              <p className="text-[12px] font-[600] text-[#0B1540]">{device}</p>
              <p className="text-[10.5px] text-[rgba(11,21,64,0.45)] mt-0.5">{user} · Гарантия: {warranty}</p>
            </div>
            <span className={`text-[10px] font-[700] px-2.5 py-1 rounded-full flex-shrink-0 ml-3 ${
              status === "Активен" ? "text-[rgba(11,21,64,0.40)] bg-[rgba(11,21,64,0.05)]" : "text-[rgba(11,21,64,0.35)] bg-[#F0F4FF]"
            }`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "analytics",
    label: "Аналитика",
    description:
      "ИТ-производительность с первого взгляда. Ежемесячные отчёты и метрики — без необходимости их запрашивать.",
    content: (
      <div className="p-5">
        <p className="text-[12px] font-[700] text-[#0B1540] mb-4">Показатели за этот месяц</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "Заявок решено", value: "47", sub: "в этом месяце" },
            { label: "Среднее время решения", value: "3.2ч", sub: "на заявку" },
            { label: "Соблюдение SLA", value: "100%", sub: "все приоритеты" },
            { label: "Активов под мониторингом", value: "124", sub: "устройства" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-[#F8FAFC] border border-[rgba(0,0,0,0.07)] rounded-[12px] p-4">
              <p className="text-[20px] font-[800] text-[#0B1540]">{value}</p>
              <p className="text-[11px] font-[600] text-[#0B1540] mt-0.5">{label}</p>
              <p className="text-[10px] text-[rgba(11,21,64,0.40)]">{sub}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#F8FAFC] border border-[rgba(0,0,0,0.07)] rounded-[12px] p-4">
          <p className="text-[11px] font-[600] text-[#0B1540] mb-3">Объём заявок — последние 6 месяцев</p>
          <div className="flex items-end gap-2 h-[60px]">
            {[40, 58, 45, 70, 62, 47].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-[4px]"
                  style={{ height: `${h}%`, background: "rgba(26,107,255,0.18)" }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["Авг", "Сен", "Окт", "Ноя", "Дек", "Янв"].map((m) => (
              <span key={m} className="text-[9px] text-[rgba(11,21,64,0.35)] flex-1 text-center">{m}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "knowledge",
    label: "База знаний",
    description:
      "Живая библиотека руководств, runbook-ов и документации — созданная и поддерживаемая вашей командой ARKANA.",
    content: (
      <div className="p-5">
        <div className="bg-[#F8FAFC] border border-[rgba(0,0,0,0.07)] rounded-[10px] px-4 py-2.5 flex items-center gap-2 mb-4">
          <span className="text-[rgba(11,21,64,0.35)] text-[12px]">🔍</span>
          <span className="text-[12px] text-[rgba(11,21,64,0.40)]">Поиск по базе знаний...</span>
        </div>
        {[
          { cat: "Онбординг", title: "Чек-лист настройки ИТ для нового сотрудника", views: "38 просмотров" },
          { cat: "Безопасность", title: "Руководство по настройке VPN — Windows и macOS", views: "52 просмотра" },
          { cat: "Доступ", title: "Как запросить доступ к программному обеспечению", views: "24 просмотра" },
          { cat: "Оборудование", title: "Как сообщить о неисправном устройстве", views: "17 просмотров" },
        ].map(({ cat, title, views }) => (
          <div
            key={title}
            className="flex items-center justify-between bg-[#F8FAFC] border border-[rgba(0,0,0,0.07)] rounded-[10px] px-4 py-3 mb-2"
          >
            <div>
              <span className="text-[9px] font-[700] uppercase tracking-[0.06em] text-[#1A6BFF] bg-[rgba(26,107,255,0.08)] px-2 py-0.5 rounded-full mr-2">
                {cat}
              </span>
              <p className="text-[12px] font-[600] text-[#0B1540] mt-1.5">{title}</p>
            </div>
            <span className="text-[10px] text-[rgba(11,21,64,0.40)] flex-shrink-0 ml-3">{views}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const current = tabs[active];

  return (
    <section style={{ background: "#F2F6FF", padding: "96px 0" }} ref={ref}>
      <div className="max-w-[75rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-[560px] mb-12"
        >
          <span className="eyebrow" style={{ marginBottom: 20, display: "inline-flex" }}>
            Посмотрите в действии
          </span>
          <h2
            style={{
              fontSize: "clamp(32px, 3.2vw, 46px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#0B1540",
              marginBottom: 20,
              marginTop: 16,
            }}
          >
            Платформа, на которой
            <br />
            работает ваш ИТ.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(11,21,64,0.55)", lineHeight: 1.65 }}>
            Реальный интерфейс. Именно то, с чем вы и ваша команда работаете каждый день — не макет, не обещание.
          </p>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex gap-1 mb-6 overflow-x-auto pb-1"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              style={{
                padding: "10px 16px",
                borderRadius: 0,
                borderBottom: active === i ? "2px solid #1A6BFF" : "2px solid transparent",
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
                color: active === i ? "#1A6BFF" : "rgba(11,21,64,0.40)",
                background: "transparent",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Browser window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(11,21,64,0.08)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(11,21,64,0.09)",
          }}
        >
          {/* Browser chrome */}
          <div
            style={{
              background: "#F8FAFC",
              borderBottom: "1px solid rgba(11,21,64,0.07)",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div
              style={{
                flex: 1,
                background: "#FFFFFF",
                border: "1px solid rgba(11,21,64,0.08)",
                borderRadius: 6,
                padding: "6px 12px",
                fontSize: 11,
                color: "rgba(11,21,64,0.40)",
              }}
            >
              goarkan.uz · {current.label}
            </div>
          </div>

          <div className="flex min-h-[380px]">
            {/* App sidebar */}
            <div
              className="hidden sm:flex flex-col w-[150px] p-3 gap-1"
              style={{ borderRight: "1px solid rgba(11,21,64,0.07)", background: "#F8FAFC" }}
            >
              {tabs.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  style={{
                    textAlign: "left",
                    padding: "8px 12px",
                    borderRadius: 9,
                    fontSize: 11.5,
                    fontWeight: active === i ? 700 : 500,
                    color: active === i ? "#0B1540" : "rgba(11,21,64,0.40)",
                    background: active === i ? "rgba(26,107,255,0.08)" : "transparent",
                    cursor: "pointer",
                    border: "none",
                    transition: "all 0.15s",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Main panel */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                >
                  {current.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Tab description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ marginTop: 20, fontSize: 14, color: "rgba(11,21,64,0.45)", textAlign: "center", maxWidth: 540, margin: "20px auto 0" }}
          >
            {current.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
