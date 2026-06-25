"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const clients = [
  {
    name: "UNG Overseas",
    shortName: "UNG",
    sector: "Международная торговля энергоресурсами",
  },
  {
    name: "Silk Road Energy Planning & Engineering",
    shortName: "SEPE",
    sector: "Планирование и инжиниринг в энергетике",
  },
];

export function Trust() {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section style={{ background: "#F2F6FF", padding: "96px 0" }}>
      <div style={{ maxWidth: "75rem", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          style={{ maxWidth: 560, marginBottom: 56 }}
        >
          <span className="eyebrow" style={{ marginBottom: 20, display: "inline-flex" }}>
            Наши клиенты
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
            Компании, которые передали
            <br />
            своё ИТ в ARKANA.
          </h2>
          <p style={{ fontSize: 17, color: "rgba(11,21,64,0.55)", lineHeight: 1.65 }}>
            Растущие компании и устоявшиеся предприятия Ташкента, которые решили прекратить неформальное управление ИТ.
          </p>
        </motion.div>

        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "rgba(11,21,64,0.30)",
              marginBottom: 20,
            }}
          >
            Доверяют организации
          </motion.p>

          {/* Logo wall */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 64 }}
          >
            {clients.map((client, i) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.45, ease: EASE }}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(11,21,64,0.09)",
                  borderRadius: 14,
                  padding: "20px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  minWidth: 240,
                  boxShadow: "0 2px 12px rgba(11,21,64,0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "rgba(26,107,255,0.10)",
                      border: "1px solid rgba(26,107,255,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#1A6BFF",
                      letterSpacing: "0.04em",
                      flexShrink: 0,
                    }}
                  >
                    {client.shortName}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0B1540", lineHeight: 1.3 }}>
                    {client.name}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: "rgba(11,21,64,0.40)", fontWeight: 500, paddingLeft: 46 }}>
                  {client.sector}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.38, duration: 0.6, ease: EASE }}
            style={{
              background: "rgba(26,107,255,0.05)",
              border: "1.5px dashed rgba(26,107,255,0.22)",
              borderRadius: 20,
              padding: "32px 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#0B1540", marginBottom: 4 }}>
                Ваша компания здесь.
              </p>
              <p style={{ fontSize: 13, color: "rgba(11,21,64,0.45)" }}>
                Начните с бесплатного ИТ-аудита — без обязательств.
              </p>
            </div>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 700,
                color: "#1A6BFF",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Получить бесплатный аудит <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
