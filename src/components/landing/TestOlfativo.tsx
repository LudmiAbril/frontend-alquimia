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
      const sonido = new Audio("/bubble.mp3");
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
        <p className="font-medium">¿Qué familia de fragancia preferís?</p>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.entries(familias).map(([key, familia]) => (
            <button
              key={key}
              onClick={() => animarLlenado(key as keyof typeof familias)}
              className="text-white px-4 py-2 rounded-xl font-medium transition hover:brightness-110"
              style={{ backgroundColor: familia.color }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
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
        <div className="text-center max-w-md">
          <div className="text-xl text-indigo-900 font-semibold">
            {textoAnimado.map((c, i) => (
              <span
                key={i}
                className="inline-block opacity-0 animate-fadeIn"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {c}
              </span>
            ))}
          </div>
          <p className="text-gray-800 mt-2">{familias[familiaSeleccionada].descripcion}</p>
          <button
            onClick={reiniciar}
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-xl hover:brightness-110"
          >
            Empezar de nuevo
          </button>
        </div>
      </>
    )}
  </div>
);

}
