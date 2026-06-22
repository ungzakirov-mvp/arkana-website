import Link from "next/link";
import { ExternalLink, SendHorizonal } from "lucide-react";

const serviceLinks = [
  { href: "/services/it-outsourcing", label: "IT Outsourcing" },
  { href: "/services/managed-it", label: "Managed IT Services" },
  { href: "/services/infrastructure", label: "Infrastructure Support" },
  { href: "/services/itsm", label: "IT Service Management" },
];

const companyLinks = [
  { href: "/about", label: "About ARKANA" },
  { href: "/contact", label: "Contact" },
];

const platformLinks = [
  { href: "https://goarkan.uz", label: "GOARKAN Platform ↗", external: true },
];

export function Footer() {
  return (
    <footer className="bg-[#0A0A0F] text-white">
      <div className="max-w-[75rem] mx-auto px-6 py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block text-[16px] font-[800] tracking-[0.04em] text-gradient-accent mb-3"
            >
              ARKANA
            </Link>
            <p className="text-[13px] text-white/40 leading-relaxed max-w-[200px]">
              Your external IT department. Built for growing businesses.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/50 hover:bg-white/[0.12] hover:text-white transition-all duration-150"
              >
                <ExternalLink size={15} />
              </a>
              <a
                href="https://t.me/arkana_uz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/50 hover:bg-white/[0.12] hover:text-white transition-all duration-150"
              >
                <SendHorizonal size={15} />
              </a>
            </div>
          </div>

          {/* Services */}
          <FooterCol title="Services" links={serviceLinks} />

          {/* Company */}
          <FooterCol title="Company" links={companyLinks} />

          {/* Platform */}
          <div>
            <h5 className="text-[10px] font-[700] uppercase tracking-[0.08em] text-white/40 mb-4">
              Platform
            </h5>
            <ul className="flex flex-col gap-2.5">
              {platformLinks.map(({ href, label, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-[13px] text-[#00C2AA]/80 hover:text-[#00C2AA] transition-colors duration-150"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact info */}
            <div className="mt-8">
              <h5 className="text-[10px] font-[700] uppercase tracking-[0.08em] text-white/40 mb-4">
                Contact
              </h5>
              <ul className="flex flex-col gap-2 text-[13px] text-white/50">
                <li>Tashkent, Uzbekistan</li>
                <li>
                  <a
                    href="tel:+998"
                    className="hover:text-white/80 transition-colors"
                  >
                    +998 — — — — — —
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@arkana.uz"
                    className="hover:text-white/80 transition-colors"
                  >
                    info@arkana.uz
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/25">
            © 2026 ARKANA. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-[12px] text-white/30 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[12px] text-white/30 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <h5 className="text-[10px] font-[700] uppercase tracking-[0.08em] text-white/40 mb-4">
        {title}
      </h5>
      <ul className="flex flex-col gap-2.5">
        {links.map(({ href, label, external }) => (
          <li key={href}>
            {external ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-white/55 hover:text-white/90 transition-colors duration-150"
              >
                {label}
              </a>
            ) : (
              <Link
                href={href}
                className="text-[13px] text-white/55 hover:text-white/90 transition-colors duration-150"
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
