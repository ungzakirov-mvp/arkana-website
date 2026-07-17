// Footer strip — replaces old CTA section
export function HomeCTA() {
  return (
    <footer style={{
      position: "relative", zIndex: 2,
      padding: "48px clamp(20px,4vw,64px)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 16, fontSize: 13, color: "#748078",
      borderTop: "1px solid rgba(238,242,238,0.06)",
    }}>
      <span>© {new Date().getFullYear()} ARKANA. Все права защищены.</span>
      <span>Ташкент, Узбекистан</span>
    </footer>
  );
}
