"use client";

import { useEffect, useState } from "react";

export default function MagicParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Solo se monta en cliente, evita hidratación SSR
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 120 }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const colors = ["#ffffff", "#e6ccff", "#ccf2ff", "#f3d9fa", "#d0e8ff"];
        const color = colors[i % colors.length];
        return (
          <span
            key={i}
            className="absolute rounded-full blur-sm animate-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              opacity: Math.random() * 0.5 + 0.5,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        );
      })}
    </div>
  );
}
