const ITEMS = [
  "99.9% SLA Uptime",
  "< 2h Response SLA",
  "24/7 Monitoring",
  "Microsoft 365 Partner",
  "GoARKAN Platform",
  "Dedicated Service Manager",
  "5-Day Onboarding",
  "Contractual SLA",
  "Endpoint Protection",
  "Asset Registry Included",
  "Network Operations",
  "Certified Engineers",
  "Transparent Reporting",
  "IT Outsourcing",
  "Business Continuity",
];

export function HomeTrust() {
  // Quadruple for a seamless loop at any viewport width
  const track = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="trust-ticker"
      style={{
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        padding: "22px 0",
        background: "#0b1210",
        borderTop:    "1px solid rgba(238,242,238,0.08)",
        borderBottom: "1px solid rgba(238,242,238,0.08)",
        maskImage:         "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:   "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "trustScroll 70s linear infinite",
          willChange: "transform",
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 24,
              paddingRight: 24,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#9fb0a6",
                fontFamily: "var(--font-mono, monospace)",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: "#4fd18a",
                fontSize: 6,
                opacity: 0.5,
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
