"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const tabs = [
  {
    id: "service-desk",
    label: "Service Desk",
    description:
      "Every support request in one place. Track status, priority, assigned engineer, and resolution time — without asking anyone.",
    content: (
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-[700] text-[#0A0A0F]">All Tickets</span>
          <span className="text-[10px] font-[600] text-[#00C2AA] bg-[#00C2AA]/[0.08] border border-[#00C2AA]/20 px-2.5 py-1 rounded-full">
            3 Open
          </span>
        </div>
        {[
          { title: "VPN access request — A. Karimov", meta: "2 hours ago · High priority", status: "Open", sc: "text-[#2B5BFF] bg-[#2B5BFF]/[0.08]" },
          { title: "Laptop setup for new hire", meta: "5 hours ago · Medium", status: "In Progress", sc: "text-[#D97706] bg-amber-50" },
          { title: "Email migration — Finance dept.", meta: "Yesterday · Low", status: "Resolved", sc: "text-[#00C2AA] bg-[#00C2AA]/[0.08]" },
          { title: "Printer not responding — Floor 3", meta: "2 days ago · Low", status: "Resolved", sc: "text-[#00C2AA] bg-[#00C2AA]/[0.08]" },
        ].map(({ title, meta, status, sc }) => (
          <div
            key={title}
            className="flex items-center justify-between bg-[#F8FAFF] border border-[#E0E4FF] rounded-[10px] px-4 py-3 mb-2"
          >
            <div>
              <p className="text-[12px] font-[600] text-[#0A0A0F]">{title}</p>
              <p className="text-[10.5px] text-[#8A8A9E] mt-0.5">{meta}</p>
            </div>
            <span className={`text-[10px] font-[700] px-2.5 py-1 rounded-full flex-shrink-0 ml-3 ${sc}`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "assets",
    label: "Asset Management",
    description:
      "Know exactly what your company owns. Every device, location, assigned user, and warranty date — always up to date.",
    content: (
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-[700] text-[#0A0A0F]">Asset Inventory</span>
          <span className="text-[10px] text-[#8A8A9E]">124 devices tracked</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Laptops", count: "67", color: "bg-[#2B5BFF]/[0.08] text-[#2B5BFF]" },
            { label: "Monitors", count: "34", color: "bg-[#6B35FF]/[0.08] text-[#6B35FF]" },
            { label: "Servers", count: "12", color: "bg-[#00C2AA]/[0.08] text-[#00C2AA]" },
          ].map(({ label, count, color }) => (
            <div key={label} className={`${color} rounded-[10px] p-3 text-center`}>
              <p className="text-[18px] font-[800]">{count}</p>
              <p className="text-[10px] mt-0.5">{label}</p>
            </div>
          ))}
        </div>
        {[
          { device: "MacBook Pro 14\" M3", user: "D. Yusupov", status: "Active", warranty: "Jan 2027" },
          { device: "Dell XPS 15 9530", user: "N. Rashidova", status: "Active", warranty: "Aug 2026" },
          { device: "HP EliteBook 840 G10", user: "— (spare)", status: "Available", warranty: "Mar 2026" },
        ].map(({ device, user, status, warranty }) => (
          <div
            key={device}
            className="flex items-center justify-between bg-[#F8FAFF] border border-[#E0E4FF] rounded-[10px] px-4 py-3 mb-2"
          >
            <div>
              <p className="text-[12px] font-[600] text-[#0A0A0F]">{device}</p>
              <p className="text-[10.5px] text-[#8A8A9E] mt-0.5">{user} · Warranty: {warranty}</p>
            </div>
            <span className={`text-[10px] font-[700] px-2.5 py-1 rounded-full flex-shrink-0 ml-3 ${
              status === "Active" ? "text-[#00C2AA] bg-[#00C2AA]/[0.08]" : "text-[#8A8A9E] bg-[#F0F4FF]"
            }`}>
              {status}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    description:
      "IT performance at a glance. Monthly reports and live metrics — delivered without you needing to ask for them.",
    content: (
      <div className="p-5">
        <p className="text-[12px] font-[700] text-[#0A0A0F] mb-4">This Month's Performance</p>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "Tickets resolved", value: "47", sub: "this month" },
            { label: "Avg. resolution", value: "3.2h", sub: "per ticket" },
            { label: "SLA compliance", value: "100%", sub: "all priorities" },
            { label: "Assets monitored", value: "124", sub: "devices" },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-[#F8FAFF] border border-[#E0E4FF] rounded-[12px] p-4">
              <p className="text-[20px] font-[800] text-[#2B5BFF]">{value}</p>
              <p className="text-[11px] font-[600] text-[#0A0A0F] mt-0.5">{label}</p>
              <p className="text-[10px] text-[#8A8A9E]">{sub}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#F8FAFF] border border-[#E0E4FF] rounded-[12px] p-4">
          <p className="text-[11px] font-[600] text-[#0A0A0F] mb-3">Ticket volume — last 6 months</p>
          <div className="flex items-end gap-2 h-[60px]">
            {[40, 58, 45, 70, 62, 47].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-[4px] bg-[#2B5BFF]/[0.15]"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].map((m) => (
              <span key={m} className="text-[9px] text-[#8A8A9E] flex-1 text-center">{m}</span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "knowledge",
    label: "Knowledge Base",
    description:
      "A living library of guides, runbooks, and documentation — built and maintained by your dedicated ARKANA team.",
    content: (
      <div className="p-5">
        <div className="bg-[#F8FAFF] border border-[#E0E4FF] rounded-[10px] px-4 py-2.5 flex items-center gap-2 mb-4">
          <span className="text-[#8A8A9E] text-[12px]">🔍</span>
          <span className="text-[12px] text-[#8A8A9E]">Search knowledge base...</span>
        </div>
        {[
          { cat: "Onboarding", title: "New employee IT setup checklist", views: "38 views" },
          { cat: "Security", title: "VPN setup guide — Windows & macOS", views: "52 views" },
          { cat: "Access", title: "How to request software access", views: "24 views" },
          { cat: "Hardware", title: "Reporting a broken device", views: "17 views" },
        ].map(({ cat, title, views }) => (
          <div
            key={title}
            className="flex items-center justify-between bg-[#F8FAFF] border border-[#E0E4FF] rounded-[10px] px-4 py-3 mb-2"
          >
            <div>
              <span className="text-[9px] font-[700] uppercase tracking-[0.06em] text-[#2B5BFF] bg-[#2B5BFF]/[0.08] px-2 py-0.5 rounded-full mr-2">
                {cat}
              </span>
              <p className="text-[12px] font-[600] text-[#0A0A0F] mt-1.5">{title}</p>
            </div>
            <span className="text-[10px] text-[#8A8A9E] flex-shrink-0 ml-3">{views}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export function Showcase() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const current = tabs[active];

  return (
    <section className="section-y bg-[#F8FAFF]" ref={ref}>
      <div className="max-w-[75rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-[560px] mb-12"
        >
          <span className="eyebrow mb-4">See It In Action</span>
          <h2 className="text-[36px] sm:text-[42px] font-[800] leading-[1.1] tracking-[-0.02em] text-gradient-ink mt-4 mb-5">
            The platform your
            <br />
            IT runs on.
          </h2>
          <p className="text-[17px] text-[#3D3D4E] leading-[1.65]">
            Real interface. See exactly what you and your team work with every
            day — not a mockup, not a promise.
          </p>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex gap-1 mb-6 overflow-x-auto pb-1"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`px-4 py-2.5 rounded-none border-b-2 text-[13px] font-[600] whitespace-nowrap transition-all duration-200 ${
                active === i
                  ? "border-[#2B5BFF] text-[#2B5BFF]"
                  : "border-transparent text-[#8A8A9E] hover:text-[#3D3D4E]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Browser window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="bg-white border border-[#E0E4FF] rounded-[20px] overflow-hidden shadow-card"
        >
          {/* Browser chrome */}
          <div className="bg-[#FAFAFA] border-b border-[#E0E4FF] px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 bg-white border border-[#E0E4FF] rounded-[6px] px-3 py-1.5 text-[11px] text-[#8A8A9E]">
              goarkan.uz · {current.label}
            </div>
          </div>

          <div className="flex min-h-[380px]">
            {/* App sidebar */}
            <div className="hidden sm:flex flex-col w-[150px] border-r border-[#E0E4FF] p-3 gap-1 bg-[#FAFAFA]">
              {tabs.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className={`text-left px-3 py-2.5 rounded-[9px] text-[11.5px] font-[500] transition-all duration-150 ${
                    active === i
                      ? "bg-[#2B5BFF]/[0.08] text-[#2B5BFF] font-[700]"
                      : "text-[#8A8A9E] hover:text-[#3D3D4E] hover:bg-black/[0.03]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Main panel */}
            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                >
                  {current.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Tab description */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-5 text-[14px] text-[#8A8A9E] text-center max-w-[540px] mx-auto"
          >
            {current.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  );
}
