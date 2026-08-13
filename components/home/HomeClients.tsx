"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/components/providers/ThemeLanguageProvider";

const EASE = "cubic-bezier(.16,1,.3,1)";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Data ────────────────────────────────────────────────────────────────────

interface FeaturedProject {
  client: string;
  industry: string;
  scale: string;
  services: string[];
  deliverables: string[];
  scope: string;
  photo: string;
}

interface GridProject {
  id: string;
  client: string;
  industry: string;
  services: string[];
  photo: string;
}

interface Copy {
  eyebrow: string;
  h2: string;
  sub: string;
  featuredTag: string;
  deliveredList: string;
  featured: FeaturedProject;
  grid: GridProject[];
  cta: { heading: string; sub: string; btn: string };
}

const COPY: Record<string, Copy> = {
  ru: {
    eyebrow: "Портфолио проектов",
    h2: "Опыт внедрения.",
    sub: "Государственные объекты, промышленные предприятия, коммерческие компании — реальные проекты без стоковых изображений.",
    featuredTag: "Ключевой проект",
    deliveredList: "Выполнено",
    featured: {
      client: "Центр управления бурением",
      industry: "Нефтегаз · Промышленность",
      scale: "Операционный центр управления · Промышленный объект",
      services: ["LED Видеостена", "IT-инфраструктура", "Control Room", "Структурированный кабель", "Под ключ"],
      deliverables: [
        "Монтаж панорамной LED-видеостены с управляющей системой",
        "Полная IT-инфраструктура зала: СКС, рабочие станции, сетевое оборудование",
        "Настройка и ввод объекта в эксплуатацию",
      ],
      scope: "Операционный зал под ключ: от проектирования кабельной сети и монтажа LED-видеостены до развёртывания рабочих станций и ввода объекта в эксплуатацию. Реализован в нормативные сроки без простоев производства.",
      photo: "/cases/drilling-led.jpg",
    },
    grid: [
      {
        id: "minen",
        client: "Министерство энергетики РУз",
        industry: "Государственный сектор",
        services: ["AV-системы", "Конференц-решения", "Рабочие станции"],
        photo: "/cases/minen-conf.jpg",
      },
      {
        id: "youth",
        client: "Молодёжные центры обучения",
        industry: "Образование",
        services: ["Computer Lab Setup", "Workplace Deployment", "Asset Management"],
        photo: "/cases/youth-lab.jpg",
      },
      {
        id: "monitoring",
        client: "Промышленный мониторинг-центр",
        industry: "Промышленность",
        services: ["SCADA", "Multi-Display Setup", "Network Infrastructure"],
        photo: "/cases/monitoring-dash.jpg",
      },
      {
        id: "jac",
        client: "JAC Motors Tashkent",
        industry: "Автомобильный бизнес",
        services: ["Структурированный кабель", "Network Deployment", "Монтаж СКС"],
        photo: "/cases/jac-network.jpg",
      },
      {
        id: "silk",
        client: "Silk Road Energy Planning and Engineering",
        industry: "Энергетика",
        services: ["HP Fleet Deployment", "Workplace Setup", "Network Connectivity"],
        photo: "/cases/silk-office.jpg",
      },
    ],
    cta: {
      heading: "Не нашли свою отрасль?",
      sub: "Мы адаптируем процессы поддержки под специфику вашей компании — будь то производство, финансы или ритейл.",
      btn: "Получить консультацию",
    },
  },

  uz: {
    eyebrow: "Loyihalar portfeli",
    h2: "Joriy etish tajribasi.",
    sub: "Davlat ob'ektlari, sanoat korxonalari, tijorat kompaniyalari — stok tasvirlarsiz haqiqiy loyihalar.",
    featuredTag: "Asosiy loyiha",
    deliveredList: "Bajarildi",
    featured: {
      client: "Burg'ulashni boshqarish markazi",
      industry: "Neft-gaz · Sanoat",
      scale: "Operatsion boshqaruv markazi · Sanoat ob'ekti",
      services: ["LED Video devor", "IT-infratuzilma", "Control Room", "Tuzilgan kabel", "Kalit topshirish"],
      deliverables: [
        "Boshqaruv tizimi bilan panoramik LED-video devorni o'rnatish",
        "Zal uchun to'liq IT-infratuzilma: SKS, ish stantsiyalari, tarmoq uskunalari",
        "Sozlash va ob'ektni foydalanishga topshirish",
      ],
      scope: "Kalit topshirish operatsion zal: kabel tarmog'ini loyihalashdan va LED-video devorni o'rnatishdan tortib ish stantsiyalarini joylashtirishgacha.",
      photo: "/cases/drilling-led.jpg",
    },
    grid: [
      {
        id: "minen",
        client: "O'zbekiston Energetika Vazirligi",
        industry: "Davlat sektori",
        services: ["AV-tizimlar", "Konferensiya yechimlari", "Ish stantsiyalari"],
        photo: "/cases/minen-conf.jpg",
      },
      {
        id: "youth",
        client: "Yoshlar o'quv markazlari",
        industry: "Ta'lim",
        services: ["Computer Lab Setup", "Workplace Deployment", "Asset Management"],
        photo: "/cases/youth-lab.jpg",
      },
      {
        id: "monitoring",
        client: "Sanoat monitoring markazi",
        industry: "Sanoat",
        services: ["SCADA", "Multi-Display Setup", "Network Infrastructure"],
        photo: "/cases/monitoring-dash.jpg",
      },
      {
        id: "jac",
        client: "JAC Motors Tashkent",
        industry: "Avtomobil biznesi",
        services: ["Tuzilgan kabel", "Tarmoq joylashtirish", "SKS o'rnatish"],
        photo: "/cases/jac-network.jpg",
      },
      {
        id: "silk",
        client: "Silk Road Energy Planning and Engineering",
        industry: "Energetika",
        services: ["HP Fleet Deployment", "Workplace Setup", "Tarmoq ulanishi"],
        photo: "/cases/silk-office.jpg",
      },
    ],
    cta: {
      heading: "O'z sohanginizni topmadingizmi?",
      sub: "Biz qo'llab-quvvatlash jarayonlarini kompaniyangizning o'ziga xosligiga moslashtiramiz.",
      btn: "Maslahat olish",
    },
  },

  en: {
    eyebrow: "Project Portfolio",
    h2: "Deployment experience.",
    sub: "Government facilities, industrial sites, commercial companies — real projects, no stock images.",
    featuredTag: "Featured Project",
    deliveredList: "Delivered",
    featured: {
      client: "Drilling Control Center",
      industry: "Oil & Gas · Industrial",
      scale: "Operations Control Center · Industrial Facility",
      services: ["LED Video Wall", "IT Infrastructure", "Control Room", "Structured Cabling", "Turnkey"],
      deliverables: [
        "Panoramic LED video wall installation with control system",
        "Full room IT infrastructure: structured cabling, workstations, network equipment",
        "Configuration and commissioning — complete turnkey delivery",
      ],
      scope: "Turnkey operations center: from structured cabling design and LED video wall installation to workstation deployment and facility commissioning. Delivered on schedule with zero production downtime.",
      photo: "/cases/drilling-led.jpg",
    },
    grid: [
      {
        id: "minen",
        client: "Ministry of Energy of Uzbekistan",
        industry: "Government",
        services: ["AV Systems", "Conference Solutions", "Workstation Deployment"],
        photo: "/cases/minen-conf.jpg",
      },
      {
        id: "youth",
        client: "Youth Learning Centers",
        industry: "Education",
        services: ["Computer Lab Setup", "Workplace Deployment", "Asset Management"],
        photo: "/cases/youth-lab.jpg",
      },
      {
        id: "monitoring",
        client: "Industrial Monitoring Center",
        industry: "Industrial",
        services: ["SCADA", "Multi-Display Setup", "Network Infrastructure"],
        photo: "/cases/monitoring-dash.jpg",
      },
      {
        id: "jac",
        client: "JAC Motors Tashkent",
        industry: "Automotive",
        services: ["Structured Cabling", "Network Deployment", "SCS Installation"],
        photo: "/cases/jac-network.jpg",
      },
      {
        id: "silk",
        client: "Silk Road Energy Planning and Engineering",
        industry: "Energy",
        services: ["HP Fleet Deployment", "Workplace Setup", "Network Connectivity"],
        photo: "/cases/silk-office.jpg",
      },
    ],
    cta: {
      heading: "Don't see your industry?",
      sub: "We adapt our support processes to your company's specifics — whether manufacturing, finance, or retail.",
      btn: "Get a Consultation",
    },
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function ServiceTag({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "#748078",
      background: "rgba(238,242,238,0.05)",
      border: "1px solid rgba(238,242,238,0.1)",
      padding: "3px 9px",
      borderRadius: 4,
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M2.5 7L5.5 10L11.5 4" stroke="#4fd18a" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeaturedCard({ p, tag, deliveredLabel, visible }: {
  p: FeaturedProject;
  tag: string;
  deliveredLabel: string;
  visible: boolean;
}) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity .5s ${EASE}, transform .5s ${EASE}`,
        marginBottom: 16,
      }}
    >
      <div
        className="featured-card fc-card"
        style={{
          display: "grid",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(238,242,238,0.1)",
          background: "#0b1210",
          minHeight: 380,
        }}
      >
        {/* Photo side */}
        <div style={{ position: "relative", minHeight: 320 }}>
          <Image
            src={p.photo}
            alt={p.client}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="fc-img"
            style={{
              objectFit: "cover",
              objectPosition: "center 30%",
            }}
          />
          {/* gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(5,8,10,0.2) 0%, rgba(5,8,10,0.55) 100%)",
          }} />
          {/* Industry pill */}
          <div style={{
            position: "absolute", top: 16, left: 16,
            fontSize: 10, fontWeight: 700, letterSpacing: "0.09em",
            textTransform: "uppercase", color: "#4fd18a",
            background: "rgba(5,8,10,0.75)", padding: "5px 12px",
            borderRadius: 20, border: "1px solid rgba(79,209,138,0.3)",
            backdropFilter: "blur(8px)",
          }}>
            {p.industry}
          </div>
        </div>

        {/* Content side */}
        <div style={{
          padding: "36px 36px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderLeft: "1px solid rgba(238,242,238,0.08)",
        }}>
          {/* Top */}
          <div>
            {/* Tag */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#4fd18a",
              marginBottom: 20,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4fd18a", display: "inline-block" }} />
              {tag}
            </div>

            <h3 style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 800, fontSize: "clamp(18px,2vw,24px)",
              color: "#ffffff", margin: "0 0 6px",
              lineHeight: 1.2, letterSpacing: "-0.02em",
            }}>
              {p.client}
            </h3>
            <div style={{ fontSize: 12, color: "#748078", marginBottom: 24, letterSpacing: "-0.01em" }}>
              {p.scale}
            </div>

            {/* Deliverables */}
            <div style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.09em",
                textTransform: "uppercase", color: "#748078", marginBottom: 12,
              }}>
                {deliveredLabel}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {p.deliverables.map((d) => (
                  <div key={d} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <CheckIcon />
                    <span style={{ fontSize: 13, color: "#c3d0c8", lineHeight: 1.5 }}>{d}</span>
                  </div>
                ))}
              </div>
            </div>

            <p style={{
              fontSize: 13, lineHeight: 1.65, color: "#748078",
              margin: "0 0 24px", borderTop: "1px solid rgba(238,242,238,0.07)",
              paddingTop: 16,
            }}>
              {p.scope}
            </p>
          </div>

          {/* Services */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {p.services.map(s => <ServiceTag key={s} label={s} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function GridCard({ p, i, visible }: { p: GridProject; i: number; visible: boolean }) {
  return (
    <div
      tabIndex={0}
      role="article"
      aria-label={`${p.client} — ${p.industry}`}
      className="gc-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(238,242,238,0.09)",
        background: "#0b1210",
        cursor: "default",
        transition: `opacity .5s ${EASE} ${i * 70}ms, transform .5s ${EASE} ${i * 70}ms`,
      }}
    >
      {/* Photo */}
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <Image
          src={p.photo}
          alt={p.client}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="gc-img"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            willChange: "transform",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(11,18,16,0.95) 0%, rgba(11,18,16,0.3) 55%, rgba(11,18,16,0.1) 100%)",
        }} />
        {/* Industry top-left */}
        <div style={{
          position: "absolute", top: 12, left: 12,
          fontSize: 9, fontWeight: 700, letterSpacing: "0.09em",
          textTransform: "uppercase", color: "#4fd18a",
          background: "rgba(5,8,10,0.72)", padding: "4px 9px",
          borderRadius: 20, border: "1px solid rgba(79,209,138,0.22)",
          backdropFilter: "blur(6px)",
        }}>
          {p.industry}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{
          fontFamily: "var(--font-manrope), sans-serif",
          fontWeight: 700, fontSize: 14,
          color: "#e8efe9", marginBottom: 12,
          lineHeight: 1.3, letterSpacing: "-0.01em",
        }}>
          {p.client}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {p.services.map(s => <ServiceTag key={s} label={s} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────

export function HomeClients() {
  const { lang } = useApp();
  const c = COPY[lang] ?? COPY.ru;
  const { ref, visible } = useReveal();
  const [ctaHov, setCtaHov] = useState(false);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="clients"
      style={{ background: "var(--ark-bg)", padding: "120px 0" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,4vw,64px)" }}>

        {/* ── Header ─────────────────────────────────────────── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: `opacity .4s ${EASE}, transform .4s ${EASE}`,
          marginBottom: 56,
        }}>
          <div style={{
            fontFamily: "var(--font-mono, monospace)", fontSize: 11,
            fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "#4fd18a", marginBottom: 16,
          }}>
            {c.eyebrow}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
            <h2 style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 800, fontSize: "clamp(28px,3.6vw,44px)",
              lineHeight: 1.1, letterSpacing: "-0.03em",
              color: "var(--ark-text-heading)", margin: 0, flexShrink: 0,
            }}>
              {c.h2}
            </h2>
            <p style={{
              fontSize: 15, lineHeight: 1.65, color: "#9fb0a6",
              margin: "8px 0 0", maxWidth: 440,
            }}>
              {c.sub}
            </p>
          </div>
        </div>

        {/* ── Featured project ───────────────────────────────── */}
        <FeaturedCard
          p={c.featured}
          tag={c.featuredTag}
          deliveredLabel={c.deliveredList}
          visible={visible}
        />

        {/* ── Grid of compact cards ──────────────────────────── */}
        <div className="clients-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 40,
        }}>
          {c.grid.map((p, i) => (
            <GridCard key={p.id} p={p} i={i} visible={visible} />
          ))}
        </div>

        {/* ── B2B CTA ────────────────────────────────────────── */}
        <div style={{
          opacity: visible ? 1 : 0,
          transition: `opacity .5s ${EASE} 500ms`,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: 24,
          padding: "28px 32px",
          borderRadius: 12,
          border: "1px solid rgba(238,242,238,0.1)",
          background: "rgba(15,26,22,0.6)",
        }}
          className="clients-cta"
        >
          <div>
            <div style={{
              fontFamily: "var(--font-manrope), sans-serif",
              fontWeight: 700, fontSize: 16,
              color: "#e8efe9", marginBottom: 4,
            }}>
              {c.cta.heading}
            </div>
            <div style={{ fontSize: 13, color: "#748078", lineHeight: 1.6 }}>
              {c.cta.sub}
            </div>
          </div>
          <Link
            href="/contact"
            onMouseEnter={() => setCtaHov(true)}
            onMouseLeave={() => setCtaHov(false)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 22px", borderRadius: 8, whiteSpace: "nowrap",
              background: ctaHov ? "#4fd18a" : "transparent",
              color: ctaHov ? "#05080a" : "#4fd18a",
              border: "1px solid",
              borderColor: ctaHov ? "#4fd18a" : "rgba(79,209,138,0.35)",
              fontSize: 13, fontWeight: 700, textDecoration: "none",
              transition: "background 180ms ease, color 180ms ease, border-color 180ms ease",
            }}
          >
            {c.cta.btn}
            <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </section>
  );
}
