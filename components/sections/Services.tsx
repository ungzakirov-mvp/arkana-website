"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Headset, BarChart3, Server, Cog } from "lucide-react";
import Link from "next/link";

const services = [
  {
    id: "it-outsourcing",
    tab: "IT Outsourcing",
    icon: Headset,
    headline: "A complete IT team, without the hiring.",
    body: "Dedicated engineers who know your systems, your team, and your business goals. We don't just fix tickets — we own your IT outcomes end to end.",
    bullets: [
      "L1 / L2 / L3 helpdesk support",
      "Device and user management",
      "Software procurement and licensing",
      "Vendor relationship management",
      "IT strategy and roadmap planning",
    ],
    href: "/services/it-outsourcing",
  },
  {
    id: "managed-it",
    tab: "Managed IT",
    icon: BarChart3,
    headline: "Proactive care for your entire IT environment.",
    body: "24/7 monitoring, patch management, security updates, and quarterly business reviews. We catch problems before your users do.",
    bullets: [
      "24/7 infrastructure monitoring",
      "Patch and update management",
      "Backup and disaster recovery",
      "Security baseline enforcement",
      "Monthly IT health reports",
    ],
    href: "/services/managed-it",
  },
  {
    id: "infrastructure",
    tab: "Infrastructure",
    icon: Server,
    headline: "Infrastructure that runs when you need it.",
    body: "Server management, network architecture, cloud setup, and disaster recovery. We design, build, and maintain the foundation your business runs on.",
    bullets: [
      "Server and network management",
      "Cloud setup and migration",
      "Firewall and network security",
      "Backup and failover systems",
      "Capacity planning and scaling",
    ],
    href: "/services/infrastructure",
  },
  {
    id: "itsm",
    tab: "ITSM",
    icon: Cog,
    headline: "Process-driven IT operations that scale.",
    body: "ITIL-aligned processes, SLA reporting, change management, and structured service delivery. IT that is accountable to your business objectives.",
    bullets: [
      "ITIL-aligned service processes",
      "Incident and change management",
      "SLA definition and reporting",
      "Service catalog design",
      "Continuous improvement reviews",
    ],
    href: "/services/itsm",
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const current = services[active];

  return (
    <section className="section-y bg-gradient-section" ref={ref}>
      <div className="max-w-[75rem] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="max-w-[560px] mb-12"
        >
          <span className="eyebrow mb-4">What We Do</span>
          <h2 className="text-[36px] sm:text-[42px] font-[800] leading-[1.1] tracking-[-0.02em] text-gradient-ink mt-4 mb-5">
            Everything IT.
            <br />
            One partner.
          </h2>
          <p className="text-[17px] text-[#3D3D4E] leading-[1.65]">
            From your first helpdesk ticket to enterprise infrastructure — we
            handle it all under one roof, one contract, one relationship.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-[9px] text-[13px] font-[600] border transition-all duration-200 ${
                active === i
                  ? "text-[#2B5BFF] border-[#2B5BFF] bg-[#2B5BFF]/[0.06]"
                  : "text-[#8A8A9E] border-[#E0E4FF] bg-white hover:text-[#3D3D4E] hover:border-[#C5CCFF]"
              }`}
            >
              {s.tab}
            </button>
          ))}
        </motion.div>

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="bg-white border border-[#E0E4FF] rounded-[20px] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
              className="grid grid-cols-1 lg:grid-cols-2"
            >
              {/* Left: text */}
              <div className="p-8 lg:p-10">
                <div className="w-12 h-12 bg-[#2B5BFF]/[0.08] rounded-[14px] flex items-center justify-center mb-6">
                  <current.icon size={22} className="text-[#2B5BFF]" />
                </div>
                <h3 className="text-[22px] font-[800] text-[#0A0A0F] leading-[1.2] mb-4">
                  {current.headline}
                </h3>
                <p className="text-[15px] text-[#3D3D4E] leading-[1.65] mb-7">
                  {current.body}
                </p>
                <ul className="flex flex-col gap-3 mb-8">
                  {current.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-[14px] text-[#3D3D4E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2B5BFF] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={current.href}
                  className="inline-flex items-center gap-2 text-[13.5px] font-[700] text-[#2B5BFF] hover:gap-3 transition-all duration-150"
                >
                  Learn more about {current.tab}
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Right: visual accent */}
              <div className="hidden lg:flex items-center justify-center bg-[#F8FAFF] border-l border-[#E0E4FF] p-10">
                <div className="w-full max-w-[260px] flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    {current.bullets.slice(0, 4).map((b, i) => (
                      <motion.div
                        key={b}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="flex items-center gap-3 bg-white border border-[#E0E4FF] rounded-[10px] px-4 py-3"
                      >
                        <div className="w-6 h-6 rounded-md bg-[#2B5BFF]/[0.08] flex items-center justify-center flex-shrink-0">
                          <current.icon size={13} className="text-[#2B5BFF]" />
                        </div>
                        <span className="text-[12px] text-[#3D3D4E] font-[500]">{b}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="bg-[#2B5BFF]/[0.06] border border-[#2B5BFF]/[0.12] rounded-[12px] p-4 text-center">
                    <p className="text-[11px] font-[700] text-[#2B5BFF] uppercase tracking-[0.06em] mb-1">
                      Covered by SLA
                    </p>
                    <p className="text-[12px] text-[#3D3D4E]">
                      Response time guaranteed in writing
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
