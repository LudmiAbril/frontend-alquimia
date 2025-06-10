"use client";

import { useEffect, useState } from "react";

const colors = ["#9444B6", "#E5B3FF", "#FF6F91", "#FFD166", "#6BD1B7"];

export default function ConfettiStreamers() {
  const [streamers, setStreamers] = useState<number[]>([]);

  useEffect(() => {
    setStreamers(Array.from({ length: 30 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {streamers.map((_, i) => {
        const isLeft = i % 2 === 0;
        const direction = isLeft ? "left" : "right";
        const startY = Math.random() * 80 + 10; // entre 10% y 90%
        const delay = Math.random() * 0.5;

        return (
          <div
            key={i}
            className={`confetti-piece ${direction}`}
            style={{
              top: `${startY}%`,
              backgroundColor: colors[i % colors.length],
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}

      <style jsx>{`
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 16px;
          opacity: 0.9;
          border-radius: 2px;
          animation: shoot 1s ease-out forwards;
        }

        .left {
          left: 0;
          transform: translateX(-50px);
        }

        .right {
          right: 0;
          transform: translateX(50px);
        }

        @keyframes shoot {
          0% {
            opacity: 1;
            transform: translateX(0) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translateX(300px) rotate(720deg);
          }
        }

        .right {
          animation-name: shootRight;
        }

        .left {
          animation-name: shootLeft;
        }

        @keyframes shootLeft {
          0% {
            transform: translateX(-50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(300px) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes shootRight {
          0% {
            transform: translateX(50px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateX(-300px) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
