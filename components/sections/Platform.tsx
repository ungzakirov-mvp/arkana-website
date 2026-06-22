"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, TicketCheck, HardDrive, BarChart2 } from "lucide-react";

const features = [
  {
    icon: TicketCheck,
    title: "Service Desk",
    body: "Every ticket, every status, every resolution — visible to you at all times.",
  },
  {
    icon: HardDrive,
    title: "Asset & Inventory",
    body: "Know exactly what you own, where it is, and when it expires.",
  },
  {
    icon: BarChart2,
    title: "Analytics & Reports",
    body: "Monthly dashboards and live metrics — delivered without you needing to ask.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function Platform() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-y bg-gradient-dark overflow-hidden" ref={ref}>
      <div className="max-w-[75rem] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <span className="eyebrow eyebrow-teal mb-6">
                Powered by GOARKAN
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-[36px] sm:text-[44px] font-[800] leading-[1.1] tracking-[-0.02em] text-white mt-4 mb-5"
            >
              Complete visibility.
              <br />
              Zero guesswork.
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-[17px] text-white/60 leading-[1.65] mb-10"
            >
              We built our own platform so you always know what is happening
              with your IT — in real time. No more asking for updates. No more
              black box.
            </motion.p>

            {/* Feature rows */}
            <motion.div variants={containerVariants} className="flex flex-col gap-4 mb-10">
              {features.map(({ icon: Icon, title, body }) => (
                <motion.div
                  key={title}
                  variants={itemVariants}
                  className="glass-dark rounded-[16px] p-5 flex items-start gap-4 hover:bg-white/[0.1] transition-colors duration-200 cursor-default"
                >
                  <div className="w-10 h-10 bg-[#00C2AA]/[0.12] rounded-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-[#00C2AA]" />
                  </div>
                  <div>
                    <h4 className="text-[14.5px] font-[700] text-white mb-1">{title}</h4>
                    <p className="text-[13px] text-white/55 leading-[1.55]">{body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <a
                href="https://goarkan.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] text-[13.5px] font-[700] text-[#00C2AA] bg-[#00C2AA]/[0.1] border border-[#00C2AA]/[0.25] hover:bg-[#00C2AA]/[0.18] transition-all duration-150"
              >
                Explore the GOARKAN platform
                <ArrowUpRight size={15} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: browser mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="hidden lg:block"
          >
            <div className="rounded-[20px] overflow-hidden border border-white/[0.08] shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              {/* Browser bar */}
              <div className="bg-white/[0.06] border-b border-white/[0.06] px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 bg-white/[0.05] rounded-[6px] px-3 py-1.5 text-[11px] text-white/30">
                  goarkan.uz · Service Desk
                </div>
              </div>

              {/* App chrome */}
              <div className="bg-[#0D0D1A] flex min-h-[360px]">
                {/* Sidebar */}
                <div className="w-[140px] border-r border-white/[0.05] p-3 flex flex-col gap-1">
                  {["📋 Tickets", "🖥️ Assets", "👥 Employees", "📁 Contracts", "📚 Knowledge", "📊 Analytics"].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`px-3 py-2 rounded-[8px] text-[11px] font-[500] ${
                          i === 0
                            ? "bg-[#2B5BFF]/20 text-[#2B5BFF]"
                            : "text-white/40 hover:text-white/60"
                        }`}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>

                {/* Main content */}
                <div className="flex-1 p-5">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[13px] font-[700] text-white">Service Desk</span>
                    <span className="text-[10px] text-[#00C2AA] bg-[#00C2AA]/10 border border-[#00C2AA]/20 px-2 py-1 rounded-full">
                      Live
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { label: "Open", value: "3", color: "#2B5BFF" },
                      { label: "In Progress", value: "5", color: "#F59E0B" },
                      { label: "Resolved", value: "47", color: "#00C2AA" },
                    ].map(({ label, value, color }) => (
                      <div
                        key={label}
                        className="bg-white/[0.04] border border-white/[0.06] rounded-[10px] p-3 text-center"
                      >
                        <div
                          className="text-[18px] font-[800]"
                          style={{ color }}
                        >
                          {value}
                        </div>
                        <div className="text-[9px] text-white/40 mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Ticket rows */}
                  {[
                    { title: "VPN access — A. Karimov", time: "2h ago", status: "Open", statusColor: "text-[#2B5BFF] bg-[#2B5BFF]/10" },
                    { title: "Laptop setup — new hire", time: "5h ago", status: "In Progress", statusColor: "text-[#F59E0B] bg-[#F59E0B]/10" },
                    { title: "Email migration — Finance", time: "Yesterday", status: "Resolved", statusColor: "text-[#00C2AA] bg-[#00C2AA]/10" },
                  ].map(({ title, time, status, statusColor }) => (
                    <div
                      key={title}
                      className="bg-white/[0.03] border border-white/[0.05] rounded-[10px] px-4 py-3 mb-2 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-[11.5px] font-[600] text-white/85">{title}</p>
                        <p className="text-[10px] text-white/35 mt-0.5">{time}</p>
                      </div>
                      <span
                        className={`text-[9px] font-[700] px-2.5 py-1 rounded-full ${statusColor}`}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
