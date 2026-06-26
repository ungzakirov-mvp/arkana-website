"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const STEPS = [
  {
    num: "01",
    actor: "Employee",
    title: "Creates ticket",
    body: "Via GoARKAN portal, email, or Telegram. Ticket is auto-categorized, prioritized, and SLA timer starts.",
    img: "/portal/tickets.jpeg",
    imgAlt: "GoARKAN service desk — ticket list",
    tag: "Portal · Email · Telegram",
  },
  {
    num: "02",
    actor: "Engineer",
    title: "Accepts & responds",
    body: "Your named engineer takes the ticket within the contracted SLA window. Client notified automatically.",
    img: "/portal/dashboard.jpeg",
    imgAlt: "GoARKAN dashboard — engineer assignment",
    tag: "< 1–2h first response",
  },
  {
    num: "03",
    actor: "Engineer",
    title: "Resolves remotely or on-site",
    body: "Remote support first — resolves most issues in minutes. On-site visit dispatched when hardware or physical access is needed.",
    img: null,
    imgAlt: "",
    tag: "Remote → On-site if needed",
  },
  {
    num: "04",
    actor: "System",
    title: "Ticket closed & logged",
    body: "Resolution documented in GoARKAN. Every action, timestamp, and note logged. Nothing disappears.",
    img: "/portal/assets.jpeg",
    imgAlt: "GoARKAN asset and ticket log",
    tag: "Full audit trail",
  },
  {
    num: "05",
    actor: "Manager",
    title: "Receives monthly report",
    body: "Written report delivered every month: tickets closed, SLA performance, asset status, and actionable recommendations.",
    img: "/portal/companies.jpeg",
    imgAlt: "GoARKAN client portal — reporting view",
    tag: "Every month · Written",
  },
];

export function HomeJourney() {
  return (
    <section style={{
      background: "var(--ark-bg)",
      paddingBottom: 120,
      borderTop: "1px solid var(--ark-divider)",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ padding: "80px 0 72px" }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16,
          }}>
            Service Desk Journey
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }}>
            <h2 style={{
              fontFamily: "Nacelle, sans-serif", fontWeight: 600,
              fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1,
              letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: 0,
            }}>
              From ticket open
              <br />
              <span style={{ color: "var(--ark-text-hint)" }}>to report delivered.</span>
            </h2>
            <p style={{
              fontSize: 14, lineHeight: 1.7,
              color: "var(--ark-text-hint)",
              margin: 0, letterSpacing: "-0.01em",
            }}>
              Every incident follows a structured, traceable workflow — visible to you at every step through GoARKAN.
              No phone calls asking for status. No guessing.
            </p>
          </div>
        </div>

        {/* Timeline steps */}
        <div style={{ position: "relative" }}>
          {/* Vertical connector line */}
          <div style={{
            position: "absolute",
            left: 27,
            top: 24,
            bottom: 24,
            width: 1,
            background: "var(--ark-border)",
            zIndex: 0,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: "32px",
                  alignItems: "start",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Step node */}
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "var(--ark-bg)",
                  border: "1px solid var(--ark-border-strong)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "Nacelle, sans-serif",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "-0.02em",
                    color: "var(--ark-text-sub)",
                  }}>
                    {step.num}
                  </span>
                </div>

                {/* Content */}
                <div style={{
                  padding: "16px 0 48px",
                  display: "grid",
                  gridTemplateColumns: step.img ? "1fr 1fr" : "1fr",
                  gap: "40px",
                  alignItems: "start",
                }}>
                  <div>
                    {/* Actor tag */}
                    <div style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ark-text-faint)",
                      marginBottom: 8,
                    }}>
                      {step.actor}
                    </div>
                    <div style={{
                      fontFamily: "Nacelle, sans-serif",
                      fontWeight: 600,
                      fontSize: "1.375rem",
                      letterSpacing: "-0.03em",
                      color: "var(--ark-text-heading)",
                      marginBottom: 12,
                      lineHeight: 1.2,
                    }}>
                      {step.title}
                    </div>
                    <p style={{
                      fontSize: 13.5,
                      color: "var(--ark-text-sub)",
                      lineHeight: 1.65,
                      letterSpacing: "-0.01em",
                      margin: "0 0 14px",
                      maxWidth: 440,
                    }}>
                      {step.body}
                    </p>
                    <div style={{
                      display: "inline-flex",
                      padding: "3px 10px",
                      borderRadius: 4,
                      border: "1px solid var(--ark-border)",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: "var(--ark-text-label)",
                    }}>
                      {step.tag}
                    </div>
                  </div>

                  {/* Screenshot */}
                  {step.img && (
                    <div style={{
                      borderRadius: 8,
                      overflow: "hidden",
                      border: "1px solid var(--ark-border)",
                      background: "var(--ark-bg-2)",
                    }}>
                      <div style={{
                        height: 26,
                        background: "var(--ark-bg-2)",
                        borderBottom: "1px solid var(--ark-divider)",
                        display: "flex",
                        alignItems: "center",
                        padding: "0 10px",
                        gap: 5,
                      }}>
                        {["#ef4444","#f59e0b","#22c55e"].map(c => (
                          <span key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, display: "block" }} />
                        ))}
                      </div>
                      <Image
                        src={step.img}
                        alt={step.imgAlt}
                        width={560}
                        height={315}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 48,
          paddingTop: 48,
          borderTop: "1px solid var(--ark-divider)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}>
          <div>
            <div style={{
              fontFamily: "Nacelle, sans-serif",
              fontWeight: 600,
              fontSize: "1.25rem",
              letterSpacing: "-0.03em",
              color: "var(--ark-text-heading)",
              marginBottom: 6,
            }}>
              See GoARKAN in action.
            </div>
            <div style={{ fontSize: 13, color: "var(--ark-text-hint)", letterSpacing: "-0.01em" }}>
              Request a live demo with your own data.
            </div>
          </div>
          <Link href="/contact" style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "11px 22px",
            borderRadius: 7,
            background: "var(--ark-accent)",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "-0.01em",
            textDecoration: "none",
          }}>
            Request Demo
          </Link>
        </div>

      </div>
    </section>
  );
}
