"use client";

import { useEffect, useMemo, useState } from "react";
import { getFamilyInfo, getNoteInfo, obtenerNotasPorPaso } from "@/services/notaService";
import { FamilyInfo, NoteFamily } from "../utils/typing";
import { familyColors } from "@/services/animateBottle";
import Image from "next/image";
import FamilyTooltip from "./FamilyTooltip";
import NoteTooltip from "./NoteToolTip";
import { useCreatePerfumeStore } from "@/store/CreatePerfumeStore";

interface NotesContainerProps {
    searchTerm: string;
}

export const NotesContainer = ({ searchTerm }: NotesContainerProps) => {
    const [groupedNotes, setGroupedNotes] = useState<NoteFamily[]>([]);
    const [loadingFamilyInfo, setLoadingFamilyInfo] = useState<boolean>(false);
    const [familyInfoMap, setFamilyInfoMap] = useState<Record<string, FamilyInfo | null>>({});
    const [hoveredNoteId, setHoveredNoteId] = useState<number | null>(null);
    const [noteInfoMap, setNoteInfoMap] = useState<Record<number, any>>({});
    const [loadingNoteInfo, setLoadingNoteInfo] = useState(false);
    const [tooltipVisibleFamily, setTooltipVisibleFamily] = useState<string | null>(null);
    const {
        currentStep,
        currentPerfume,
    } = useCreatePerfumeStore();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await obtenerNotasPorPaso(currentStep);
                const reducedNotes = data.map((grupo: { Family: any; FamilyId: number; Notes: any[]; }) => ({
                    family: grupo.Family,
                    familyId: grupo.FamilyId,
                    notes: grupo.Notes?.map((n) => ({
                        id: n.Id,
                        name: n.Name,
                        icon: n.Image
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

        return groupedNotes.map(({ family, notes, familyId }) => ({
            family,
            familyId,
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


    const handleMouseEnter = async (family: string, familyId: number) => {
        setTooltipVisibleFamily(family);
        setLoadingFamilyInfo(true);
        try {
            const info = await getFamilyInfo(familyId);
            setFamilyInfoMap((prev) => ({
                ...prev,
                [family]: info ?? null,
            }));
        } catch (error) {
            console.error("Error al obtener información de la familia:", error);
            setFamilyInfoMap((prev) => ({
                ...prev,
                [family]: null,
            }));
        } finally {
            setLoadingFamilyInfo(false);
        }
    };

    const handleNoteMouseEnter = async (noteId: number) => {
        setHoveredNoteId(noteId);
        if (noteInfoMap[noteId]) return;

        setLoadingNoteInfo(true);
        try {
            const info = await getNoteInfo(noteId);
            console.log(info)
            setNoteInfoMap((prev) => ({ ...prev, [noteId]: info }));
        } catch (error) {
            console.error("Error al obtener info de la nota:", error);
            setNoteInfoMap((prev) => ({ ...prev, [noteId]: { Description: "No disponible" } }));
        } finally {
            setLoadingNoteInfo(false);
        }
    };


    return (
        <div className="overflow-y-scroll max-h-[31rem] mt-6 w-full flex flex-col">
            {filteredGroupedNotes.map(({ family, notes, familyId }, index) => (
                <div key={`${family}-${index}`} className="flex flex-col mb-[2.43rem]">
                    <div className="flex items-center gap-2 mb-2 fuente-principal">
                        <p className="text-[var(--gris3)] text-[20px] font-medium">{family}</p>
                        <span
                            className="relative text-xs bg-[var(--gris3)] rounded-full px-2 py-0.5 text-white font-bold cursor-pointer"
                            onMouseEnter={() => handleMouseEnter(family, familyId)}
                            onMouseLeave={() => setTooltipVisibleFamily(null)}
                        >
                            i
                            {tooltipVisibleFamily?.toLowerCase() === family.toLowerCase() && (
                                <FamilyTooltip
                                    family={family}
                                    info={familyInfoMap[family] ?? undefined}
                                    loading={loadingFamilyInfo}
                                />

                            )}

                        </span>
                    </div>

                    <div className="w-100 flex flex-wrap gap-[25px]">
                        {notes.length > 0 ? (
                            notes.map((note) => {
                                const familyClass = familyColors[family] || "bg-gray-400 hover:bg-gray-500";
                                return (
                                    <div
                                        key={note.id}
                                        draggable
                                        onDragStart={(e) =>
                                            e.dataTransfer.setData(
                                                "application/json",
                                                JSON.stringify({ id: note.id, name: note.name, family })
                                            )
                                        }
                                        onMouseEnter={() => handleNoteMouseEnter(note.id)}
                                        onMouseLeave={() => setHoveredNoteId(null)}
                                        style={{ backgroundColor: familyClass }}
                                        className="relative cursor-default transition-colors duration-100 w-[80px] h-[80px] flex flex-col items-center justify-center rounded-[10px] text-white p-[16px] shadow-md shadow-gray-400 text-center text-[12px] font-semibold"
                                    >
                                        {note.icon && (
                                            <Image src={note.icon as string} alt="icono" width={24} height={30} />
                                        )}
                                        {note.name}

                                        {hoveredNoteId === note.id && (
                                            <NoteTooltip
                                                name={note.name}
                                                info={noteInfoMap[note.id]}
                                                loading={loadingNoteInfo} familyColor={familyClass} />
                                        )}
                                    </div>
                                );
                            }))
                            : (
                                <p>No hay notas para mostrar.</p>
                            )}
                    </div>
                </div>
            ))}
        </div>
    );
};