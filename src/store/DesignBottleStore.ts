import { create } from 'zustand';
import { BottleDesign } from '@/components/utils/typing';

interface DesignBottleState {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    currentDesign: BottleDesign;
    setCurrentDesign: (design: BottleDesign) => void;
    updateDesignField: <K extends keyof BottleDesign>(key: K, value: BottleDesign[K]) => void;
}

export const useDesignBottleStore = create<DesignBottleState>((set, get) => ({
    currentStep: 0,
    setCurrentStep: (step) => set({ currentStep: step }),

    currentDesign: {
        volume: 30,
        form: { name: 'cubica', nameToShow: 'Cúbica' },
        labelForm: '',
        labelColor: '#000000',
        labelImage: '',
        text: '',
        textTypography: 'roboto',
        textSize: 30,
        textColor: '#ffffff',
        imageScale: '1',
        textYPosition: 0.5,
    },

    setCurrentDesign: (design) => set({ currentDesign: design }),

    updateDesignField: (key, value) => {
        const current = get().currentDesign;
        set({
            currentDesign: {
                ...current,
                [key]: value,
            },
        });
    },
}));
