"use client"
import Image from "next/image"
import { QuestionDTO } from "@/components/utils/typing"

interface Props {
  question: QuestionDTO
  selectedOption: string
  onSelect: (option: string) => void
}

export default function OptionBubble({ question, selectedOption, onSelect }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {question.Opciones.map((opt) => (
        <div
          key={opt.Letra}
          onClick={() => onSelect(opt.Letra)}
          className={`w-24 h-24 rounded-full flex flex-col items-center justify-center text-center text-xs font-semibold cursor-pointer transition-all overflow-hidden ${
            selectedOption === opt.Letra
              ? "bg-purple-600 text-white"
              : "bg-purple-300/30 text-purple-900 hover:bg-purple-400/50"
          }`}
        >
          {opt.ImagenUrl && (
            <div className="relative w-10 h-10 mb-1">
              <Image src={opt.ImagenUrl} alt={opt.Texto} fill className="object-contain rounded-full" />
            </div>
          )}
          {opt.Texto}
        </div>
      ))}
    </div>
  )
}
