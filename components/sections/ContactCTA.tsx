"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Phone, Mail, MapPin, Calendar } from "lucide-react";

export function ContactCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate API call — replace with real endpoint
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section className="section-y bg-gradient-cta border-t border-[#2B5BFF]/[0.08]" ref={ref}>
      <div className="max-w-[75rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-[600px] mb-14"
        >
          <span className="eyebrow mb-4">Start the Conversation</span>
          <h2 className="text-[36px] sm:text-[48px] font-[800] leading-[1.07] tracking-[-0.02em] text-gradient-ink mt-4 mb-5">
            Ready to hand
            <br />
            off IT?
          </h2>
          <p className="text-[17px] text-[#3D3D4E] leading-[1.65]">
            Start with a free IT assessment. No commitment, no pressure — just
            an honest conversation about your infrastructure and how we can
            help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:col-span-3"
          >
            <div className="bg-white border border-[#E0E4FF] rounded-[24px] p-8 shadow-card">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-[#00C2AA]/10 flex items-center justify-center mb-5">
                    <span className="text-3xl">✓</span>
                  </div>
                  <h3 className="text-[20px] font-[800] text-[#0A0A0F] mb-3">
                    We will be in touch within 4 hours.
                  </h3>
                  <p className="text-[15px] text-[#3D3D4E] max-w-[320px]">
                    Thank you for reaching out. A member of our team will contact
                    you to schedule your free IT assessment.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Your name" name="name" type="text" placeholder="Aziz Karimov" required />
                    <FormField label="Company name" name="company" type="text" placeholder="Your company" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Work email" name="email" type="email" placeholder="you@company.com" required />
                    <FormField label="Phone number" name="phone" type="tel" placeholder="+998 90 000 00 00" />
                  </div>
                  <div>
                    <label className="block text-[12.5px] font-[700] text-[#3D3D4E] mb-2">
                      Message{" "}
                      <span className="text-[#8A8A9E] font-[400]">(optional)</span>
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Tell us briefly about your company's IT situation..."
                      className="w-full bg-[#F8FAFF] border border-[#E0E4FF] rounded-[12px] px-4 py-3 text-[14px] text-[#3D3D4E] placeholder:text-[#C5CCFF] focus:outline-none focus:border-[#2B5BFF] focus:shadow-[0_0_0_3px_rgba(43,91,255,0.1)] transition-all duration-150 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-[14px] text-[14px] font-[700] text-white bg-gradient-brand shadow-accent hover:shadow-accent-hover hover:-translate-y-px active:scale-[0.98] transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Get free IT assessment
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E0E4FF]" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-3 text-[12px] text-[#8A8A9E]">or</span>
                    </div>
                  </div>

                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[14px] text-[13.5px] font-[600] text-[#3D3D4E] border border-[#E0E4FF] hover:border-[#2B5BFF]/30 hover:text-[#2B5BFF] transition-all duration-150"
                  >
                    <Calendar size={15} />
                    Schedule a 30-minute call
                  </a>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-white border border-[#E0E4FF] rounded-[20px] p-6 shadow-card">
              <h3 className="text-[15px] font-[700] text-[#0A0A0F] mb-5">
                Other ways to reach us
              </h3>
              <div className="flex flex-col gap-4">
                <ContactRow icon={Phone} label="Phone" value="+998 — — — — — —" href="tel:+998" />
                <ContactRow icon={Mail} label="Email" value="info@arkana.uz" href="mailto:info@arkana.uz" />
                <ContactRow icon={MapPin} label="Location" value="Tashkent, Uzbekistan" />
              </div>
            </div>

            <div className="bg-[#2B5BFF]/[0.05] border border-[#2B5BFF]/[0.12] rounded-[20px] p-6">
              <p className="text-[13px] font-[700] text-[#0A0A0F] mb-2">
                Typical response within 4 business hours.
              </p>
              <p className="text-[13px] text-[#3D3D4E] leading-[1.6]">
                After you submit, a technical lead from ARKANA will review your
                situation and reach out to schedule your free assessment.
              </p>
            </div>

            <div className="bg-white border border-[#E0E4FF] rounded-[20px] p-6 shadow-card">
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-[#F59E0B] text-lg">★</span>
                ))}
              </div>
              <p className="text-[13.5px] text-[#3D3D4E] italic leading-[1.6]">
                "Knowing there is a dedicated person responsible for our IT —
                that alone changes everything."
              </p>
              <p className="text-[12px] text-[#8A8A9E] mt-3">— Client, Tashkent</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[12.5px] font-[700] text-[#3D3D4E] mb-2"
      >
        {label}
        {required && <span className="text-[#2B5BFF] ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full bg-[#F8FAFF] border border-[#E0E4FF] rounded-[12px] px-4 py-3 text-[14px] text-[#3D3D4E] placeholder:text-[#C5CCFF] focus:outline-none focus:border-[#2B5BFF] focus:shadow-[0_0_0_3px_rgba(43,91,255,0.1)] transition-all duration-150"
      />
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-[#F0F4FF] rounded-[10px] flex items-center justify-center flex-shrink-0">
        <Icon size={15} className="text-[#2B5BFF]" />
      </div>
      <div>
        <p className="text-[11px] text-[#8A8A9E] font-[600] uppercase tracking-[0.06em]">
          {label}
        </p>
        <p className="text-[13.5px] font-[600] text-[#0A0A0F]">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block hover:opacity-80 transition-opacity">
      {inner}
    </a>
  ) : (
    <div>{inner}</div>
  );
}
