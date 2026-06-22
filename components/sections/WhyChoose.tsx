"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, UserCheck, FileBarChart, Settings2, Briefcase, Layers } from "lucide-react";

const cards = [
  {
    icon: Users,
    iconBg: "bg-[#2B5BFF]/10",
    iconColor: "text-[#2B5BFF]",
    title: "Dedicated Team",
    body: "Your own engineers, assigned to your account. They know your systems, your people, and your priorities — not just your ticket number.",
  },
  {
    icon: UserCheck,
    iconBg: "bg-[#6B35FF]/10",
    iconColor: "text-[#6B35FF]",
    title: "Personal Technical Lead",
    body: "One named engineer who owns your IT relationship. A single point of accountability — someone you can call by name, any time.",
  },
  {
    icon: FileBarChart,
    iconBg: "bg-[#00C2AA]/10",
    iconColor: "text-[#00C2AA]",
    title: "Transparent Reporting",
    body: "Regular reports on activity, performance, and IT health — delivered on schedule, without you needing to ask for them.",
  },
  {
    icon: Settings2,
    iconBg: "bg-[#6B35FF]/10",
    iconColor: "text-[#6B35FF]",
    title: "Modern Service Processes",
    body: "ITIL-aligned workflows, structured incident handling, and change management built for business continuity — not improvised fixes.",
  },
  {
    icon: Briefcase,
    iconBg: "bg-[#F59E0B]/10",
    iconColor: "text-[#D97706]",
    title: "Business-Focused Approach",
    body: "We align every IT decision to your business goals. IT should serve growth — we make sure it always does.",
  },
  {
    icon: Layers,
    iconBg: "bg-[#2B5BFF]/10",
    iconColor: "text-[#2B5BFF]",
    title: "Proprietary Platform",
    body: "We operate on GOARKAN — our own platform — giving you visibility into tickets, assets, and operations most IT partners simply cannot offer.",
    isPlatform: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function WhyChoose() {
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
          className="max-w-[600px] mb-14"
        >
          <span className="eyebrow mb-4">Why Companies Choose ARKANA</span>
          <h2 className="text-[36px] sm:text-[42px] font-[800] leading-[1.1] tracking-[-0.02em] text-gradient-ink mt-4 mb-5">
            Six reasons to make
            <br />
            ARKANA your IT partner.
          </h2>
          <p className="text-[17px] text-[#3D3D4E] leading-[1.65]">
            We are not just another IT vendor. We are an extension of your
            business — with the team, process, and tools to prove it.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cards.map(({ icon: Icon, iconBg, iconColor, title, body, isPlatform }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className={`group relative rounded-[18px] p-7 border transition-all duration-200 hover:-translate-y-1 cursor-default ${
                isPlatform
                  ? "bg-gradient-to-br from-[#2B5BFF]/[0.04] to-[#6B35FF]/[0.04] border-[#2B5BFF]/[0.14] hover:shadow-[0_12px_32px_rgba(43,91,255,0.12)]"
                  : "bg-[#FAFAFA] border-[rgba(0,0,0,0.07)] hover:shadow-card-hover"
              }`}
            >
              <div
                className={`w-10 h-10 ${iconBg} rounded-[11px] flex items-center justify-center mb-5`}
              >
                <Icon size={18} className={iconColor} />
              </div>
              <h3 className="text-[15.5px] font-[700] text-[#0A0A0F] mb-3 leading-[1.3]">
                {title}
              </h3>
              <p className="text-[13.5px] text-[#3D3D4E] leading-[1.65]">{body}</p>

              {isPlatform && (
                <div className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-[700] text-[#2B5BFF]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2B5BFF]" />
                  Powered by GOARKAN
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
