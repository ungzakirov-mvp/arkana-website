"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Zap, Eye } from "lucide-react";

const cards = [
  {
    icon: Building2,
    iconBg: "bg-[#2B5BFF]/10",
    iconColor: "text-[#2B5BFF]",
    title: "Your dedicated IT department",
    body: "A full team that knows your infrastructure by name. Not a ticket queue — a real partnership with named ownership and accountability.",
  },
  {
    icon: Zap,
    iconBg: "bg-[#6B35FF]/10",
    iconColor: "text-[#6B35FF]",
    title: "Proactive, not reactive",
    body: "24/7 monitoring catches issues before your team notices. We fix problems that haven't happened yet — and report on every action we take.",
  },
  {
    icon: Eye,
    iconBg: "bg-[#00C2AA]/10",
    iconColor: "text-[#00C2AA]",
    title: "Complete transparency",
    body: "Our GOARKAN platform gives you real-time visibility into every ticket, asset, and action. No more asking for updates. No more black box.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function WhyArkana() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-y bg-white">
      <div className="max-w-[75rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-[560px] mb-14"
        >
          <span className="eyebrow mb-4">Why ARKANA</span>
          <h2 className="text-[36px] sm:text-[42px] font-[800] leading-[1.1] tracking-[-0.02em] text-gradient-ink mt-4 mb-5">
            Not IT support.
            <br />
            An IT partner.
          </h2>
          <p className="text-[17px] text-[#3D3D4E] leading-[1.65]">
            Most IT providers react to problems. We prevent them — with a
            dedicated team, transparent processes, and tools that keep you
            informed at every step.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map(({ icon: Icon, iconBg, iconColor, title, body }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="group bg-[#FAFAFA] border border-[rgba(0,0,0,0.07)] rounded-[18px] p-7 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-200 cursor-default"
            >
              <div
                className={`w-11 h-11 ${iconBg} rounded-[12px] flex items-center justify-center mb-5`}
              >
                <Icon size={20} className={iconColor} />
              </div>
              <h3 className="text-[16px] font-[700] text-[#0A0A0F] mb-3 leading-[1.3]">
                {title}
              </h3>
              <p className="text-[14px] text-[#3D3D4E] leading-[1.65]">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
