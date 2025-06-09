"use client";

import { useCreatePerfume } from "@/context/CreatePerfumeContext";

export const Formula = () => {
    const {
        resultFormula,
    } = useCreatePerfume();

    return (
        <div className="flex flex-col w-[38rem]">
            <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">Fórmula</p>
            <div className="mt-10 ">
                <div className=" px-10 text-center">
                    <div className="border-b border-[var(--gris2)] flex justify-between px-6 pb-1 mb-4 uppercase fuente-principal text-[14px] text-[var(--gris3)]"><p>componente</p> <p>cantidad</p></div>
                    <div className="flex justify-between mb-4 px-6"><p>Concentracion de escencia</p><p>{resultFormula.ConcentracionEsencia}%</p></div>
                    <div className="flex justify-between mb-4 px-6"><p>Alcohol Etílico</p><p>{resultFormula.ConcentracionAlcohol}%</p></div>
                    <div className="flex justify-between mb-4 px-6"><p>Agua Destilada</p><p>{resultFormula.ConcentracionAgua}%</p></div>
                </div>
            </div>
        </div>
    );
};