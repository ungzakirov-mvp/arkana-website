"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Users, BarChart3, Zap, Lock, HeartHandshake } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const FEATURES = [
  {
    icon: CheckCircle2,
    title: "Ответственность за результат",
    desc: "Мы не сдаём инженеров. Мы управляем IT-функцией целиком — с KPI, SLA и ежемесячными отчётами.",
  },
  {
    icon: Users,
    title: "Именные инженеры",
    desc: "За каждым клиентом закреплена команда. Вы знаете имена людей, которые решают ваши задачи.",
  },
  {
    icon: BarChart3,
    title: "Прозрачная аналитика",
    desc: "Личный кабинет GoARKAN — все заявки, активы, SLA и отчёты в реальном времени. Никакого чёрного ящика.",
  },
  {
    icon: Zap,
    title: "Предсказуемая стоимость",
    desc: "Фиксированный ежемесячный платёж. Без скрытых расходов, без «согласования работ по часам».",
  },
  {
    icon: Lock,
    title: "Безопасность по умолчанию",
    desc: "Мониторинг угроз, резервные копии, контроль доступа и реагирование на инциденты — включены в каждый тариф.",
  },
  {
    icon: HeartHandshake,
    title: "Партнёр, не подрядчик",
    desc: "Мы растём вместе с вашим бизнесом. Рекомендуем оптимальные решения, а не продаём лишнее.",
  },
];

export function WhyArkana() {
  return (
    <section style={{
      padding: "96px 0",
      borderTop: "1px solid transparent",
      borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1",
    }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ maxWidth: 640, marginBottom: 64 }}
        >
          <div className="ark-badge" style={{ marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>
              Почему выбирают нас
            </span>
          </div>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
            <span className="heading-gradient">IT должно ускорять бизнес,</span>
            <br />
            <span style={{ color: "var(--ark-text)" }}>а не создавать проблемы</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--ark-text-muted)", lineHeight: 1.65 }}>
            Большинство IT-аутсорсеров продают инженеров по часам. Мы управляем IT-функцией
            и берём ответственность за то, что всё работает.
          </p>
        </motion.div>

        {/* Features grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "48px 56px" }} className="max-md:grid-cols-1 max-lg:grid-cols-2">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
            >
              <f.icon
                size={22}
                style={{ color: "var(--ark-accent-2)", marginBottom: 14 }}
                strokeWidth={1.5}
              />
              <h3 style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15, fontWeight: 600, color: "var(--ark-text)", marginBottom: 8 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: "var(--ark-text-muted)", lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
