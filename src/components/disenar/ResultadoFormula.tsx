import React, { useState } from "react";
import CardResultados from "./CardResultados";
import ModalConfirmarFormula from "./ModalConfirmarFormula";

const ResultadoFormula = () => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
  const toggleConfirmModal = () => {
    setOpenConfirmationModal((prev) => !prev)
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4">
          Tu esencia ideal está lista
        </h1>
        <p>Descubrimos la fragancia que mejor te representa</p>
        {/* frasco con boton y card de datos */}
        <div className="flex items-center justify-center gap-10 mt-10">
          <CardResultados />
          {/*frasco y boton confirmar */}
          <div className="flex flex-col items-center">
            <img
              src="/frasco-color.svg"
              alt="frasco final"
              className="w-[300px]"
            />
            <button
              className="bg-[var(--violeta)] px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer"
              onClick={toggleConfirmModal}
            >
              guardar mi fórmula
            </button>
          </div>
        </div>
      </div>
      {openConfirmationModal && <ModalConfirmarFormula onClose={toggleConfirmModal} />}
    </>
  );
};

export default ResultadoFormula;
