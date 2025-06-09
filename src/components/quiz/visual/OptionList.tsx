"use client"

import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/Utils/typing"

export default function OptionList({ question, selectedOption, onSelect }: PropsDynamic) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 max-w-7xl mx-auto">
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
            className={`group flex flex-col items-center cursor-pointer transition-all duration-300 relative`}
          >

            <div
              className={`m-4 w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full bg-cover bg-center shadow-lg transition-all duration-300 
                          ${isSelected ? "ring-4 ring-[var(--lila)]" : "hover:ring-2 hover:ring-[var(--violeta)]"}`}
              style={{ backgroundImage: `url(${opt.ImagenUrl})` }}
            />


            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-80 animate-firefly"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>

      
            <div className="mt-4 text-center max-w-[10rem] text-lg text-gray-800 dark:text-gray-100">
              <p className="font-semibold leading-tight">{opt.Texto.split(",")[0]}</p>
              <p className="text-sm opacity-80 mt-1">{opt.Texto.split(",").slice(1).join(",")}</p>
            </div>
          </motion.li>
        )
      })}
    </ul>
  )
}
