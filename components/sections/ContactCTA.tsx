"use client";

import { useRef, useActionState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Calendar } from "lucide-react";
import { submitContact, type ContactFormState } from "@/app/actions/contact";

const initialState: ContactFormState = { status: "idle" };

export function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  const submitted = state.status === "success" || state.status === "spam";
  const errors = state.status === "error" ? state.errors : {};
  const isRateLimited = state.status === "rate_limited";
  const globalError = state.status === "error" && state.message ? state.message : null;
  const rateLimitMessage = isRateLimited
    ? `Слишком много запросов. Попробуйте после ${new Date(state.resetAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}.`
    : null;

  return (
    <section
      ref={ref}
      style={{ background: "#0B1540", position: "relative", overflow: "hidden" }}
    >
      {/* Blue glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 350,
          background: "radial-gradient(ellipse at center top, rgba(26,107,255,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Headline */}
      <div style={{ width: "100%", maxWidth: "75rem", margin: "0 auto", padding: "100px 1.5rem 64px", position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "#4A9EFF", marginBottom: 20 }}
        >
          Готовы начать
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{
            fontSize: "clamp(36px, 4.4vw, 62px)",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.06,
            color: "#FFFFFF",
            marginBottom: 52,
            maxWidth: 740,
          }}
        >
          Готовы передать ваши ИТ-операции
          <br />
          профессионалам?
        </motion.h2>
      </div>

      {/* Form area */}
      <div style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.07)", position: "relative", zIndex: 1 }}>
        <div className="max-w-[75rem] mx-auto px-6 pt-14 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="lg:col-span-3"
            >
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 24, padding: 32 }}>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(26,107,255,0.15)", border: "1px solid rgba(26,107,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 24 }}>
                      ✓
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF", marginBottom: 12 }}>
                      Мы свяжемся с вами в течение 4 часов.
                    </h3>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.50)", maxWidth: 320 }}>
                      Спасибо за обращение. Наш специалист свяжется с вами для организации бесплатного ИТ-аудита.
                    </p>
                  </motion.div>
                ) : (
                  <form action={formAction} noValidate className="flex flex-col gap-5">
                    {/* Honeypot */}
                    <div aria-hidden="true" style={{ display: "none" }}>
                      <label htmlFor="website">Website</label>
                      <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="Ваше имя" name="name" type="text" placeholder="Азиз Каримов" required autoComplete="name" error={errors.name?.[0]} />
                      <FormField label="Название компании" name="company" type="text" placeholder="Ваша компания" required autoComplete="organization" error={errors.company?.[0]} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField label="Рабочий email" name="email" type="email" placeholder="you@company.com" required autoComplete="email" error={errors.email?.[0]} />
                      <FormField label="Номер телефона" name="phone" type="tel" placeholder="+998 90 000 00 00" autoComplete="tel" error={errors.phone?.[0]} />
                    </div>

                    <div>
                      <label htmlFor="message" style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "rgba(255,255,255,0.60)", marginBottom: 8 }}>
                        Сообщение <span style={{ color: "rgba(255,255,255,0.30)", fontWeight: 400 }}>(необязательно)</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        maxLength={2000}
                        placeholder="Расскажите вкратце о вашей ИТ-ситуации..."
                        style={{
                          width: "100%",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.10)",
                          borderRadius: 12,
                          padding: "12px 16px",
                          fontSize: 14,
                          color: "rgba(255,255,255,0.85)",
                          outline: "none",
                          resize: "none",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>

                    {(rateLimitMessage || globalError || (state.status === "error" && Object.keys(errors).length > 0)) && (
                      <p style={{ fontSize: 13, color: "#F87171", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: 10, padding: "12px 16px" }}>
                        {rateLimitMessage ?? globalError ?? "Исправьте ошибки выше и попробуйте снова."}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isPending || isRateLimited}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "15px 0",
                        borderRadius: 14,
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#FFFFFF",
                        background: "#1A6BFF",
                        border: "none",
                        cursor: isPending || isRateLimited ? "not-allowed" : "pointer",
                        opacity: isPending || isRateLimited ? 0.6 : 1,
                        letterSpacing: "-0.01em",
                        boxShadow: "0 6px 24px rgba(26,107,255,0.35)",
                      }}
                    >
                      {isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Отправка...
                        </span>
                      ) : (
                        <>
                          Получить бесплатный аудит
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div style={{ width: "100%", borderTop: "1px solid rgba(255,255,255,0.08)" }} />
                      </div>
                      <div className="relative flex justify-center">
                        <span style={{ background: "rgba(11,21,64,0.80)", padding: "0 12px", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
                          или
                        </span>
                      </div>
                    </div>

                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        padding: "13px 0",
                        borderRadius: 14,
                        fontSize: 13.5,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.55)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        textDecoration: "none",
                      }}
                    >
                      <Calendar size={15} />
                      Запланировать 30-минутный звонок
                    </a>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact info sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", marginBottom: 20 }}>
                  Другие способы связи
                </h3>
                <div className="flex flex-col gap-4">
                  <ContactRow icon={Phone} label="Телефон" value="+998 — — — — — —" href="tel:+998" />
                  <ContactRow icon={Mail} label="Email" value="info@arkana.uz" href="mailto:info@arkana.uz" />
                  <ContactRow icon={MapPin} label="Адрес" value="Ташкент, Узбекистан" />
                </div>
              </div>

              <div style={{ background: "rgba(26,107,255,0.08)", border: "1px solid rgba(26,107,255,0.20)", borderRadius: 20, padding: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", marginBottom: 8 }}>
                  Ответ в течение 4 рабочих часов.
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                  После отправки технический руководитель ARKANA изучит вашу ситуацию и свяжется для организации бесплатного аудита.
                </p>
              </div>

              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 24 }}>
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} style={{ color: "#F59E0B", fontSize: 18 }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", fontStyle: "italic", lineHeight: 1.6 }}>
                  «Знание того, что есть именной человек, ответственный за наш ИТ, — это меняет всё.»
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 12 }}>
                  — Клиент, Ташкент
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label, name, type, placeholder, required, autoComplete, error,
}: {
  label: string; name: string; type: string; placeholder: string;
  required?: boolean; autoComplete?: string; error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "rgba(255,255,255,0.60)", marginBottom: 8 }}>
        {label}
        {required && <span style={{ color: "#4A9EFF", marginLeft: 2 }}>*</span>}
      </label>
      <input
        id={name} name={name} type={type} placeholder={placeholder}
        required={required} autoComplete={autoComplete}
        maxLength={type === "email" ? 254 : 200}
        style={{
          width: "100%",
          background: error ? "rgba(248,113,113,0.06)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${error ? "rgba(248,113,113,0.40)" : "rgba(255,255,255,0.10)"}`,
          borderRadius: 12, padding: "12px 16px", fontSize: 14,
          color: "rgba(255,255,255,0.85)", outline: "none", fontFamily: "inherit",
        }}
      />
      {error && <p style={{ marginTop: 4, fontSize: 11, color: "#F87171" }}>{error}</p>}
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>; label: string; value: string; href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3">
      <div style={{ width: 36, height: 36, background: "rgba(26,107,255,0.12)", border: "1px solid rgba(26,107,255,0.20)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={15} style={{ color: "#4A9EFF" }} />
      </div>
      <div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.30)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
        <p style={{ fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.80)" }}>{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} style={{ display: "block", textDecoration: "none" }}>{inner}</a> : <div>{inner}</div>;
}
