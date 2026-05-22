interface SkeletonProps {
  variant?: "text" | "card" | "image" | "circle";
  width?: string;
  height?: string;
  className?: string;
}

const variantDefaults = {
  text: { w: "100%", h: "16px", rounded: "rounded-md" },
  card: { w: "100%", h: "200px", rounded: "rounded-2xl" },
  image: { w: "100%", h: "250px", rounded: "rounded-xl" },
  circle: { w: "48px", h: "48px", rounded: "rounded-full" },
};

export default function Skeleton({
  variant = "text",
  width,
  height,
  className = "",
}: SkeletonProps) {
  const defaults = variantDefaults[variant];

  return (
    <div
      className={`
        ${defaults.rounded}
        animate-shimmer
        ${className}
      `}
      style={{
        width: width || defaults.w,
        height: height || defaults.h,
        background:
          "linear-gradient(90deg, rgba(245,158,11,0.05) 25%, rgba(245,158,11,0.12) 50%, rgba(245,158,11,0.05) 75%)",
        backgroundSize: "200% 100%",
      }}
    />
  );
}
