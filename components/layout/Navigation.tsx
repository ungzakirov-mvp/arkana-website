"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/services", label: "Услуги" },
  { href: "/#solutions", label: "Решения" },
  { href: "/#cases", label: "Кейсы" },
  { href: "/about", label: "О нас" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid rgba(11,21,64,0.09)" : "1px solid rgba(11,21,64,0.06)",
          boxShadow: scrolled ? "0 2px 20px rgba(11,21,64,0.08)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "75rem",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: "0.06em",
              color: "#0B1540",
              textDecoration: "none",
            }}
          >
            ARKANA
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: pathname === href ? "#1A6BFF" : "rgba(11,21,64,0.70)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "9px 22px",
                borderRadius: 8,
                fontSize: 13.5,
                fontWeight: 600,
                color: "#1A6BFF",
                background: "transparent",
                border: "1.5px solid #1A6BFF",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                transition: "all 0.15s",
              }}
            >
              Связаться
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#0B1540" }}
            aria-label="Меню"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              paddingTop: 80,
              paddingLeft: 24,
              paddingRight: 24,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <nav className="flex flex-col gap-1 mt-4">
              {links.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "16px 0",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#0B1540",
                      textDecoration: "none",
                      borderBottom: "1px solid rgba(11,21,64,0.08)",
                    }}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="mt-8 flex flex-col gap-3"
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 0",
                  borderRadius: 14,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#FFFFFF",
                  background: "#1A6BFF",
                  textDecoration: "none",
                  boxShadow: "0 6px 24px rgba(26,107,255,0.35)",
                }}
              >
                Связаться
              </Link>
              <div
                className="mt-4 pt-4 flex flex-col gap-2"
                style={{ borderTop: "1px solid rgba(11,21,64,0.08)" }}
              >
                <a href="tel:+998" style={{ fontSize: 14, color: "rgba(11,21,64,0.45)", fontWeight: 500, textDecoration: "none" }}>
                  +998 — — — — — —
                </a>
                <a href="mailto:info@arkana.uz" style={{ fontSize: 14, color: "rgba(11,21,64,0.45)", fontWeight: 500, textDecoration: "none" }}>
                  info@arkana.uz
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
