"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle2, ArrowRight, Send, AlertCircle } from "lucide-react";
import { submitContact, type ContactFormState } from "@/app/actions/contact";
import type { SiteSettings } from "@/lib/cms-api";

const EASE = [0.16, 1, 0.3, 1] as const;

function buildContacts(s?: SiteSettings | null) {
  const phone    = s?.phones?.[0]?.value;
  const phoneHref = s?.phones?.[0]?.href ?? "";
  const email    = s?.emails?.[0]?.value    ?? "info@arkana.uz";
  const emailHref = s?.emails?.[0]?.href   ?? "mailto:info@arkana.uz";
  const tg       = s?.telegram              ?? "@arkana_uz";
  const tgHref   = s?.telegram_href         ?? "https://t.me/arkana_uz";
  const address  = s?.address               ?? "г. Ташкент, ул. Мирзо Улугбека 97";
  const contacts = [
    phone ? { icon: Phone,  label: "Телефон",      value: phone,   href: phoneHref } : null,
    { icon: Send,   label: "Telegram",     value: tg,      href: tgHref    },
    { icon: Mail,   label: "Email",        value: email,   href: emailHref },
    { icon: MapPin, label: "Адрес",        value: address, href: "#"       },
    { icon: Clock,  label: "Режим работы", value: "Пн–Пт: 9:00–18:00, SLA 24/7", href: "#" },
  ];
  return contacts.filter(Boolean) as { icon: typeof Phone; label: string; value: string; href: string }[];
}

const NEXT_STEPS = [
  { step: "1", title: "Отвечаем", desc: "В течение 2 часов — звонок или сообщение в Telegram" },
  { step: "2", title: "Проводим аудит", desc: "Бесплатно изучаем вашу IT-инфраструктуру за 5 дней" },
  { step: "3", title: "Даём предложение", desc: "Письменный отчёт и стоимость. Без давления." },
];

const INITIAL_STATE: ContactFormState = { status: "idle" };

