"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const clientLogos = [
  "Soliq Servis",
  "GlobalGroup",
  "TechPark UZ",
  "InnovateCo",
  "BizHolding",
  "UzConsult",
];

const testimonials = [
  {
    quote:
      "ARKANA became a real extension of our team. We went from reactive IT chaos to structured, predictable operations. Knowing there is a dedicated person responsible for our IT — that alone changes everything.",
    name: "[Client Name]",
    role: "CEO",
    company: "[Company], Tashkent",
    initials: "A",
  },
];

export function Trust() {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="section-y bg-white">
      <div className="max-w-[75rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-[560px] mb-14"
        >
          <span className="eyebrow mb-4">Trusted by Businesses</span>
          <h2 className="text-[36px] sm:text-[42px] font-[800] leading-[1.1] tracking-[-0.02em] text-gradient-ink mt-4 mb-5">
            Companies that trust
            <br />
            ARKANA with their IT.
          </h2>
          <p className="text-[17px] text-[#3D3D4E] leading-[1.65]">
            From growing businesses to established enterprises across
            Uzbekistan — companies choose ARKANA as their long-term IT partner.
          </p>
        </motion.div>

        <div ref={ref}>
          {/* Logo strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mb-14"
          >
            <p className="text-[11px] font-[700] uppercase tracking-[0.08em] text-[#C5CCFF] mb-6">
              Client organizations
            </p>
            <div className="flex flex-wrap gap-3">
              {clientLogos.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.15 + i * 0.06,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  className="bg-[#F0F4FF] border border-[#E0E4FF] rounded-[10px] px-5 py-2.5 text-[12px] font-[700] text-[#8A8A9E]"
                >
                  {name}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="flex items-center px-5 py-2.5 text-[12px] text-[#C5CCFF] font-[500]"
              >
                + more
              </motion.div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {testimonials.map(({ quote, name, role, company, initials }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="bg-gradient-to-br from-[#2B5BFF]/[0.04] to-[#6B35FF]/[0.04] border border-[#2B5BFF]/[0.10] rounded-[20px] p-8"
              >
                <div className="text-[40px] text-[#2B5BFF] leading-none opacity-30 mb-4 font-serif">
                  "
                </div>
                <p className="text-[15px] text-[#3D3D4E] leading-[1.7] italic mb-7">
                  {quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-[14px] font-[800] text-white">
                    {initials}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-[700] text-[#0A0A0F]">{name}</p>
                    <p className="text-[12px] text-[#8A8A9E]">
                      {role} · {company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Placeholder for second testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="bg-[#FAFAFA] border border-dashed border-[#E0E4FF] rounded-[20px] p-8 flex items-center justify-center"
            >
              <p className="text-[13px] text-[#C5CCFF] text-center font-[500]">
                Your story here.
                <br />
                <a href="/contact" className="text-[#2B5BFF] hover:underline mt-1 inline-block">
                  Become a partner →
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
