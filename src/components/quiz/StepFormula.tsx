"use client";

import { motion } from "framer-motion";
import ButtonSecondary from "../general/ButtonSecondary";
import ButtonViolet from "../general/ButtonViolet";

interface StepFormulaProps {
  formula?: {
    TopNote: string;
    HeartNote: string;
    BaseNote: string;
  };
  concentration: string;
  description: string;
  onNext: () => void;
  onCrearPerfume: () => void;
}

export default function StepFormula({ formula, concentration, description, onNext, onCrearPerfume }: StepFormulaProps) {
  if (!formula) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center max-w-3xl text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-violeta mb-6">
        Fórmula sugerida para vos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-violeta text-base font-medium mb-6">
        <div className="flex flex-col items-center">
          <span className="material-icons text-2xl mb-1">north</span>
          <p className="font-bold">Nota de Salida</p>
          <p className="text-[var(--gris4)]">{formula.TopNote}</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons text-2xl mb-1">favorite</span>
          <p className="font-bold">Nota de Corazón</p>
          <p className="text-[var(--gris4)]">{formula.HeartNote}</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="material-icons text-2xl mb-1">south</span>
          <p className="font-bold">Nota de Fondo</p>
          <p className="text-[var(--gris4)]">{formula.BaseNote}</p>
        </div>
      </div>

      <p className="mb-4 text-sm italic text-[var(--gris3)]">
        Concentración sugerida: <span className="font-semibold">{concentration}</span>
      </p>

      <p className="text-[var(--gris4)] text-sm md:text-base leading-relaxed max-w-xl mb-8">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        <ButtonSecondary onClick={onNext} >
          Ver resumen
        </ButtonSecondary>
        <ButtonViolet onClick={onCrearPerfume} className="bg-[var(--violeta)] text-white hover:bg-[var(--lila)]">
          Crear mi perfume
        </ButtonViolet>
      </div>
    </motion.div>
  );
}
