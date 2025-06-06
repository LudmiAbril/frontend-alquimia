"use client"
import React, { useState } from 'react'
import SectionWrapper from '../general/SectionWrapper';
import { DesignFieldsCard } from './DesignFieldsCard';
import Image from 'next/image';
import ConfirmBottleDesignModal from './ConfirmBottleDesignModal';
import { useRouter } from 'next/navigation';


export const designBottleSteps = ["botella", "etiqueta", "textos"]
export type FontKey = keyof typeof fontMap;

const fontMap = {
    roboto: 'Roboto, sans-serif',
    greatVibes: '"Great Vibes", cursive',
    petitFormalScript: '"Petit Formal Script", cursive',
    josefinSans: '"Josefin Sans", sans-serif',
    paprika: '"Paprika", system-ui',
    charmonman: ' "Charmonman", cursive',
    libreBaskerville: '"Libre Baskerville", serif',
    badScript: '"Bad Script", cursive',
} as const;

// this interface will work only for render in the moment, later it will be a png/pdf
export interface BottleDesign {
    volume: number; // as ml
    form: BottleForm;
    labelForm: string;
    labelColor: string;
    labelImage: string; // research for this
    text: string;
    textTypography: FontKey;
    textSize: number;
    textColor: string;
    imageScale: string;
    textYPosition: number;
}

export interface BottleForm {
    name: string;
    nameToShow: string;
}

