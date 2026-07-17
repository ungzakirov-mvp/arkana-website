// Enterprise Trust Bar — premium slow-scroll capability indicators
const ITEMS = [
  "99.9% SLA Availability",
  "24/7 Monitoring",
  "Enterprise Security",
  "Microsoft 365 Experts",
  "IT Outsourcing",
  "Infrastructure Management",
  "Help Desk",
  "Asset Management",
  "Cloud Solutions",
  "Network Operations",
  "Cybersecurity",
  "Business Continuity",
  "Certified Engineers",
  "Fast Response",
  "IT Operations Platform",
];

export function HomeTrust() {
  // Quadruple for a seamless loop at any viewport width
  const track = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
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
