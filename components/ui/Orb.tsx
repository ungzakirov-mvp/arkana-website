"use client";

import { motion } from "framer-motion";

export function Orb() {
  return (
    <motion.div
      animate={{ scale: [1, 1.028, 1] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "relative",
        width: 360,
        height: 360,
        borderRadius: "50%",
        flexShrink: 0,
      }}
    >
      {/* Outer glow ring */}
      <div
        style={{
          position: "absolute",
          inset: -24,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(43,91,255,0.10) 0%, rgba(107,53,255,0.04) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Main sphere body */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 38% 30%, rgba(255,255,255,0.98) 0%, rgba(240,245,255,0.88) 28%, rgba(215,228,255,0.65) 58%, rgba(185,208,255,0.35) 80%, rgba(160,190,255,0.15) 100%)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1.5px solid rgba(255,255,255,0.90)",
          boxShadow: [
            "inset 0 2px 0 rgba(255,255,255,0.95)",
            "inset 0 -2px 8px rgba(43,91,255,0.06)",
            "0 0 60px rgba(43,91,255,0.10)",
            "0 0 140px rgba(43,91,255,0.05)",
            "0 32px 80px rgba(0,0,0,0.09)",
            "0 8px 24px rgba(0,0,0,0.05)",
          ].join(", "),
        }}
      />

      {/* Specular highlight — top-left catchlight */}
      <div
        style={{
          position: "absolute",
          top: "9%",
          left: "14%",
          width: "44%",
          height: "38%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.40) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Secondary soft highlight — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          right: "10%",
          width: "28%",
          height: "22%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.30) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Inner ring line */}
      <div
        style={{
          position: "absolute",
          inset: 20,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.45)",
          pointerEvents: "none",
        }}
      />

      {/* Text centred in sphere */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "-0.025em",
            color: "#0A0A0F",
          }}
        >
          ARKANA
        </span>
        <div
          style={{
            width: 32,
            height: 1,
            background: "rgba(43,91,255,0.35)",
            borderRadius: 1,
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#3D3D4E",
            opacity: 0.7,
          }}
        >
          IT Operations
        </span>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#3D3D4E",
            opacity: 0.6,
          }}
        >
          Managed
        </span>
      </div>
    </motion.div>
  );
}
