"use client"

import { Sparkles } from "lucide-react"
import { ButtonHTMLAttributes } from "react"

interface MagicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  loading?: boolean
}

export default function MagicButton({ label, loading = false, ...props }: MagicButtonProps) {
  return (
    <button
      {...props}
      className="bg-[var(--violeta)] text-white px-6 py-3 mt-2 rounded-[10px] hover:bg-[#7a2f96] transition flex items-center justify-center gap-2 font-bold text-sm uppercase disabled:opacity-50"
      disabled={loading || props.disabled}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Cargando...
        </div>
      ) : (
        <>
          <Sparkles className="h-5 w-5 " />
          {label}
        </>
      )}
    </button>
  )
}