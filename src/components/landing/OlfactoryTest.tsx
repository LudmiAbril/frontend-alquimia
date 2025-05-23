"use client";

import { useState, useRef, useEffect } from "react";
import { fragranceFamilies, potionSvgPaths } from "../utils/utils";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AirIcon from "@mui/icons-material/Air";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ReplayIcon from "@mui/icons-material/Replay";
import InfoIcon from "@mui/icons-material/Info";

export default function OlfactoryTest() {
  const bottleRef = useRef<HTMLDivElement>(null);
  const [currentSVG, setCurrentSVG] = useState<string | null>(null);
  const [animatedText, setAnimatedText] = useState<string[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<keyof typeof fragranceFamilies | null>(null);

  const loadSVGWithColor = async (url: string, fillColor: string) => {
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");

    const fillElement = svg?.querySelector(".relleno");
    if (fillElement) fillElement.setAttribute("fill", fillColor);

    if (svg) {
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    }

    setCurrentSVG(svg?.outerHTML || "");
  };

  const animateFilling = async (familyKey: keyof typeof fragranceFamilies) => {
    const family = fragranceFamilies[familyKey];

    setAnimatedText([]);
    setSelectedFamily(familyKey);

    const sound = new Audio("potion/bubble.mp3");
    sound.play();

    for (let i = 0; i < potionSvgPaths.length; i++) {
      await loadSVGWithColor(potionSvgPaths[i], family.color);
      await new Promise((res) => setTimeout(res, 400));
    }

    if (bottleRef.current) {
      for (let i = 0; i < 10; i++) {
        const star = document.createElement("span");
        star.classList.add("estrella");
        star.style.position = "absolute";
        star.style.left = `${Math.random() * 80 + 10}%`;
        star.style.top = `${Math.random() * 80 + 10}px`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.transform = "translate(-20%, -20%)";

        bottleRef.current.appendChild(star);

        setTimeout(() => star.remove(), 8000);
      }
    }

    family.text.split("").forEach((letter, i) => {
      setTimeout(() => {
        setAnimatedText((prev) => [...prev, letter]);
      }, i * 60);
    });
  };

  const reset = () => {
    setAnimatedText([]);
    setSelectedFamily(null);
    setCurrentSVG(null);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 p-4">
      {!selectedFamily ? (
        <>
          <p className="font-medium text-white text-xl">¿Qué familia de fragancia preferís?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => animateFilling("aquatic")}
              className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
            >
              <WaterDropIcon /> Brisa marina
            </button>

            <button
              onClick={() => animateFilling("fruity")}
              className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
            >
              <WbSunnyIcon /> Calor tropical
            </button>

            <button
              onClick={() => animateFilling("woody")}
              className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
            >
              <AirIcon /> Otoño templado
            </button>

            <button
              onClick={() => animateFilling("ambery")}
              className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
            >
              <AcUnitIcon /> Invierno nevado
            </button>
          </div>
        </>
      ) : (
        <>
          <div ref={bottleRef} className="w-[200px] h-[200px] relative">
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: currentSVG || "" }}
            />
          </div>

          <div className="text-center max-w-md text-white mt-4 space-y-4">
            <p className="text-lg font-medium">Según tu respuesta, es probable que te gusten las esencias:</p>

            <h2 className="text-3xl font-bold uppercase text-white">
              {animatedText.map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
            </h2>

            <button
              onClick={reset}
              className="flex items-center gap-2 text-[#9444B6] font-semibold mx-auto border border-transparent p-2 hover:border-[#9444B6] hover:rounded-xl transition-all duration-200"
            >
              <ReplayIcon /> Volver a probar
            </button>

            <p className="text-sm text-[#ffffffbb] flex items-center justify-center gap-1 italic">
              <InfoIcon /> Si completás nuestro test, el resultado será más preciso.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
