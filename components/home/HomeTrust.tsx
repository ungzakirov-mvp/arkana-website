"use client";

import { motion } from "framer-motion";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const COPY: Record<string, {
  cards: {
    tag: string;
    title: string;
    body: string;
    points: string[];
    accent?: boolean;
  }[];
}> = {
  ru: {
    cards: [
      {
        tag: "GoARKAN",
        title: "Вы видите всё,\nчто видим мы.",
        body: "Собственная платформа управления IT — не Excel и не мессенджер. Каждая заявка, каждый актив, каждое изменение зафиксированы и доступны вам в реальном времени.",
        points: [
          "Портал для сотрудников: создать заявку за 30 секунд",
          "Клиентский дашборд с активными задачами и SLA",
          "Реестр всей техники и лицензий вашей компании",
          "Документация сети — всегда актуальная, не в голове инженера",
        ],
      },
      {
        tag: "Operations",
        title: "Именной инженер.\nSLA в договоре.",
        body: "За вашей компанией закреплён конкретный технический руководитель. Не колл-центр, не ротация — человек, который знает вашу инфраструктуру.",
        points: [
          "Первый ответ < 2 часов по договорному SLA",
          "24/7 мониторинг инфраструктуры",
          "Удалённое решение → выезд при необходимости",
          "99.9% доступность, зафиксированная в договоре",
        ],
        accent: true,
      },
      {
        tag: "Business",
        title: "Один договор.\nНикаких сюрпризов.",
        body: "Фиксированная стоимость каждый месяц. Вы знаете бюджет на IT на год вперёд — без внезапных счётов, без переговоров при каждом инциденте.",
        points: [
          "Запуск за 5 рабочих дней с момента подписания",
          "0 скрытых платежей — всё прописано в договоре",
          "Масштабирование по заявке, без найма и увольнений",
          "Ежемесячный письменный отчёт по фактическим данным",
        ],
      },
    ],
  },
  en: {
    cards: [
      {
        tag: "GoARKAN",
        title: "You see everything\nwe see.",
        body: "Our own IT management platform — not Excel, not a messenger. Every ticket, every asset, every change is logged and visible to you in real time.",
        points: [
          "Employee portal: submit a ticket in 30 seconds",
          "Client dashboard with active tasks and SLA status",
          "Full hardware and licence registry for your company",
          "Network documentation — always current, not in someone's head",
        ],
      },
      {
        tag: "Operations",
        title: "Named engineer.\nSLA in the contract.",
        body: "A specific technical lead is assigned to your company. Not a call centre, not rotation — someone who knows your infrastructure.",
        points: [
          "First response < 2 hours per contracted SLA",
          "24/7 infrastructure monitoring",
          "Remote resolution → on-site when needed",
          "99.9% availability, contractually binding",
        ],
        accent: true,
      },
      {
        tag: "Business",
        title: "One contract.\nNo surprises.",
        body: "Fixed cost every month. You know your IT budget a year ahead — no surprise invoices, no negotiation at every incident.",
        points: [
          "Go-live in 5 business days from signing",
          "0 hidden fees — everything is in the contract",
          "Scale up or down on request, no hiring or firing",
          "Monthly written report based on real data",
        ],
      },
    ],
  },
  uz: {
    cards: [
      {
        tag: "GoARKAN",
        title: "Biz ko'rgan narsani\nsiz ham ko'rasiz.",
        body: "O'zimizning IT boshqaruv platformasi — Excel emas, messenjer emas. Har bir ariza, har bir aktiv, har bir o'zgarish real vaqtda siz uchun mavjud.",
        points: [
          "Xodimlar portali: 30 soniyada ariza yuborish",
          "Faol vazifalar va SLA holati bilan mijoz paneli",
          "Kompaniyangizdagi barcha texnika va litsenziyalar reestri",
          "Tarmoq hujjatlari — har doim yangilangan, muhandis xotirasida emas",
        ],
      },
      {
        tag: "Operations",
        title: "Shaxsiy muhandis.\nShartnomada SLA.",
        body: "Kompaniyangizga aniq texnik rahbar biriktiriladi. Call-markaz emas, rotatsiya emas — infratuzilmangizni biladigan inson.",
        points: [
          "Shartnomali SLA bo'yicha < 2 soatda birinchi javob",
          "24/7 infratuzilma monitoringi",
          "Masofaviy yechim → zarur bo'lsa joyida",
          "Shartnomada belgilangan 99.9% mavjudlik",
        ],
        accent: true,
      },
      {
        tag: "Business",
        title: "Bitta shartnoma.\nHech qanday kutilmagan narsa.",
        body: "Har oy belgilangan narx. IT byudjetingizni bir yil oldin bilasiz — kutilmagan hisoblar yo'q, har bir hodisada muzokaralar yo'q.",
        points: [
          "Imzolashdan 5 ish kunida ishga tushirish",
          "0 yashirin to'lovlar — hammasi shartnomada",
          "Yollash va ishdan bo'shatishsiz so'rovga ko'ra kengaytirish",
          "Haqiqiy ma'lumotlar asosida oylik yozma hisobot",
        ],
      },
    ],
  },
};

export function HomeTrust() {
  const { lang, theme } = useApp();
  const { cards } = COPY[lang] ?? COPY.ru;
  const isDark = theme === "dark";

  return (
    <section style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)", paddingTop: 80, paddingBottom: 80 }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ border: "1px solid var(--ark-border)", borderRadius: 16, overflow: "hidden", background: "var(--ark-border)" }}>
          {cards.map(({ tag, title, body, points, accent }, i) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                padding: "36px 32px",
                background: accent
                  ? isDark ? "rgba(99,102,241,0.07)" : "rgba(99,102,241,0.04)"
                  : "var(--ark-bg)",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                position: "relative",
              }}
            >
              {/* Tag */}
              <div style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                padding: "3px 10px",
                borderRadius: 5,
                border: `1px solid ${accent ? "rgba(99,102,241,0.35)" : "var(--ark-border)"}`,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: accent ? "var(--ark-accent-2)" : "var(--ark-text-hint)",
                marginBottom: 24,
              }}>
                {tag}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "Nacelle, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.375rem, 2vw, 1.625rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.04em",
                color: "var(--ark-text-heading)",
                margin: "0 0 16px",
                whiteSpace: "pre-line",
              }}>
                {title}
              </h3>

              {/* Body */}
              <p style={{
                fontSize: 13.5,
                lineHeight: 1.65,
                color: "var(--ark-text-sub)",
                letterSpacing: "-0.01em",
                margin: "0 0 28px",
              }}>
                {body}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: accent ? "rgba(99,102,241,0.2)" : "var(--ark-divider)", marginBottom: 24 }} />

              {/* Points */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {points.map((pt) => (
                  <li key={pt} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{
                      display: "block",
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      flexShrink: 0,
                      marginTop: 6,
                      background: accent ? "var(--ark-accent-2)" : "var(--ark-border-strong)",
                    }} />
                    <span style={{ fontSize: 13, color: "var(--ark-text-muted)", lineHeight: 1.55, letterSpacing: "-0.01em" }}>
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
