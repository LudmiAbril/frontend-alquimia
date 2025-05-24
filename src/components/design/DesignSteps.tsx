"use client";

import { SetStateAction, useState } from "react";
import WelcomeStep from "./Welcome";
import CreationStep from "./CreationStep";
import FormulaResult from "./FormulaResult";
import SectionWrapper from "../general/SectionWrapper";
import Welcome from "./Welcome";
import { perfume } from "./ResultCard";

export const designSteps = [
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
    descripcion: "La nota de salida es la primera impresión: volátil y vibrante.",
  },
  {
    nombre: "Intensidad",
    descripcion: "Ajustá la intensidad general del perfume según tu preferencia.",
  },
  {
    nombre: "Fórmula",
    descripcion: "Acá podés ver el resultado final de tu fórmula personalizada.",
  },
];

const DesignPerfume = () => {
  const [pasoActual, setPasoActual] = useState<number>(0);
  const [perfumeActual, setPerfumeActual] = useState<perfume>({
    notasSalida: [],
    notasCorazon: [],
    notasBase: [],
    intensity: { name: "", type: "" }
  });
  const avanzarPaso = () => {
    if (pasoActual < designSteps.length - 1) {
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
        <Welcome onNext={avanzarPaso} />
      ) : pasoActual < designSteps.length - 1 ? (
        <CreationStep
            currentStep={pasoActual}
            onNext={avanzarPaso}
            onBack={retrocederPaso} currentPerfume={perfumeActual} setCurrentPerfume={setPerfumeActual}        />
      ) : (
        <FormulaResult resultPerfume={perfumeActual} />
      )}
    </SectionWrapper>
  );
};
export default DesignPerfume;
