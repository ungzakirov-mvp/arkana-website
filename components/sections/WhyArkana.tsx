"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserCheck, ClipboardList, Eye } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cards = [
  {
    icon: UserCheck,
    title: "Именная ответственность",
    body: "Технический руководитель и инженеры поддержки закреплены за вашим аккаунтом — не очередь заявок. Один человек отвечает за всё.",
  },
  {
    icon: ClipboardList,
    title: "Задокументированные процессы",
    body: "Ежемесячный план патчинга, ежеквартальное тестирование восстановления, реакция на критические ситуации за 48 часов. Каждый процесс описан, а не подразумевается.",
  },
  {
    icon: Eye,
    title: "Полная прозрачность",
    body: "GOARKAN даёт вам видимость каждой заявки, актива и действия в режиме реального времени. Ежемесячные отчёты из системы — а не от менеджера аккаунта.",
  },
];

export function WhyArkana() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: "#FFFFFF", padding: "96px 0" }}>
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ maxWidth: 560, marginBottom: 56 }}
        >
          <span className="eyebrow" style={{ marginBottom: 20, display: "inline-flex" }}>
            Почему ARKANA
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
            Не ИТ-поддержка.
            <br />
            ИТ-партнёр.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(11,21,64,0.55)", lineHeight: 1.65 }}>
            Большинство провайдеров реагируют на проблемы. Мы их предотвращаем — с именными инженерами, прозрачными процессами и инструментами, которые держат вас в курсе на каждом шаге.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {cards.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(11,21,64,0.08)",
                borderRadius: 18,
                padding: "28px 28px 26px",
                boxShadow: "0 2px 12px rgba(11,21,64,0.05)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: "rgba(26,107,255,0.08)",
                  border: "1px solid rgba(26,107,255,0.16)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <Icon size={20} style={{ color: "#1A6BFF" }} />
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0B1540",
                  marginBottom: 10,
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: 14, color: "rgba(11,21,64,0.55)", lineHeight: 1.65 }}>
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
