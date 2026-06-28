"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const COPY: Record<string, {
  label: string; h2a: string; h2b: string; sub: string;
  demoTitle: string; demoSub: string; demoBtn: string;
  steps: { num: string; actor: string; title: string; body: string; img: string | null; imgAlt: string; tag: string }[];
}> = {
  ru: {
    label: "Путь заявки",
    h2a: "От открытия заявки",
    h2b: "до готового отчёта.",
    sub: "Каждый инцидент проходит структурированный, отслеживаемый путь — вы видите каждый шаг через GoARKAN. Никаких звонков для уточнения статуса. Никаких догадок.",
    demoTitle: "Хотите увидеть GoARKAN в работе?",
    demoSub: "Запросите консультацию — покажем платформу на ваших реальных данных.",
    demoBtn: "Получить консультацию",
    steps: [
      { num: "01", actor: "Сотрудник", title: "Создаёт заявку", body: "Через портал GoARKAN, email или Telegram. Заявка автоматически категоризируется, приоритизируется, таймер SLA запускается.", img: "/portal/tickets.jpeg", imgAlt: "GoARKAN service desk — список заявок", tag: "Портал · Email · Telegram" },
      { num: "02", actor: "Инженер", title: "Принимает и реагирует", body: "Ваш именной инженер берёт заявку в рамках договорного SLA. Клиент уведомляется автоматически.", img: "/portal/dashboard.jpeg", imgAlt: "GoARKAN — назначение инженера", tag: "< 1–2 часа первый ответ" },
      { num: "03", actor: "Инженер", title: "Решает удалённо или выезжает", body: "Сначала удалённая поддержка — большинство проблем решается за минуты. Выезд — если нужен физический доступ к оборудованию.", img: null, imgAlt: "", tag: "Удалённо → Выезд при необходимости" },
      { num: "04", actor: "Система", title: "Заявка закрыта и зафиксирована", body: "Решение задокументировано в GoARKAN. Каждое действие, временная метка и заметка сохранены. Ничего не исчезает.", img: "/portal/assets.jpeg", imgAlt: "GoARKAN — журнал активов и заявок", tag: "Полный след аудита" },
      { num: "05", actor: "Менеджер", title: "Получает ежемесячный отчёт", body: "Письменный отчёт каждый месяц: закрытые заявки, выполнение SLA, статус активов и рекомендации.", img: "/portal/companies.jpeg", imgAlt: "GoARKAN — отчёты клиентского портала", tag: "Ежемесячно · Письменно" },
    ],
  },
  en: {
    label: "Service Desk Journey",
    h2a: "From ticket open",
    h2b: "to report delivered.",
    sub: "Every incident follows a structured, traceable workflow — visible to you at every step through GoARKAN. No phone calls asking for status. No guessing.",
    demoTitle: "Want to see GoARKAN in action?",
    demoSub: "Request a consultation — we will walk you through the platform with your own data.",
    demoBtn: "Get a consultation",
    steps: [
      { num: "01", actor: "Employee", title: "Creates ticket", body: "Via GoARKAN portal, email, or Telegram. Ticket is auto-categorized, prioritized, and SLA timer starts.", img: "/portal/tickets.jpeg", imgAlt: "GoARKAN service desk — ticket list", tag: "Portal · Email · Telegram" },
      { num: "02", actor: "Engineer", title: "Accepts & responds", body: "Your named engineer takes the ticket within the contracted SLA window. Client notified automatically.", img: "/portal/dashboard.jpeg", imgAlt: "GoARKAN dashboard — engineer assignment", tag: "< 1–2h first response" },
      { num: "03", actor: "Engineer", title: "Resolves remotely or on-site", body: "Remote support first — resolves most issues in minutes. On-site visit dispatched when hardware or physical access is needed.", img: null, imgAlt: "", tag: "Remote → On-site if needed" },
      { num: "04", actor: "System", title: "Ticket closed & logged", body: "Resolution documented in GoARKAN. Every action, timestamp, and note logged. Nothing disappears.", img: "/portal/assets.jpeg", imgAlt: "GoARKAN asset and ticket log", tag: "Full audit trail" },
      { num: "05", actor: "Manager", title: "Receives monthly report", body: "Written report delivered every month: tickets closed, SLA performance, asset status, and actionable recommendations.", img: "/portal/companies.jpeg", imgAlt: "GoARKAN client portal — reporting view", tag: "Every month · Written" },
    ],
  },
  uz: {
    label: "Ariza yo'li",
    h2a: "Ariza ochilishidan",
    h2b: "hisobot yetkazilishigacha.",
    sub: "Har bir hodisa GoARKAN orqali har bosqichda ko'rinadigan tuzilgan, kuzatiluvchi ish oqimidan o'tadi. Holat so'rash uchun qo'ng'iroq yo'q. Taxmin yo'q.",
    demoTitle: "GoARKAN ni ishda ko'rmoqchimisiz?",
    demoSub: "Konsultatsiya so'rang — platformani sizning ma'lumotlaringizda ko'rsatamiz.",
    demoBtn: "Konsultatsiya olish",
    steps: [
      { num: "01", actor: "Xodim", title: "Ariza yaratadi", body: "GoARKAN portali, email yoki Telegram orqali. Ariza avtomatik toifalanadi, ustuvorlik belgilanadi, SLA taymer boshlanadi.", img: "/portal/tickets.jpeg", imgAlt: "GoARKAN service desk — ariza ro'yxati", tag: "Portal · Email · Telegram" },
      { num: "02", actor: "Muhandis", title: "Qabul qiladi va javob beradi", body: "Shaxsiy muhandisingiz shartnomali SLA doirasida arizani oladi. Mijozga avtomatik xabar yuboriladi.", img: "/portal/dashboard.jpeg", imgAlt: "GoARKAN paneli — muhandis tayinlash", tag: "< 1–2 soat birinchi javob" },
      { num: "03", actor: "Muhandis", title: "Masofaviy yoki joyida hal qiladi", body: "Avval masofaviy yordam — ko'p muammolar daqiqalar ichida hal bo'ladi. Apparat yoki jismoniy kirish zarur bo'lsa chiqib boriladi.", img: null, imgAlt: "", tag: "Masofaviy → Zarur bo'lsa joyida" },
      { num: "04", actor: "Tizim", title: "Ariza yopildi va qayd etildi", body: "Yechim GoARKAN'da hujjatlashtirilgan. Har bir harakat, vaqt tamg'asi va eslatma saqlanadi. Hech narsa yo'qolmaydi.", img: "/portal/assets.jpeg", imgAlt: "GoARKAN — aktivlar va arizalar jurnali", tag: "To'liq audit izi" },
      { num: "05", actor: "Menejer", title: "Oylik hisobot oladi", body: "Har oy yozma hisobot: yopilgan arizalar, SLA bajarish, aktivlar holati va amaliy tavsiyalar.", img: "/portal/companies.jpeg", imgAlt: "GoARKAN mijoz portali — hisobot ko'rinishi", tag: "Har oy · Yozma" },
    ],
  },
};

