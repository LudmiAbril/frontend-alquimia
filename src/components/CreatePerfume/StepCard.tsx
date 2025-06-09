"use client";

import { useCreatePerfume } from "@/context/CreatePerfumeContext";
import { createSteps } from "../Utils/utils";
import Image from "next/image";

interface StepCardProps {
    onNext: () => void;
    onBack: () => void;
}

export const StepCard = ({ onNext, onBack }: StepCardProps) => {
    const {
        currentStep,
        currentPerfume,
    } = useCreatePerfume();

    const getNextArrowImage = () => {
        if (currentStep >= 4) {
            return "/svgGeneral/arrow-right-inactive.svg";
        }

        return canGoNext()
            ? "/svgGeneral/arrow-right-active.svg"
            : "/svgGeneral/arrow-right-inactive.svg";
    };

    const canGoNext = () => {
        const currentNotes =
            currentStep === 1
                ? currentPerfume.baseNotes
                : currentStep === 2
                    ? currentPerfume.heartNotes
                    : currentPerfume.topNotes;

        return currentNotes.length > 0;
    };

    return (

        <div className="flex items-center gap-6">
            <Image
                width={20}
                height={20}
                src={currentStep <= 1 ? "/svgGeneral/arrow-left-inactive.svg"
                    : "/svgGeneral/arrow-left-active.svg"
                }
                alt="volver"
                className="cursor-pointer"
                onClick={() => {
                    if (currentStep > 1) onBack();
                }}
            />
            <div className="bg-white p-6 rounded-[10px] items-center flex flex-col justify-center w-[409px] h-[179px] shadow-md">
                <Image src="/svgGeneral/icono-info.svg" alt="info" className="mb-[18px]" width={20} height={20} />
                <h3 className="mb-[10px] uppercase text-center">
                    Paso {currentStep} - {createSteps[currentStep].nombre}
                </h3>
                <p>{createSteps[currentStep].descripcion}</p>
            </div>
            <Image
                width={20} height={20}
                src={
                    getNextArrowImage()
                }
                alt="avanzar"
                className={`${canGoNext() ? 'cursor-pointer' : ''}`}
                onClick={() => {
                    if (canGoNext()) onNext();
                }}
            />
        </div>
    );
};
