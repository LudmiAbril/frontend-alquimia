"use client";

import React, { useEffect, useRef, useState } from "react";
import Library from "./Library";
import ConfirmCreationModal from "./ConfirmCreationModal";
import LoadingModal from "./Loading";
import { createSteps } from "./CreatePerfumeSteps";
import { Note, perfumeData } from "./ResultCard";
import Image from "next/image";
import { GetFormulaResponse, SaveFormulaDTO } from "./FormulaResult";
import ClearIcon from '@mui/icons-material/Clear';
import LimitModal from "./LimitModal";
import { getFormulaById, submitFormula } from "@/services/createPerfumeService";
import { animateBottle, getColorByFamily } from "@/services/animateBottle";
import PotionParticles from "./PotionParticles";


interface CreatePerfumeProps {
  currentStep: number;
  onNext: () => void;
  onBack: () => void;
  currentPerfume: perfumeData;
  setCurrentPerfume: React.Dispatch<React.SetStateAction<perfumeData>>;
  setResultFormula: React.Dispatch<React.SetStateAction<GetFormulaResponse>>;
}

const CreatePerfume = ({ currentStep, onNext, onBack, currentPerfume, setCurrentPerfume, setResultFormula }: CreatePerfumeProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [hasReachedNoteLimit, setHasReachedNoteLimit] = useState(false);
    const svgContainerRef = useRef<HTMLDivElement>(null);
    const [showParticles, setShowParticles] = useState(false);

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();

  const { id, name, family } = JSON.parse(e.dataTransfer.getData("application/json"));
  const color = getColorByFamily(family);
  setShowParticles(true);

  setTimeout(() => setShowParticles(false), 2000);

  if (svgContainerRef.current) {
    await animateBottle(
      [
        "/animationsSVG/potion_1.svg",
        "/animationsSVG/potion_2.svg",
        "/animationsSVG/potion_3.svg",
        "/animationsSVG/potion_4.svg",
        "/animationsSVG/potion_5.svg",
        "/animationsSVG/potion_6.svg",
        "/animationsSVG/potion_7.svg",
        "/animationsSVG/potion_8.svg",
        "/animationsSVG/potion_9.svg",
        "/animationsSVG/potion_10.svg",
      ],
      color,
      svgContainerRef.current
    );
  }

  setCurrentPerfume((prev) => {
    if (!prev) return prev;
    const newNotes = { ...prev };
    const newNote = { id, name };

    if (currentStep === 1) newNotes.baseNotes = [...prev.baseNotes, newNote];
    else if (currentStep === 2) newNotes.heartNotes = [...prev.heartNotes, newNote];
    else if (currentStep === 3) newNotes.topNotes = [...prev.topNotes, newNote];

    return newNotes;
  });
};




  const handleDragOver = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

  const toggleConfirmModal = () => setShowConfirmModal((prev) => !prev);
  const toggleLimitModal = () => setHasReachedNoteLimit((prev) => !prev);
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
    const newFormulaId = await submitFormula(payload);
    if (newFormulaId) {
      getResultFormula(newFormulaId);
    }
  }

  const getResultFormula = async (id: number) => {
    const newFormula = await getFormulaById(id);
    if (newFormula) { setResultFormula(newFormula) }
  }

  function mapNotesArrayToObject(notesArray: { id: number }[]) {
    const result: Record<string, { Id: number }> = {};
    notesArray.forEach((note, idx) => {
      const key = `Note${idx + 1}`;
      result[key] = { Id: note.id };
    });
    return result;
  }

  const deleteNote = (noteId: number) => {
    setCurrentPerfume((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        baseNotes: prev.baseNotes.filter((note) => note.id !== noteId),
        heartNotes: prev.heartNotes.filter((note) => note.id !== noteId),
        topNotes: prev.topNotes.filter((note) => note.id !== noteId),
      };
    });
  };
useEffect(() => {
  const loadInitialBottle = async () => {
    if (!svgContainerRef.current) return;

    const res = await fetch("/animationsSVG/potion_1.svg");
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");
    const svg = doc.querySelector("svg");

    if (!svg) return;

    svg.setAttribute("width", "300");
    svg.setAttribute("height", "300");

    svgContainerRef.current.innerHTML = "";
    svgContainerRef.current.appendChild(svg);
  };

  loadInitialBottle();
}, []);

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
            <StepCard currentStep={currentStep} onNext={onNext} onBack={onBack} currentPerfume={currentPerfume} />
