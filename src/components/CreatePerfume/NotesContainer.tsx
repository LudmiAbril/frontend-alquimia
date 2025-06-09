"use client";

import { useEffect, useMemo, useState } from "react";
import { obtenerNotasPorPaso } from "@/services/notaService";
import { NoteFamily, perfumeData } from "../utils/typing";

interface NotesContainerProps {
    currentStep: number;
    currentPerfume: perfumeData;
    searchTerm: string;
}

export const NotesContainer = ({ currentStep, currentPerfume, searchTerm }: NotesContainerProps) => {
    const [groupedNotes, setGroupedNotes] = useState<NoteFamily[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await obtenerNotasPorPaso(currentStep);
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

    const usedNoteIds = useMemo(() => {
        return new Set([
            ...(currentPerfume?.baseNotes?.map((note) => note.id) ?? []),
            ...(currentPerfume?.heartNotes?.map((note) => note.id) ?? []),
            ...(currentPerfume?.topNotes?.map((note) => note.id) ?? []),
        ]);
    }, [currentPerfume]);

    const filteredGroupedNotes = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();

        return groupedNotes.map(({ family, notes }) => ({
            family,
            notes: notes.filter(
                (note) =>
                    !usedNoteIds.has(note.id) &&
                    note.name.toLowerCase().includes(lowerSearch)
            ),
        }));
    }, [groupedNotes, usedNoteIds, searchTerm]);

    if (!groupedNotes.length) {
        return <p>Cargando notas...</p>;
    }
    return (
        <div className="overflow-y-scroll max-h-[31rem] mt-6 w-full flex flex-col">
            {filteredGroupedNotes.map(({ family, notes }, index) => (
                <div key={`${family}-${index}`} className="flex flex-col mb-[2.43rem]">
                    <div className="flex items-center gap-2 mb-2 fuente-principal">
                        <p className="text-[var(--gris3)] text-[20px] font-medium">{family}</p>
                        <span className="text-xs bg-[var(--gris3)] rounded-full px-2 py-0.5 text-white font-bold">
                            i
                        </span>
                    </div>

                    <div className="w-100 flex flex-wrap gap-[25px]">
                        {notes.length > 0 ? (
                            notes.map((note) => (
                                <div
                                    key={note.id}
                                    draggable
                                    onDragStart={(e) =>
                                        e.dataTransfer.setData(
                                            "application/json",
                                            JSON.stringify({ id: note.id, name: note.name, family })
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
            ))}
        </div>
    );
};