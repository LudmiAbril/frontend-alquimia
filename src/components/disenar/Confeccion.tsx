import React, { useState } from "react";
import Biblioteca from "./Biblioteca";
import ModalConfirmarCreacion from "./ModalConfirmarCreacion";
import Cargando from "./Cargando";

interface ConfeccionProps {
  pasoActual: number;
  avanzar: () => void;
  volver: () => void;
}

const Confeccion = ({ pasoActual, avanzar, volver }: ConfeccionProps) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCharging, setOpenCharging] = useState(false);

  const toggleOpenConfirmModal = () => {
    setOpenConfirmModal((prev) => !prev);
  };

  const toggleCarge = () => {
    setOpenCharging((prev) => !prev);
  };

  const confirmarCreacion = () => {
    toggleOpenConfirmModal();
    toggleCarge();
  };

  return (
    <>
      <div className="flex flex-col items-center ">
        <h1 className="fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4">
          CREANDO FRAGANCIA
        </h1>
        {/* barra pasos */}
        <div className="flex items-center mb-10">
          <img src="/BarraSteps/icono-pocion-inicio.svg" alt="" />
          <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
          <div className="rounded-full border-2 border-[var(--violeta)] p-2"></div>
          <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
          <div className="rounded-full border-2 border-[var(--violeta)] p-2"></div>
          <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
          <div className="rounded-full border-2 border-[var(--violeta)] p-2"></div>
          <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
          <div className="rounded-full border-2 border-[var(--violeta)] p-2"></div>
          <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
          <img src="/BarraSteps/icono-pocion-final.svg" alt="" />
        </div>

        {/* frasco + titulo del paso + biblioteca */}
        <div className="flex justify-center gap-[80px]">
          <div className="flex flex-col items-center gap-[50px]">
            <PasoCard
              pasoActual={pasoActual}
              avanzar={avanzar}
              volver={volver}
            />
            <img src="/frasco-diseño.svg" alt="" />
          </div>
          <Biblioteca
            pasoActual={pasoActual}
            onConfirm={toggleOpenConfirmModal}
          />
        </div>
      </div>
      {openConfirmModal && (
        <ModalConfirmarCreacion
          onClose={toggleOpenConfirmModal}
          onConfirm={confirmarCreacion}
        />
      )}
      {openCharging && <Cargando onFinish={avanzar} onClose={toggleCarge} />}
    </>
  );
};

export default Confeccion;

interface pasoCardProps {
  pasoActual: number;
  avanzar: () => void;
  volver: () => void;
}
export const PasoCard = ({ pasoActual, avanzar, volver }: pasoCardProps) => {
  return (
    <div className="flex items-center gap-6">
      {/* flecha volver */}
      <img
        src={
          pasoActual <= 1
            ? "/svgGeneral/arrow-left-inactive.svg"
            : "/svgGeneral/arrow-left-active.svg"
        }
        alt="flecha"
        className="cursor-pointer"
        onClick={() => {
          if (pasoActual > 1) volver();
        }}
      />
      <div className="bg-white p-6 rounded-[10px] items-center flex flex-col w-[409px] h-[179px] shadow-md">
        {/* caja */}
        <img src="/svgGeneral/icono-info.svg" alt="info" className="mb-[18px]" />
        <h3 className="mb-[10px]">PASO {pasoActual} - NOTA DE FONDO</h3>
        <p>Profunda, duradera... la estela que perdura.</p>
      </div>
      {/* flecha avanzar */}
      <img
        src={
          pasoActual >= 4
            ? "/svgGeneral/arrow-right-inactive.svg"
            : "/svgGeneral/arrow-right-active.svg"
        }
        alt="flecha"
        className="cursor-pointer"
        onClick={() => {
          if (pasoActual < 4) avanzar();
        }}
      />
    </div>
  );
};
