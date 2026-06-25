"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const features = [
  "Проектирование и внедрение сетей",
  "Облачные решения",
  "Техническая поддержка 24/7",
];

export function Hero() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100svh",
        background: "#FFFFFF",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100svh",
        }}
        className="max-lg:grid-cols-1"
      >
        {/* ── Left column — content ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "100px 60px 80px 80px",
            position: "relative",
            zIndex: 2,
          }}
          className="max-lg:px-6 max-lg:py-28 max-lg:items-center max-lg:text-center"
        >
          {/* ARKANA wordmark */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{
              fontSize: "clamp(72px, 9vw, 120px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              color: "#0B1540",
              marginBottom: 28,
            }}
          >
            ARKANA
          </motion.h1>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.8, ease: EASE }}
            style={{
              fontSize: "clamp(22px, 2.6vw, 34px)",
              fontWeight: 700,
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
              color: "#0B1540",
              marginBottom: 18,
            }}
          >
            Внешний IT-отдел<br />для вашего бизнеса
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7, ease: EASE }}
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              color: "rgba(11,21,64,0.55)",
              marginBottom: 40,
              maxWidth: 420,
            }}
          >
            Премиальный ИТ-аутсорсинг и консалтинг в Ташкенте для оптимизации и роста.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.30, duration: 0.7, ease: EASE }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}
            className="max-lg:justify-center"
          >
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1A6BFF",
                color: "#FFFFFF",
                padding: "13px 26px",
                borderRadius: 10,
                fontSize: 14.5,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 6px 24px rgba(26,107,255,0.40)",
                letterSpacing: "-0.01em",
              }}
            >
              Получить аудит
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/services"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "#1A6BFF",
                padding: "13px 26px",
                borderRadius: 10,
                fontSize: 14.5,
                fontWeight: 600,
                textDecoration: "none",
                border: "1.5px solid #1A6BFF",
                letterSpacing: "-0.01em",
              }}
            >
              Наши услуги
            </Link>
          </motion.div>

          {/* Feature card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.7, ease: EASE }}
            style={{
              background: "linear-gradient(135deg, #0B1B5E 0%, #1A3FCC 100%)",
              borderRadius: 16,
              padding: "22px 26px",
              maxWidth: 380,
              boxShadow: "0 12px 40px rgba(11,21,64,0.25)",
            }}
          >
            <h3
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: 14,
                letterSpacing: "-0.02em",
              }}
            >
              IT-инфраструктура под ключ
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.80)",
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Check size={10} color="#FFFFFF" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ── Right column — sphere image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: 500,
          }}
          className="max-lg:hidden"
        >
          <Image
            src="/hero-sphere.png"
            alt=""
            fill
            priority
            quality={100}
            sizes="(max-width: 1024px) 100vw, 55vw"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
          {/* Fade left edge into white left column */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, #FFFFFF 0%, transparent 18%)",
            pointerEvents: "none",
          }} />
          {/* Fade bottom into white */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.7) 25%, transparent 50%)",
            pointerEvents: "none",
          }} />
          {/* Fade top */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, #FFFFFF 0%, transparent 15%)",
            pointerEvents: "none",
          }} />
        </motion.div>
      </div>
    </section>
  );
}
