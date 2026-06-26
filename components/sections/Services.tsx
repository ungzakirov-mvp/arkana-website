"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Server, Headphones, Shield, Network, Cloud, Monitor, ArrowUpRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICES = [
  {
    icon: Headphones,
    tag: "Service Desk",
    title: "IT-поддержка и аутсорсинг",
    desc: "Берём полную ответственность за IT вашего бизнеса. Фиксированная стоимость, SLA, именные инженеры.",
    href: "/services/it-outsourcing",
    color: "#6366f1",
  },
  {
    icon: Server,
    tag: "Инфраструктура",
    title: "Серверы и сети",
    desc: "Проектирование, настройка, обслуживание серверной инфраструктуры и сетевого оборудования.",
    href: "/services/infrastructure",
    color: "#818cf8",
  },
  {
    icon: Shield,
    tag: "Безопасность",
    title: "Кибербезопасность",
    desc: "Аудит безопасности, настройка защиты периметра, мониторинг угроз и реагирование на инциденты.",
    href: "/services/security",
    color: "#6366f1",
  },
  {
    icon: Cloud,
    tag: "Microsoft 365",
    title: "Облако и M365",
    desc: "Развёртывание, миграция и администрирование Microsoft 365, Azure и облачных сервисов.",
    href: "/services/m365",
    color: "#818cf8",
  },
  {
    icon: Monitor,
    tag: "ITSM",
    title: "Service Desk (GoARKAN)",
    desc: "Прозрачное управление заявками через нашу платформу. Каждое обращение под контролем.",
    href: "/services/itsm",
    color: "#6366f1",
  },
  {
    icon: Network,
    tag: "IT-аудит",
    title: "IT-аудит инфраструктуры",
    desc: "Полная инвентаризация, оценка рисков, план оптимизации — за 5 рабочих дней.",
    href: "/services/audit",
    color: "#818cf8",
  },
];

function SpotlightCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.a
      ref={cardRef}
      href={service.href}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE, delay: index * 0.07 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        position: "relative",
        borderRadius: 16,
        background: "#1f2937",
        padding: 1,
        overflow: "hidden",
        textDecoration: "none",
        height: "100%",
      }}
    >
      {/* Spotlight glow */}
      <div style={{
        position: "absolute",
        left: mousePos.x - 80,
        top: mousePos.y - 80,
        width: 160,
        height: 160,
        borderRadius: "50%",
        background: `${service.color}cc`,
        filter: "blur(48px)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: "none",
        zIndex: 1,
      }} />

      {/* Inner card */}
      <div style={{
        position: "relative",
        zIndex: 2,
        height: "100%",
        borderRadius: 15,
        background: "var(--ark-bg)",
        padding: "28px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "background 0.2s",
      }}>
        {/* Arrow */}
        <div style={{
          position: "absolute",
          top: 16, right: 16,
          width: 28, height: 28,
          borderRadius: "50%",
          border: "1px solid var(--ark-border)",
          background: "var(--ark-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
          color: "var(--ark-text)",
        }}>
          <ArrowUpRight size={12} />
        </div>

        {/* Icon */}
        <div style={{
          width: 44, height: 44,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${service.color}18`,
          border: `1px solid ${service.color}30`,
          flexShrink: 0,
        }}>
          <service.icon size={20} style={{ color: service.color }} />
        </div>

        {/* Tag */}
        <span style={{
          display: "inline-block",
          fontSize: 11,
          fontWeight: 600,
          padding: "2px 8px",
          borderRadius: 4,
          background: "rgba(99,102,241,0.1)",
          color: "var(--ark-accent-2)",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          width: "fit-content",
        }}>
          {service.tag}
        </span>

        <div>
          <h3 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: 17, color: "var(--ark-text)", marginBottom: 8, lineHeight: 1.3 }}>
            {service.title}
          </h3>
          <p style={{ fontSize: 14, color: "var(--ark-text-muted)", lineHeight: 1.6 }}>
            {service.desc}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

export function Services() {
  return (
    <section style={{ padding: "96px 0", borderTop: "1px solid transparent", borderImage: "linear-gradient(to right, transparent, rgba(148,163,184,0.15), transparent) 1" }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>
              Что мы делаем
            </span>
          </div>
          <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
            <span className="heading-gradient">Полный спектр IT-услуг</span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--ark-text-muted)", maxWidth: 500, margin: "0 auto", lineHeight: 1.65 }}>
            Один подрядчик — вся IT-инфраструктура. Без найма штатных специалистов.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="max-md:grid-cols-1 max-lg:grid-cols-2">
          {SERVICES.map((s, i) => (
            <SpotlightCard key={s.href} service={s} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/services" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 14, fontWeight: 600, color: "var(--ark-accent-2)", textDecoration: "none",
            transition: "gap 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.gap = "10px")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.gap = "6px")}
          >
            Все услуги
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