const DesignBottle = () => {
    const router = useRouter();
    const [openFinishModal, setOpenFinishModal] = useState(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const designSteps = ["botella", "etiqueta", "tipografia"];
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
        textYPosition: 0.5
    });


    const advanceStep = () => {
        if (currentStep === 2) {
            toggleOpenFinishDesignModal()
        }
        if (currentStep < designSteps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const toggleOpenFinishDesignModal = () => {
        setOpenFinishModal((prev) => !prev)
    }

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


    const goToProviders = () => {
        router.push("/providers");
    }

    // funcion repartida para optimizar
    // que el scale no se recorte la imagen si se achica, solo si se agranda
    const getLabelByBottleForm = (bottleForm: string, labelForm: string) => {
        if (labelForm === "cuadrada") {
            switch (bottleForm) {
                case "cubica":
                    return (
                        <svg width="273" height="334" viewBox="0 0 273 334" xmlns="http://www.w3.org/2000/svg" className='w-[13.6rem]'>
                            <rect width="273" height="334" fill={currentDesign.labelColor} />
                            <image
                                href={currentDesign.labelImage}
                                x="0"
                                y="0"
                                width="273"
                                height="334"
                                transform={`scale(${currentDesign.imageScale})`}
                                transform-origin="center"
                            />
                            <text
                                x="50%"
                                y={`${currentDesign.textYPosition * 100}%`}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={currentDesign.textSize}
                                fill={currentDesign.textColor}
                                fontFamily={fontMap[currentDesign.textTypography]}
                            >
                                {currentDesign.text}
                            </text>
                        </svg>)

                case "cilindrica":
                    return (
                        <svg width="252" height="371" viewBox="0 0 252 371" xmlns="http://www.w3.org/2000/svg" className='w-[13.2rem]'>
                            <path d="M0 0L24.3087 6.28814L42.9453 10.2182H89.1318H129.646H180.695L218.778 8.64619L251.19 0L252 359.996L229.312 367.856L125.595 371L30.791 367.856L0 359.996V0Z" fill={currentDesign.labelColor} />
                            <image
                                href={currentDesign.labelImage}
                                x="0"
                                y="0"
                                width="252"
                                height="371"
                                transform={`scale(${currentDesign.imageScale})`}
                                transform-origin="center"
                            />   <text
                                x="50%"
                                y={`${currentDesign.textYPosition * 100}%`}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={currentDesign.textSize}
                                fill={currentDesign.textColor}
                                fontFamily={fontMap[currentDesign.textTypography]}
                            >
                                {currentDesign.text}
                            </text>
                        </svg>
                    )

                case "esferica":
                    return (
                        <svg width="438" height="267" viewBox="0 0 438 267" xmlns="http://www.w3.org/2000/svg" className='w-[19.5rem]'>
                            <path d="M26 0L69.842 3.80342L129.624 7.60684L214.173 10.6496L297.869 7.60684L355.943 3.80342L408.5 0L424 33.5L435 69.5L437.5 103L436 138.064L431.5 167L420 199.5L405.627 226.105L391 247L373.294 267H328.225H219.47H69.842L51.1481 254.5L39.2301 240L28.8018 223.5L13.227 198.092L5.38876 166.077L0 127.059V81.0376L5.38876 52.5244L13.227 24.0111L26 0Z" fill={currentDesign.labelColor} />
                            <image
                                href={currentDesign.labelImage}
                                x="0"
                                y="0"
                                width="438"
                                height="267"
                                transform={`scale(${currentDesign.imageScale})`}
                                transform-origin="center"
                            />   <text
                                x="50%"
                                y={`${currentDesign.textYPosition * 100}%`}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={currentDesign.textSize}
                                fill={currentDesign.textColor}
                                fontFamily={fontMap[currentDesign.textTypography]}
                            >
                                {currentDesign.text}
                            </text>
                        </svg>
                    )

            }
        }

        if (labelForm === "circular") {
            switch (bottleForm) {
                case "cubica":
                    return (
                        <svg width="331" height="345" viewBox="0 0 331 345" xmlns="http://www.w3.org/2000/svg" className='w-[15.7rem]'>
                            <defs>
                                <clipPath id="ellipse-clip">
                                    <ellipse cx="165.5" cy="172.5" rx="165.5" ry="172.5" />
                                </clipPath>
                            </defs>
                            <ellipse cx="165.5" cy="172.5" rx="165.5" ry="172.5" fill={currentDesign.labelColor} />
                            <image
                                href={currentDesign.labelImage}
                                x="0"
                                y="0"
                                width="331"
                                height="345"
                                preserveAspectRatio="xMidYMid slice"
                                clipPath="url(#ellipse-clip)"
                                transform={`scale(${currentDesign.imageScale})`}
                                transform-origin="center"
                            />   <text
                                x="50%"
                                y={`${currentDesign.textYPosition * 100}%`}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={currentDesign.textSize}
                                fill={currentDesign.textColor}
                                fontFamily={fontMap[currentDesign.textTypography]}
                            >
                                {currentDesign.text}
                            </text>
                        </svg>
                    )
                case "cilindrica":
                    return (
                        <svg width="251" height="383" viewBox="0 0 251 383" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-[13.3rem]'>
                            <defs>
                                <clipPath id="ellipse-clip">
                                    <path d="M250.5 191.5C250.5 297.263 197.245 383 126 383C54.7553 383 0 297.263 0 191.5C0 85.7375 54.7553 0 126 0C197.245 0 250.5 85.7375 250.5 191.5Z" />
                                </clipPath>
                            </defs>
                            <path d="M250.5 191.5C250.5 297.263 197.245 383 126 383C54.7553 383 0 297.263 0 191.5C0 85.7375 54.7553 0 126 0C197.245 0 250.5 85.7375 250.5 191.5Z" fill={currentDesign.labelColor} />
                            <image
                                href={currentDesign.labelImage}
                                x="0"
                                y="0"
                                width="251"
                                height="383"
                                preserveAspectRatio="xMidYMid slice"
                                clipPath="url(#ellipse-clip)"
                                transform={`scale(${currentDesign.imageScale})`}
                                transform-origin="center"
                            />   <text
                                x="50%"
                                y={`${currentDesign.textYPosition * 100}%`}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={currentDesign.textSize}
                                fill={currentDesign.textColor}
                                fontFamily={fontMap[currentDesign.textTypography]}
                            >
                                {currentDesign.text}
                            </text>
                        </svg>
                    )
                case "esferica":
                    return (
                        <svg width="346" height="343" viewBox="0 0 346 343" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-[16.5rem]'>
                            <defs>
                                <clipPath id="ellipse-clip">
                                    <path d="M346 171.5C346 266.217 274.635 343 175.5 343C76.3649 343 0 266.217 0 171.5C0 76.7832 76.3649 0 175.5 0C274.635 0 346 76.7832 346 171.5Z" />
                                </clipPath>
                            </defs>
                            <path d="M346 171.5C346 266.217 274.635 343 175.5 343C76.3649 343 0 266.217 0 171.5C0 76.7832 76.3649 0 175.5 0C274.635 0 346 76.7832 346 171.5Z" fill={currentDesign.labelColor} />
                            <image
                                href={currentDesign.labelImage}
                                x="0"
                                y="0"
                                width="346"
                                height="343"
                                preserveAspectRatio="xMidYMid slice"
                                clipPath="url(#ellipse-clip)"
                                transform={`scale(${currentDesign.imageScale})`}
                                transform-origin="center"
                            />   <text
                                x="50%"
                                y={`${currentDesign.textYPosition * 100}%`}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize={currentDesign.textSize}
                                fill={currentDesign.textColor}
                                fontFamily={fontMap[currentDesign.textTypography]}
                            >
                                {currentDesign.text}
                            </text>
                        </svg>
                    )
            }
        }

    }

    const getLabelPositions = (bottleForm: string, labelForm: string) => {
        if (labelForm == "cuadrada") {

            switch (bottleForm) {
                case "cubica":
                    return "top-[7.2rem] left-[3.4rem]";
                case "cilindrica":
                    return "top-[6.5rem] left-[3.4rem]"
                case "esferica":
                    return "top-[11.4rem] left-[0.3rem]"
            }
        } else {
            switch (bottleForm) {
                case "cubica":
                    return "top-[7.4rem] left-[2.4rem]";
                case "cilindrica":
                    return "top-[5.5rem] left-[3.3rem]"
                case "esferica":
                    return "top-[8.4rem] left-[1.8rem]"
            }
        }
    }

    return (
        <SectionWrapper className="bg-[var(--hueso)]">
            <div className="flex flex-col items-center">
                <h1 className="fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4">
                    DISEÑÁ TU BOTELLA
                </h1>
                <p className='mb-9'>Dale personalidada tu fragancia.</p>
                <DesignStepsBar currentStep={currentStep} />
                <div className='flex items-center justify-center gap-[80px]'>
                    <div className="relative w-[20rem] h-[26rem] flex justify-center items-center">
                        {/* SVG label*/}
                        {currentDesign.labelForm && (<div className={`absolute z-10 pointer-events-none text-center ${getLabelPositions(currentDesign.form.name, currentDesign.labelForm)}`}>{getLabelByBottleForm(currentDesign.form.name, currentDesign.labelForm)}</div>)}
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
            {openFinishModal && (<ConfirmBottleDesignModal onClose={toggleOpenFinishDesignModal} onConfirm={goToProviders} />)}
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
            <Image src="/design-bottle/icon-bottle-label-start.svg" alt="icono-frasco" width={60} height={40} />
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
            <Image src="/design-bottle/icon-bottle-label-end.svg" alt="icono-frasco" width={60} height={40} />
        </div>)
}