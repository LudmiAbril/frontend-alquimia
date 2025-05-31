"use client"
import React, { useState } from 'react'
import SectionWrapper from '../general/SectionWrapper';
import { DesignFieldsCard } from './DesignFieldsCard';
import Image from 'next/image';

export const designBottleSteps = ["botella", "etiqueta", "textos"]

// this interface will work only for render in the moment, later it will be a png/pdf
export interface BottleDesign {
    volume: number; // as ml
    form: BottleForm;
    labelForm: string;
    labelColor: string;
    labelImage: string; // research for this
    text: string;
    textTypography: string;
    textSize: number;
}

export interface BottleForm {
    name: string;
    nameToShow: string;
}

const DesignBottle = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const designSteps = ["botella", "etiqueta", "tipografia"];
    const [currentDesign, setCurrentDesign] = useState<BottleDesign>({
        volume: 30,
        form: { name: "cubica", nameToShow: "Cúbica" },
        labelForm: "",
        labelColor: "",
        labelImage: "",
        text: "",
        textTypography: "",
        textSize: 8
    });


    const advanceStep = () => {
        if (currentStep < designSteps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const returnStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };
    return (
        <SectionWrapper className="bg-[#f9f4f1]">
            <div className="flex flex-col items-center">
                <h1 className="fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4">
                    DISEÑÁ TU ENVASE
                </h1>
                <p className='mb-9'>Dale personalidada tu fragancia.</p>
                <DesignStepsBar currentStep={currentStep} />
                <div className='flex items-center justify-center gap-[80px]'>
                    <div className="relative w-[20rem] h-[26rem] flex justify-center items-center">
                        {/* SVG por encima de la imagen */}
                        <div className="absolute z-10 pointer-events-none" >
                            {/* Aquí va tu SVG */}
                            <svg width="1200" height="300" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" fill="red" />
                            </svg>
                        </div>

                        {/* Imagen debajo */}
                        <Image
                            src={`/design-bottle/botella-${currentDesign.form.name}.png`}
                            className="object-contain z-0"
                            width={280}
                            height={20}
                            alt="botella"
                        />
                    </div>

                    <DesignFieldsCard currentStep={currentStep} currentDesign={currentDesign} setCurrentDesign={setCurrentDesign} onNext={advanceStep} onBack={returnStep} />
                </div>
            </div>
        </SectionWrapper>
    )
}

export default DesignBottle

interface DesignStepsBarProps {
    currentStep: number
}
const DesignStepsBar = ({ currentStep }: DesignStepsBarProps) => {
    return (
        <div className="flex items-center mb-10">
            <Image src="/BarraSteps/icono-pocion-inicio.svg" alt="paso" width={40} height={40} />
            {designBottleSteps.map((step, index) => (
                <React.Fragment key={step}>
                    <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
                    <div
                        className={`rounded-full p-2 border-2 border-[var(--violeta)] ${currentStep > index && "bg-[var(--violeta)]"
                            }`}
                    ></div>
                </React.Fragment>
            ))}
            <div className="w-[114px] h-[2px] bg-[var(--violeta)]"></div>
            <Image src="/BarraSteps/icono-pocion-final.svg" alt="" width={40} height={40} />
        </div>)
}