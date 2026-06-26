"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const CASES: Record<string, {
  index: string; sector: string; company: string; duration: string;
  headline: string; headlineLabel: string;
  stats: { value: string; label: string }[];
  quote: string; role: string; context: string;
}[]> = {
  ru: [
    {
      index: "01", sector: "Ритейл", company: "Торговая сеть, 45 рабочих мест", duration: "3 года",
      headline: "−36 млн сум", headlineLabel: "экономия в месяц",
      stats: [{ value: "−35%", label: "IT-расходов" }, { value: "3.2 ч", label: "Среднее решение" }, { value: "99.8%", label: "SLA" }],
      quote: "IT-проблемы перестали отвлекать от бизнеса. Реакция быстрая, всё прозрачно.",
      role: "Директор по развитию",
      context: "3 штатных инженера за 42 млн сум/мес → ARKANA OPERATIONS за 6 млн сум/мес.",
    },
    {
      index: "02", sector: "Производство", company: "Производственное предприятие, 120 мест", duration: "2 года",
      headline: "0", headlineLabel: "инцидентов потери данных",
      stats: [{ value: "99.9%", label: "Аптайм" }, { value: "100%", label: "Покрытие бэкапа" }, { value: "0 сум", label: "Внеплановые IT-расходы" }],
      quote: "Ни одного инцидента с данными за год. Рекомендуем ARKANA каждому партнёру.",
      role: "CTO",
      context: "Устаревшее оборудование, нет резервного копирования, риск потери данных. Перешли на M365 + мониторинг.",
    },
    {
      index: "03", sector: "Медицина", company: "Медицинский центр, 80 рабочих мест", duration: "18 месяцев",
      headline: "47", headlineLabel: "уязвимостей закрыто",
      stats: [{ value: "0", label: "Инцидентов безопасности" }, { value: "< 1 ч", label: "Реакция на инцидент" }, { value: "100%", label: "Соответствие требованиям" }],
      quote: "Через GoARKAN мы мониторим все события безопасности в реальном времени — для нас это беспрецедентно.",
      role: "Главный врач",
      context: "Незащищённая сеть, нет политики безопасности, регуляторный риск. Полный аудит + защита за 30 дней.",
    },
  ],
  en: [
    {
      index: "01", sector: "Retail", company: "Retail chain, 45 workstations", duration: "3 years",
      headline: "−36M UZS", headlineLabel: "savings per month",
      stats: [{ value: "−35%", label: "IT costs" }, { value: "3.2 h", label: "Avg. resolution" }, { value: "99.8%", label: "SLA" }],
      quote: "IT issues stopped disrupting our business. Response is fast and everything is transparent.",
      role: "Head of Development",
      context: "3 in-house engineers at 42M UZS/mo → ARKANA OPERATIONS at 6M UZS/mo.",
    },
    {
      index: "02", sector: "Manufacturing", company: "Manufacturing plant, 120 workstations", duration: "2 years",
      headline: "0", headlineLabel: "data loss incidents",
      stats: [{ value: "99.9%", label: "Uptime" }, { value: "100%", label: "Backup coverage" }, { value: "0 UZS", label: "Unplanned IT costs" }],
      quote: "Not a single data incident in a year. We recommend ARKANA to every partner.",
      role: "CTO",
      context: "Outdated hardware, no backups, data loss risk. Migrated to M365 + full monitoring.",
    },
    {
      index: "03", sector: "Healthcare", company: "Medical centre, 80 workstations", duration: "18 months",
      headline: "47", headlineLabel: "vulnerabilities closed",
      stats: [{ value: "0", label: "Security incidents" }, { value: "< 1 h", label: "Incident response" }, { value: "100%", label: "Compliance" }],
      quote: "Through GoARKAN we monitor all security events in real time — this level of visibility is unprecedented for us.",
      role: "Chief Medical Officer",
      context: "Unsecured network, no security policy, regulatory risk. Full audit + protection within 30 days.",
    },
  ],
  uz: [
    {
      index: "01", sector: "Chakana savdo", company: "Savdo tarmog'i, 45 ish joyi", duration: "3 yil",
      headline: "−36M so'm", headlineLabel: "oylik tejash",
      stats: [{ value: "−35%", label: "IT xarajatlar" }, { value: "3.2 s", label: "O'rtacha yechim" }, { value: "99.8%", label: "SLA" }],
      quote: "IT muammolari biznesga xalaqit berishni to'xtatdi. Javob tez, hammasi shaffof.",
      role: "Rivojlanish direktori",
      context: "3 shtat muhandis — 42M so'm/oy → ARKANA OPERATIONS — 6M so'm/oy.",
    },
    {
      index: "02", sector: "Ishlab chiqarish", company: "Ishlab chiqarish korxonasi, 120 ish joyi", duration: "2 yil",
      headline: "0", headlineLabel: "ma'lumot yo'qotish hodisasi",
      stats: [{ value: "99.9%", label: "Ishlash vaqti" }, { value: "100%", label: "Zaxira nusxa" }, { value: "0 so'm", label: "Rejalashtirilmagan IT xarajatlar" }],
      quote: "Bir yil davomida birorta ma'lumot hodisasi bo'lmadi. Har bir hamkorga ARKANA'ni tavsiya etamiz.",
      role: "CTO",
      context: "Eskirgan uskunalar, zaxira nusxa yo'q, ma'lumot yo'qotish xavfi. M365 + monitoring'ga o'tildi.",
    },
    {
      index: "03", sector: "Tibbiyot", company: "Tibbiyot markazi, 80 ish joyi", duration: "18 oy",
      headline: "47", headlineLabel: "zaiflik bartaraf etildi",
      stats: [{ value: "0", label: "Xavfsizlik hodisalari" }, { value: "< 1 s", label: "Hodisaga javob" }, { value: "100%", label: "Muvofiqlik" }],
      quote: "GoARKAN orqali barcha xavfsizlik hodisalarini real vaqtda kuzatamiz — bu biz uchun misli ko'rilmagan daraja.",
      role: "Bosh shifokor",
      context: "Himoyalanmagan tarmoq, xavfsizlik siyosati yo'q, tartibga solish xavfi. 30 kunda to'liq audit + himoya.",
    },
  ],
};

