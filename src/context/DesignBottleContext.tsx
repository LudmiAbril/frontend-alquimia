"use client";

import { BottleDesign } from "@/components/Utils/typing";
import React, { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from "react";

interface DesignBottleContextType {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    currentDesign: BottleDesign;
    setCurrentDesign: Dispatch<SetStateAction<BottleDesign>>;
}

const DesignBottleContext = createContext<DesignBottleContextType | undefined>(undefined);

export const useDesignBottle = (): DesignBottleContextType => {
    const context = useContext(DesignBottleContext);
    if (!context) {
        throw new Error("useDesignBottle must be used within a DesignBottleProvider");
    }
    return context;
};

export const DesignBottleProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [currentDesign, setCurrentDesign] = useState<BottleDesign>({
        volume: 30,
        form: { name: "cubica", nameToShow: "Cúbica" },
        labelForm: "",
        labelColor: "#000000",
        labelImage: "",
        text: "",
        textTypography: "roboto",
        textSize: 30,
        textColor: "#ffffff",
        imageScale: "1",
        textYPosition: 0.5,
    });

    return (
        <DesignBottleContext.Provider
            value={{ currentStep, setCurrentStep, currentDesign, setCurrentDesign }}
        >
            {children}
        </DesignBottleContext.Provider>
    );
};