<div className="relative w-[300px] h-[300px]">
  <div
    ref={svgContainerRef}
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    className="w-full h-full"
  ></div>

  {showParticles && (
    <div className="absolute inset-0 pointer-events-none z-10">
      <PotionParticles />
    </div>
  )}
</div>

            {/* reutilizar esto */}
            {currentStep === 1 && currentPerfume.baseNotes.length > 0 && (
              <div className="flex gap-2 flex-col gap-2 items-center justify-center">
                <p className="mt-4 text-[var(--gris4)] text-lg">Notas de Fondo:</p>
                <div className="flex gap-4 flex-wrap">
                  {currentPerfume.baseNotes.map((note) => (
                    <button
                      key={note.id}
                      onClick={() => deleteNote(note.id)}
                      className="items-center px-3 py-1 rounded-[10px] bg-[var(--violeta)] hover:bg-[var(--gris3)] transition-colors duration-200 text-white"
                    >
                      <span>{note.name}</span>
                      <span
                        className="ml-2"
                      >
                        <ClearIcon sx={{ color: "white" }} />
                      </span>
                    </button>
                  ))}</div>

              </div>
            )}
            {currentStep === 2 && currentPerfume.heartNotes.length > 0 && (
              <div className="flex gap-2 flex-col gap-2 items-center justify-center">
                <p className="mt-4 text-[var(--gris4)] text-lg">Notas de Corazón:</p>
                <div className="flex gap-4 flex-wrap">
                  {currentPerfume.heartNotes.map((note) => (
                    <button
                      key={note.id}
                      onClick={() => deleteNote(note.id)}
                      className="items-center px-3 py-1 rounded-[10px] bg-[var(--violeta)] hover:bg-[var(--gris3)] transition-colors duration-200 text-white"
                    >
                      <span>{note.name}</span>
                      <span
                        className="ml-2"
                      >
                        <ClearIcon sx={{ color: "white" }} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {currentStep === 3 && currentPerfume.topNotes.length > 0 && (
              <div className="flex flex-col gap-2 items-center justify-center">
                <p className="mt-4 text-[var(--gris4)] text-lg">Notas de Salida:</p>
                <div className="flex gap-4 flex-wrap">
                  {currentPerfume.topNotes.map((note) => (
                    <button
                      key={note.id}
                      onClick={() => deleteNote(note.id)}
                      className="items-center px-3 py-1 rounded-[10px] bg-[var(--violeta)] hover:bg-[var(--gris3)] transition-colors duration-200 text-white"
                    >
                      <span>{note.name}</span>
                      <span
                        className="ml-2"
                      >
                        <ClearIcon sx={{ color: "white" }} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Library
            currentStep={currentStep}
            onConfirm={toggleConfirmModal}
            onSelectIntensity={(intensity) => setCurrentPerfume((prev) => ({ ...prev, intensity }))} currentPerfume={currentPerfume} />
        </div>
      </div>

      {showConfirmModal && (
        <ConfirmCreationModal onClose={toggleConfirmModal} onConfirm={confirmCreation} />
      )}

      {hasReachedNoteLimit && (
        <LimitModal onClose={toggleLimitModal} />
      )}

      {showLoading && <LoadingModal onFinish={onNext} onLoading={HandleSubmitFormula} onClose={toggleLoading} />}
    </>
  );
};

export default CreatePerfume;

interface StepCardProps {
  currentStep: number;
  currentPerfume: perfumeData;
  onNext: () => void;
  onBack: () => void;
}


export const StepCard = ({ currentStep, onNext, onBack, currentPerfume }: StepCardProps) => {
  const getNextArrowImage = () => {
    if (currentStep >= 4) {
      return "/svgGeneral/arrow-right-inactive.svg";
    }

    return canGoNext()
      ? "/svgGeneral/arrow-right-active.svg"
      : "/svgGeneral/arrow-right-inactive.svg";
  };


  const canGoNext = () => {
    const currentNotes =
      currentStep === 1
        ? currentPerfume.baseNotes
        : currentStep === 2
          ? currentPerfume.heartNotes
          : currentPerfume.topNotes;

    return currentNotes.length > 0;
  };


  return (

    <div className="flex items-center gap-6">
      <Image
        width={20}
        height={20}
        src={currentStep <= 1 ? "/svgGeneral/arrow-left-inactive.svg"
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
          getNextArrowImage()
        }
        alt="avanzar"
        className={`${canGoNext() ? 'cursor-pointer' : ''}`}
        onClick={() => {
          if (canGoNext()) onNext();
        }}
      />
    </div>
  );
};
