"use client"
import { QuestionDTO } from "@/components/utils/typing"

interface Props {
  question: QuestionDTO
  selectedOption: string
  onSelect: (option: string) => void
}

export default function OptionButtons({ question, selectedOption, onSelect }: Props) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {question.Opciones.map((opt) => (
        <button
          key={opt.Letra}
          onClick={() => onSelect(opt.Letra)}
          className={`px-6 py-3 rounded-full font-semibold transition ${selectedOption === opt.Letra ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800 hover:bg-purple-300"}`}
        >
          {opt.Texto}
        </button>
      ))}
    </div>
  )
}
