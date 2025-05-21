import React from "react";

interface ModalConfirmarCreacionProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ModalConfirmarCreacion = ({ onClose, onConfirm }: ModalConfirmarCreacionProps) => {
  return (
    <div className="fixed inset-0 bg-[#240E25]/75 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--hueso)] p-6 rounded-[10px] shadow-md w-full max-w-md text-cente flex flex-col justify-center items-center">
        <img src="/icono-modal.svg" alt="icono flor" className="w-[50px] mb-2" />
        <h2 className="fuente-principal text-[20px] font-bold text-[var(--gris4)] mb-4 uppercase">Todo está en su lugar.
        </h2>
        <p className="text-[var(--gris4)] text-[14px] font-semibold">Pronunciá el último hechizo para embotellar tu creación</p>
        <div className="flex justify-center gap-4 mt-[2rem]">
          {/* retocar estilos */}
          <button
            onClick={onClose}
            className="text-[var(--violeta)] border border-[var(--violeta)] hover:text-[var(--lila)]  hover:border-[var(--lila)] px-8 py-2 rounded-[10px] text-xs uppercase cursor-pointer"
          >
            Volver
          </button>
          <button
            onClick={onConfirm}
            className="bg-[var(--violeta)] hover:bg-[var(--lila)] px-8 py-2 rounded-[10px] text-white text-xs uppercase cursor-pointer"
          >
            Formular
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmarCreacion;
