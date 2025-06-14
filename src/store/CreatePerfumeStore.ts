import { create } from 'zustand';
import { GetFormulaResponse, perfumeData } from '@/components/utils/typing';

interface CreatePerfumeState {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  currentPerfume: perfumeData;
  setCurrentPerfume: (perfume: perfumeData) => void;
  resultFormula: GetFormulaResponse;
  setResultFormula: (formula: GetFormulaResponse) => void;
}

export const useCreatePerfumeStore = create<CreatePerfumeState>((set) => ({
  currentStep: 0,
  setCurrentStep: (step) => set({ currentStep: step }),

  currentPerfume: {
    baseNotes: [],
    heartNotes: [],
    topNotes: [],
    intensity: { Id: 0, Name: '', Category: '', Description: '' },
  },
  setCurrentPerfume: (perfume) => set({ currentPerfume: perfume }),

  resultFormula: {
    Id: 0,
    IdCreador: 0,
    ConcentracionAgua: 0,
    ConcentracionAlcohol: 0,
    ConcentracionEsencia: 0,
    Intensity: { Id: 0, Name: '', Category: '', Description: '' },
    NotasCorazonIds: { Note1: { Name: '', Family: '', Sector: '', Description: '', Duration: '' } },
    NotasFondoIds: { Note1: { Name: '', Family: '', Sector: '', Description: '', Duration: '' } },
    NotasSalidaIds: { Note1: { Name: '', Family: '', Sector: '', Description: '', Duration: '' } },
  },
  setResultFormula: (formula) => set({ resultFormula: formula }),
}));
