"use client"
import Image from "next/image"
import { QuestionDTO } from "@/components/utils/typing"

interface Props {
  question: QuestionDTO
  selectedOption: string
  onSelect: (option: string) => void
}

export default function OptionGrid({ question, selectedOption, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto">
      {question.Opciones.map((opt) => (
        <div
          key={opt.Letra}
          onClick={() => onSelect(opt.Letra)}
          className={`p-4 rounded-xl text-center cursor-pointer font-medium transition-all border-2 ${
            selectedOption === opt.Letra
              ? "bg-purple-600 border-purple-800 text-white"
              : "bg-purple-300/30 border-transparent hover:border-purple-500 text-purple-900"
          }`}
        >
          {opt.ImagenUrl && (
            <div className="relative w-16 h-16 mx-auto mb-2">
              <Image src={opt.ImagenUrl} alt={opt.Texto} fill className="object-contain" />
            </div>
          )}
          {opt.Texto}
        </div>
      ))}
    </div>
  )
}
