"use client"

import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/utils/typing"

export default function OptionGrid({ question, selectedOption, onSelect }: PropsDynamic) {
  const validOptions = question.Opciones.filter(opt => opt.Texto?.trim())

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-2 gap-6 mt-6 max-w-[500px]">
        {validOptions.map((opt, index) => {
          const isSelected = selectedOption === opt.Letra

          return (
            <motion.div
              key={opt.Letra}
              onClick={() => onSelect(opt.Letra)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`
                relative w-[220px] h-[160px] rounded-2xl overflow-hidden cursor-pointer transition-all group
                ${isSelected
                  ? "ring-4 ring-[var(--lila)] scale-[1.02] shadow-lg"
                  : "hover:ring-2 hover:ring-[var(--violeta)]"}
              `}
              style={{
                backgroundImage: `url(${opt.ImagenUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
     
              <div className="absolute inset-0 bg-black/30 group-hover:bg-[var(--violeta)]/40 transition-colors duration-300" />

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

              <div className="relative z-10 h-full flex items-center justify-center text-white text-center px-4">
                <p className="text-lg font-semibold drop-shadow-md">{opt.Texto}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
