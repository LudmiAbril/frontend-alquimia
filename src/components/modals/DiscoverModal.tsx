"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import CloseIcon from "@mui/icons-material/Close"
import Button from "../general/Button"

export default function DiscoverModal({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] bg-[rgba(0,0,0,0.5)] flex items-center justify-center px-4">
      <div
        className={`relative w-full max-w-sm bg-[#f1eae2] rounded-xl py-[5rem] px-[3rem] shadow-lg transition-all duration-300 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
      >
        {/* Botón de cierre */}
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 200)
          }}
          className="absolute top-5 right-4 text-gray-500 hover:text-black"
        >
          <CloseIcon />
        </button>

        {/* Título principal */}
        <h2 className="text-center text-lg font-bold uppercase text-[var(--gris4)] mb-4">
          Descubrí la esencia que revela tu magia.
        </h2>

        {/* Botón para iniciar el test */}
        <Button
          label="Quiero empezar el test"
          href="/quiz"
          colorClass="w-full bg-[var(--lila)] text-black hover:bg-[#d9c7a9] min-w-[200px]"
        />

        {/* Tiempo estimado */}
        <div className="flex flex-col items-center gap-2 my-6">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>⏱</span>
            <span>2 minutos</span>
          </div>
        </div>

        {/* Separador visual */}
        <div className="flex items-center w-full mb-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400">o</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Subtítulo */}
        <h3 className="text-center text-md font-semibold text-[var(--gris4)] mb-4 uppercase">
          Crea tu propia fragancia
        </h3>

        {/* Botón para ir al diseñador */}
        <Button
          label="Crear Perfume"
          href="/createParfum"
          colorClass="w-full bg-violeta text-white hover:bg-[#7a2f96] min-w-[300px]"
        />
      </div>
    </div>
  )
}
