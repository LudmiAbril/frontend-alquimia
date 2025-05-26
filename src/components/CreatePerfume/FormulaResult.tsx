import React, { useState } from "react";

import ConfirmFormulaModal from "./ConfirmFormulaModal";
import ResultCard, { perfumeData } from "./ResultCard";
import Image from "next/image";

interface FormulaResultProps {
  resultPerfume: perfumeData
}
const FormulaResult = ({resultPerfume} :FormulaResultProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const toggleConfirmationModal = () => {
    setIsConfirmationModalOpen((prev) => !prev);
  };

   return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4">
          Tu esencia ideal está lista
        </h1>
        <p>Descubrimos la fragancia que mejor te representa</p>
        {/* frasco con boton y card de datos */}
        <div className="flex items-center justify-center gap-10 mt-10">
          <ResultCard perfume={resultPerfume} />
          {/*frasco y boton confirmar */}
          <div className="flex flex-col items-center">
            <Image
              src="/frasco-color.svg"
              alt="frasco final"
              className="w-[300px]"
              width={300}
              height={100}
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
      {isConfirmationModalOpen && <ConfirmFormulaModal />}
    </>
  );
};


export default FormulaResult;
