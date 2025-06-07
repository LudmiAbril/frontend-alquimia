"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/utils/typing"

export default function OptionCards({ question, selectedOption, onSelect }: PropsDynamic) {
  return (
    <div className="flex flex-wrap justify-center gap-8 px-4 py-8">
      {question.Opciones.map((option) => {
        const isSelected = selectedOption === option.Letra

        return (
          <motion.div
            key={option.Letra}
            className={`relative w-[220px] h-[320px] rounded-xl overflow-hidden cursor-pointer group border transition-all duration-300 ${
              isSelected
                ? "border-white scale-105 shadow-lg"
                : "border-gray-700 hover:border-white"
            }`}
            onClick={() => onSelect(option.Letra)}
            whileHover={{ scale: 1.05 }}
          >
            {/* Imagen con filtro oscuro */}
            <Image
              src={option.ImagenUrl}
              alt={option.Texto}
              fill
              className="object-cover grayscale group-hover:grayscale-0 brightness-[0.4] group-hover:brightness-100 transition-all duration-500"
            />

            {/* Texto sobre la imagen */}
            <div className="absolute bottom-4 w-full text-center z-10">
              <p className="text-white text-xl font-semibold uppercase tracking-wider drop-shadow-md">
                {option.Texto}
              </p>
            </div>

            {/* Sombra interna */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
          </motion.div>
        )
      })}
    </div>
  )
}
