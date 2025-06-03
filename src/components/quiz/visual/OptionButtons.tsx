"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/utils/typing"
import { colorMap } from "@/components/utils/utils"





export default function OptionButtons({ question, selectedOption, onSelect }: PropsDynamic) {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8">
      {question.Opciones.map((opt) => {
        const colorStyle = colorMap[opt.Letra] || "border-purple-300 hover:bg-purple-100"

        return (
          <motion.div
            key={opt.Letra}
            onClick={() => onSelect(opt.Letra)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center cursor-pointer transition-all duration-300`}
          >
            {/* Imagen grande */}
            {opt.ImagenUrl && (
              <div className="relative w-24 h-24 mb-3 rounded-full shadow-md z-10 ring-2 ring-white">
                <Image
                  src={opt.ImagenUrl}
                  alt={opt.Texto}
                  fill
                  sizes="(max-width: 768px) 25vw, 96px"
                  className="object-cover rounded-full border-2 border-white"
                />
              </div>
            )}

            {/* Botón con color personalizado */}
            <div
              className={`px-6 py-3 rounded-full border-2 text-sm font-medium text-gray-700 text-center shadow-md transition-all duration-300 ${colorStyle} ${
                selectedOption === opt.Letra ? "shadow-lg scale-105" : ""
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
