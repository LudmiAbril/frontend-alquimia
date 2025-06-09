"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/Utils/typing"

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
  className={`relative min-w-[220px] h-[320px] rounded-xl overflow-hidden cursor-pointer group border-2 transition-all duration-300
    ${isSelected ? "border-[var(--violeta)] border-4 scale-105 shadow-lg ring-4 ring-[var(--lila)]" : "border-gray-300 hover:border-[var(--violeta)]"}`}
  onClick={() => onSelect(option.Letra)}
  whileHover={{ scale: 1.05 }}
>

  {isValidUrl(option.ImagenUrl) && (
    <Image
      src={option.ImagenUrl!}
      alt={option.Texto}
      fill
      className="object-cover brightness-90 group-hover:brightness-100 transition-all duration-500"
    />
  )}


  <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent z-20" />


  <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <span
        key={i}
        className="absolute w-1.5 h-1.5 bg-[var(--lila)] rounded-full opacity-80 animate-firefly"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
        }}
      />
    ))}
  </div>


  <div className="absolute bottom-4 w-full text-center z-40">
    <p className="text-white text-base font-bold uppercase tracking-wide drop-shadow-md px-2 leading-tight">
      {option.Texto}
    </p>
  </div>
</motion.div>

          )
        })}
      </div>
    </div>
  )
}
