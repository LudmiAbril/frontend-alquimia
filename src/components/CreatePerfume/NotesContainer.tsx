"use client";

import { useEffect, useMemo, useState } from "react";
import { getFamilyInfo, obtenerNotasPorPaso } from "@/services/notaService";
import { NoteFamily } from "../utils/typing";
import { useCreatePerfume } from "@/context/CreatePerfumeContext";
import { familyColors } from "@/services/animateBottle";
import Image from "next/image";
import FamilyTooltip from "./FamilyTooltip";


interface NotesContainerProps {
    searchTerm: string;
}
interface FamilyInfo {
    Id: number;
    Name: string;
    Description: string;
    Image1: string;
}

export const NotesContainer = ({ searchTerm }: NotesContainerProps) => {
    const [groupedNotes, setGroupedNotes] = useState<NoteFamily[]>([]);
    const [tooltipVisible, setTooltipVisible] = useState<boolean | null>(null);
    const [loadingFamilyInfo, setLoadingFamilyInfo] = useState<boolean>(false);
    const [familyInfoMap, setFamilyInfoMap] = useState<Record<string, FamilyInfo | null>>({});

    const [tooltipVisibleFamily, setTooltipVisibleFamily] = useState<string | null>(null);

    const {
        currentStep,
        currentPerfume,
    } = useCreatePerfume();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const data = await obtenerNotasPorPaso(currentStep);
                // hacer console log aca, ver estructura de familia y mostrar esa info
                console.log("data pura:", data);
                const reducedNotes = data.map((grupo: { Family: any; FamilyId: number; Notes: any[]; }) => ({
                    family: grupo.Family,
                    familyId: grupo.FamilyId,
                    notes: grupo.Notes?.map((n) => ({
                        id: n.Id,
                        name: n.Name,
                        icon: n.Image
                    })) ?? [],
                }));
                console.log(reducedNotes);
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
                [family]: info ?? null, // En caso de que getFamilyInfo devuelva undefined
            }));
        } catch (error) {
            console.error("Error al obtener información de la familia:", error);
            setFamilyInfoMap((prev) => ({
                ...prev,
                [family]: null, // Guardamos null en vez de un string
            }));
        } finally {
            setLoadingFamilyInfo(false);
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
                                        style={{ backgroundColor: familyClass }}
                                        className="cursor-default transition-colors duration-100 w-[80px] h-[80px] flex flex-col items-center justify-center rounded-[10px] text-white p-[16px] shadow-md shadow-gray-400 text-center text-[12px] font-semibold"
                                    >
                                        {note.icon && (
                                            <Image src={note.icon} alt="icono" width={24} height={30} />
                                        )}
                                        {note.name}
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