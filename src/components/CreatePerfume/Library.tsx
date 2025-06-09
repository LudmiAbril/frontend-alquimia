"use client";

import React, { useState, useEffect } from "react";
import { obtenerNotasPorPaso } from "../../services/notaService";
import { getIntensities } from "@/services/createPerfumeService";
import { perfumeData } from "./ResultCard";

// ---------------------- INTERFACES ----------------------
interface LibraryProps {
  currentStep: number;
  onConfirm: () => void;
  onSelectIntensity: (intensity: Intensity) => void;
  currentPerfume: perfumeData;
}

interface Note {
  id: number;
  name: string;
}

interface NoteFamily {
  family: string;
  notes: Note[];
}

// interface NoteResponse {
//   Id: number;
//   Name: string;
// }



export interface Intensity {
  Id: number;
  Name: string;
  Description: string;
  Category: string;
}

interface IntensityContainerProps {
  onConfirm: () => void;
  onSelectIntensity: (intensity: Intensity) => void;
}

// ---------------------- COMPONENTE PRINCIPAL ----------------------
const Library = ({ currentStep, onConfirm, onSelectIntensity, currentPerfume }: LibraryProps) => {
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

      {/* buscador */}
      {isNoteSelectionStep && (
        <div className="flex w-full gap-2">
          <input
            type="text"
            className="border border-black rounded-[10px] w-full p-1"
            placeholder="Buscar nota..."
          />
          <button className="bg-[var(--violeta)] px-8 rounded-[10px] text-white text-xs">
            FILTROS
          </button>
        </div>
      )}

      {/* contenedor de contenido */}
      <div className="max-h-full w-full">
        {isNoteSelectionStep ? (
          <NotesContainer currentStep={currentStep} currentPerfume={currentPerfume} />
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


interface NotesContainerProps {
  currentStep: number;
  currentPerfume: perfumeData;
}
// ---------------------- NOTAS ----------------------
export const NotesContainer = ({ currentStep, currentPerfume }: NotesContainerProps) => {
  const [groupedNotes, setGroupedNotes] = useState<NoteFamily[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await obtenerNotasPorPaso(currentStep);
        console.log("Data desde la API:", data);
        const reducedNotes = data.map((grupo: { Family: any; Notes: any[]; }) => ({
          family: grupo.Family,
          notes: grupo.Notes?.map((n) => ({
            id: n.Id,
            name: n.Name,
          })) ?? [],
        }));

        setGroupedNotes(reducedNotes);
      } catch (error) {
        console.error("Error al obtener notas:", error);
      }
    };

    fetchNotes();
  }, [currentStep]);

  const usedNoteIds = new Set([
    ...currentPerfume?.baseNotes.map((note) => note.id) ?? [],
    ...currentPerfume?.heartNotes.map((note) => note.id) ?? [],
    ...currentPerfume?.topNotes.map((note) => note.id) ?? [],
  ]);

  return (
    <div className="overflow-y-scroll max-h-[31rem] mt-6 w-full flex flex-col">
      {groupedNotes.length > 0 ? (
        groupedNotes.map(({ family, notes }, index) => {
          const filteredNotes = notes.filter((note) => !usedNoteIds.has(note.id));
          return (
            <div key={`${family}-${index}`} className="flex flex-col mb-[2.43rem]">
              <div className="flex items-center gap-2 mb-2 fuente-principal">
                <p className="text-[var(--gris3)] text-[20px] font-medium">
                  {family}
                </p>
                <span className="text-xs bg-[var(--gris3)] rounded-full px-2 py-0.5 text-white font-bold">
                  i
                </span>
              </div>

      <div className="w-100 flex flex-wrap gap-[25px]">
  {filteredNotes.length > 0 ? (
    filteredNotes.map((note) => (
      <div
        key={note.id}
        draggable
        onDragStart={(e) =>
          e.dataTransfer.setData(
            "application/json",
            JSON.stringify({
              id: note.id,
              name: note.name,
              family: family, 
            })
          )
        }
        className="cursor-default bg-[#E2708A] hover:bg-[#DD4568] transition-colors duration-100 w-[80px] h-[80px] flex items-center justify-center rounded-[10px] text-white p-[16px] shadow-md shadow-gray-400 text-center text-[12px] font-semibold"
      >
        {note.name}
      </div>
    ))
  ) : (
    <p>No hay notas para mostrar.</p>
  )}
</div>

            </div>
          );
        })
      ) : (
        <p>Cargando notas...</p>
      )}
    </div>
  );
};


// ---------------------- INTENSIDAD ----------------------
export const IntensityContainer = ({
  onConfirm,
  onSelectIntensity,
}: IntensityContainerProps) => {
  const [selectedIntensity, setSelectedIntensity] = useState<string | null>(
    null
  );
  const [intensities, setIntensities] = useState<Intensity[]>([]);

  const handleSelect = (intensity: Intensity) => {
    setSelectedIntensity(intensity.Name);
    onSelectIntensity(intensity);
  };

  useEffect(() => {
    const fetchIntensities = async () => {
      const intensities = await getIntensities();
      console.log(intensities)
      setIntensities(intensities);
    };

    fetchIntensities();
  }, []);

  return (
    <div className="mt-[3rem]">
      <div className="flex flex-col gap-[46px] items-center text-white">
        {intensities.map((intensity, key) => {
          const isSelected = selectedIntensity === intensity.Name;
          return (
            <div
              key={key}
              className={`w-[430px] h-[103px] rounded-[10px] cursor-pointer flex flex-col items-center justify-center transition
              ${isSelected
                  ? "bg-[var(--violeta)]"
                  : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
                }`}
              onClick={() => handleSelect(intensity)}
            >
              <p className="fuente-principal uppercase font-bold text-[20px] mb-2">
                {intensity.Name} - {intensity.Category}
              </p>
              <p className="text-[14px]">{intensity.Description}</p>
            </div>
          );
        })}
      </div>
      <button
        disabled={!selectedIntensity}
        className={`px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase transition-colors duration-200 ${selectedIntensity
            ? "bg-[var(--violeta)] cursor-pointer"
            : "bg-gray-400"
          }`}
        onClick={selectedIntensity ? onConfirm : undefined}
      >
        confirmar
      </button>

    </div>
  );
};
