"use client"
import Image from "next/image"
import { QuestionDTO } from "@/components/utils/typing"

interface Props {
  question: QuestionDTO
  selectedOption: string
  onSelect: (option: string) => void
}

export default function OptionCard({ question, selectedOption, onSelect }: Props) {
  return (
    <div className="grid gap-6">
      {question.Opciones.map((opt) => (
        <div
          key={opt.Letra}
          onClick={() => onSelect(opt.Letra)}
          className={`p-6 rounded-2xl shadow-lg cursor-pointer transition transform hover:scale-105 border-4 ${selectedOption === opt.Letra ? "border-purple-600 bg-purple-100/30" : "border-transparent"}`}
        >
          {opt.ImagenBase64 && (
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={`data:image/png;base64,${opt.ImagenBase64}`}
                alt={opt.Texto}
                fill
                className="object-contain"
              />
            </div>
          )}
          <p className="text-center text-lg font-semibold">{opt.Texto}</p>
        </div>
      ))}
    </div>
  )
}