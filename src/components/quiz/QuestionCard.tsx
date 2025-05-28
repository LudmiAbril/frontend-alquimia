import Image from "next/image"
import { OptionDTO, PropsQC } from "@/components/utils/typing"

export default function QuestionCard({ option, selected, onClick }: PropsQC) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-3xl p-4 sm:p-6 shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-2
        ${selected ? "border-purple-500 bg-purple-100/20 backdrop-blur-md" : "border-transparent hover:border-purple-300/60"}
        bg-gradient-to-b from-[#a18cd1]/40 to-[#fbc2eb]/40
      `}
    >
      <div className="flex flex-col items-center space-y-4">
        {option.ImagenBase64 && (
          <div className="relative w-28 h-28 sm:w-36 sm:h-36">
            <Image
              src={`data:image/png;base64,${option.ImagenBase64}`}
              alt={option.Texto}
              layout="fill"
              className="object-contain drop-shadow-lg"
            />
          </div>
        )}
        <p className={`text-center font-semibold text-lg sm:text-xl uppercase tracking-wide
          ${selected ? "text-purple-800" : "text-gray-800"}
        `}>
          {option.Texto}
        </p>
      </div>
    </div>
  )
}
