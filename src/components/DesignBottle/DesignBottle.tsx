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
        form: { name: "esferica", nameToShow: "Cúbica" },
        labelForm: "cilindrica",
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

    const getFormImagesSizes = (form: string) => {
        if (form === "cubica") {
            return "w-[18rem] h-[33rem]"
        }
        if (form === "cilindrica") {
            return "w-[15rem] h-[37rem]"
        }
        if (form === "esferica") {
            return "w-[28rem] h-[33rem]"
        }
    }

    const getLabelByBottleForm = (bottleForm: string) => {
        // adapt to both label and bottle form
        switch (bottleForm) {
            case "cubica":
                return (<svg width="273" height="334" viewBox="0 0 273 334" xmlns="http://www.w3.org/2000/svg" className='w-[13.6rem]'>
                    <rect width="273" height="334" fill={currentDesign.labelColor} />
                </svg>)

            case "cilindrica":
                return (
                    <svg width="252" height="371" viewBox="0 0 252 371" xmlns="http://www.w3.org/2000/svg" className='w-[13.2rem]'>
                        <path d="M0 0L24.3087 6.28814L42.9453 10.2182H89.1318H129.646H180.695L218.778 8.64619L251.19 0L252 359.996L229.312 367.856L125.595 371L30.791 367.856L0 359.996V0Z" fill={currentDesign.labelColor} />
                    </svg>
                )

            case "esferica":
                return (
                    <svg width="438" height="267" viewBox="0 0 438 267" xmlns="http://www.w3.org/2000/svg" className='w-[19.5rem]'>
                        <path d="M26 0L69.842 3.80342L129.624 7.60684L214.173 10.6496L297.869 7.60684L355.943 3.80342L408.5 0L424 33.5L435 69.5L437.5 103L436 138.064L431.5 167L420 199.5L405.627 226.105L391 247L373.294 267H328.225H219.47H69.842L51.1481 254.5L39.2301 240L28.8018 223.5L13.227 198.092L5.38876 166.077L0 127.059V81.0376L5.38876 52.5244L13.227 24.0111L26 0Z" fill={currentDesign.labelColor} />
                    </svg>
                )

        }
        return
    }

    const getLabelPositions = (bottleForm: string) => {
        // adapt to both label and bottle form
        switch (bottleForm) {
            case "cubica":
                return "top-[7.2rem] left-[3.4rem]"
            case "cilindrica":
                return "top-[6.5rem] left-[3.4rem]"
            case "esferica":
                return "top-[11.4rem] left-[0.3rem]"
        }
    }

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
                        {/* SVG label*/}
                        {currentDesign.labelForm && (<div className={`absolute z-10 pointer-events-none ${getLabelPositions(currentDesign.form.name)}`}>{getLabelByBottleForm(currentDesign.form.name)}</div>)}
                        {/* bottle image */}
                        <Image
                            src={`/design-bottle/botella-${currentDesign.form.name}.png`}
                            className={`${getFormImagesSizes(currentDesign.form.name)} z-0`}
                            width={700}
                            height={100}
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