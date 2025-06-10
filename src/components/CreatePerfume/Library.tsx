"use client";

import React, { useState } from "react";
import { IntensityContainer } from "./IntensityContainer";
import { NotesContainer } from "./NotesContainer";
import SearchBar from "./SearchBar";
import { useCreatePerfume } from "@/context/CreatePerfumeContext";
import { Intensity } from "../utils/typing";

interface LibraryProps {
  onConfirm: () => void;
  onSelectIntensity: (intensity: Intensity) => void;
}

const Library = ({ onConfirm, onSelectIntensity }: LibraryProps) => {
  const {
    currentStep,
    currentPerfume,
  } = useCreatePerfume();

  const [searchTerm, setSearchTerm] = useState("");
  const isNoteSelectionStep = currentStep >= 1 && currentStep <= 3;
  const title = isNoteSelectionStep ? "Biblioteca de notas" : "Intensidad";
  const subtitle = isNoteSelectionStep
    ? "Arrastrá una nota de fondo al frasco para dar el primer soplo de tu fragancia."
    : "Elige un tipo de intensidad para tu perfume.";


  return (
    <div className="w-[38rem] h-[44rem] bg-white flex flex-col items-center p-[2.31rem] rounded-[10px] shadow-md text-center mb-10">
      <p className="fuente-principal uppercase text-[20px] text-[var(--gris3)] mb-4 font-extrabold">
        {title}
      </p>
      <p className="italic mb-4 w-[527px] text-[var(--gris4)] text-[14px]">
        {subtitle}
      </p>
      {isNoteSelectionStep && (
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}
      <div className="max-h-full w-full">
        {isNoteSelectionStep ? (
          <NotesContainer searchTerm={searchTerm} />
        ) : (
          <IntensityContainer
            onConfirm={onConfirm}
            onSelectIntensity={onSelectIntensity}
          />
        )}
      </div>
    </div>
  );
};

export default Library;