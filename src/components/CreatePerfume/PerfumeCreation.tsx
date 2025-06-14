"use client";

import React, { useEffect, useRef, useState } from "react";
import Library from "./Library";
import ConfirmCreationModal from "./ConfirmCreationModal";
import LoadingModal from "./Loading";
import Image from "next/image";
import LimitModal from "./LimitModal";
import { getFormulaById, submitFormula } from "@/services/createPerfumeService";
import { animateBottle, getColorByFamily } from "@/services/animateBottle";
import PotionParticles from "./PotionParticles";
import AddedNotesSection from "./AddedNotesSection";
import { StepCard } from "./StepCard";
import { mapNotesArrayToObject } from "../utils/utils";
import { SaveFormulaDTO } from "../utils/typing";
import { useCreatePerfumeStore } from "@/store/CreatePerfumeStore";


interface CreatePerfumeProps {
  onNext: () => void;
  onBack: () => void;
}

const CreatePerfume = ({ onNext, onBack }: CreatePerfumeProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [hasReachedNoteLimit, setHasReachedNoteLimit] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [showParticles, setShowParticles] = useState(false);

  const {
    currentStep,
    currentPerfume,
    setCurrentPerfume,
    setResultFormula,
  } = useCreatePerfumeStore();

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { id, name, family } = JSON.parse(e.dataTransfer.getData("application/json"));

    if (!currentPerfume) return;

    const currentNotes =
      currentStep === 1
        ? currentPerfume.baseNotes
        : currentStep === 2
          ? currentPerfume.heartNotes
          : currentPerfume.topNotes;

    const isDuplicate = currentNotes.some((n) => n.id === id);
    const hasReachedLimit = currentNotes.length >= 4;

    if (hasReachedLimit) setHasReachedNoteLimit(true);
    if (isDuplicate || hasReachedLimit) return;

    const updatedNotes = [...currentNotes, { id, name }];
    const updatedPerfume = {
      ...currentPerfume,
      baseNotes: currentStep === 1 ? updatedNotes : currentPerfume.baseNotes,
      heartNotes: currentStep === 2 ? updatedNotes : currentPerfume.heartNotes,
      topNotes: currentStep === 3 ? updatedNotes : currentPerfume.topNotes,
    };

    setCurrentPerfume(updatedPerfume);

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

  const deleteNote = (noteId: number) => {
    setCurrentPerfume({
      ...currentPerfume,
      baseNotes: currentPerfume.baseNotes.filter(note => note.id !== noteId),
      heartNotes: currentPerfume.heartNotes.filter(note => note.id !== noteId),
      topNotes: currentPerfume.topNotes.filter(note => note.id !== noteId),
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
        {/** STEPBAR, COMPONETIZAR Y REUTILIZAR EN DISEÑO ETIQUETA */}
        <div className="flex items-center mb-10">
          <Image src="/barraSteps/icono-pocion-inicio.svg" alt="paso" width={40} height={40} />
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
          <Image src="/barraSteps/icono-pocion-final.svg" alt="" width={40} height={40} />
        </div>
        <div className="flex justify-center gap-[80px]">
          <div className="flex flex-col items-center gap-[50px]">
            <StepCard onNext={onNext} onBack={onBack} />
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
            {currentStep === 1 && (
              <AddedNotesSection
                title="Notas de Fondo:"
                notes={currentPerfume.baseNotes}
                onDelete={deleteNote}
              />
            )}
            {currentStep === 2 && (
              <AddedNotesSection
                title="Notas de Corazón:"
                notes={currentPerfume.heartNotes}
                onDelete={deleteNote}
              />
            )}
            {currentStep === 3 && (
              <AddedNotesSection
                title="Notas de Salida:"
                notes={currentPerfume.topNotes}
                onDelete={deleteNote}
              />
            )}
          </div>
          <Library
            onConfirm={toggleConfirmModal}
            onSelectIntensity={(intensity) =>
              setCurrentPerfume({
                ...currentPerfume,
                intensity,
              })
            } />
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
