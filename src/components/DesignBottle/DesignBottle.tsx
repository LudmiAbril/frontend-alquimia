"use client";

import React, { useState } from 'react'
import SectionWrapper from '../general/SectionWrapper';
import { DesignFieldsCard } from './DesignFieldsCard';
import Image from 'next/image';
import ConfirmBottleDesignModal from './ConfirmBottleDesignModal';
import { useRouter } from 'next/navigation';
import { designBottleSteps, getFormImagesSizes, getLabelPositions } from '../utils/utils';
import DesignStepsBar from './DesignStepBar';
import BottleLabel from './BottleDesign';
import { useDesignBottle } from '@/context/DesignBottleContext';

const DesignBottle = () => {
    const router = useRouter();
    const [openFinishModal, setOpenFinishModal] = useState(false);
    const {
        currentStep,
        setCurrentStep,
        currentDesign,
    } = useDesignBottle();

    const advanceStep = () => {
        if (currentStep === 2) {
            toggleOpenFinishDesignModal()
        }
        if (currentStep < designBottleSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const toggleOpenFinishDesignModal = () => {
        setOpenFinishModal((prev) => !prev)
    }

    const returnStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const goToProviders = () => {
        router.push("/proveedores");
    }

    return (
        <SectionWrapper className="bg-[var(--hueso)]">
            <div className="flex flex-col items-center">
                <h1 className="fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4">
                    DISEÑÁ TU BOTELLA
                </h1>
                <p className='mb-9'>Dale personalidada tu fragancia.</p>
                <DesignStepsBar />
                <div className='flex items-center justify-center gap-[80px]'>
                    <div className="relative w-[20rem] h-[26rem] flex justify-center items-center">
                        <Image
                            src={`/design-bottle/botella-${currentDesign.form.name}.png`}
                            className={`${getFormImagesSizes(currentDesign.form.name)} z-0 `}
                            width={700}
                            height={100}
                            alt="botella"
                        />
                        {currentDesign.labelForm && (
                            <div
                                className={`absolute z-10 pointer-events-none ${getLabelPositions(
                                    currentDesign.form.name,
                                    currentDesign.labelForm
                                )}`}
                            >
                                <BottleLabel
                                    bottleForm={currentDesign.form.name}
                                    labelForm={currentDesign.labelForm}
                                    design={currentDesign}
                                />
                            </div>
                        )}
                    </div>
                    <DesignFieldsCard onNext={advanceStep} onBack={returnStep} />
                </div>
            </div>
            {openFinishModal && (<ConfirmBottleDesignModal onClose={toggleOpenFinishDesignModal} onConfirm={goToProviders} />)}
        </SectionWrapper>
    )
}

export default DesignBottle
