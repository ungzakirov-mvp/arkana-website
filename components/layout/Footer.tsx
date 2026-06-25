import Link from "next/link";
import { ExternalLink, SendHorizonal } from "lucide-react";

const serviceLinks = [
  { href: "/services/it-outsourcing", label: "ИТ-аутсорсинг" },
  { href: "/services/managed-it", label: "Управляемые ИТ-услуги" },
  { href: "/services/infrastructure", label: "Инфраструктура" },
  { href: "/services/itsm", label: "Управление ИТ-сервисами" },
];

const companyLinks = [
  { href: "/about", label: "О компании" },
  { href: "/contact", label: "Контакты" },
];

const platformLinks = [
  { href: "https://goarkan.uz", label: "Платформа GOARKAN ↗", external: true },
];

export function Footer() {
  return (
    <footer style={{ background: "#0B1540", color: "#F8FAFC", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-[75rem] mx-auto px-6 py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              style={{
                display: "inline-block",
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: "0.06em",
                color: "#FFFFFF",
                textDecoration: "none",
                marginBottom: 12,
              }}
            >
              ARKANA
            </Link>
            <p className="text-[13px] leading-relaxed max-w-[200px]" style={{ color: "rgba(255,255,255,0.40)" }}>
              Ваш внешний ИТ-отдел. Создан для растущего бизнеса.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.40)", textDecoration: "none",
                }}
              >
                <ExternalLink size={15} />
              </a>
              <a
                href="https://t.me/arkana_uz"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.40)", textDecoration: "none",
                }}
              >
                <SendHorizonal size={15} />
              </a>
            </div>
          </div>

          <FooterCol title="Услуги" links={serviceLinks} />
          <FooterCol title="Компания" links={companyLinks} />

          <div>
            <h5 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.30)", marginBottom: 16 }}>
              Платформа
            </h5>
            <ul className="flex flex-col gap-2.5">
              {platformLinks.map(({ href, label, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    style={{ fontSize: 13, color: "#4A9EFF", textDecoration: "none" }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h5 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.30)", marginBottom: 16 }}>
                Контакты
              </h5>
              <ul className="flex flex-col gap-2" style={{ fontSize: 13, color: "rgba(255,255,255,0.40)" }}>
                <li>Ташкент, Узбекистан</li>
                <li>
                  <a href="tel:+998" style={{ color: "rgba(255,255,255,0.40)", textDecoration: "none" }}>
                    +998 — — — — — —
                  </a>
                </li>
                <li>
                  <a href="mailto:info@arkana.uz" style={{ color: "rgba(255,255,255,0.40)", textDecoration: "none" }}>
                    info@arkana.uz
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.22)" }}>
            © 2026 ARKANA. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", textDecoration: "none" }}>
              Политика конфиденциальности
            </Link>
            <Link href="/terms" style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", textDecoration: "none" }}>
              Условия использования
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
      <h5 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.30)", marginBottom: 16 }}>
        {title}
      </h5>
      <ul className="flex flex-col gap-2.5">
        {links.map(({ href, label, external }) => (
          <li key={href}>
            {external ? (
              <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "rgba(255,255,255,0.50)", textDecoration: "none" }}>
                {label}
              </a>
            ) : (
              <Link href={href} style={{ fontSize: 13, color: "rgba(255,255,255,0.50)", textDecoration: "none" }}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
