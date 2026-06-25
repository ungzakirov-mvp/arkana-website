"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const steps = [
  {
    num: "01",
    title: "Диагностика",
    when: "Неделя 1",
    body: "Мы аудируем вашу ИТ-среду: инфраструктуру, команду, инструменты и болевые точки. Вам не нужно ничего готовить.",
  },
  {
    num: "02",
    title: "Стратегия",
    when: "Недели 1–2",
    body: "Проектируем ваш ИТ-план. Услуги, целевые показатели реагирования, инструменты и приоритеты — в прямой привязке к целям бизнеса.",
  },
  {
    num: "03",
    title: "Онбординг",
    when: "Недели 2–4",
    body: "Плавная передача. Мы настраиваем системы, онбордим вашу команду и берём на себя операции. Бизнес не останавливается.",
  },
  {
    num: "04",
    title: "Операции",
    when: "Постоянно",
    body: "Задокументированный мониторинг, быстрое реагирование и именные инженеры, знающие вашу среду. Полная поддержка по расписанию.",
  },
  {
    num: "05",
    title: "Рост",
    when: "Ежеквартально",
    body: "Бизнес-обзоры, отчёты GOARKAN и ИТ-планирование, которое не отстаёт от вашего роста.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section style={{ background: "#FFFFFF", padding: "96px 0" }}>
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ maxWidth: 560, marginBottom: 56 }}
        >
          <span className="eyebrow" style={{ marginBottom: 20, display: "inline-flex" }}>
            Как мы работаем
          </span>
          <h2
            style={{
              fontSize: "clamp(32px, 3.2vw, 46px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#0B1540",
              marginTop: 16,
              marginBottom: 20,
            }}
          >
            От первого звонка
            <br />
            до полного партнёрства.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(11,21,64,0.55)", lineHeight: 1.65 }}>
            Чёткий, проверенный путь без сюрпризов — структурированный прогресс с первого дня до долгосрочного партнёрства.
          </p>
        </motion.div>

        <div ref={ref}>
          {steps.map(({ num, title, when, body }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.6, ease: EASE }}
              style={{ display: "flex", gap: 28 }}
            >
              {/* Number + connector */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(26,107,255,0.25)",
                    background: "rgba(26,107,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#1A6BFF",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {num}
                </div>
                {i < steps.length - 1 && (
                  <div
                    style={{
                      width: 1.5,
                      flex: 1,
                      background: "rgba(26,107,255,0.15)",
                      margin: "6px 0",
                      minHeight: 40,
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0B1540", letterSpacing: "-0.025em" }}>
                    {title}
                  </h3>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#1A6BFF",
                      background: "rgba(26,107,255,0.08)",
                      border: "1px solid rgba(26,107,255,0.16)",
                      padding: "2px 9px",
                      borderRadius: 20,
                    }}
                  >
                    {when}
                  </span>
                </div>
                <p style={{ fontSize: 15, color: "rgba(11,21,64,0.55)", lineHeight: 1.65, maxWidth: 560 }}>
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
          style={{ marginTop: 4, marginLeft: 72 }}
        >
          <Link
            href="/contact"
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#1A6BFF",
              textDecoration: "none",
              borderBottom: "1.5px solid rgba(26,107,255,0.30)",
              paddingBottom: 2,
            }}
          >
            Начать аудит →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
