"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { PropsDynamic } from "@/components/Utils/typing"

export default function OptionTwo({ question, selectedOption, onSelect }: PropsDynamic) {
  const [glowIndex, setGlowIndex] = useState<string | null>(null)

  useEffect(() => {
    if (selectedOption) {
      setGlowIndex(selectedOption)
      const timeout = setTimeout(() => setGlowIndex(null), 1000)
      return () => clearTimeout(timeout)
    }
  }, [selectedOption])

  const isValidUrl = (url: string | undefined) =>
    !!url && (url.startsWith("/") || url.startsWith("http"))

  const validOptions = question.Opciones.filter(
    (opt) => opt.Letra?.trim() && opt.Texto?.trim()
  )

  return (
    <div className="flex flex-wrap justify-center items-start gap-10 mt-10 px-6 max-w-5xl mx-auto">
      {validOptions.map((opt, index) => {
        const isSelected = selectedOption === opt.Letra

        return (
          <motion.div
            key={opt.Letra}
            onClick={() => onSelect(opt.Letra)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`group relative w-[220px] flex flex-col items-center cursor-pointer transition-all duration-300 ${
              isSelected ? "scale-105" : ""
            }`}
          >
            {/* Flare circular mágico al seleccionar */}
            {isSelected && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                <div className="w-36 h-36 rounded-full bg-[var(--violeta)] opacity-30 animate-flare blur-3xl"></div>
              </div>
            )}

            {/* Fireflies mágicos en hover */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(7)].map((_, i) => (
                <span
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-[var(--lila)] rounded-full opacity-70 animate-firefly"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>

            {/* Imagen rectangular visible siempre */}
            {isValidUrl(opt.ImagenUrl) && (
              <div className="relative w-full h-[140px] mb-4 rounded-2xl overflow-hidden border-2 border-[var(--violeta)] shadow-md z-10">
                <Image
                  src={opt.ImagenUrl!}
                  alt={opt.Texto}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:brightness-105"
                />
              </div>
            )}

            {/* Texto visible siempre */}
            <div
              className={`w-full px-6 py-4 text-center rounded-full border-2 text-lg font-semibold transition-all duration-300 z-10
                ${
                  isSelected
                    ? "bg-[var(--violeta)] text-white ring-4 ring-[var(--lila)]"
                    : "bg-white text-[var(--violeta)] border-[var(--violeta)] hover:bg-[var(--lila)] hover:text-white"
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
