"use client";

import { StepSummaryProps, SummaryItem } from "@/components/utils/typing";
import { motion } from "framer-motion";
import ButtonSecondary from "../General/ButtonSecondary";
import ButtonViolet from "../General/ButtonViolet";



export default function StepSummary({ summary, onReset, onBack }: StepSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl w-full mx-auto text-center"
    >
      <h3 className="text-3xl md:text-4xl font-bold text-violeta mb-6">
        Resumen de tus respuestas
      </h3>

      <ul className="bg-white border border-gray-200 rounded-xl p-6 shadow-md space-y-3 text-sm text-gray-700 mb-8">
        {summary.map((item, idx) => (
          <li key={idx} className="text-left">
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ButtonSecondary onClick={onBack}>
          ← Volver a la fórmula
        </ButtonSecondary>

        <ButtonViolet onClick={onReset}>
          Volver a empezar
        </ButtonViolet>
      </div>
    </motion.div>
  );
}
