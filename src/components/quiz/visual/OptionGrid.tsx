"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { PropsDynamic } from "@/components/utils/typing"

export default function OptionGrid({ question, selectedOption, onSelect }: PropsDynamic) {
  const validOptions = question.Opciones.filter(opt => opt.Texto?.trim())

  const isValidUrl = (url: string | undefined) =>
    !!url && (url.startsWith("/") || url.startsWith("http"))

  return (
    <div className="w-full flex justify-center">
      <div className={`grid grid-cols-2 gap-6 mt-6 max-w-[500px]`}>
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
              className={`p-5 rounded-xl text-center cursor-pointer font-medium transition-all border-2 shadow-sm hover:shadow-lg w-[220px]
                ${
                  isSelected
                    ? "bg-[var(--violeta)] text-white ring-2 ring-[var(--lila)] scale-[1.02]"
                    : "bg-white text-[var(--violeta)] border-[var(--violeta)] hover:bg-[var(--lila)] hover:text-white"
                }`}
            >
              {isValidUrl(opt.ImagenUrl) && (
                <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[var(--violeta)]">
                  <Image
                    src={opt.ImagenUrl!}
                    alt={opt.Texto}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <p className="text-base font-semibold">{opt.Texto}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
