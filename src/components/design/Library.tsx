"use client";

import React, { useState, useEffect } from "react";
import { obtenerNotasPorPaso } from "../../services/notaService";

interface LibraryProps {
  currentStep: number;
  onConfirm: () => void;
  onSelectIntensity: (intensity: { name: string, type: string }) => void;
}

const Library = ({ currentStep, onConfirm, onSelectIntensity }: LibraryProps) => {
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
          />
          <button className="bg-[var(--violeta)] px-8 rounded-[10px] text-white text-xs">
            FILTROS
          </button>
        </div>
      )}

      {/* contenedor de contenido */}
      <div className="max-h-full w-full">
        {isNoteSelectionStep ? (
          <NotesContainer step={currentStep} />
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

// Types
interface Note {
  id: number;
  name: string;
}

interface NoteFamily {
  family: string;
  notes: Note[];
}

// ContenedorNotas
export const NotesContainer = ({ step }: { step: number }) => {
  const [groupedNotes, setGroupedNotes] = useState<NoteFamily[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await obtenerNotasPorPaso(step);
        const reducedNotes = data.map((item: any) => ({
          family: item.Familia,
          notes: item.Notas?.map((n: any) => ({
            id: n.Id,
            name: n.Nombre,
          })) ?? [],
        }));

        setGroupedNotes(reducedNotes);
      } catch (error) {
        console.error("Error al obtener notas:", error);
      }
    };

    fetchNotes();
  }, [step]);

  return (
    <div className="overflow-y-scroll max-h-[31rem] mt-6 w-full flex flex-col">
      {groupedNotes.map(({ family, notes }) => (
        <div key={family} className="flex flex-col mb-[2.43rem]">
          <div className="flex items-center gap-2 mb-2 fuente-principal">
            <p className="text-[var(--gris3)] text-[20px] font-medium">{family}</p>
            <span className="text-xs bg-[var(--gris3)] rounded-full px-2 py-0.5 text-white font-bold">i</span>
          </div>

          <div className="w-100 flex flex-wrap gap-[25px]">
            {notes.map((note) => (
              <div
                key={note.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text/plain", note.name)}
                className="cursor-default bg-[#E2708A] hover:bg-[#DD4568] transition-colors duration-100 w-[80px] h-[80px] flex items-center justify-center rounded-[10px] text-white p-[16px] shadow-md shadow-gray-400 text-center text-[12px] font-semibold"
              >
                {note.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface IntensityContainerProps {
  onConfirm: () => void;
  onSelectIntensity: (intensity: { name: string; type: string }) => void;
}

export const IntensityContainer = ({
  onConfirm,
  onSelectIntensity,
}: IntensityContainerProps) => {
  const [selectedIntensity, setSelectedIntensity] = useState<string | null>(null);

  const handleSelect = (intensity: { name: string; type: string }) => {
    setSelectedIntensity(intensity.name);
    onSelectIntensity(intensity);
  };

  const intensities = [
    {
      name: "Baja",
      type: "Body Splash",
      description: "dura alrededor de 1-3 horas y tiene poca proyección",
    },
    {
      name: "Media",
      type: "Eau De Toilette",
      description: "dura alrededor de 3-5 horas y tiene buena proyección",
    },
    {
      name: "Alta",
      type: "Eau De Parfum",
      description: "dura alrededor de 5-8 horas y tiene buena proyección.",
    },
  ];

  return (
    <div className="mt-[3rem]">
      <div className="flex flex-col gap-[46px] items-center text-white">
        {intensities.map((intensity, key) => {
          const isSelected = selectedIntensity === intensity.name;
          return (
            <div
              key={key}
              className={`w-[430px] h-[103px] rounded-[10px] cursor-pointer flex flex-col items-center justify-center transition
              ${isSelected ? "bg-[var(--violeta)]" : "bg-[var(--lila)] hover:bg-[var(--violeta)]"}`}
              onClick={() => handleSelect({
                name: intensity.name,
                type: intensity.type,
              })}
            >
              <p className="fuente-principal uppercase font-bold text-[20px] mb-2">
                {intensity.name}- {intensity.type}
              </p>
              <p className="text-[14px]">{intensity.description}</p>
            </div>
          );
        })}
      </div>
      <button
        className="bg-[var(--violeta)] px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer"
        onClick={onConfirm}
      >
        confirmar
      </button>
    </div>
  );
};
