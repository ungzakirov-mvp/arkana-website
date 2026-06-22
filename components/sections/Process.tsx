"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery",
    when: "Week 1",
    body: "We audit your current IT environment — infrastructure, team structure, tools, and pain points. You do not need to prepare anything.",
  },
  {
    num: "02",
    title: "Strategy",
    when: "Weeks 1–2",
    body: "We design your IT roadmap. Services, SLAs, response windows, tooling, and priorities — aligned directly to your business goals.",
  },
  {
    num: "03",
    title: "Onboarding",
    when: "Weeks 2–4",
    body: "Seamless transition. We configure systems, onboard your team, and take over operations. Your business does not skip a beat.",
  },
  {
    num: "04",
    title: "Operations",
    when: "Ongoing",
    body: "Proactive monitoring, rapid response, and a dedicated team that knows your environment. Full-coverage support around the clock.",
  },
  {
    num: "05",
    title: "Growth",
    when: "Quarterly",
    body: "Business reviews, performance reports, and IT planning that keeps pace with your growth. IT becomes a strategic asset.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="section-y bg-gradient-to-b from-[#FAFAFA] to-[#F0F4FF]">
      <div className="max-w-[75rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-[560px] mb-16"
        >
          <span className="eyebrow mb-4">How We Work</span>
          <h2 className="text-[36px] sm:text-[42px] font-[800] leading-[1.1] tracking-[-0.02em] text-gradient-ink mt-4 mb-5">
            From first call
            <br />
            to full partner.
          </h2>
          <p className="text-[17px] text-[#3D3D4E] leading-[1.65]">
            A clear, proven path with no surprises — just structured progress
            from day one to long-term partnership.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="flex flex-col gap-0">
          {steps.map(({ num, title, when, body }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
              className="flex gap-6 sm:gap-10"
            >
              {/* Left: number + line */}
              <div className="flex flex-col items-center">
                <div className="w-11 h-11 rounded-full border-2 border-[#E0E4FF] bg-white flex items-center justify-center text-[12px] font-[800] text-[#8A8A9E] flex-shrink-0 mt-1 shadow-sm">
                  {num}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-[2px] flex-1 bg-[#E0E4FF] my-2 min-h-[40px]" />
                )}
              </div>

              {/* Right: content */}
              <div className="pb-10">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-[18px] font-[800] text-[#0A0A0F]">{title}</h3>
                  <span className="text-[11px] font-[600] text-[#8A8A9E] bg-[#F0F4FF] border border-[#E0E4FF] px-2.5 py-0.5 rounded-full">
                    {when}
                  </span>
                </div>
                <p className="text-[15px] text-[#3D3D4E] leading-[1.65] max-w-[560px]">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mt-4 ml-[68px]"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[14px] font-[700] text-[#2B5BFF] hover:gap-3 transition-all duration-150"
          >
            Start your assessment →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
