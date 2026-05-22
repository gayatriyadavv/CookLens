import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "warning" | "info" | "danger";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  success: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    glow: "shadow-[0_0_8px_rgba(16,185,129,0.15)]",
  },
  warning: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    glow: "shadow-[0_0_8px_rgba(245,158,11,0.15)]",
  },
  info: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
    glow: "shadow-[0_0_8px_rgba(59,130,246,0.15)]",
  },
  danger: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    glow: "shadow-[0_0_8px_rgba(239,68,68,0.15)]",
  },
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({
  children,
  variant = "warning",
  size = "sm",
  className = "",
}: BadgeProps) {
  const v = variantStyles[variant];

  return (
    <span
      className={`
        inline-flex items-center gap-1 rounded-full font-medium
        border ${v.bg} ${v.text} ${v.border} ${v.glow}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
