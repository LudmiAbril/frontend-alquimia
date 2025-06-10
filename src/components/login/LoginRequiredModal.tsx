"use client";

import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { LoginRequiredModalProps } from "../utils/typing";
import ButtonSecondary from "../general/ButtonSecondary";
import ButtonViolet from "../general/ButtonViolet";

export default function LoginRequiredModal({ onClose, onLogin }: LoginRequiredModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[9999] flex justify-center">
      <div className="w-full max-w-md my-10 px-4 overflow-y-auto">
        <div
          className={`relative bg-[#f1eae2] p-8 rounded-xl w-full shadow-lg ring-1 ring-gray-300 transform transition-all duration-300 ease-out
            ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 200);
            }}
            className="absolute right-4 top-4 text-gray-600 hover:text-black"
          >
            <CloseIcon />
          </button>

          {/* Imagen ilustrativa */}
          <div className="flex justify-center mb-4">
            <Image
              src="/mascotas/lookingQuimi.png"
              alt="Quimi mirando"
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-contain"
            />
          </div>

          {/* Título y mensaje */}
          <h2 className="text-xl font-bold text-center text-[var(--violeta)] mb-2">
            ¡Ups! 
          </h2>
          <p className="text-gray-700 text-center mb-6">
            Tenés que iniciar sesión o registrarte para crear tu perfume personalizado.
          </p>

          {/* Botones */}
          <div className="flex justify-center gap-4">
            <ButtonSecondary
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 200);
              }}

            >
              Cerrar
            </ButtonSecondary>
            <ButtonViolet
              onClick={() => {
                setIsVisible(false);
                setTimeout(onLogin, 200);
              }}

            >
              Iniciar sesión
            </ButtonViolet>
          </div>
        </div>
      </div>
    </div>
  );
}
