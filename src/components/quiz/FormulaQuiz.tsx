"use client";

import { useSearchParams } from "next/navigation";
import ButtonViolet from "../general/ButtonViolet";
import Link from "next/link";
import Image from "next/image";
import Fireflies from "./Fireflies";


export default function FormulaQuiz() {
  const params = useSearchParams();

  const topNote = params.get("top");
  const heartNote = params.get("heart");
  const baseNote = params.get("base");
  const concentration = params.get("type");



  return (
 <div className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 py-12 text-center text-gray-700 overflow-hidden">

      <Fireflies />

      <h1 className="text-4xl md:text-5xl mt-20 font-bold text-[var(--violeta)] mb-4 ">
        ¡Tu fórmula mágica está lista!
      </h1>

      <p className="text-gray-600 mb-8 max-w-lg z-10">
        Esta es la fórmula olfativa que mejor representa tu estilo. Podés usarla como base
        para crear tu perfume personalizado en el siguiente paso.
      </p>

    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 w-full max-w-md shadow-md hover:scale-105 transition duration-300 z-10 animate-fade-in-up">

        <p className="text-sm mb-2 text-gray-600">Tipo de concentración:</p>
        <p className="text-lg font-semibold mb-4">{concentration}</p>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div>
            <p className="font-bold text-purple-600">Nota de Salida</p>
            <p>{topNote}</p>
          </div>
          <div>
            <p className="font-bold text-purple-600">Nota de Corazón</p>
            <p>{heartNote}</p>
          </div>
          <div>
            <p className="font-bold text-purple-600">Nota de Fondo</p>
            <p>{baseNote}</p>
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
