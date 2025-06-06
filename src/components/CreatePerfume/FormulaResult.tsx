"use client"

import React, { useState } from "react";
import ConfirmFormulaModal from "./ConfirmFormulaModal";
import ResultCard from "./ResultCard";
import Image from "next/image";
import { Intensity } from "./Library";
import AnimatePotion from "./AnimatePotion";

interface FormulaResultProps {
  resultPerfume: GetFormulaResponse
}
const FormulaResult = ({ resultPerfume }: FormulaResultProps) => {
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
            <AnimatePotion
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

export interface SaveFormulaDTO {
  IntensityId: number;
  CreatorId: number;
  TopNotes: NotesGroupDTO;
  HeartNotes: NotesGroupDTO;
  BaseNotes: NotesGroupDTO;
}

export interface GetFormulaResponse {
  Id: number;
  IdCreador: number;
  ConcentracionAgua: number;
  ConcentracionAlcohol: number;
  ConcentracionEsencia: number;
  Intensity: Intensity;
  NotasCorazonIds: GetNotesGroupDTO;
  NotasFondoIds: GetNotesGroupDTO;
  NotasSalidaIds: GetNotesGroupDTO;
}

export interface NoteDTO {
  Id: number;
}

export interface NotesGroupDTO {
  [key: string]: { Id: number };
}

export interface GetNotesGroupDTO {
  [key: string]: GetNoteDTO | null;
}

export interface GetNoteDTO {
  Description: string;
  Duration: string;
  Family: string;
  Name: string;
  Sector: string;
}