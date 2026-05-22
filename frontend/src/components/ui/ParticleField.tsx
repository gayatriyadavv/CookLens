"use client";

import { useState, useEffect } from "react";

interface ParticleFieldProps {
  count?: number;
  className?: string;
}

export default function ParticleField({
  count = 25,
  className = "",
}: ParticleFieldProps) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      opacity: 0.1 + Math.random() * 0.3,
      duration: 4 + Math.random() * 8,
      delay: Math.random() * 5,
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
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: `rgba(245, 158, 11, ${p.opacity})`,
            boxShadow: `0 0 ${p.size * 2}px rgba(245, 158, 11, ${p.opacity * 0.5})`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
