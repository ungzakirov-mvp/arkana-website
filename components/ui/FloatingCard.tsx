"use client";

import { motion, MotionValue } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const GLASS: React.CSSProperties = {
  background: "rgba(255,255,255,0.80)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.90)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,1)",
    "0 20px 48px rgba(0,0,0,0.06)",
    "0 4px 14px rgba(0,0,0,0.04)",
  ].join(", "),
  borderRadius: 16,
};

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  floatRange?: number;
  duration?: number;
  style?: React.CSSProperties;
  motionX?: MotionValue<number>;
  motionY?: MotionValue<number>;
}

export function FloatingCard({
  children,
  delay = 0,
  floatRange = 10,
  duration = 9,
  style,
  motionX,
  motionY,
}: FloatingCardProps) {
  return (
    <motion.div
      style={{ position: "absolute", x: motionX, y: motionY, ...style }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.75, ease: EASE }}
    >
      <motion.div
        animate={{ y: [0, -floatRange, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
        style={{ ...GLASS, padding: "14px 18px" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
