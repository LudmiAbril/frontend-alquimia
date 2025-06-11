"use client";

import { NoteInfo } from "../utils/typing";
import { formatDuration } from "../utils/utils";

interface NoteTooltipProps {
    name: string;
    info?: NoteInfo;
    loading: boolean;
    familyColor: string;
}

const NoteTooltip = ({ name, info, loading, familyColor }: NoteTooltipProps) => {
    return (
        <div className="absolute top-full w-[8rem] mt-2 p-4 bg-[var(--hueso)] text-black rounded-[10px] shadow z-10 flex flex-col">
            <h4 style={{ color: familyColor }} className="text-[var(--violeta)] font-roboto uppercase mb-1 text-[0.9rem]">{name}</h4>
            <p className="font-roboto text-[var(--gris3)] font-ligth">{loading ? "Cargando..." : info?.Description ?? "Sin descripción."}</p>
            {info?.Duration && (
                <p className="font-roboto text-[var(--gris4)] font-ligth mt-1">
                    Duracion: ⏱ {formatDuration(info.Duration)}
                </p>
            )}
        </div>
    );
};

export default NoteTooltip;
