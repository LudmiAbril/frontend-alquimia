"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/utils/typing"
import { colorMap } from "@/components/utils/utils"
import { useEffect, useState } from "react"

export default function OptionButtons({ question, selectedOption, onSelect }: PropsDynamic) {
  const [glowIndex, setGlowIndex] = useState<string | null>(null)

  useEffect(() => {
    if (selectedOption) {
      setGlowIndex(selectedOption)
      const timeout = setTimeout(() => setGlowIndex(null), 700)
      return () => clearTimeout(timeout)
    }
  }, [selectedOption])

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8">
      {question.Opciones.map((opt) => {
        const isSelected = selectedOption === opt.Letra
        const colorStyle = colorMap[opt.Letra] || "border-purple-300 hover:bg-purple-100"

        return (
          <motion.div
            key={opt.Letra}
            onClick={() => onSelect(opt.Letra)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 ${isSelected ? "scale-105" : ""}`}
          >
            {/* Imagen en círculo flotando */}
            {opt.ImagenUrl && (
              <div className="relative w-24 h-24 mb-[-1.5rem] z-10">
                <Image
                  src={opt.ImagenUrl}
                  alt={opt.Texto}
                  fill
                  className={`object-cover rounded-full border-4 border-white shadow-md ${
                    glowIndex === opt.Letra ? "animate-glow" : ""
                  }`}
                />
              </div>
            )}

            {/* Botón con texto */}
            <div
              className={`mt-4 px-6 py-3 rounded-full border-2 text-sm font-medium text-center shadow-md transition-all duration-300 ${colorStyle} ${
                isSelected
                  ? "bg-[var(--violeta)] text-white ring-4 ring-[var(--violeta-claro)]"
                  : "bg-white text-gray-700"
              }`}
            >
              {opt.Texto}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
