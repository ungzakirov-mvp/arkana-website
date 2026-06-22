"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Activity } from "lucide-react";

const servicePills = [
  { label: "IT Outsourcing", color: "blue" },
  { label: "Infrastructure", color: "indigo" },
  { label: "Managed IT", color: "blue" },
  { label: "User Support", color: "indigo" },
  { label: "IT Service Management", color: "blue" },
];

const teamMembers = [
  { initials: "A", from: "#2B5BFF", to: "#6B35FF" },
  { initials: "D", from: "#6B35FF", to: "#9B35CC" },
  { initials: "S", from: "#00C2AA", to: "#0099FF" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden bg-gradient-hero"
    >
      {/* Animated gradient orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#2B5BFF]/[0.06] blur-3xl animate-[drift_20s_ease-in-out_infinite]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#6B35FF]/[0.05] blur-3xl animate-[drift_25s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="relative w-full max-w-[75rem] mx-auto px-6 flex flex-col items-center text-center">
        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-[720px]"
        >
          {/* Eyebrow */}
          <motion.div variants={itemVariants}>
            <span className="eyebrow mb-6">
              IT Outsourcing · Managed Services
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="text-[42px] sm:text-[56px] lg:text-[68px] font-[800] leading-[1.07] tracking-[-0.02em] text-gradient-ink mb-6"
          >
            Enterprise IT operations.
            <br />
            <span className="text-gradient-accent">
              Without the enterprise overhead.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-[17px] sm:text-[19px] text-[#3D3D4E] leading-[1.65] mb-10 max-w-[560px]"
          >
            ARKANA handles your entire IT — infrastructure, support, and
            service management — so your team can focus on growing the business.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 mb-16"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] text-[14px] font-[700] text-white bg-gradient-brand shadow-accent hover:shadow-accent-hover hover:-translate-y-px active:scale-[0.98] transition-all duration-150"
            >
              Start with a free assessment
              <ArrowRight size={15} className="transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] text-[14px] font-[600] text-[#3D3D4E] bg-white/70 border border-black/[0.08] hover:bg-white hover:border-black/[0.12] backdrop-blur-sm active:scale-[0.98] transition-all duration-150"
            >
              See our services
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero card — floats with parallax */}
        <motion.div
          style={{ y: cardY }}
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="w-full max-w-[540px] glass rounded-[24px] shadow-glass p-6 text-left"
        >
          {/* Service pills */}
          <p className="text-[10px] font-[700] uppercase tracking-[0.08em] text-[#8A8A9E] mb-3">
            What we manage for you
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {servicePills.map(({ label, color }) => (
              <span
                key={label}
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-[600] border ${
                  color === "blue"
                    ? "bg-[#2B5BFF]/[0.07] border-[#2B5BFF]/[0.14] text-[#2B5BFF]"
                    : "bg-[#6B35FF]/[0.07] border-[#6B35FF]/[0.14] text-[#6B35FF]"
                }`}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Team row */}
          <div className="flex items-center gap-3 bg-black/[0.03] rounded-[14px] px-4 py-3 mb-3">
            <div className="flex -space-x-2">
              {teamMembers.map(({ initials, from, to }) => (
                <div
                  key={initials}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[11px] font-[800] text-white"
                  style={{
                    background: `linear-gradient(135deg, ${from}, ${to})`,
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <p className="text-[12px] font-[700] text-[#0A0A0F]">
                Your dedicated IT team
              </p>
              <p className="text-[11px] text-[#8A8A9E]">
                Engineers assigned to your account
              </p>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center gap-2.5 bg-[#00C2AA]/[0.06] border border-[#00C2AA]/[0.15] rounded-[10px] px-4 py-2.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C2AA] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C2AA]" />
            </span>
            <Activity size={13} className="text-[#00C2AA]" />
            <p className="text-[11.5px] text-[#3D3D4E] font-[500]">
              Active monitoring · Proactive support · Transparent reporting
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-2 text-[#8A8A9E]"
        >
          <span className="text-[11px] font-[500]">Scroll to explore</span>
          <ChevronDown
            size={16}
            className="animate-bounce"
          />
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
      `}</style>
    </section>
  );
}
