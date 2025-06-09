"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../general/Button";

export default function DiscoverModal({ onClose }: { onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[rgba(0,0,0,0.5)] flex items-center justify-center px-4">
      <div
        className={`relative w-full max-w-sm bg-[#f1eae2] rounded-xl py-10 px-8 shadow-lg transition-all duration-300 ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Botón de cierre */}
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 200);
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <CloseIcon />
        </button>

        {/* Título principal */}
        <h2 className="text-center text-lg md:text-xl font-bold uppercase text-[var(--gris4)] mb-6">
          Descubrí la esencia que revela tu magia.
        </h2>

        {/* Botón para iniciar el test */}
        <button
          onClick={() => router.push("/quiz")}
          className="w-full bg-[var(--lila)] text-black font-bold text-sm uppercase py-3 rounded-lg hover:bg-[#d6c1e6] transition mb-2"
        >
          Quiero empezar el test
        </button>

        {/* Tiempo estimado */}
        <div className="flex flex-col items-center gap-2 my-4">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <span>⏱</span>
            <span>2 minutos</span>
          </div>
        </div>

        {/* Separador visual */}
        <div className="flex items-center w-full my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400">o</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Subtítulo */}
        <h3 className="text-center text-md font-semibold text-[var(--gris4)] mb-4 uppercase">
          Crea tu propia fragancia
        </h3>

        {/* Botón para ir al diseñador */}
        <button
          onClick={() => router.push("/createParfum")}
          className="w-full bg-[var(--violeta)] text-white font-bold text-sm uppercase py-3 rounded-lg hover:bg-[#7a2f96] transition"
        >
          Crear Perfume
        </button>
      </div>
    </div>
  );
}
