"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingDown, Clock, Shield } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const CASES = [
  {
    sector: "Ритейл",
    company: "Торговая сеть, 45 рабочих мест",
    title: "Сокращение IT-расходов на 35% при переходе на аутсорсинг",
    problem: "Штатный IT-отдел из 3 человек не справлялся с нагрузкой. Частые простои, долгие ремонты, непредсказуемые расходы. Стоимость содержания IT-отдела: 42 млн сум/мес.",
    solution: "Переход на тариф ARKANA OPERATIONS. Развёртывание GoARKAN, настройка мониторинга и Service Desk. Итого: 6 млн сум/мес за всё.",
    results: [
      { icon: TrendingDown, label: "Экономия в месяц", value: "−36 млн сум" },
      { icon: Clock, label: "Время решения заявок", value: "3.2ч" },
      { icon: Shield, label: "SLA-исполнение", value: "99.8%" },
    ],
    quote: "IT-проблемы перестали отвлекать от бизнеса. Реакция быстрая, всё прозрачно.",
    author: "Директор по развитию",
    duration: "3 года сотрудничества",
  },
  {
    sector: "Производство",
    company: "Производственное предприятие, 120 рабочих мест",
    title: "Модернизация инфраструктуры и переход на Microsoft 365",
    problem: "Устаревшее серверное оборудование, отсутствие резервного копирования, риск потери данных.",
    solution: "IT-аудит, замена серверов, настройка резервного копирования, миграция на Microsoft 365.",
    results: [
      { icon: TrendingDown, label: "Потеря данных", value: "0%" },
      { icon: Clock, label: "Доступность систем", value: "99.9%" },
      { icon: Shield, label: "Покрытие бекапами", value: "100%" },
    ],
    quote: "За год ни одного инцидента с потерей данных. Рекомендуем ARKANA.",
    author: "Технический директор",
    duration: "2 года сотрудничества",
  },
  {
    sector: "Медицина",
    company: "Медицинский центр, 80 рабочих мест",
    title: "Обеспечение кибербезопасности и соответствия требованиям",
    problem: "Требования к безопасности медицинских данных, уязвимость сети, отсутствие политики безопасности.",
    solution: "IT-аудит безопасности, настройка защиты периметра, обучение сотрудников, внедрение политик доступа.",
    results: [
      { icon: Shield, label: "Инцидентов безопасности", value: "0" },
      { icon: Clock, label: "Время реакции", value: "<1ч" },
      { icon: TrendingDown, label: "Уязвимостей закрыто", value: "47" },
    ],
    quote: "Через GoARKAN отслеживаем все события безопасности в реальном времени.",
    author: "Главный врач",
    duration: "1.5 года сотрудничества",
  },
];

export function CasesPage() {
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.12), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }}>
            <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>Кейсы — результаты клиентов ARKANA</span>
            </div>
            <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2.25rem, 5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20 }}>
              <span className="heading-gradient">Цифры, которые говорят</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>сами за себя</span>
            </h1>
            <p style={{ fontSize: 17, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto 24px" }}>
              Ритейл, производство, медицина. Конкретные результаты — без маркетинговых обещаний.
            </p>
            <p style={{ fontSize: 12, color: "var(--ark-text-faint)", margin: "0 auto 8px", maxWidth: 480, lineHeight: 1.5 }}>
              Данные кейсов изменены по запросу клиентов. Результаты — реальные.
            </p>
            {/* Sector chips */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {["Ритейл", "Производство", "Медицина"].map(s => (
                <span key={s} style={{ padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, background: "var(--ark-accent-glow)", color: "var(--ark-accent-2)", border: "1px solid rgba(99,102,241,0.2)" }}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cases */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {CASES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                style={{
                  borderRadius: 16,
                  background: "var(--ark-card)",
                  border: "1px solid var(--ark-border)",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }} className="max-md:grid-cols-1">
                  {/* Left */}
                  <div style={{ padding: "36px 36px 36px 36px" }}>
                    <div style={{
                      display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                      padding: "3px 10px", borderRadius: 6, background: "var(--ark-accent-glow)", color: "var(--ark-accent-2)",
                      marginBottom: 16,
                    }}>
                      {c.sector} · {c.duration}
                    </div>
                    <h2 style={{ fontFamily: "Nacelle, sans-serif", fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 600, color: "var(--ark-text)", lineHeight: 1.3, marginBottom: 20 }}>
                      {c.title}
                    </h2>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 6 }}>Проблема</div>
                      <p style={{ fontSize: 14, color: "var(--ark-text-muted)", lineHeight: 1.65 }}>{c.problem}</p>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 6 }}>Решение</div>
                      <p style={{ fontSize: 14, color: "var(--ark-text-muted)", lineHeight: 1.65 }}>{c.solution}</p>
                    </div>
                  </div>

                  {/* Right */}
                  <div style={{ padding: "36px", borderLeft: "1px solid var(--ark-border)", display: "flex", flexDirection: "column", gap: 24 }} className="max-md:border-l-0 max-md:border-t">
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 20 }}>Результат</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                        {c.results.map((r) => (
                          <div key={r.label} style={{ textAlign: "center", padding: "16px 12px", borderRadius: 10, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.1)" }}>
                            <r.icon size={16} style={{ color: "var(--ark-accent-2)", margin: "0 auto 8px" }} />
                            <div style={{ fontFamily: "Nacelle, sans-serif", fontSize: 22, fontWeight: 600, color: "var(--ark-text)", lineHeight: 1, marginBottom: 4 }}>{r.value}</div>
                            <div style={{ fontSize: 11, color: "var(--ark-text-muted)", lineHeight: 1.3 }}>{r.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <div style={{ padding: "20px", borderRadius: 10, background: "var(--ark-bg-2)", border: "1px solid var(--ark-border)" }}>
                      <blockquote style={{ fontSize: 14, color: "var(--ark-text)", lineHeight: 1.65, fontStyle: "italic", marginBottom: 12 }}>
                        "{c.quote}"
                      </blockquote>
                      <div style={{ fontSize: 12, color: "var(--ark-text-muted)" }}>— {c.author} · {c.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ marginTop: 64, borderRadius: 16, padding: "48px 40px", background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(79,70,229,0.06))", border: "1px solid rgba(99,102,241,0.2)", textAlign: "center" }}
          >
            <div style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.04em", color: "var(--ark-text)", marginBottom: 8 }}>
              Сколько вы переплачиваете за IT?
            </div>
            <p style={{ fontSize: 16, color: "var(--ark-text-muted)", marginBottom: 12, maxWidth: 480, margin: "0 auto 12px" }}>
              Мы бесплатно подсчитаем разницу между вашими текущими IT-расходами и тарифом ARKANA.
            </p>
            <p style={{ fontSize: 13, color: "var(--ark-accent-2)", marginBottom: 32 }}>
              По данным наших кейсов: экономия от 8 до 36 млн сум в месяц по сравнению со штатным IT-отделом
            </p>
            <Link href="/contact" className="btn" style={{ background: "linear-gradient(to bottom, #6366f1, #4f46e5)", color: "white", boxShadow: "0 4px 16px rgba(99,102,241,0.4)", fontSize: 15, padding: "13px 28px" }}>
              Получить расчёт бесплатно
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
