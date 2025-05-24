import React, { useState } from "react";
import Library from "./Library";
import ConfirmCreationModal from "./ConfirmCreationModal";
import LoadingModal from "./Loading";
import { designSteps } from "./DesignSteps";
import { perfume } from "./ResultCard";

interface CreationStepProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  currentPerfume: perfume;
  setCurrentPerfume: React.Dispatch<React.SetStateAction<perfume>>;
}


const CreationStep = ({ currentStep, onNext, onBack, currentPerfume, setCurrentPerfume }: CreationStepProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);


  const handleDrop = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
    const nota = e.dataTransfer.getData("text/plain");

    setCurrentPerfume((prev) => {
      if (!prev) return prev;

      const nuevaNotas = { ...prev };

      if (currentStep === 1) {
        nuevaNotas.notasBase = [...prev.notasBase, nota];
      } else if (currentStep === 2) {
        nuevaNotas.notasCorazon = [...prev.notasCorazon, nota];
      } else if (currentStep === 3) {
        nuevaNotas.notasSalida = [...prev.notasSalida, nota];
      }

      return nuevaNotas;
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

  const toggleConfirmModal = () => setShowConfirmModal((prev) => !prev);
  const toggleLoading = () => setShowLoading((prev) => !prev);

  const confirmCreation = () => {
    toggleConfirmModal();
    toggleLoading();
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4">
          CREANDO FRAGANCIA
        </h1>

        {/* Barra de progreso */}
        <div className="flex items-center mb-10">
          <img src="/BarraSteps/icono-pocion-inicio.svg" alt="" />
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
              <div
                className={`rounded-full p-2 border-2 border-[var(--violeta)] ${currentStep > step && "bg-[var(--violeta)]"
                  }`}
              ></div>
            </React.Fragment>
          ))}
          <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
          <img src="/BarraSteps/icono-pocion-final.svg" alt="" />
        </div>

        {/* Frasco y biblioteca */}
        <div className="flex justify-center gap-[80px]">
          <div className="flex flex-col items-center gap-[50px]">
            <StepCard currentStep={currentStep} onNext={onNext} onBack={onBack} />

            <img
              src="/frasco-diseño.svg"
              alt="frasco de tu perfume"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />

            {currentStep === 1 && currentPerfume.notasBase.length > 0 && (
              <p className="mt-4 text-[var(--gris4)] text-lg">
                Notas de fondo: <strong>{currentPerfume.notasBase.join(", ")}</strong>
              </p>
            )}
            {currentStep === 2 && currentPerfume.notasCorazon.length > 0 && (
              <p className="mt-4 text-[var(--gris4)] text-lg">
                Notas de corazón: <strong>{currentPerfume.notasCorazon.join(", ")}</strong>
              </p>
            )}
            {currentStep === 3 && currentPerfume.notasSalida.length > 0 && (
              <p className="mt-4 text-[var(--gris4)] text-lg">
                Notas de salida: <strong>{currentPerfume.notasSalida.join(", ")}</strong>
              </p>
            )}
          </div>

          <Library
            currentStep={currentStep}
            onConfirm={toggleConfirmModal}
            onSelectIntensity={(intensity) =>
              setCurrentPerfume((prev) => ({ ...prev, intensity }))
            }
          />
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmCreationModal onClose={toggleConfirmModal} onConfirm={confirmCreation} />
      )}

      {showLoading && <LoadingModal onFinish={onNext} onClose={toggleLoading} />}
    </>
  );
};

export default CreationStep;

interface StepCardProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
}

export const StepCard = ({ currentStep, onNext, onBack }: StepCardProps) => {
  return (
    <div className="flex items-center gap-6">
      <img
        src={
          currentStep <= 1
            ? "/svgGeneral/arrow-left-inactive.svg"
            : "/svgGeneral/arrow-left-active.svg"
        }
        alt="volver"
        className="cursor-pointer"
        onClick={() => {
          if (currentStep > 1) onBack();
        }}
      />
      <div className="bg-white p-6 rounded-[10px] items-center flex flex-col justify-center w-[409px] h-[179px] shadow-md">
        <img src="/svgGeneral/icono-info.svg" alt="info" className="mb-[18px]" />
        <h3 className="mb-[10px] uppercase text-center">
          Paso {currentStep} - {designSteps[currentStep].nombre}
        </h3>
        <p>{designSteps[currentStep].descripcion}</p>
      </div>
      <img
        src={
          currentStep >= 4
            ? "/svgGeneral/arrow-right-inactive.svg"
            : "/svgGeneral/arrow-right-active.svg"
        }
        alt="avanzar"
        className="cursor-pointer"
        onClick={() => {
          if (currentStep < 4) onNext();
        }}
      />
    </div>
  );
};