const HEADER: Record<string, { label: string; h2a: string; h2b: string; note: string; all: string }> = {
  ru: { label: "Кейсы", h2a: "Три кейса.", h2b: "Конкретные цифры.", note: "Данные изменены по запросу клиентов", all: "Все кейсы →" },
  en: { label: "Cases", h2a: "Three cases.", h2b: "Concrete numbers.", note: "Data anonymised at client request", all: "All cases →" },
  uz: { label: "Loyihalar", h2a: "Uch loyiha.", h2b: "Aniq raqamlar.", note: "Ma'lumotlar mijozlar talabi bilan o'zgartirilgan", all: "Barcha loyihalar →" },
};

export function HomeCases() {
  const { lang } = useApp();
  const cases = CASES[lang] ?? CASES.ru;
  const h = HEADER[lang] ?? HEADER.ru;

  return (
    <section className="pb-16 lg:pb-28" style={{ background: "var(--ark-bg)", borderTop: "1px solid var(--ark-divider)" }}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10">

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "80px 0 64px", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16 }}>{h.label}</div>
            <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1, letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: "0 0 10px" }}>
              {h.h2a}{" "}<span style={{ color: "var(--ark-text-hint)" }}>{h.h2b}</span>
            </h2>
            <p style={{ fontSize: 11, color: "var(--ark-text-faint)", letterSpacing: "0", margin: 0 }}>{h.note}</p>
          </div>
          <Link href="/cases" style={{ fontSize: 13, fontWeight: 500, color: "var(--ark-text-muted)", textDecoration: "none", letterSpacing: "-0.01em", paddingBottom: 6 }}>
            {h.all}
          </Link>
        </div>

        <div style={{ borderTop: "1px solid var(--ark-divider)" }}>
          {cases.map((c, i) => (
            <motion.div
              key={c.index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="grid grid-cols-1 lg:grid-cols-[56px_260px_1fr_1fr] gap-6 lg:gap-8"
              style={{ alignItems: "start", padding: "40px 0", borderBottom: "1px solid var(--ark-divider)" }}
            >
              <div style={{ fontSize: 11, fontWeight: 500, color: "var(--ark-text-faint)", letterSpacing: "0.04em", paddingTop: 3 }}>{c.index}</div>

              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 8 }}>
                  {c.sector} · {c.duration}
                </div>
                <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text-heading)", letterSpacing: "-0.025em", lineHeight: 1.3, marginBottom: 10 }}>
                  {c.company}
                </div>
                <p style={{ fontSize: 12, color: "var(--ark-text-label)", lineHeight: 1.6, letterSpacing: "-0.01em", margin: 0 }}>{c.context}</p>
              </div>

              <div>
                <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1, letterSpacing: "-0.05em", color: "var(--ark-text-heading)", marginBottom: 6 }}>
                  {c.headline}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-hint)" }}>
                  {c.headlineLabel}
                </div>
                <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
                  {c.stats.map(({ value, label }) => (
                    <div key={label}>
                      <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.125rem", letterSpacing: "-0.04em", color: "var(--ark-text)", lineHeight: 1, marginBottom: 3 }}>{value}</div>
                      <div style={{ fontSize: 10, color: "var(--ark-text-hint)", letterSpacing: "0.04em" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ width: 2, height: 24, background: "var(--ark-border-strong)", borderRadius: 2, marginBottom: 14 }} />
                <blockquote style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.65, letterSpacing: "-0.01em", fontStyle: "italic", margin: "0 0 10px" }}>
                  "{c.quote}"
                </blockquote>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-faint)" }}>
                  {c.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
