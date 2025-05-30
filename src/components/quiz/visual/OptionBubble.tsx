"use client"
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
          className={`w-24 h-24 flex items-center justify-center rounded-full text-center text-sm font-semibold cursor-pointer transition-all ${selectedOption === opt.Letra ? "bg-purple-600 text-white" : "bg-purple-300/30 text-purple-900 hover:bg-purple-400/50"}`}
        >
          {opt.Texto}
        </div>
      ))}
    </div>
  )
}