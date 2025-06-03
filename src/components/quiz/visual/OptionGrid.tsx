"use client"
import Image from "next/image"
import { PropsDynamic } from "@/components/utils/typing"
import { colorMap } from "@/components/utils/utils"



export default function OptionGrid({ question, selectedOption, onSelect }: PropsDynamic) {
  return (
    <div className="grid grid-cols-2 gap-6 w-full max-w-xl mx-auto mt-6">
      {question.Opciones.map((opt) => {
        const colorStyles = colorMap[opt.Letra] || "border-purple-300 hover:border-purple-400 hover:bg-purple-100"
        const isSelected = selectedOption === opt.Letra

        return (
          <div
            key={opt.Letra}
            onClick={() => onSelect(opt.Letra)}
            className={`p-4 rounded-xl text-center cursor-pointer font-medium transition-all border-2 shadow-sm ${
              isSelected
                ? "bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white border-purple-700 shadow-md scale-[1.02]"
                : `text-gray-800  ${colorStyles}`
            }`}
          >
            {opt.ImagenUrl && (
              <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden">
                <Image src={opt.ImagenUrl} alt={opt.Texto} fill className="object-cover" />
              </div>
            )}
            <p className="text-sm">{opt.Texto}</p>
          </div>
        )
      })}
    </div>
  )
}
