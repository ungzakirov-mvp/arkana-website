// Ticker marquee — replaces old trust/logos section
export function HomeTrust() {
  const text = "ОДИН ДОГОВОР  ·  ФИКСИРОВАННАЯ СТОИМОСТЬ  ·  SLA В ДОГОВОРЕ  ·  ИМЕННОЙ ИНЖЕНЕР  ·  ПРОЗРАЧНОСТЬ ЧЕРЕЗ GOARKAN  ·  ";
  return (
    <div style={{
      position: "relative", zIndex: 2, overflow: "hidden",
      padding: "18px 0", background: "#0b1210",
      borderTop: "1px solid rgba(238,242,238,0.08)",
      borderBottom: "1px solid rgba(238,242,238,0.08)",
    }}>
      <div style={{ display: "flex", width: "200%", animation: "drift 28s linear infinite" }}>
        <span style={{ whiteSpace: "nowrap", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#9fb0a6", width: "50%" }}>{text}{text}</span>
        <span style={{ whiteSpace: "nowrap", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#9fb0a6", width: "50%" }}>{text}{text}</span>
      </div>
    </div>
  );
}
