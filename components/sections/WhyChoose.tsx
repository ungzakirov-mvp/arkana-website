"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, UserCheck, FileBarChart, Settings2, Briefcase, Layers } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const cards = [
  {
    icon: Users,
    title: "Выделенная команда",
    body: "Свои инженеры, закреплённые за вашим аккаунтом. Они знают ваши системы, ваших людей и приоритеты — а не только номер заявки.",
  },
  {
    icon: UserCheck,
    title: "Персональный технический руководитель",
    body: "Один именной инженер, ответственный за ваши ИТ. Единая точка ответственности — человек, которому можно позвонить по имени в любое время.",
  },
  {
    icon: FileBarChart,
    title: "Прозрачная отчётность",
    body: "Регулярные отчёты об активности, производительности и состоянии ИТ — по расписанию, без необходимости их запрашивать.",
  },
  {
    icon: Settings2,
    title: "Современные процессы",
    body: "Рабочие процессы в соответствии с ITIL, структурированное управление инцидентами и изменениями — не импровизации, а системный подход.",
  },
  {
    icon: Briefcase,
    title: "Ориентация на бизнес",
    body: "Каждое ИТ-решение мы согласовываем с целями вашего бизнеса. ИТ должно обслуживать рост — мы это обеспечиваем.",
  },
  {
    icon: Layers,
    title: "Собственная платформа",
    body: "Мы работаем на GOARKAN — нашей платформе — обеспечивая видимость заявок, активов и операций, недоступную большинству ИТ-партнёров.",
    isAccent: true,
  },
];

export function WhyChoose() {
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
          style={{ maxWidth: 600, marginBottom: 56 }}
        >
          <span className="eyebrow" style={{ marginBottom: 20, display: "inline-flex" }}>
            Почему выбирают ARKANA
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
            Шесть причин сделать
            <br />
            ARKANA своим ИТ-партнёром.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(11,21,64,0.55)", lineHeight: 1.65 }}>
            Мы не просто ещё один ИТ-вендор. Мы — расширение вашего бизнеса, с командой, процессами и инструментами, которые это доказывают.
          </p>
        </motion.div>

        <div
          ref={ref}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
          className="max-sm:grid-cols-1 max-lg:grid-cols-2"
        >
          {cards.map(({ icon: Icon, title, body, isAccent }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
              style={{
                background: isAccent ? "rgba(26,107,255,0.04)" : "#F8FAFF",
                border: isAccent ? "1px solid rgba(26,107,255,0.18)" : "1px solid rgba(11,21,64,0.07)",
                borderRadius: 16,
                padding: "26px 24px",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: isAccent ? "rgba(26,107,255,0.12)" : "rgba(11,21,64,0.06)",
                  border: isAccent ? "1px solid rgba(26,107,255,0.20)" : "none",
                  borderRadius: 11,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 18,
                }}
              >
                <Icon size={17} style={{ color: isAccent ? "#1A6BFF" : "#0B1540" }} />
              </div>
              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#0B1540",
                  marginBottom: 8,
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: 13.5, color: "rgba(11,21,64,0.55)", lineHeight: 1.65 }}>
                {body}
              </p>
              {isAccent && (
                <div
                  style={{
                    marginTop: 14,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#1A6BFF",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#1A6BFF",
                      boxShadow: "0 0 6px rgba(26,107,255,0.6)",
                    }}
                  />
                  На платформе GOARKAN
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
