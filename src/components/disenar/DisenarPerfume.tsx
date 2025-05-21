"use client";

import { useState } from "react";
import Bienvenida from "./Bienvenida";
import Confeccion from "./Confeccion";
import ResultadoFormula from "./ResultadoFormula";
import SectionWrapper from "../general/SeccionWrapper";

// Pasos del proceso de diseño
export const pasosDiseño = [
  {
    nombre: "Bienvenida",
    descripcion:
      "Te damos la bienvenida al diseño de tu perfume personalizado.",
  },
  {
    nombre: "Nota Base",
    descripcion: "Profunda, duradera... la estela que perdura.",
  },
  {
    nombre: "Nota Corazón",
    descripcion: "El alma de tu fragancia, donde reside su identidad.",
  },
  {
    nombre: "Nota Salida",
    descripcion:
      "La nota de salida es la primera impresión: volátil y vibrante.",
  },
  {
    nombre: "Intensidad",
    descripcion:
      "Ajustá la intensidad general del perfume según tu preferencia.",
  },
  {
    nombre: "Fórmula",
    descripcion:
      "Acá podés ver el resultado final de tu fórmula personalizada.",
  },
];

const DisenarPerfume = () => {
  const [pasoActual, setPasoActual] = useState<number>(0);

  const avanzarPaso = () => {
    if (pasoActual < pasosDiseño.length - 1) {
      setPasoActual((prev) => prev + 1);
    }
  };

  const retrocederPaso = () => {
    if (pasoActual > 0) {
      setPasoActual((prev) => prev - 1);
    }
  };

  return (
    <SectionWrapper className="bg-[#f9f4f1]">
      {pasoActual === 0 ? (
        <Bienvenida onNext={avanzarPaso} />
      ) : pasoActual < pasosDiseño.length - 1 ? (
        <Confeccion
          pasoActual={pasoActual}
          avanzar={avanzarPaso}
          volver={retrocederPaso}
        />
      ) : (
        <ResultadoFormula />
      )}
    </SectionWrapper>
  );
};

export default DisenarPerfume;
