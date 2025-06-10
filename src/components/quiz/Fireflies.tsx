"use client";
import { useEffect, useState } from "react";

const Fireflies = () => {
  const [fireflies, setFireflies] = useState<number[]>([]);

  useEffect(() => {
    setFireflies(Array.from({ length: 25 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {fireflies.map((_, i) => (
        <div
          key={i}
          className="firefly animate-float"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
      <style jsx>{`
        .firefly {
          position: absolute;
          width: 6px;
          height: 6px;
          background:rgba(197, 162, 212, 0.86)  ;
          border-radius: 50%;
          box-shadow: 0 0 6px 2px rgba(159, 100, 184, 0.78);
        }
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Fireflies;
