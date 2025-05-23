"use client";

import { useState } from "react";
import WelcomeStep from "./Welcome";
import CreationStep from "./CreationStep";
import FormulaResult from "./FormulaResult";
import SectionWrapper from "../general/SectionWrapper";

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
  const [currentStep, setCurrentStep] = useState<number>(0);

  const nextStep = () => {
    if (currentStep < designSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <SectionWrapper className="bg-[#f9f4f1]">
      {currentStep === 0 ? (
        <WelcomeStep onNext={nextStep} />
      ) : currentStep < designSteps.length - 1 ? (
        <CreationStep
          currentStep={currentStep}
          onNext={nextStep}
          onBack={previousStep}
        />
      ) : (
        <FormulaResult />
      )}
    </SectionWrapper>
  );
};

export default DesignPerfume;
