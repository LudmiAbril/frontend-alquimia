"use client";

import React from "react";
import Image from "next/image";

interface BienvenidaProps {
  onNext: () => void;
}

const Bienvenida = ({ onNext }: BienvenidaProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 ">
      {/* Texto principal */}
      <div className="space-y-4 max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#9444B6]">
          ¡Bienvenido alquimista!
        </h1>
        <h2 className="text-xl md:text-2xl text-[#9444B6] font-medium">
          Comenzá la creación de tu fragancia única.
        </h2>
        <p className="text-sm md:text-base text-[#595957]">
          Tu fragancia nace de lo invisible. Conectá aromas,
          emociones y un toque de magia.
        </p>
      </div>

      {/* Frasco */}
      <button
        onClick={onNext}
        className="mt-12 cursor-pointer hover:scale-105 transition-transform"
        aria-label="Comenzar a mezclar"
      >
        <Image
          src="/frasco.svg"
          alt="Frasco"
          width={200}
          height={200}
          className="opacity-80"
        />
      </button>

      {/* Texto secundario */}
      <p className="mt-6 text-xs text-gray-600">
        Hacé click y comenzá a mezclar tu hechizo aromático.
      </p>
    </div>
  );
};

export default Bienvenida;
