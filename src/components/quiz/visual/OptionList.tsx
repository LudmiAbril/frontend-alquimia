"use client"

import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/utils/typing"

export default function OptionList({ question, selectedOption, onSelect }: PropsDynamic) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-20 mt-16 max-w-7xl mx-auto">
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
            className={`group flex flex-col items-center cursor-pointer relative transition-all duration-300`}
          >
            {/* Imagen como fondo circular */}
            <div
              className={`relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-cover bg-center shadow-xl transition-all duration-300
                ${isSelected ? "ring-4 ring-[var(--lila)]" : "hover:ring-2 hover:ring-[var(--violeta)]"}`}
              style={{ backgroundImage: `url(${opt.ImagenUrl})` }}
            >
              {/* Fireflies: solo cuando está seleccionada o en hover */}
              <div className={`absolute inset-0 z-10 pointer-events-none ${isSelected ? "" : "group-hover:block hidden"}`}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-80 animate-firefly"
                    style={{
                      top: `${Math.random() * 90}%`,
                      left: `${Math.random() * 90}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${3 + Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Texto explicativo */}
            <div className="mt-6 text-center max-w-[14rem] text-[var(--gris4)]">
              <p className="font-semibold text-lg leading-tight">{opt.Texto.split(",")[0]}</p>
              <p className="text-sm opacity-75 mt-1">{opt.Texto.split(",").slice(1).join(",")}</p>
            </div>
          </motion.li>
        )
      })}
    </ul>
  )
}
