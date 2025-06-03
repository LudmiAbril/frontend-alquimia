"use client"

import Image from "next/image"
import { PropsDynamic } from "@/components/utils/typing"
import { useEffect, useState } from "react"

export default function OptionBubble({ question, selectedOption, onSelect }: PropsDynamic) {
  const [internalSelected, setInternalSelected] = useState(selectedOption)

  useEffect(() => {
    setInternalSelected(selectedOption)
  }, [selectedOption])

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8">
      {question.Opciones.map((opt) => {
        const isSelected = internalSelected === opt.Letra

        return (
          <button
            key={opt.Letra}
            type="button"
            onClick={() => {
              setInternalSelected(opt.Letra)
              onSelect(opt.Letra)
            }}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-center text-sm font-semibold cursor-pointer transition-all duration-300 overflow-hidden
              ${
                isSelected
                  ? "bg-[var(--violeta)] text-white scale-110 shadow-xl ring-4 ring-[var(--violeta-claro)]"
                  : "bg-purple-200/30 text-gray-800 hover:bg-purple-300 hover:scale-105"
              }`}
          >
            {opt.ImagenUrl && (
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src={opt.ImagenUrl}
                  alt={opt.Texto}
                  fill
                  className="object-contain rounded-full"
                />
              </div>
            )}
            <span className="px-2">{opt.Texto}</span>
          </button>
        )
      })}
    </div>
  )
}
