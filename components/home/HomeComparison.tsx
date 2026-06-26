"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const COPY: Record<string, {
  label: string; h2a: string; h2b: string; catHeader: string;
  rows: { label: string; internal: string; arkana: string }[];
}> = {
  ru: {
    label: "Почему ARKANA",
    h2a: "Штатный IT-отдел",
    h2b: "против ARKANA.",
    catHeader: "Параметр",
    rows: [
      { label: "Ежемесячные расходы",    internal: "Переменные + скрытые затраты",  arkana: "Фиксированная цена за рабочее место" },
      { label: "Первый ответ",           internal: "Нет гарантированного SLA",      arkana: "SLA 1–2 часа в договоре" },
      { label: "Покрытие 24/7",          internal: "Как правило, не предусмотрено", arkana: "Всегда включено" },
      { label: "Больничный / отпуск",    internal: "Работа останавливается",        arkana: "Команда продолжает без перебоев" },
      { label: "Прозрачность в реальном времени", internal: "Нет — спрашиваете сами", arkana: "Дашборд GoARKAN + отчёты" },
      { label: "Учёт активов",           internal: "Таблицы Excel, если есть",      arkana: "Автоматический реестр в GoARKAN" },
      { label: "Отчётность",             internal: "По запросу, без системы",       arkana: "Ежемесячный письменный отчёт" },
      { label: "Кибербезопасность",      internal: "Реактивно, по случаю",          arkana: "Проактивный мониторинг + политика" },
      { label: "Масштабируемость",       internal: "Нанять / уволить",              arkana: "Добавить или убрать места мгновенно" },
      { label: "Ответственность",        internal: "Корпоративная политика",        arkana: "SLA с финансовыми штрафами" },
    ],
  },
  en: {
    label: "Why ARKANA",
    h2a: "Internal IT department",
    h2b: "vs ARKANA.",
    catHeader: "Category",
    rows: [
      { label: "Monthly cost",          internal: "Variable + hidden costs",   arkana: "Fixed per seat" },
      { label: "First response",        internal: "No guaranteed SLA",         arkana: "1–2h SLA in contract" },
      { label: "24/7 coverage",         internal: "Usually not covered",       arkana: "Always included" },
      { label: "Sick leave / vacation", internal: "No coverage, work stops",   arkana: "Team continues uninterrupted" },
      { label: "Real-time visibility",  internal: "None — you ask, they tell", arkana: "GoARKAN dashboard + reports" },
      { label: "Asset tracking",        internal: "Spreadsheets, if any",      arkana: "Automated registry in GoARKAN" },
      { label: "Reporting",             internal: "On request, inconsistent",  arkana: "Monthly written report" },
      { label: "Cybersecurity",         internal: "Ad-hoc, reactive",          arkana: "Proactive monitoring + policy" },
      { label: "Scalability",           internal: "Hire / fire cycle",         arkana: "Add or remove seats instantly" },
      { label: "Accountability",        internal: "Internal politics",         arkana: "SLA with financial penalties" },
    ],
  },
  uz: {
    label: "Nima uchun ARKANA",
    h2a: "Shtat IT bo'limi",
    h2b: "ARKANA'ga qarshi.",
    catHeader: "Mezon",
    rows: [
      { label: "Oylik xarajatlar",      internal: "O'zgaruvchan + yashirin xarajatlar", arkana: "Ish joyi uchun belgilangan narx" },
      { label: "Birinchi javob",        internal: "Kafolatlangan SLA yo'q",             arkana: "Shartnomada 1–2 soatlik SLA" },
      { label: "24/7 qamrov",           internal: "Odatda mavjud emas",                arkana: "Har doim kiritilgan" },
      { label: "Kasallik / ta'til",     internal: "Qamrov yo'q, ish to'xtaydi",        arkana: "Jamoa to'xtovsiz ishlaydi" },
      { label: "Real vaqtli shaffoflik",internal: "Yo'q — o'zingiz so'raysiz",         arkana: "GoARKAN panel + hisobotlar" },
      { label: "Aktivlarni hisobga olish",internal: "Excel jadvallari, agar bo'lsa",   arkana: "GoARKAN'da avtomatik reestr" },
      { label: "Hisobot",               internal: "So'rovga ko'ra, tartibsiz",         arkana: "Oylik yozma hisobot" },
      { label: "Kiberxavfsizlik",       internal: "Reaktiv, tasodifiy",                arkana: "Proaktiv monitoring + siyosat" },
      { label: "Kengayuvchanlik",       internal: "Yollash / ishdan bo'shatish sikli",  arkana: "Joylarni darhol qo'shish/olib tashlash" },
      { label: "Javobgarlik",           internal: "Korporativ siyosat",                arkana: "Moliyaviy jarimalik SLA" },
    ],
  },
};

export function HomeComparison() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;

  return (
    <section style={{ background: "var(--ark-bg)", paddingBottom: 120, borderTop: "1px solid var(--ark-divider)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ padding: "80px 0 64px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16 }}>
            {c.label}
          </div>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1, letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: 0 }}>
            {c.h2a}
            <br />
            <span style={{ color: "var(--ark-text-hint)" }}>{c.h2b}</span>
          </h2>
        </div>

        {/* Table */}
        <div style={{ borderRadius: 12, border: "1px solid var(--ark-border)", overflow: "hidden" }}>
          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "var(--ark-surface)", borderBottom: "1px solid var(--ark-border)" }}>
            <div style={{ padding: "16px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-faint)" }}>
              {c.catHeader}
            </div>
            <div style={{ padding: "16px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-hint)", borderLeft: "1px solid var(--ark-border)" }}>
              {lang === "ru" ? "Штатный IT" : lang === "uz" ? "Shtat IT" : "Internal IT"}
            </div>
            <div style={{ padding: "16px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text)", borderLeft: "1px solid var(--ark-border)", background: "var(--ark-accent-glow)" }}>
              ARKANA
            </div>
          </div>

          {/* Rows */}
          {c.rows.map(({ label, internal, arkana }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: i < c.rows.length - 1 ? "1px solid var(--ark-divider)" : "none" }}
            >
              <div style={{ padding: "18px 24px", fontSize: 13, fontWeight: 500, color: "var(--ark-text-muted)", letterSpacing: "-0.01em", display: "flex", alignItems: "center" }}>
                {label}
              </div>
              <div style={{ padding: "18px 24px", borderLeft: "1px solid var(--ark-divider)", display: "flex", alignItems: "center", gap: 10 }}>
                <X size={13} style={{ color: "var(--ark-text-faint)", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "var(--ark-text-label)", letterSpacing: "-0.01em", lineHeight: 1.4 }}>{internal}</span>
              </div>
              <div style={{ padding: "18px 24px", borderLeft: "1px solid var(--ark-divider)", background: "var(--ark-accent-glow)", display: "flex", alignItems: "center", gap: 10 }}>
                <Check size={13} style={{ color: "var(--ark-accent-2)", flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ark-text)", letterSpacing: "-0.01em", lineHeight: 1.4 }}>{arkana}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
