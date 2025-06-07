"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBottle() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const colors = ["#ec4899", "#8e44ad", "#f59e0b", "#4ade80"];
    let i = 0;
    const interval = setInterval(() => {
      if (svgRef.current) {
        svgRef.current.style.setProperty("--dynamic-color", colors[i % colors.length]);
        i++;
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[300px] h-[300px] relative">
      <svg
        ref={svgRef}
        viewBox="0 0 767 780"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ec4899">
              <animate attributeName="stop-color" values="#ec4899;#f59e0b;#4ade80;#8e44ad;#ec4899" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#8e44ad">
              <animate attributeName="stop-color" values="#8e44ad;#4ade80;#f59e0b;#ec4899;#8e44ad" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>

        <g id="Relleno">
          <path
            className="glow"
            fill="url(#gradient)"
            d="M315.6,251.8c-6.5,6.3-15.7,42.2-40.4,42c-100.8-0.5-316.8,421.5,113.5,431.5
              c82.9,1.9,236.9,44.8,260.9-246.4c5.7-69.7-97.6-190.4-157.5-187.4c-7.6,0.4,4.5-45.7-44.6-36.7c-14.5,2.7-28.5,5.3-42.2,11.4
              c-14.2,6.4-28.9,7.5-43.8,5C344.7,268.4,329.9,260.9,315.6,251.8z"
          />
        </g>
        <path
          className="glow"
          fill="url(#gradient)"
          d="M483.2,265.9v-136h18.1c5.8,0,10.5-4.6,10.5-10.3v-37c0-14.4-12-26-26.7-26H292.3
              c-14.7,0-26.7,11.7-26.7,26v37c0,5.7,4.7,10.3,10.5,10.3h18v136C188.6,304.3,118.3,402.6,118.3,513c0,88.3,45,170.3,120.4,219.4
              c1.7,1.1,3.8,1.7,5.8,1.7h288.3c2.1,0,4.1-0.6,5.8-1.7c75.5-49,120.5-131,120.5-219.4C659.1,402.6,588.7,304.2,483.2,265.9z
              M286.6,82.6c0-3,2.5-5.5,5.6-5.5h192.8c3.1,0,5.6,2.5,5.6,5.5v26.8H286.6V82.6z M538.8,701C273.6,746.5,140.4,683.8,139.3,513
              c0-104.1,67.8-196.6,168.7-230.2c4.3-1.4,7.1-5.3,7.1-9.7V129.9h147v143.3c0,4.4,2.9,8.3,7.1,9.7C570.2,316.4,638,408.9,638,513
              C638,593.5,606.8,655.6,538.8,701z"
        />

        {/* Destellos (fireflies) */}
        {Array.from({ length: 10 }).map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 767}
            cy={Math.random() * 780}
            r={Math.random() * 2 + 1}
            fill="white"
            className="firefly"
            style={{
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </svg>

      <style jsx>{`
        svg {
          --dynamic-color: #8e44ad;
        }

        .glow {
          animation: glowPulse 2s ease-in-out infinite;
          filter: drop-shadow(0 0 8px var(--dynamic-color));
        }

        @keyframes glowPulse {
          0% {
            filter: drop-shadow(0 0 0px var(--dynamic-color));
          }
          50% {
            filter: drop-shadow(0 0 15px var(--dynamic-color));
          }
          100% {
            filter: drop-shadow(0 0 0px var(--dynamic-color));
          }
        }

        .firefly {
          animation: twinkle 4s ease-in-out infinite alternate;
          opacity: 0.8;
        }

        @keyframes twinkle {
          0% {
            opacity: 0.2;
            transform: scale(0.8) translateY(0px);
          }
          50% {
            opacity: 1;
            transform: scale(1.5) translateY(-8px);
          }
          100% {
            opacity: 0.2;
            transform: scale(1) translateY(0px);
          }
        }
      `}</style>
    </div>
  );
}
