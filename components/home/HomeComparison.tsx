"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const ROWS = [
  { label: "Monthly cost",          internal: "Variable + hidden costs",   arkana: "Fixed per seat"               },
  { label: "First response",        internal: "No guaranteed SLA",         arkana: "1–2h SLA in contract"         },
  { label: "24/7 coverage",         internal: "Usually not covered",       arkana: "Always included"              },
  { label: "Sick leave / vacation", internal: "No coverage, work stops",   arkana: "Team continues uninterrupted" },
  { label: "Real-time visibility",  internal: "None — you ask, they tell", arkana: "GoARKAN dashboard + reports"  },
  { label: "Asset tracking",        internal: "Spreadsheets, if any",      arkana: "Automated registry in GoARKAN"},
  { label: "Reporting",             internal: "On request, inconsistent",  arkana: "Monthly written report"       },
  { label: "Cybersecurity",         internal: "Ad-hoc, reactive",          arkana: "Proactive monitoring + policy"},
  { label: "Scalability",           internal: "Hire / fire cycle",         arkana: "Add or remove seats instantly"},
  { label: "Accountability",        internal: "Internal politics",         arkana: "SLA with financial penalties" },
];

export function HomeComparison() {
  return (
    <section style={{
      background: "var(--ark-bg)",
      paddingBottom: 120,
      borderTop: "1px solid var(--ark-divider)",
    }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px" }}>

        {/* Header */}
        <div style={{ padding: "80px 0 64px" }}>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "var(--ark-text-hint)", marginBottom: 16,
          }}>
            Why ARKANA
          </div>
          <h2 style={{
            fontFamily: "Nacelle, sans-serif", fontWeight: 600,
            fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1,
            letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: 0,
          }}>
            Internal IT department
            <br />
            <span style={{ color: "var(--ark-text-hint)" }}>vs ARKANA.</span>
          </h2>
        </div>

        {/* Table */}
        <div style={{
          borderRadius: 12,
          border: "1px solid var(--ark-border)",
          overflow: "hidden",
        }}>
          {/* Column headers */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            background: "var(--ark-surface)",
            borderBottom: "1px solid var(--ark-border)",
          }}>
            <div style={{ padding: "16px 24px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ark-text-faint)" }}>
              Category
            </div>
            <div style={{
              padding: "16px 24px",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--ark-text-hint)",
              borderLeft: "1px solid var(--ark-border)",
            }}>
              Internal IT
            </div>
            <div style={{
              padding: "16px 24px",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--ark-text)",
              borderLeft: "1px solid var(--ark-border)",
              background: "var(--ark-accent-glow)",
            }}>
              ARKANA
            </div>
          </div>

          {/* Rows */}
          {ROWS.map(({ label, internal, arkana }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                borderBottom: i < ROWS.length - 1 ? "1px solid var(--ark-divider)" : "none",
              }}
            >
              {/* Label */}
              <div style={{
                padding: "18px 24px",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--ark-text-muted)",
                letterSpacing: "-0.01em",
                display: "flex",
                alignItems: "center",
              }}>
                {label}
              </div>

              {/* Internal IT */}
              <div style={{
                padding: "18px 24px",
                borderLeft: "1px solid var(--ark-divider)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}>
                <X size={13} style={{ color: "var(--ark-text-faint)", flexShrink: 0 }} />
                <span style={{
                  fontSize: 13,
                  color: "var(--ark-text-label)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.4,
                }}>
                  {internal}
                </span>
              </div>

              {/* ARKANA */}
              <div style={{
                padding: "18px 24px",
                borderLeft: "1px solid var(--ark-divider)",
                background: "var(--ark-accent-glow)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}>
                <Check size={13} style={{ color: "var(--ark-accent-2)", flexShrink: 0 }} />
                <span style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--ark-text)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.4,
                }}>
                  {arkana}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
