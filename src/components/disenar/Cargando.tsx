import React, { useEffect, useRef, useState } from "react";
interface CargandoProps {
  onFinish: () => void;
  onClose: () => void;
}
const Cargando = ({ onFinish, onClose }: CargandoProps) => {
  const [progress, setProgress] = useState(0);
  const hasFinished = useRef(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        return next <= 100 ? next : 100; // Detener en 85%
      });
    }, 30); // Velocidad de animación

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100 && !hasFinished.current) {
      hasFinished.current = true;

      // Esperamos al siguiente frame para asegurarnos que el DOM se haya actualizado
      requestAnimationFrame(() => {
        if (progressBarRef.current) {
          // Ejecutar después de renderizar 100%
          onFinish();
          onClose();
        }
      });
    }
  }, [progress, onFinish, onClose]);

  return (
    <div className="fixed inset-0 bg-[#240E25]/75 flex items-center justify-center z-50">
      <div className="relative w-[70%] max-w-2xl">
        {/* Barra de fondo */}
        <div className="h-5 bg-[#b392d0] rounded-full overflow-hidden shadow-inner">
          {/* Barra de progreso */}
          <div
            ref={progressBarRef}
            className="h-full bg-[#E6B9FC] transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Texto del porcentaje */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Cargando;
