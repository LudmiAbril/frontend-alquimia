"use client"
import { ButtonProps } from "../utils/typing"

export default function ButtonSecondary({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="border-2 border-[#9444B6] text-[#9444B6] font-bold text-sm uppercase px-10 py-3 rounded-[10px] transition  hover:bg-[#d1a8e5] hover:text-white"
    >
      {label}
    </button>
  )
}
