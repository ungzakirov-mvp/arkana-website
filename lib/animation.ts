import type { Variants, Transition } from "framer-motion";

// Properly typed easing tuples for Framer Motion
export const EASE_SPRING = [0.16, 1, 0.3, 1] as [number, number, number, number];
export const EASE_SMOOTH = [0.4, 0, 0.2, 1] as [number, number, number, number];

export const springTransition: Transition = {
  duration: 0.6,
  ease: EASE_SPRING,
};

export const smoothTransition: Transition = {
  duration: 0.25,
  ease: EASE_SMOOTH,
};

// Reusable scroll-enter variants
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SPRING },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_SPRING },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: EASE_SPRING },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_SPRING },
  },
};

export const staggerContainer = (staggerChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren },
  },
});