export function ContactPageSection({ settings }: { settings?: SiteSettings | null }) {
  const [state, action, pending] = useActionState(submitContact, INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);
  const CONTACTS = buildContacts(settings);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  const fieldError = (field: string): string | undefined => {
    if (state.status === "error") return state.errors?.[field]?.[0];
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.12), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }}>
            <div className="ark-badge" style={{ justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>Контакты</span>
            </div>
            <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
              <span className="heading-gradient">Запросите бесплатный</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>IT-аудит за 5 дней</span>
            </h1>
            <p style={{ fontSize: 16, color: "var(--ark-text-muted)", lineHeight: 1.65, maxWidth: 480, margin: "0 auto" }}>
              Без обязательств. Расскажем, что улучшить в вашей IT-инфраструктуре и сколько это стоит.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }}>

            {/* Left — Contacts + next steps */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <div style={{ marginBottom: 40 }}>
                <h2 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.375rem", color: "var(--ark-text)", marginBottom: 24 }}>
                  Как с нами связаться
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href}
                      style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", borderRadius: 12, background: "var(--ark-card)", border: "1px solid var(--ark-card-border)", textDecoration: "none", transition: "border-color 0.2s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ark-accent)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ark-card-border)")}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--ark-accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} style={{ color: "var(--ark-accent-2)" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 2 }}>{label}</div>
                        <div style={{ fontSize: 14, color: "var(--ark-text)", fontWeight: 500 }}>{value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 16 }}>
                  Что будет дальше
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {NEXT_STEPS.map(({ step, title, desc }) => (
                    <div key={step} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--ark-accent)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {step}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ark-text)", marginBottom: 2 }}>{title}</div>
                        <div style={{ fontSize: 13, color: "var(--ark-text-muted)", lineHeight: 1.5 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ padding: "20px", borderRadius: 12, background: "var(--ark-accent-glow)", border: "1px solid rgba(99,102,241,0.15)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-accent-2)", marginBottom: 12 }}>
                  Что вы получите
                </div>
                {["Аудит IT-инфраструктуры за 5 дней", "Письменный отчёт с рекомендациями", "Расчёт стоимости для вашего бизнеса", "Без обязательств и давления"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <CheckCircle2 size={14} style={{ color: "var(--ark-accent-2)", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--ark-text)", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}>
              <div style={{ borderRadius: 16, background: "var(--ark-card)", border: "1px solid var(--ark-border)", padding: "32px" }}>

                {state.status === "success" ? (
                  <div style={{ textAlign: "center", padding: "48px 24px" }}>
                    <CheckCircle2 size={48} style={{ color: "var(--ark-accent-2)", margin: "0 auto 16px" }} />
                    <h3 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.25rem", color: "var(--ark-text)", marginBottom: 8 }}>
                      Заявка отправлена!
                    </h3>
                    <p style={{ fontSize: 14, color: "var(--ark-text-muted)" }}>
                      Мы свяжемся с вами в течение 2 часов.
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} action={action}>
                    <h3 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "1.25rem", color: "var(--ark-text)", marginBottom: 24 }}>
                      Запросить бесплатный аудит
                    </h3>

                    {/* Global error */}
                    {state.status === "error" && state.message && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", marginBottom: 16 }}>
                        <AlertCircle size={14} style={{ color: "#f87171", flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#f87171" }}>{state.message}</span>
                      </div>
                    )}

                    {state.status === "rate_limited" && (
                      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 8, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", marginBottom: 16 }}>
                        <AlertCircle size={14} style={{ color: "#fbbf24", flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#fbbf24" }}>Слишком много запросов. Попробуйте позже или напишите нам напрямую.</span>
                      </div>
                    )}

                    {/* Honeypot */}
                    <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {/* Name */}
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 6 }}>
                          Ваше имя *
                        </label>
                        <input
                          type="text" name="name" required placeholder="Иван Иванов"
                          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "var(--ark-bg-2)", border: `1px solid ${fieldError("name") ? "#f87171" : "var(--ark-border)"}`, color: "var(--ark-text)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                        />
                        {fieldError("name") && <p style={{ fontSize: 12, color: "#f87171", marginTop: 4 }}>{fieldError("name")}</p>}
                      </div>

                      {/* Company */}
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 6 }}>
                          Компания *
                        </label>
                        <input
                          type="text" name="company" required placeholder="ООО Ваша Компания"
                          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "var(--ark-bg-2)", border: `1px solid ${fieldError("company") ? "#f87171" : "var(--ark-border)"}`, color: "var(--ark-text)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                        />
                        {fieldError("company") && <p style={{ fontSize: 12, color: "#f87171", marginTop: 4 }}>{fieldError("company")}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 6 }}>
                          Email *
                        </label>
                        <input
                          type="email" name="email" required placeholder="ivan@company.uz"
                          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "var(--ark-bg-2)", border: `1px solid ${fieldError("email") ? "#f87171" : "var(--ark-border)"}`, color: "var(--ark-text)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                        />
                        {fieldError("email") && <p style={{ fontSize: 12, color: "#f87171", marginTop: 4 }}>{fieldError("email")}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 6 }}>
                          Телефон *
                        </label>
                        <input
                          type="tel" name="phone" required placeholder="+998 90 123-45-67"
                          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "var(--ark-bg-2)", border: `1px solid ${fieldError("phone") ? "#f87171" : "var(--ark-border)"}`, color: "var(--ark-text)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                        />
                        {fieldError("phone") && <p style={{ fontSize: 12, color: "#f87171", marginTop: 4 }}>{fieldError("phone")}</p>}
                      </div>

                      {/* Message */}
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--ark-text-muted)", marginBottom: 6 }}>
                          Опишите задачу (необязательно)
                        </label>
                        <textarea
                          name="message" rows={3}
                          placeholder="Кратко о вашей ситуации и IT-инфраструктуре..."
                          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, background: "var(--ark-bg-2)", border: "1px solid var(--ark-border)", color: "var(--ark-text)", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={pending}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "12px", borderRadius: 8, background: "linear-gradient(to bottom, #6366f1, #4f46e5)", color: "white", fontWeight: 700, fontSize: 14, border: "none", cursor: pending ? "wait" : "pointer", opacity: pending ? 0.7 : 1, transition: "opacity 0.2s" }}
                      >
                        {pending ? "Отправляем..." : "Запросить бесплатный аудит"}
                        {!pending && <ArrowRight size={15} />}
                      </button>

                      <p style={{ fontSize: 11.5, color: "var(--ark-text-muted)", textAlign: "center" }}>
                        Отвечаем в течение 2 часов · Без спама · Без обязательств
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
