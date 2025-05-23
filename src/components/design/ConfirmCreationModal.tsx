import React from "react";

interface ConfirmCreationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmCreationModal = ({ onClose, onConfirm }: ConfirmCreationModalProps) => {
  return (
    <div className="fixed inset-0 bg-[#240E25]/75 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--hueso)] p-6 rounded-[10px] shadow-md w-full max-w-md text-center">
        <h2 className="text-xl font-semibold mb-4">¿Confirmar creación?</h2>
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={onClose}
            className="bg-[var(--violeta)] text-white px-4 py-2 rounded hover:bg-[#7a2f96] transition"
          >
            Volver
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Formular
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCreationModal;
