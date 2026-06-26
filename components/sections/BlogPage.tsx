"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const CATEGORIES = ["Все", "IT-аутсорсинг", "Кибербезопасность", "Microsoft 365", "Инфраструктура", "Оптимизация затрат"];

const POSTS = [
  {
    category: "IT-аутсорсинг",
    title: "IT-аутсорсинг vs штатный IT-отдел: что выгоднее для бизнеса в 2026 году",
    excerpt: "Разбираем реальные расходы: зарплаты, налоги, оборудование, обучение. Когда аутсорсинг выгоднее и для кого.",
    date: "15 июня 2026",
    readTime: "8 мин",
    slug: "it-outsourcing-vs-staff",
    featured: true,
  },
  {
    category: "Кибербезопасность",
    title: "5 главных угроз кибербезопасности для малого бизнеса в 2026 году",
    excerpt: "Фишинг, программы-вымогатели, атаки на Supply Chain — как защитить бизнес без большого бюджета.",
    date: "8 июня 2026",
    readTime: "6 мин",
    slug: "cybersecurity-threats-2026",
    featured: false,
  },
  {
    category: "Microsoft 365",
    title: "Как перейти на Microsoft 365 без потери данных и простоя",
    excerpt: "Пошаговый план миграции: подготовка, перенос данных, настройка, обучение сотрудников.",
    date: "1 июня 2026",
    readTime: "10 мин",
    slug: "m365-migration-guide",
    featured: false,
  },
  {
    category: "Инфраструктура",
    title: "Когда пора менять серверное оборудование: признаки и план действий",
    excerpt: "Возраст оборудования, производительность, стоимость обслуживания — как принять правильное решение.",
    date: "24 мая 2026",
    readTime: "7 мин",
    slug: "when-to-replace-servers",
    featured: false,
  },
  {
    category: "Оптимизация затрат",
    title: "Как сократить IT-расходы на 30–40% без потери качества",
    excerpt: "Аудит лицензий, оптимизация облака, пересмотр контрактов — практические советы.",
    date: "17 мая 2026",
    readTime: "9 мин",
    slug: "cut-it-costs",
    featured: false,
  },
  {
    category: "IT-аутсорсинг",
    title: "SLA в IT-аутсорсинге: что должно быть в договоре и как проверить выполнение",
    excerpt: "Время реакции, время решения, штрафные санкции, прозрачность — чек-лист для бизнеса.",
    date: "10 мая 2026",
    readTime: "5 мин",
    slug: "sla-guide",
    featured: false,
  },
];

export function BlogPage() {
  const [category, setCategory] = useState("Все");

  const filtered = category === "Все" ? POSTS : POSTS.filter(p => p.category === category);
  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ padding: "96px 0 64px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.1), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: EASE }}>
            <div className="ark-badge" style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ark-accent-2)" }}>Блог</span>
            </div>
            <h1 style={{ fontFamily: "Nacelle, sans-serif", fontWeight: 600, fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 20 }}>
              <span className="heading-gradient">IT для бизнеса —</span>
              <br />
              <span style={{ color: "var(--ark-text)" }}>понятно и по делу</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Categories */}
          <div style={{ display: "flex", gap: 6, marginBottom: 48, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.2s", border: "1px solid",
                  borderColor: category === cat ? "var(--ark-accent)" : "var(--ark-border)",
                  background: category === cat ? "var(--ark-accent)" : "var(--ark-bg)",
                  color: category === cat ? "#fff" : "var(--ark-text-muted)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ marginBottom: 32 }}
            >
              <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
                <div style={{
                  borderRadius: 16, padding: "40px 40px",
                  background: "linear-gradient(to bottom right, rgba(99,102,241,0.12), rgba(79,70,229,0.05))",
                  border: "1px solid rgba(99,102,241,0.25)",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.25)")}
                >
                  <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 6, background: "var(--ark-accent-glow)", color: "var(--ark-accent-2)" }}>
                      {featured.category}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "3px 10px", borderRadius: 6, background: "var(--ark-surface)", color: "var(--ark-text-muted)" }}>
                      Главная статья
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "Nacelle, sans-serif", fontSize: "clamp(1.375rem, 3vw, 1.875rem)", fontWeight: 600, color: "var(--ark-text)", lineHeight: 1.25, marginBottom: 16 }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: 15, color: "var(--ark-text-muted)", lineHeight: 1.65, marginBottom: 24, maxWidth: 560 }}>
                    {featured.excerpt}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontSize: 12, color: "var(--ark-text-muted)" }}>{featured.date}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--ark-text-muted)" }}>
                      <Clock size={12} />
                      {featured.readTime}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "var(--ark-accent-2)" }}>
                      Читать <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Posts grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="max-md:grid-cols-1 max-lg:grid-cols-2">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              >
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                  <div style={{
                    borderRadius: 14, padding: "24px", height: "100%",
                    background: "var(--ark-card)", border: "1px solid var(--ark-card-border)",
                    display: "flex", flexDirection: "column", gap: 12,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ark-accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--ark-card-border)")}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 8px", borderRadius: 4, background: "var(--ark-accent-glow)", color: "var(--ark-accent-2)", width: "fit-content" }}>
                      {post.category}
                    </span>
                    <h3 style={{ fontFamily: "Nacelle, sans-serif", fontSize: 15.5, fontWeight: 600, color: "var(--ark-text)", lineHeight: 1.35, flex: 1 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: "var(--ark-text-muted)", lineHeight: 1.6 }}>
                      {post.excerpt}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                      <span style={{ fontSize: 11.5, color: "var(--ark-text-muted)" }}>{post.date}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11.5, color: "var(--ark-text-muted)" }}>
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
