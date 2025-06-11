"use client";


import { motion } from "framer-motion";
import Card3D from "./Card3d";
import ButtonViolet from "../general/ButtonViolet";


interface StepFamilyProps {
  result: { nombre: string };
  backgroundImage: string;
  familyPets: string;
  onNext: () => void;
}

export default function StepFamily({ result, backgroundImage, familyPets, onNext }: StepFamilyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl w-full"
    >
      <Card3D backgroundSrc={backgroundImage} characterSrc={familyPets} alt={result.nombre} title={result.nombre} />

      <div className="flex-1 text-center lg:text-left text-[var(--gris4)]">
        <div className="bg-[var(--lila)] text-white text-sm px-6 py-2 rounded-full inline-flex items-center gap-2 mb-4 shadow-md animate-fade-in tracking-wide font-semibold">
          <span className="material-icons text-white text-base">local_florist</span>
          ¡Quiz completado!
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Tu familia olfativa es:
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold text-violeta bg-clip-text text-transparent mb-6 animate-fadeIn">
          {result.nombre}
        </h2>

        <ButtonViolet onClick={onNext} className="mt-4 bg-[var(--violeta)] text-white text-sm py-2 px-6 rounded-full shadow-lg hover:bg-[var(--lila)] transition">
          Ver subfamilias destacadas
        </ButtonViolet>
      </div>
    </motion.div>
  );
}
