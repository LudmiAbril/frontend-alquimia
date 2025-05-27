"use client"
import React, { useState } from 'react'
import SectionWrapper from '../general/SectionWrapper';
import { DesignFieldsCard } from './DesignFieldsCard';
import Image from 'next/image';

export const designBottleSteps = ["botella, etiqueta", "textos"]

const DesignBottle = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const designSteps = [
        "botella", "etiqueta", "tipografia"]

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
                <p>Dale personalidada tu fragancia.</p>
                <div className='flex items-center justify-center gap-[80px]'>
                    <div><Image src="/design-bottle/botella-cuadrada.png" width={260} height={10} alt='botella' /></div>
                    <DesignFieldsCard currentStep={currentStep} onNext={advanceStep} onBack={returnStep} />

                </div>
            </div>
        </SectionWrapper>
    )
}

export default DesignBottle

export const DesignStepsBar = (currentStep: number) => {
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