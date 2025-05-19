"use client";

import { useState } from "react";
import Bienvenida from "./Bienvenida";
import Confeccion from "./Confeccion";
import ResultadoFormula from "./ResultadoFormula";

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
      "Ajusta la intensidad general del perfume según tu preferencia.",
  },
  {
    nombre: "Formula",
    descripcion:
      "Aca podes ver el resultado final de tu fórmula personalizada.",
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
    <>
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
    </>
  );
};

export default DisenarPerfume;
