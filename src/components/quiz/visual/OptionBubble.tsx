"use client"
import Image from "next/image"
import { PropsDynamic } from "@/components/utils/typing"



export default function OptionBubble({ question, selectedOption, onSelect }: PropsDynamic) {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8">
      {question.Opciones.map((opt) => (
        <div
          key={opt.Letra}
          onClick={() => onSelect(opt.Letra)}
          className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-center text-sm font-semibold cursor-pointer transition-all duration-300 overflow-hidden
            ${
              selectedOption === opt.Letra
                ? "bg-purple-600 text-white scale-110 shadow-xl ring-4 ring-purple-300"
                : "bg-purple-200/30 text-gray-800 hover:bg-purple-300 hover:scale-105"
            }`}
        >
          {opt.ImagenUrl && (
            <div className="relative w-16 h-16 mb-2">
              <Image src={opt.ImagenUrl} alt={opt.Texto} fill className="object-contain rounded-full" />
            </div>
          )}
          <span className="px-2">{opt.Texto}</span>
        </div>
      ))}
    </div>
  )
}
