"use client";

import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { AuthModalWrapperProps } from "@/components/utils/typing";
import Image from "next/image";

export default function AuthModalWrapper({ children, title, onClose }: AuthModalWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[9999] flex justify-center">
      {/* Contenedor con scroll y padding vertical */}
      <div className="w-full max-w-md my-10 px-4 overflow-y-auto">
        <div
          className={`
            relative bg-[#f1eae2] p-8 rounded-xl w-full
            shadow-lg ring-1 ring-gray-300
            transform transition-all duration-300 ease-out
            ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          {/* Botón de cierre */}
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 200);
            }}
            className="absolute right-4 top-4 text-gray-600 hover:text-black"
          >
            <CloseIcon />
          </button>

          {/* Logo y título */}
          <div className="flex flex-col items-center space-y-1 mb-6">
            <div className="w-16 flex items-center justify-center">
              <Image
                src="/logo/LogotipoVioleta.svg"
                alt="Logo"
                className="w-20 h-15 object-contain"
                width={20}
                height={20}
              />
            </div>
            <h2 className="text-xl font-bold uppercase text-[var(--gris4)]">{title}</h2>
          </div>

          {/* Contenido del modal */}
          {children}
        </div>
      </div>
    </div>
  );
}
