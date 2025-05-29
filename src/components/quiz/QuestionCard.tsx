import Image from "next/image"
import { OptionDTO, PropsQC } from "@/components/utils/typing"

export default function QuestionCard({ option, selected, onClick }: PropsQC) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-[2rem] p-6 sm:p-10 shadow-2xl transition-all duration-300 transform hover:scale-[1.04] border-4
        ${selected ? "border-purple-500 bg-purple-100/30 backdrop-blur-md" : "border-transparent hover:border-purple-300/40"}
        bg-gradient-to-br from-[#c3aed6] to-[#f3d1f4] relative max-w-sm mx-auto
      `}
    >
      <div className="flex flex-col items-center justify-center space-y-6">
        {option.ImagenBase64 && (
          <div className="relative w-36 h-36 sm:w-48 sm:h-48">
            <Image
              src={`data:image/png;base64,${option.ImagenBase64}`}
              alt={option.Texto}
              layout="fill"
              className="object-contain drop-shadow-xl"
            />
          </div>
        )}
        <p className={`text-center font-bold text-xl sm:text-2xl uppercase tracking-wide leading-tight
          ${selected ? "text-purple-800" : "text-gray-800"}
        `}>
          {option.Texto}
        </p>
      </div>
    </div>
  )
}
