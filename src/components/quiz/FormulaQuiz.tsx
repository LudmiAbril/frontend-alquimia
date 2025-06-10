"use client";

import { useSearchParams } from "next/navigation";
import ButtonViolet from "../general/ButtonViolet";
import Link from "next/link";
import Image from "next/image";
import Fireflies from "./Fireflies";
import ConfettiStreamers from "./ConfettiStreamer";
import { Droplet, FlaskConical, Heart } from "lucide-react";


export default function FormulaQuiz() {
  const params = useSearchParams();

  const topNote = params.get("top");
  const heartNote = params.get("heart");
  const baseNote = params.get("base");
  const concentration = params.get("type");



  return (
 <div className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12 text-center text-gray-700 overflow-hidden">

      <Fireflies />
<ConfettiStreamers />

      <h1 className="text-4xl md:text-5xl mt-20 font-bold text-[var(--violeta)] mb-4 ">
        ¡Tu fórmula mágica está lista!
      </h1>

      <p className="text-gray-600 mb-8 max-w-lg z-10">
        Esta es la fórmula olfativa que mejor representa tu estilo. Podés usarla como base
        para crear tu perfume personalizado en el siguiente paso.
      </p>
<div className="bg-purple-50 border border-purple-200 rounded-2xl px-8 py-6 w-full max-w-md shadow-xl hover:scale-[1.015] transition duration-300 z-10 animate-fade-in-up text-center">
  <p className="text-base text-gray-600 mb-1">Tipo de concentración:</p>
  <p className="text-2xl font-bold text-gray-800 mb-6">{concentration}</p>

  <div className="space-y-6 text-[15px]">
    {/* Nota de Salida */}
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 text-[var(--violeta)] font-semibold">
        <FlaskConical className="w-5 h-5" />
        <span>Nota de Salida</span>
      </div>
      <p className="text-gray-700">{topNote}</p>
    </div>

    {/* Nota de Corazón */}
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 text-[var(--violeta)] font-semibold">
        <Heart className="w-5 h-5" />
        <span>Nota de Corazón</span>
      </div>
      <p className="text-gray-700">{heartNote}</p>
    </div>

    {/* Nota de Fondo */}
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 text-[var(--violeta)] font-semibold">
        <Droplet className="w-5 h-5" />
        <span>Nota de Fondo</span>
      </div>
      <p className="text-gray-700">{baseNote}</p>
    </div>
  </div>
</div>



      <div className="mt-10 mb-4 animate-fade-in-up z-10">
        <Image
          src="/mascotas/mascotas-grupo-hi.png"
          alt="Alquimistas con pociones"
          width={420}
          height={320}
          className="mx-auto"
        />
      </div>

      <div className="z-10 mt-4">
        <Link href="/crear-perfume">
          <ButtonViolet label="Crear mi perfume con esta fórmula" />
        </Link>
      </div>
    </div>
  );
}
