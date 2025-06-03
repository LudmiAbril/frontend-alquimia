"use client";

import React, { useEffect, useState } from "react";
import Library from "./Library";
import ConfirmCreationModal from "./ConfirmCreationModal";
import LoadingModal from "./Loading";
import { createSteps } from "./CreatePerfumeSteps";
import { perfumeData } from "./ResultCard";
import Image from "next/image";
import { SaveFormulaDTO } from "./FormulaResult";
import { submitFormula } from "@/services/createPerfumeService";

interface CreatePerfumeProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  currentPerfume: perfumeData;
  setCurrentPerfume: React.Dispatch<React.SetStateAction<perfumeData>>;
}

const CreatePerfume = ({ currentStep, onNext, onBack, currentPerfume, setCurrentPerfume }: CreatePerfumeProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLImageElement>) => {
    e.preventDefault();
    const note = e.dataTransfer.getData("text/plain");
    const noteparsed = JSON.parse(note);
    setCurrentPerfume((prev) => {
      if (!prev) return prev;

      const newNotes = { ...prev };

      if (currentStep === 1) {
        newNotes.baseNotes = [...prev.baseNotes, noteparsed];
      } else if (currentStep === 2) {
        newNotes.heartNotes = [...prev.heartNotes, noteparsed];
      } else if (currentStep === 3) {
        newNotes.topNotes = [...prev.topNotes, noteparsed];
      }

      return newNotes;
    });
  };
  const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

  const toggleConfirmModal = () => setShowConfirmModal((prev) => !prev);
  const toggleLoading = () => setShowLoading((prev) => !prev);

  const confirmCreation = () => {
    toggleConfirmModal();
    toggleLoading();
  };


  const HandleSubmitFormula = async () => {
    const topNotesObj = mapNotesArrayToObject(currentPerfume.topNotes);
    const heartNotesObj = mapNotesArrayToObject(currentPerfume.heartNotes);
    const baseNotesObj = mapNotesArrayToObject(currentPerfume.baseNotes);
    const userId = Number(localStorage.getItem("userId"));
    const payload: SaveFormulaDTO = {
      IntensityId: currentPerfume.intensity.Id,
      CreatorId: userId,
      TopNotes: topNotesObj,
      HeartNotes: heartNotesObj,
      BaseNotes: baseNotesObj,
    }
    await submitFormula(payload);
  }

  function mapNotesArrayToObject(notesArray: { id: number }[]) {
    const result: Record<string, { Id: number }> = {};
    notesArray.forEach((note, idx) => {
      const key = `Note${idx + 1}`;
      result[key] = { Id: note.id };
    });
    return result;
  }


  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4">
          CREANDO FRAGANCIA
        </h1>

        {/* Barra de progreso */}
        <div className="flex items-center mb-10">
          <Image src="/BarraSteps/icono-pocion-inicio.svg" alt="paso" width={40} height={40} />
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
          <Image src="/BarraSteps/icono-pocion-final.svg" alt="" width={40} height={40} />
        </div>

        {/* Frasco y biblioteca */}
        <div className="flex justify-center gap-[80px]">
          <div className="flex flex-col items-center gap-[50px]">
            <StepCard currentStep={currentStep} onNext={onNext} onBack={onBack} />

            <Image
              src="/frasco-diseño.svg"
              alt="frasco de tu perfume"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              width={300}
              height={100}
            />

            {currentStep === 1 && currentPerfume.baseNotes.length > 0 && (
              <p className="mt-4 text-[var(--gris4)] text-lg">
                Notas de fondo:   <strong>
                  {currentPerfume.baseNotes.map((note) => note.name).join(", ")}
                </strong>
              </p>
            )}
            {currentStep === 2 && currentPerfume.heartNotes.length > 0 && (
              <p className="mt-4 text-[var(--gris4)] text-lg">
                Notas de corazón: <strong>{currentPerfume.heartNotes.map((note) => note.name).join(", ")}</strong>
              </p>
            )}
            {currentStep === 3 && currentPerfume.topNotes.length > 0 && (
              <p className="mt-4 text-[var(--gris4)] text-lg">
                Notas de salida: <strong>{currentPerfume.topNotes.map((note) => note.name).join(", ")}</strong>
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

      {showLoading && <LoadingModal onFinish={onNext} onLoading={HandleSubmitFormula} onClose={toggleLoading} />}
    </>
  );
};

export default CreatePerfume;

interface StepCardProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
}

export const StepCard = ({ currentStep, onNext, onBack }: StepCardProps) => {
  return (
    <div className="flex items-center gap-6">
      <Image
        width={20}
        height={20}
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
        <Image src="/svgGeneral/icono-info.svg" alt="info" className="mb-[18px]" width={20} height={20} />
        <h3 className="mb-[10px] uppercase text-center">
          Paso {currentStep} - {createSteps[currentStep].nombre}
        </h3>
        <p>{createSteps[currentStep].descripcion}</p>
      </div>
      <Image
        width={20} height={20}
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
