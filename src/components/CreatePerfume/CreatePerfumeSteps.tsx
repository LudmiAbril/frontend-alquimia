"use client";

import { useState } from "react";
import CreationStep from "./PerfumeCreation";
import FormulaResult, { GetFormulaResponse } from "./FormulaResult";
import SectionWrapper from "../general/SectionWrapper";
import Welcome from "./Welcome";
import { perfumeData } from "./ResultCard";

export const createSteps = [
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

const CreatePerfumeSteps = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  // a futuro mandar a un context o estado global
  const [currentPerfume, setCurrentPerfume] = useState<perfumeData>({
    baseNotes: [],
    heartNotes: [],
    topNotes: [],
    intensity: { Id: 0, Name: "", Category: "", Description: "" }
  });
  const [resultFormula, setResultFormula] = useState<GetFormulaResponse>({
    Id: 0,
    IdCreador: 0,
    ConcentracionAgua: 0,
    ConcentracionAlcohol: 0,
    ConcentracionEsencia: 0,
    Intensity: {
      Id: 0,
      Name: "",
      Category: "",
      Description: ""
    },
    NotasCorazonIds: {
      Note1: {
        Description: "",
        Duration: "",
        Family: "",
        Name: "",
        Sector: ""
      },
    },
    NotasFondoIds: {
      Note1: {
        Name: "",
        Family: "",
        Sector: "",
        Description: "",
        Duration: ""
      },
    },
    NotasSalidaIds: {
      Note1: {
        Name: "",
        Family: "",
        Sector: "",
        Description: "",
        Duration: ""
      },
    }
  });

  const advanceStep = () => {
    if (currentStep < createSteps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const returnStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <SectionWrapper className="bg-[#E8E3DE]">
      {currentStep === 0 ? (
        <Welcome onNext={advanceStep} />
      ) : currentStep < createSteps.length - 1 ? (
        <CreationStep
          currentStep={currentStep}
          onNext={advanceStep}
          onBack={returnStep} currentPerfume={currentPerfume} setCurrentPerfume={setCurrentPerfume} setResultFormula={setResultFormula} />
      ) : (
        <FormulaResult resultPerfume={resultFormula} />
      )}
    </SectionWrapper>
  );
};
export default CreatePerfumeSteps;
