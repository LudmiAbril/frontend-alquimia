"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/utils/typing"
import { colorMap } from "@/components/utils/utils"



export default function OptionList({ question, selectedOption, onSelect }: PropsDynamic) {
  return (
    <ul className="space-y-4 max-w-md mx-auto mt-6">
      {question.Opciones.map((opt) => {
        const colorStyles = colorMap[opt.Letra] || "border-purple-400 hover:border-purple-300 hover:bg-purple-100"
        const isSelected = selectedOption === opt.Letra

        return (
          <motion.li
            key={opt.Letra}
            onClick={() => onSelect(opt.Letra)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex items-center gap-4 py-3 px-6 rounded-lg cursor-pointer border-l-4 transition-all duration-300 ${
              isSelected
                ? "bg-gradient-to-br from-purple-600 to-fuchsia-500 border-purple-700 text-white shadow-md"
                : `bg-white text-gray-800 ${colorStyles}`
            }`}
          >
            {/* Destello mágico */}
            {isSelected && (
              <motion.div
                layoutId="sparkle"
                className="absolute -inset-0.5 rounded-lg pointer-events-none border border-white/50 animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {opt.ImagenUrl && (
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image src={opt.ImagenUrl} alt={opt.Texto} fill className="object-contain rounded" />
              </div>
            )}
            <span className="text-sm font-medium z-10">{opt.Texto}</span>
          </motion.li>
        )
      })}
    </ul>
  )
}