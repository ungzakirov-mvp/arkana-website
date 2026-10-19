"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "var(--font-manrope, var(--font-inter)), sans-serif",
      }}
    >
      <p
        style={{
          fontSize: "clamp(5rem, 15vw, 10rem)",
          fontWeight: 800,
          lineHeight: 1,
          color: "var(--ark-accent, #4fd18a)",
          margin: 0,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          fontWeight: 700,
          margin: "1rem 0 0.5rem",
          color: "var(--ark-text)",
        }}
      >
        Страница не найдена
      </h1>
      <p
        style={{
          fontSize: "1rem",
          color: "var(--ark-muted, #6b7280)",
          maxWidth: "36ch",
          lineHeight: 1.6,
          margin: "0 0 2rem",
        }}
      >
        Возможно, страница была перемещена или удалена. Вернитесь на главную.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.75rem",
          borderRadius: "0.5rem",
          background: "var(--ark-accent, #4fd18a)",
          color: "#0b1a14",
          fontWeight: 700,
          fontSize: "0.95rem",
          textDecoration: "none",
          transition: "opacity 0.2s",
        }}
        onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
        onMouseOut={e => (e.currentTarget.style.opacity = "1")}
      >
        На главную
      </Link>
    </main>
  );
}
