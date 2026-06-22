"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#platform", label: "Platform" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.06] shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[75rem] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-[15px] font-[800] tracking-[0.04em] text-gradient-accent select-none"
          >
            ARKANA
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-[13.5px] font-[500] transition-colors duration-150",
                  pathname === href
                    ? "text-[#2B5BFF]"
                    : "text-[#3D3D4E] hover:text-[#0A0A0F]"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-[13px] font-[700] text-white bg-gradient-brand shadow-accent hover:shadow-accent-hover transition-all duration-150 hover:-translate-y-px active:scale-[0.98]"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-[#3D3D4E] hover:bg-black/[0.04] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="fixed inset-0 z-40 bg-white/97 backdrop-blur-xl pt-20 px-6 flex flex-col"
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
                    className="block py-4 text-[22px] font-[700] text-[#0A0A0F] border-b border-[#F0F4FF]"
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
                className="flex items-center justify-center py-4 rounded-[14px] text-[15px] font-[700] text-white bg-gradient-brand shadow-accent"
              >
                Contact Us
              </Link>

              <div className="mt-4 pt-4 border-t border-[#F0F4FF] flex flex-col gap-2">
                <a
                  href="tel:+998"
                  className="text-[14px] text-[#3D3D4E] font-[500]"
                >
                  +998 — — — — — —
                </a>
                <a
                  href="mailto:info@arkana.uz"
                  className="text-[14px] text-[#3D3D4E] font-[500]"
                >
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
