"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, X, ArrowRight, HelpCircle } from "lucide-react";
import { type Plan } from "@/lib/cms-api";

const EASE = [0.16, 1, 0.3, 1] as const;

const SUBTITLES: Record<string, string> = {
  start:      "Малый бизнес",
  operations: "Растущий бизнес",
  enterprise: "Крупный бизнес",
};

/* Detailed feature comparison rows — display-only, pricing page specific */
const PLAN_FEATURES: Record<string, { label: string; value: boolean | string }[]> = {
  start: [
    { label: "Service Desk (GoARKAN)", value: true },
    { label: "SLA — реакция",           value: "2 часа" },
    { label: "SLA — решение",           value: "8 часов" },
    { label: "Мониторинг серверов 24/7", value: true },
    { label: "Резервное копирование",   value: true },
    { label: "Антивирус и обновления",  value: true },
    { label: "Поддержка Microsoft 365", value: "базовая" },
    { label: "Именной инженер",         value: false },
    { label: "Обслуживание серверов",   value: false },
    { label: "Кибербезопасность",       value: false },
    { label: "Анализ инфраструктуры",   value: "раз в год" },
  ],
  operations: [
    { label: "Service Desk (GoARKAN)", value: true },
    { label: "SLA — реакция",           value: "1 час" },
    { label: "SLA — решение",           value: "4 часа" },
    { label: "Мониторинг серверов 24/7", value: true },
    { label: "Резервное копирование",   value: true },
    { label: "Антивирус и обновления",  value: true },
    { label: "Поддержка Microsoft 365", value: "полная" },
    { label: "Именной инженер",         value: true },
    { label: "Обслуживание серверов",   value: true },
    { label: "Кибербезопасность",       value: "базовая" },
    { label: "Анализ инфраструктуры",   value: "раз в квартал" },
  ],
  enterprise: [
    { label: "Service Desk (GoARKAN)", value: true },
    { label: "Индивидуальный SLA",      value: true },
    { label: "Приоритетная реакция",    value: "≤ 30 мин" },
    { label: "Мониторинг серверов 24/7", value: true },
    { label: "Резервное копирование",   value: true },
    { label: "Антивирус и обновления",  value: true },
    { label: "Поддержка Microsoft 365", value: "полная" },
    { label: "Выделенная команда",      value: true },
    { label: "Обслуживание серверов",   value: true },
    { label: "Кибербезопасность",       value: "расширенная" },
    { label: "Анализ инфраструктуры",   value: "ежемесячно" },
  ],
};


function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 size={16} style={{ color: "#22c55e" }} />;
  if (value === false) return <X size={16} style={{ color: "var(--ark-text-dim)", opacity: 0.4 }} />;
  return <span style={{ fontSize: 13, color: "var(--ark-text-muted)" }}>{value}</span>;
}

const FALLBACK_PLANS: Plan[] = [
  {
    id: 1, slug: "start", name: "START", is_popular: false, sort_order: 1, max_workstations: 25,
    price_label: "от 3 000 000", price_monthly: 3000000,
    cta_label: "Начать с START", cta_href: "/contact", website_show_contact_sales: false,
    features: [
      { text: "Service Desk (GoARKAN)", is_included: true },
      { text: "SLA — реакция 2 часа", is_included: true },
      { text: "Мониторинг серверов 24/7", is_included: true },
      { text: "Резервное копирование", is_included: true },
      { text: "Именной инженер", is_included: false },
      { text: "Кибербезопасность", is_included: false },
    ],
    services: [
      { count: "до 25", label: "Рабочих мест" },
      { count: "40", label: "Заявок в мес." },
    ],
  },
  {
    id: 2, slug: "operations", name: "OPERATIONS", is_popular: true, sort_order: 2, max_workstations: 75,
    price_label: "от 6 000 000", price_monthly: 6000000,
    cta_label: "Начать с OPERATIONS", cta_href: "/contact", website_show_contact_sales: false,
    features: [
      { text: "Service Desk (GoARKAN)", is_included: true },
      { text: "SLA — реакция 1 час", is_included: true },
      { text: "Мониторинг серверов 24/7", is_included: true },
      { text: "Резервное копирование", is_included: true },
      { text: "Именной инженер", is_included: true },
      { text: "Кибербезопасность базовая", is_included: true },
    ],
    services: [
      { count: "до 75", label: "Рабочих мест" },
      { count: "100", label: "Заявок в мес." },
    ],
  },
  {
    id: 3, slug: "enterprise", name: "ENTERPRISE", is_popular: false, sort_order: 3, max_workstations: null,
    price_label: "Индивидуально", price_monthly: null,
    cta_label: "Связаться с отделом продаж", cta_href: "/contact", website_show_contact_sales: true,
    features: [
      { text: "Service Desk (GoARKAN)", is_included: true },
      { text: "Индивидуальный SLA", is_included: true },
      { text: "Мониторинг серверов 24/7", is_included: true },
      { text: "Резервное копирование", is_included: true },
      { text: "Выделенная команда", is_included: true },
      { text: "Кибербезопасность расширенная", is_included: true },
    ],
    services: [],
  },
];

