"use client";
import { useState } from "react";
import { familias, svgPaths } from "../utils/utils";
import { useRef } from "react";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AirIcon from "@mui/icons-material/Air";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ReplayIcon from "@mui/icons-material/Replay";
import InfoIcon from "@mui/icons-material/Info";



export default function TestOlfativo() {
  const frascoRef = useRef<HTMLDivElement>(null);
  const [currentSVG, setCurrentSVG] = useState<string | null>(null);
  const [textoAnimado, setTextoAnimado] = useState<string[]>([]);

  const [familiaSeleccionada, setFamiliaSeleccionada] = useState<keyof typeof familias | null>(null);

  const cargarSVGInlineConColor = async (url: string, fillColor: string) => {
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");

    const relleno = svg?.querySelector(".relleno");
    if (relleno) relleno.setAttribute("fill", fillColor);

    if (svg) {
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    }
    setCurrentSVG(svg?.outerHTML || "");

  };

  const animarLlenado = async (familiaKey: keyof typeof familias) => {
    const familia = familias[familiaKey];

    setTextoAnimado([]);
    setFamiliaSeleccionada(familiaKey);
    const sonido = new Audio("potion/bubble.mp3");
    sonido.play();

    for (let i = 0; i < svgPaths.length; i++) {
      await cargarSVGInlineConColor(svgPaths[i], familia.color);
      await new Promise((res) => setTimeout(res, 400));
    }

    if (frascoRef.current) {
      for (let i = 0; i < 10; i++) {
        const estrella = document.createElement("span");
        estrella.classList.add("estrella");
        estrella.style.position = "absolute";
        estrella.style.left = `${Math.random() * 80 + 10}%`;
        estrella.style.top = `${Math.random() * 80 + 10}px`;
        estrella.style.animationDelay = `${Math.random() * 2}s`;
        estrella.style.transform = "translate(-20%, -20%)";

        frascoRef.current.appendChild(estrella);

        setTimeout(() => estrella.remove(), 8000);
      }
    }



    familia.texto.split("").forEach((letra, i) => {
      setTimeout(() => {
        setTextoAnimado((prev) => [...prev, letra]);
      }, i * 60);
    });
  };

  const reiniciar = () => {
    setTextoAnimado([]);
    setFamiliaSeleccionada(null);
    setCurrentSVG(null);

  };
  return (
    <div className="w-full flex flex-col items-center gap-6 p-4">
      {!familiaSeleccionada ? (
        <>
          <p className="font-medium text-white text-xl">¿Qué familia de fragancia preferís?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <button
              onClick={() => animarLlenado("acuatica")}
              className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
            >
              <WaterDropIcon /> Brisa marina
            </button>

            <button
              onClick={() => animarLlenado("frutal")}
              className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
            >
              <WbSunnyIcon /> Calor tropical
            </button>

            <button
              onClick={() => animarLlenado("madera")}
              className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
            >
              <AirIcon /> Otoño templado
            </button>

            <button
              onClick={() => animarLlenado("ambarada")}
              className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
            >
              <AcUnitIcon /> Invierno nevado
            </button>

          </div>

        </>
      ) : (
        <>

          <div
            ref={frascoRef}
            className="w-[200px] h-[200px] relative"

          >

            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: currentSVG || "" }}
            />
          </div>



          <div className="text-center max-w-md text-white mt-4 space-y-4">
            <p className="text-lg font-medium">Según tu respuesta, es probable que te gusten las esencias:</p>

            <h2 className="text-3xl font-bold uppercase text-white">
              {textoAnimado.map((letra, i) => (
                <span key={i}>{letra}</span>
              ))}
            </h2>



            <button
              onClick={reiniciar}
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
