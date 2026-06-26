"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Connect",
    body: "Sign the contract. We conduct a free IT audit of your infrastructure within 5 business days.",
    note: "Contract → Audit → Kickoff",
    img: null,
    imgAlt: "",
  },
  {
    num: "02",
    title: "Import Employees",
    body: "Your team is onboarded into GoARKAN. Every user, device, and asset is registered and tracked.",
    note: "Users · Devices · Assets linked",
    img: "/portal/companies.jpeg",
    imgAlt: "GoARKAN client and employee management",
  },
  {
    num: "03",
    title: "Tickets",
    body: "Your employees submit tickets via GoARKAN portal, email, or Telegram. SLA timer starts immediately.",
    note: "Portal · Email · Telegram",
    img: "/portal/tickets.jpeg",
    imgAlt: "GoARKAN service desk ticket list",
  },
  {
    num: "04",
    title: "Resolution",
    body: "Our engineer takes the ticket — remote support first, on-site visit when needed. All actions logged.",
    note: "Remote → On-site → Closed",
    img: "/portal/dashboard.jpeg",
    imgAlt: "GoARKAN incident management dashboard",
  },
  {
    num: "05",
    title: "Reporting",
    body: "Every month you receive a written report: tickets closed, SLA performance, asset status, recommendations.",
    note: "Monthly · Written · Actionable",
    img: null,
    imgAlt: "",
  },
];

export function HomeProcess() {
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
            How it works
          </div>
          <h2 style={{
            fontFamily: "Nacelle, sans-serif", fontWeight: 600,
            fontSize: "clamp(2.5rem, 4vw, 4rem)", lineHeight: 1,
            letterSpacing: "-0.05em", color: "var(--ark-text-heading)", margin: 0,
          }}>
            Five steps from contract
            <br />
            <span style={{ color: "var(--ark-text-hint)" }}>to full coverage.</span>
          </h2>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, borderTop: "1px solid var(--ark-divider)" }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: "48px",
                alignItems: "center",
                padding: "40px 0",
                borderBottom: "1px solid var(--ark-divider)",
              }}
            >
              {/* Step number */}
              <div style={{
                fontFamily: "Nacelle, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(2rem, 3vw, 2.75rem)",
                lineHeight: 1,
                letterSpacing: "-0.05em",
                color: "var(--ark-text-faint)",
              }}>
                {step.num}
              </div>

              {/* Title + body */}
              <div>
                <div style={{
                  fontFamily: "Nacelle, sans-serif",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  letterSpacing: "-0.03em",
                  color: "var(--ark-text-heading)",
                  marginBottom: 10,
                }}>
                  {step.title}
                </div>
                <p style={{
                  fontSize: 13.5,
                  color: "var(--ark-text-sub)",
                  lineHeight: 1.65,
                  letterSpacing: "-0.01em",
                  margin: "0 0 12px",
                  maxWidth: 400,
                }}>
                  {step.body}
                </p>
                <div style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--ark-text-faint)",
                }}>
                  {step.note}
                </div>
              </div>

              {/* Screenshot or empty */}
              <div>
                {step.img ? (
                  <div style={{
                    borderRadius: 8,
                    overflow: "hidden",
                    border: "1px solid var(--ark-border)",
                    background: "var(--ark-bg-2)",
                  }}>
                    {/* Mini browser bar */}
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
                        <span key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c, opacity: 0.5, display: "block" }} />
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
                ) : (
                  <div style={{
                    height: 80,
                    borderRadius: 8,
                    border: "1px dashed var(--ark-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <span style={{
                      fontSize: 11,
                      color: "var(--ark-text-faint)",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}>
                      {i === 0 ? "Day 1–5" : "Monthly delivery"}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
