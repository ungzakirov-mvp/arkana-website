// Module-level mutable state — GSAP writes, R3F useFrame reads each tick.
// Intentionally NOT React state to avoid re-render pressure.

export const arkanaCoreState = {
  // 0 = hero, 1 = services (shifted right), 2 = map (compressed), 3 = hidden
  phase: 0,
  // 0-1 progress through current phase transition
  phaseProgress: 0,
  // Mouse position, normalised -0.5 to 0.5
  mouseNX: 0,
  mouseNY: 0,
};
