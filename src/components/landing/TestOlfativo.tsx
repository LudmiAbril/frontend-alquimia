"use client";
import { useEffect, useState } from "react";
import { familias, svgPaths } from "../utils/utils";
import { useRef } from "react";



export default function TestOlfativo() {
    const frascoRef = useRef<HTMLDivElement>(null);
  const [currentSVG, setCurrentSVG] = useState<string | null>(null);
  const [textoAnimado, setTextoAnimado] = useState<string[]>([]);
  const [color, setColor] = useState("#00bfa6");
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
    setColor(familia.color);
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
    estrella.style.left = `${Math.random() * 20 + 10}%`;
    estrella.style.top = `${Math.random() * 20 + 10}px`;
    estrella.style.animationDelay = `${Math.random() * 2}s`;
    estrella.style.transform = "translate(-30%, -20%)";

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
    setColor("#00bfa6");
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
    <i className="bi bi-droplet-fill"></i> Brisa marina
  </button>

  <button
    onClick={() => animarLlenado("frutal")}
    className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
  >
    <i className="bi bi-sun-fill"></i> Calor tropical
  </button>

  <button
    onClick={() => animarLlenado("madera")}
    className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
  >
    <i className="bi bi-wind"></i> Otoño templado
  </button>

  <button
    onClick={() => animarLlenado("ambarada")}
    className="flex items-center gap-2 bg-white text-[#9444B6] px-6 py-3 rounded-xl font-bold uppercase shadow-sm hover:shadow-md transition"
  >
    <i className="bi bi-snow2"></i> Invierno nevado
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
    {familias[familiaSeleccionada].texto}
  </h2>

  <button
    onClick={reiniciar}
    className="flex items-center gap-2 text-[#9444B6] font-semibold hover:underline mx-auto"
  >
    <i className="bi bi-arrow-clockwise"></i> Volver a probar
  </button>

  <p className="text-sm text-[#ffffffbb] flex items-center justify-center gap-1 italic">
    <i className="bi bi-info-circle"></i> Si completás nuestro test, el resultado será más preciso.
  </p>
</div>

      </>
    )}
  </div>
);

}
