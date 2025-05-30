"use client"
import { QuestionDTO } from "@/components/utils/typing"

interface Props {
  question: QuestionDTO
  selectedOption: string
  onSelect: (option: string) => void
}

export default function OptionList({ question, selectedOption, onSelect }: Props) {
  return (
    <ul className="space-y-4 max-w-md mx-auto">
      {question.Opciones.map((opt) => (
        <li
          key={opt.Letra}
          onClick={() => onSelect(opt.Letra)}
          className={`py-3 px-6 rounded-lg cursor-pointer border-l-4 ${selectedOption === opt.Letra ? "border-purple-600 bg-purple-200/40" : "border-transparent hover:border-purple-300"}`}
        >
          {opt.Texto}
        </li>
      ))}
    </ul>
  )
}
