import React, { useState } from "react";
import ResultCard from "./ResultCard";
import ConfirmFormulaModal from "./ConfirmFormulaModal";

const FormulaResult = () => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4">
          Tu esencia ideal está lista
        </h1>
        <p>Descubrimos la fragancia que mejor te representa</p>

        {/* frasco con botón y card de resultados */}
        <div className="flex items-center justify-center gap-10 mt-10">
          <ResultCard />

          <div className="flex flex-col items-center">
            <img
              src="/frasco-color.svg"
              alt="frasco final"
              className="w-[300px]"
            />
            <button
              className="bg-[var(--violeta)] px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer"
              onClick={toggleConfirmationModal}
            >
              guardar mi fórmula
            </button>
          </div>
        </div>
      </div>

      {isConfirmationModalOpen && (
        <ConfirmFormulaModal onClose={toggleConfirmationModal} />
      )}
    </>
  );
};

export default FormulaResult;
