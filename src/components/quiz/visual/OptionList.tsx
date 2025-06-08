"use client"

import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/utils/typing"

export default function OptionList({ question, selectedOption, onSelect }: PropsDynamic) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 max-w-5xl mx-auto">
      {question.Opciones.map((opt) => {
        const isSelected = selectedOption === opt.Letra

        return (
          <motion.li
            key={opt.Letra}
            onClick={() => onSelect(opt.Letra)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            role="button"
            aria-pressed={isSelected}
            className={`group flex flex-col items-center cursor-pointer transition-all duration-300`}
          >
            {/* Círculo con imagen */}
            <div
              className={`
                w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-cover bg-center shadow-md
                transition-all duration-300
                ${isSelected ? "ring-4 ring-[var(--lila)]" : "hover:ring-2 hover:ring-[var(--violeta)]"}
              `}
              style={{ backgroundImage: `url(${opt.ImagenUrl})` }}
            />

            {/* Texto debajo */}
            <div className="mt-3 text-center max-w-[8rem] text-sm text-gray-800 dark:text-gray-100">
              <p className="font-semibold leading-tight">{opt.Texto.split(",")[0]}</p>
              <p className="text-xs opacity-70 mt-1">{opt.Texto.split(",").slice(1).join(",")}</p>
            </div>
          </motion.li>
        )
      })}
    </ul>
  )
}
