"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Headset, Server, Shield, BarChart3 } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const SERVICES = [
  {
    icon: Headset,
    num: "01",
    title: "ИТ-аутсорсинг",
    desc: "Именные инженеры, закреплённые за вашим аккаунтом. Хелпдеск, управление устройствами, закупки, работа с вендорами и ИТ-стратегия — под одной крышей.",
    href: "/services/it-outsourcing",
  },
  {
    icon: Server,
    num: "02",
    title: "Управление инфраструктурой",
    desc: "Мониторинг с чёткими порогами срабатывания, ежемесячный план патчинга, ежеквартальное тестирование восстановления. Каждое изменение задокументировано до применения.",
    href: "/services/infrastructure",
  },
  {
    icon: Shield,
    num: "03",
    title: "Кибербезопасность и поддержка",
    desc: "Защита конечных точек, управление доступом, проверенные резервные копии и ежемесячные отчёты по безопасности через GOARKAN.",
    href: "/services/managed-it",
  },
  {
    icon: BarChart3,
    num: "04",
    title: "Управление ИТ-сервисами",
    desc: "Отслеживание запросов, инвентаризация активов, управление инцидентами и изменениями — всё через GOARKAN. Ежемесячные отчёты из системы.",
    href: "/services/itsm",
  },
];

export function Services() {
  return (
    <section style={{ background: "#F2F6FF", padding: "96px 0" }}>
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ maxWidth: 640, marginBottom: 56 }}
        >
          <span className="eyebrow" style={{ marginBottom: 20, display: "inline-flex" }}>
            Наши услуги
          </span>
          <h2
            style={{
              fontSize: "clamp(32px, 3.4vw, 48px)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#0B1540",
              marginTop: 16,
              marginBottom: 18,
            }}
          >
            Всё ИТ.<br />Один партнёр.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(11,21,64,0.55)", lineHeight: 1.65 }}>
            От первого обращения в хелпдеск до стратегии корпоративной инфраструктуры — ARKANA берёт на себя всё под одним договором.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {SERVICES.map(({ icon: Icon, num, title, desc, href }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: EASE }}
            >
              <Link href={href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(11,21,64,0.08)",
                    borderRadius: 20,
                    padding: "28px 28px 24px",
                    height: "100%",
                    transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
                    boxShadow: "0 2px 12px rgba(11,21,64,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = "0 12px 40px rgba(26,107,255,0.14)";
                    el.style.transform = "translateY(-3px)";
                    el.style.borderColor = "rgba(26,107,255,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = "0 2px 12px rgba(11,21,64,0.06)";
                    el.style.transform = "translateY(0)";
                    el.style.borderColor = "rgba(11,21,64,0.08)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
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
                      }}
                    >
                      <Icon size={20} style={{ color: "#1A6BFF" }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "rgba(11,21,64,0.25)" }}>
                      {num}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0B1540", marginBottom: 10, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "rgba(11,21,64,0.55)", lineHeight: 1.65, marginBottom: 18 }}>
                    {desc}
                  </p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "#1A6BFF" }}>
                    Подробнее <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
