"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  animate = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 30 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      whileHover={
        hover
          ? {
              scale: 1.02,
              borderColor: "rgba(245, 158, 11, 0.35)",
              boxShadow:
                "0 0 30px rgba(245, 158, 11, 0.12), 0 0 60px rgba(245, 158, 11, 0.04)",
            }
          : undefined
      }
      className={`
        relative overflow-hidden rounded-2xl
        bg-[var(--color-bg-glass)] backdrop-blur-xl
        border border-[var(--color-border-glass)]
        transition-colors duration-300
        ${className}
      `}
      {...props}
    >
      {/* Subtle inner glow at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-amber/20 to-transparent" />
      {children}
    </motion.div>
  );
}
