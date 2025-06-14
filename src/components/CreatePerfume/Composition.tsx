"use client";

import { useCreatePerfumeStore } from "@/store/CreatePerfumeStore";

export const Composition = () => {
    const {
      resultFormula,
    } = useCreatePerfumeStore();

  return (
    <div className="flex flex-col w-[38rem]">
      <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">Composición Aromática</p>
      <div className="mt-10 mb-[4rem]">
        <div className=" px-10 text-center">
          <div className="border-b border-[var(--gris2)] flex justify-between px-6 pb-1 mb-4 uppercase fuente-principal text-[14px] text-[var(--gris3)]"><p>nota</p> <p>esencia</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Fondo</p>  <p>
            {Object.values(resultFormula.NotasFondoIds || {})
              .filter((note) => note !== null)
              .map((note) => note!.Name)
              .join(', ')}
          </p></div>
          <div className="flex justify-between mb-4 px-6"><p>Corazón</p>  <p>
            {Object.values(resultFormula.NotasCorazonIds || {})
              .filter((note) => note !== null)
              .map((note) => note!.Name)
              .join(', ')}
          </p></div>
          <div className="flex justify-between mb-4 px-6"><p>Salida</p>  <p>
            {Object.values(resultFormula.NotasSalidaIds || {})
              .filter((note) => note !== null)
              .map((note) => note!.Name)
              .join(', ')}
          </p></div>
        </div>
      </div>
      <p className="text-[12px] text-[var(--gris3)]">Intensidad <span className="font-bold uppercase">{resultFormula.Intensity.Name}</span> ({resultFormula.Intensity.Category})</p>
    </div>
  );
};