export function PricingSection({ plans = [] }: { plans?: Plan[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const activePlans = plans.length > 0 ? plans : FALLBACK_PLANS;
  const startPrice = activePlans.find(p => p.slug === "start")?.price_label ?? "от 3 000 000";

  const PLANS = activePlans.map(p => ({
    id:       p.slug,
    name:     p.name,
    subtitle: SUBTITLES[p.slug] ?? "",
    price:    p.price_label ?? (p.price_monthly != null ? `от ${p.price_monthly.toLocaleString("ru-RU")}` : "Индивидуально"),
    currency: p.price_monthly != null ? "сум/мес" : "",
    popular:  p.is_popular,
    color:    "#6366f1",
    ctaLabel: p.website_show_contact_sales ? "Связаться с отделом продаж" : `Начать с ${p.name}`,
    ctaHref:  `/contact?plan=${p.slug}`,
    services: p.services ?? [],
    features: PLAN_FEATURES[p.slug] ?? p.features.map(f => ({ label: f.text, value: f.is_included })),
  }));

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 0,
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.12), transparent)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }}>
            <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>Тарифы</span>
            </div>
            <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20 }}>
              <span className="heading-gradient">Штатный IT-инженер: от 14 млн сум/мес.</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>ARKANA — {startPrice} сум/мес.</span>
            </h1>
            <p style={{ fontSize: 17, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto 16px" }}>
              Фиксированная стоимость. Всё включено. SLA-гарантия закреплена в договоре со штрафными санкциями.
            </p>

            {/* ROI strip */}
            <div style={{ display: "inline-flex", gap: 24, padding: "12px 24px", borderRadius: 12, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { label: "Тариф OPERATIONS:", value: "6 000 000 сум/мес", note: "фиксированная цена" },
                { label: "1 штатный инженер:", value: "от 14 000 000 сум", note: "зарплата + налоги + отпуск" },
                { label: "Ваша экономия:", value: "от 8 000 000 сум", note: "и SLA в договоре" },
              ].map(({ label, value, note }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: "var(--ark-text-muted)", marginBottom: 2 }}>{label}</div>
                  <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--ark-text)" }}>{value}</div>
                  <div style={{ fontSize: 10, color: "var(--ark-text-muted)", marginTop: 1 }}>{note}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="max-md:grid-cols-1">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                style={{
                  borderRadius: 16,
                  border: plan.popular ? "1px solid rgba(99,102,241,0.5)" : "1px solid var(--ark-border)",
                  background: plan.popular
                    ? "linear-gradient(to bottom right, rgba(99,102,241,0.12), rgba(79,70,229,0.05))"
                    : "var(--ark-card)",
                  padding: "28px 24px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {plan.popular && (
                  <div style={{
                    position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                    padding: "4px 16px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                    background: "var(--ark-accent)", color: "white", whiteSpace: "nowrap",
                    letterSpacing: "0.06em", textTransform: "uppercase",
                  }}>
                    Популярный выбор
                  </div>
                )}

                {/* Header */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--ark-text)", marginBottom: 2, letterSpacing: "0.04em" }}>
                    {plan.name}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ark-text-muted)", marginBottom: 16 }}>{plan.subtitle}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 2 }}>
                    <span style={{ fontFamily: "Nacelle, sans-serif", fontSize: plan.id === "enterprise" ? 22 : 26, fontWeight: 600, color: "var(--ark-text)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                      {plan.price}
                    </span>
                  </div>
                  {plan.currency && (
                    <div style={{ fontSize: 12, color: "var(--ark-text-muted)" }}>{plan.currency}</div>
                  )}
                </div>

                {/* Service counts */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                  {(plan.services ?? []).map(({ count, label }) => (
                    <div key={label} style={{ padding: "10px 12px", borderRadius: 8, background: "var(--ark-bg-2)", border: "1px solid var(--ark-border)" }}>
                      <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 700, fontSize: 20, color: "var(--ark-text)", lineHeight: 1, marginBottom: 3 }}>{count}</div>
                      <div style={{ fontSize: 10, color: "var(--ark-text-muted)", lineHeight: 1.3 }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link href={plan.ctaHref} className="btn" style={{
                  background: plan.popular ? "linear-gradient(to bottom, #6366f1, #4f46e5)" : "var(--ark-surface)",
                  color: plan.popular ? "white" : "var(--ark-text)",
                  border: plan.popular ? "none" : "1px solid var(--ark-border)",
                  boxShadow: plan.popular ? "inset 0 1px 0 rgba(255,255,255,0.16)" : "none",
                  marginBottom: 20,
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 13,
                }}>
                  {plan.ctaLabel}
                  <ArrowRight size={13} />
                </Link>

                {/* Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {plan.features.map((f) => (
                    <div key={f.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 13, color: "var(--ark-text-muted)" }}>{f.label}</span>
                      <FeatureValue value={f.value} />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Guarantee strip */}
          <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { emoji: "✅", text: "SLA-гарантия в договоре" },
              { emoji: "🔄", text: "Смена тарифа в любое время" },
              { emoji: "❌", text: "Без скрытых расходов" },
              { emoji: "📊", text: "Ежемесячный отчёт о работе" },
            ].map(({ emoji, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, background: "var(--ark-surface)", border: "1px solid var(--ark-border)", fontSize: 13, color: "var(--ark-text-muted)" }}>
                <span>{emoji}</span> {text}
              </div>
            ))}
          </div>

          {/* Custom plan */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              marginTop: 16, borderRadius: 16, padding: "28px 32px",
              background: "var(--ark-card)", border: "1px solid var(--ark-border)",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 18, fontWeight: 600, color: "var(--ark-text)", marginBottom: 6 }}>
                Нестандартные требования?
              </div>
              <p style={{ fontSize: 14, color: "var(--ark-text-muted)" }}>
                Более 100 заявок, специфическая инфраструктура, несколько офисов? Составим индивидуальное предложение.
              </p>
            </div>
            <Link href="/contact" className="btn grad-border" style={{ background: "var(--ark-surface)", color: "var(--ark-text)", flexShrink: 0 }}>
              Обсудить условия
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "64px 0 96px", borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.04em", textAlign: "center", marginBottom: 48 }}>
            <span className="heading-gradient">Частые вопросы о тарифах</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[
              { q: "Что входит в заявку?", a: "Одна заявка — это одно обращение от сотрудника: поломка, настройка, вопрос, удалённая помощь или выезд. Счётчик заявок обнуляется каждый месяц. Неиспользованные заявки не переносятся." },
              { q: "Что такое удалённая сессия?", a: "Удалённое подключение к компьютеру сотрудника для решения задачи: настройка, диагностика, установка ПО. Одна сессия — одно подключение, независимо от длительности." },
              { q: "Что происходит, если лимит заявок исчерпан?", a: "Мы уведомляем вас заранее. Дополнительные заявки оплачиваются по фиксированной ставке или вы можете перейти на тариф OPERATIONS. Работа не останавливается." },
              { q: "Что такое SLA и кто за него отвечает?", a: "SLA (Service Level Agreement) — соглашение об уровне сервиса. Время первого ответа и время решения заявки зафиксированы в договоре. Нарушение SLA влечёт штрафные санкции для ARKANA." },
              { q: "Как происходит запуск?", a: "После подписания договора наша команда проводит бесплатный IT-аудит, настраивает мониторинг и Service Desk GoARKAN. Запуск занимает до 5 рабочих дней." },
            ].map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  style={{
                    padding: "20px 24px",
                    borderRadius: i === 0 ? "12px 12px 0 0" : i === 4 ? "0 0 12px 12px" : 0,
                    background: "var(--ark-card)",
                    border: "1px solid var(--ark-border)",
                    borderBottom: i < 4 ? "none" : "1px solid var(--ark-border)",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <HelpCircle size={16} style={{ color: "var(--ark-accent-2)", marginTop: 2, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text)", marginBottom: isOpen ? 8 : 0 }}>{faq.q}</p>
                      {isOpen && <p style={{ fontSize: 14, color: "var(--ark-text-muted)", lineHeight: 1.65, margin: 0 }}>{faq.a}</p>}
                    </div>
                    <span style={{ fontSize: 18, color: "var(--ark-text-muted)", marginTop: -1, flexShrink: 0 }}>{isOpen ? "−" : "+"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
