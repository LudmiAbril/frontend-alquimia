import React, { useState } from "react";
import Biblioteca from "./Biblioteca";
import ModalConfirmarCreacion from "./ModalConfirmarCreacion";
import Cargando from "./Cargando";
import { pasosDiseño } from "./DisenarPerfume";

interface ConfeccionProps {
  pasoActual: number;
  avanzar: () => void;
  volver: () => void;
}

const Confeccion = ({ pasoActual, avanzar, volver }: ConfeccionProps) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCharging, setOpenCharging] = useState(false);
  const [notaSeleccionada, setNotaSeleccionada] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
    const nota = e.dataTransfer.getData("text/plain");
    setNotaSeleccionada(nota);
  };

  const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault(); // Necesario para que se active onDrop
  };

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
        {/* barra pasos, hacer componenete luego */}
        <div className="flex items-center mb-10">
          <img src="/BarraSteps/icono-pocion-inicio.svg" alt="" />
          <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
          <div
            className={`rounded-full p-2 border-2 border-[var(--violeta)] ${
              pasoActual > 1 && "bg-[var(--violeta)]"
            }`}
          ></div>

          <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
          <div
            className={`rounded-full p-2 border-2 border-[var(--violeta)] ${
              pasoActual > 2 && "bg-[var(--violeta)]"
            }`}
          ></div>
          <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
          <div
            className={`rounded-full p-2 border-2 border-[var(--violeta)] ${
              pasoActual > 3 && "bg-[var(--violeta)]"
            }`}
          ></div>
          <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
          <div
            className={`rounded-full p-2 border-2 border-[var(--violeta)] ${
              pasoActual > 4 && "bg-[var(--violeta)]"
            }`}
          ></div>
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
            {/* hacer drag desde una nota de la biblioteca aca, al drop, se llena el estado fradvo con esa nota */}
            <img
              src="/frasco-diseño.svg"
              alt="frasco de tu perfume"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
            {notaSeleccionada && (
              <p className="mt-4 text-[var(--gris4)] text-lg">
                Nota agregada: <strong>{notaSeleccionada}</strong>
              </p>
            )}
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
      <div className="bg-white p-6 rounded-[10px] items-center flex flex-col items-center justify-center w-[409px] h-[179px] shadow-md">
        {/* caja */}
        <img
          src="/svgGeneral/icono-info.svg"
          alt="info"
          className="mb-[18px]"
        />
        <h3 className="mb-[10px] uppercase text-center">
          Paso {pasoActual} - {pasosDiseño[pasoActual].nombre}
        </h3>
        <p>{pasosDiseño[pasoActual].descripcion}</p>
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
