"use client";
import { useEffect, useState } from "react";

const familias = {
  acuatica: {
    texto: "Marinas/Cítricas.",
    color: "#66cccc",
    descripcion: "Fragancias frescas inspiradas en el mar, ideales para días cálidos.",
    imagen: "./img/familias/acuatica.jpg",
  },
  frutal: {
    texto: "Frutales/Florales.",
    color: "#ff6699",
    descripcion: "Notas jugosas y dulces como frutas del trópico y flores exóticas.",
    imagen: "./img/familias/frutal.jpg",
  },
  madera: {
    texto: "Amaderadas/Especiadas.",
    color: "#cc9966",
    descripcion: "Aromas cálidos y terrosos, elegantes y envolventes.",
    imagen: "./img/familias/madera.jpg",
  },
  ambarada: {
    texto: "Gourmand/Ambaradas.",
    color: "#9966cc",
    descripcion: "Esencias dulces, profundas y sensuales como la vainilla y el ámbar.",
    imagen: "./img/familias/ambarada.jpg",
  },
};

const svgPaths = [
  "/potion/potion00.svg",
  "/potion/potion01.svg",
  "/potion/potion03.svg",
  "/potion/potion04.svg",
];

export default function TestOlfativo() {
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

    for (let i = 0; i < svgPaths.length; i++) {
      await cargarSVGInlineConColor(svgPaths[i], familia.color);
      const sonido = new Audio("potion/bubble.mp3");
      sonido.play();
      await new Promise((res) => setTimeout(res, 400));
    }

    // animar texto letra por letra
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
        {/* Frasco primero */}
        <div className="w-[300px] h-[300px]">
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: currentSVG || "" }}
          />
        </div>

        {/* Resultado centrado */}
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
