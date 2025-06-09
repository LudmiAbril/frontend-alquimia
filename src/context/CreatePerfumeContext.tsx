"use client";

import { GetFormulaResponse, perfumeData } from '@/components/utils/typing';
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface CreatePerfumeContextType {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    currentPerfume: perfumeData;
    setCurrentPerfume: Dispatch<SetStateAction<perfumeData>>;
    resultFormula: GetFormulaResponse;
    setResultFormula: Dispatch<SetStateAction<GetFormulaResponse>>;
}

const CreatePerfumeContext = createContext<CreatePerfumeContextType | undefined>(undefined);

export const CreatePerfumeProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [currentPerfume, setCurrentPerfume] = useState<perfumeData>({
        baseNotes: [],
        heartNotes: [],
        topNotes: [],
        intensity: { Id: 0, Name: "", Category: "", Description: "" },
    });
    const [resultFormula, setResultFormula] = useState<GetFormulaResponse>({
        Id: 0,
        IdCreador: 0,
        ConcentracionAgua: 0,
        ConcentracionAlcohol: 0,
        ConcentracionEsencia: 0,
        Intensity: { Id: 0, Name: "", Category: "", Description: "" },
        NotasCorazonIds: { Note1: { Name: "", Family: "", Sector: "", Description: "", Duration: "" } },
        NotasFondoIds: { Note1: { Name: "", Family: "", Sector: "", Description: "", Duration: "" } },
        NotasSalidaIds: { Note1: { Name: "", Family: "", Sector: "", Description: "", Duration: "" } },
    });

    return (
        <CreatePerfumeContext.Provider
            value={{
                currentStep,
                setCurrentStep,
                currentPerfume,
                setCurrentPerfume,
                resultFormula,
                setResultFormula,
            }}
        >
            {children}
        </CreatePerfumeContext.Provider>
    );
};

export const useCreatePerfume = () => {
    const context = useContext(CreatePerfumeContext);
    if (!context) {
        throw new Error('useCreatePerfume debe usarse dentro de un CreatePerfumeProvider');
    }
    return context;
};
