"use client";

import { useState, useEffect } from "react";

interface SteamEffectProps {
  intensity?: "low" | "medium" | "high";
  className?: string;
}

const particleCounts = { low: 6, medium: 10, high: 14 };

export default function SteamEffect({
  intensity = "medium",
  className = "",
}: SteamEffectProps) {
  const count = particleCounts[intensity];

  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    size: number;
    delay: number;
    duration: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      size: 3 + Math.random() * 8,
      delay: Math.random() * 3,
      duration: 2.5 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.25,
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, rgba(245,158,11,${p.opacity}) 0%, transparent 70%)`,
            animation: `steam ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
