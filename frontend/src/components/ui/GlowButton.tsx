"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
}

const sizeClasses = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

export default function GlowButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
}: GlowButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={disabled || loading ? undefined : { scale: 1.04 }}
      whileTap={disabled || loading ? undefined : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative inline-flex items-center justify-center font-medium
        rounded-xl cursor-pointer
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${
          isPrimary
            ? `bg-gradient-to-r from-accent-amber via-accent-saffron to-amber-600
               text-bg-primary font-semibold
               shadow-[0_0_20px_rgba(245,158,11,0.3),0_0_40px_rgba(245,158,11,0.1)]
               hover:shadow-[0_0_30px_rgba(245,158,11,0.5),0_0_60px_rgba(245,158,11,0.2)]`
            : `bg-[var(--color-bg-glass)] backdrop-blur-lg
               border border-[var(--color-border-glass)]
               text-text-primary
               hover:border-accent-amber/40 hover:bg-accent-amber/5`
        }
        ${className}
      `}
    >
      {/* Pulsing glow ring for primary */}
      {isPrimary && !disabled && (
        <span className="absolute inset-0 rounded-xl animate-glow-pulse opacity-50 pointer-events-none" />
      )}

      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin-slow" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
