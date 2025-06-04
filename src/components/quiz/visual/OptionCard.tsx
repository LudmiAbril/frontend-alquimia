"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { PropsDynamic } from "@/components/utils/typing"
import { colorMap } from "@/components/utils/utils"



export default function OptionCard({ question, selectedOption, onSelect }: PropsDynamic) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = question.Opciones.length

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }

  const currentOption = question.Opciones[currentIndex]
  const colorStyles = colorMap[currentOption.Letra] || "border-purple-300 hover:border-purple-400 hover:bg-purple-100"
  const isSelected = selectedOption === currentOption.Letra

  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentOption.Letra}
          initial={{ opacity: 0, rotate: -5, scale: 0.95 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 5, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          onClick={() => onSelect(currentOption.Letra)}
          className={`relative rounded-xl shadow-lg p-6 cursor-pointer w-[280px] h-[380px] flex flex-col items-center justify-between border-4 transition-all duration-300 ${
            isSelected
              ? "bg-gradient-to-br from-purple-600 to-fuchsia-500 border-purple-700 text-white shadow-md scale-[1.02]"
              : `bg-white text-gray-800 ${colorStyles}`
          }`}
        >
          <div className="relative w-full h-[300px] rounded-md overflow-hidden mb-4">
            <Image
              src={currentOption.ImagenUrl}
              alt={currentOption.Texto}
              fill
              sizes="(max-width: 768px) 90vw, 300px"
              className="object-cover rounded-md"
            />
          </div>
          <p className="text-center text-lg font-semibold">{currentOption.Texto}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-4">
        <button
          onClick={handlePrev}
          aria-label="Anterior"
          className="bg-purple-100 text-purple-700 rounded-full w-10 h-10 flex items-center justify-center hover:bg-purple-300 shadow-sm transition-transform hover:scale-105"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          aria-label="Siguiente"
          className="bg-purple-100 text-purple-700 rounded-full w-10 h-10 flex items-center justify-center hover:bg-purple-300"
        >
          ›
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {currentIndex + 1} / {total}
      </p>
    </div>
  )
}