export function HomeJourney() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <section style={{ background: "var(--ark-bg)", paddingBottom: 80, borderTop: "1px solid var(--ark-divider)" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">

        {/* Header */}
        <div style={{ paddingTop: 64, paddingBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16 }}>
            {c.label}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end">
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: 1, letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: 0 }}>
              {c.h2a}
              <br />
              <span style={{ color: "var(--ark-text-sub)" }}>{c.h2b}</span>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--ark-text-sub)", margin: 0, letterSpacing: "-0.01em" }}>
              {c.sub}
            </p>
          </div>
        </div>

        {/* Timeline steps */}
        <div style={{ position: "relative" }}>
          <div className="hidden sm:block" style={{ position: "absolute", left: 27, top: 24, bottom: 24, width: 1, background: "var(--ark-border)", zIndex: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {c.steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="grid grid-cols-[40px_1fr] sm:grid-cols-[56px_1fr] gap-4 sm:gap-8 items-start relative"
                style={{ zIndex: 1 }}
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14" style={{ borderRadius: "50%", background: "var(--ark-bg)", border: "1px solid var(--ark-border-strong)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "-0.02em", color: "var(--ark-text-sub)" }}>
                    {step.num}
                  </span>
                </div>

                <div className={`grid grid-cols-1 ${step.img ? "lg:grid-cols-2" : ""} gap-6 lg:gap-10 items-start`} style={{ padding: "12px 0 40px" }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-faint)", marginBottom: 8 }}>
                      {step.actor}
                    </div>
                    <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-0.03em", color: "var(--ark-text-heading)", marginBottom: 12, lineHeight: 1.2 }}>
                      {step.title}
                    </div>
                    <p style={{ fontSize: 13.5, color: "var(--ark-text-sub)", lineHeight: 1.65, letterSpacing: "-0.01em", margin: "0 0 14px" }}>
                      {step.body}
                    </p>
                    <div style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 4, border: "1px solid var(--ark-border)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", color: "var(--ark-text-label)" }}>
                      {step.tag}
                    </div>
                  </div>

                  {step.img && (
                    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--ark-border)", background: "var(--ark-bg-2)" }}>
                      <div style={{ height: 26, background: "var(--ark-bg-2)", borderBottom: "1px solid var(--ark-divider)", display: "flex", alignItems: "center", padding: "0 10px", gap: 5 }}>
                        {["#ef4444","#f59e0b","#22c55e"].map(col => (
                          <span key={col} style={{ width: 7, height: 7, borderRadius: "50%", background: col, display: "block" }} />
                        ))}
                      </div>
                      <Image src={step.img} alt={step.imgAlt} width={560} height={315} style={{ width: "100%", height: "auto", display: "block" }} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" style={{ marginTop: 40, paddingTop: 40, borderTop: "1px solid var(--ark-divider)" }}>
          <div>
            <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.125rem", letterSpacing: "-0.03em", color: "var(--ark-text-heading)", marginBottom: 6 }}>
              {c.demoTitle}
            </div>
            <div style={{ fontSize: 13, color: "var(--ark-text-muted)", letterSpacing: "-0.01em" }}>
              {c.demoSub}
            </div>
          </div>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "12px 24px", borderRadius: 7, background: "var(--ark-accent)", color: "#ffffff", fontWeight: 700, fontSize: 13, letterSpacing: "-0.01em", textDecoration: "none", flexShrink: 0 }}>
            {c.demoBtn}
          </Link>
        </div>

      </div>
    </section>
  );
}
