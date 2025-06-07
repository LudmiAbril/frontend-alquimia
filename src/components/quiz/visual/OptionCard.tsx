"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/utils/typing"

export default function OptionCards({ question, selectedOption, onSelect }: PropsDynamic) {
  const validOptions = question.Opciones.filter(option => option.Texto?.trim())

  const isValidUrl = (url: string | undefined) =>
    !!url && (url.startsWith("/") || url.startsWith("http"))

  return (
    <div className="flex flex-wrap justify-center items-start gap-6 w-full px-4 py-8">
      <div className="flex flex-row gap-6 min-w-fit justify-start items-start">
        {validOptions.map((option) => {
          const isSelected = selectedOption === option.Letra

          return (
            <motion.div
              key={option.Letra}
              className={`relative min-w-[220px] h-[320px] rounded-xl overflow-hidden cursor-pointer group border transition-all duration-300 ${
                isSelected
                  ? "border-[var(--violeta)] scale-105 shadow-lg"
                  : "border-gray-400 hover:border-[var(--violeta)]"
              }`}
              onClick={() => onSelect(option.Letra)}
              whileHover={{ scale: 1.05 }}
            >
              {/* BRILLO VIOLETA en hover */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-br from-[var(--violeta)]/20 to-[var(--lila)]/10 blur-2xl animate-pulse rounded-xl" />
              </div>

              {/* DESTELLOS flotantes */}
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                {[...Array(6)].map((_, i) => (
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

              {/* Imagen con filtro oscuro */}
              {isValidUrl(option.ImagenUrl) && (
                <Image
                  src={option.ImagenUrl!}
                  alt={option.Texto}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 brightness-[0.4] group-hover:brightness-100 transition-all duration-500"
                />
              )}

              {/* Texto sobre la imagen */}
              <div className="absolute bottom-4 w-full text-center z-10">
                <p className="text-white text-lg font-semibold uppercase tracking-wider drop-shadow-md px-2">
                  {option.Texto}
                </p>
              </div>

              {/* Sombra interna */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
