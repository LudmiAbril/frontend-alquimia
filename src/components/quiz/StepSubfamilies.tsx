"use client";

import { motion } from "framer-motion";
import ButtonViolet from "../General/ButtonViolet";


interface StepSubfamiliesProps {
  subfamilias: string[];
  onNext: () => void;
}

export default function StepSubfamilies({ subfamilias, onNext }: StepSubfamiliesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center max-w-3xl w-full"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-violeta mb-6">
        Subfamilias destacadas
      </h2>

      <ul className="flex flex-wrap justify-center gap-4 mb-10">
        {subfamilias.map((sub, idx) => (
          <li
            key={idx}
            className="bg-[var(--violeta)] text-white px-5 py-3 rounded-full shadow-lg font-semibold tracking-wide text-sm hover:scale-105 transition"
          >
            {sub}
          </li>
        ))}
      </ul>

      <ButtonViolet onClick={onNext} className="bg-[var(--violeta)] text-white text-sm py-2 px-6 rounded-full shadow-md hover:bg-[var(--lila)] transition">
        Ver fórmula sugerida
      </ButtonViolet>
    </motion.div>
  );
}