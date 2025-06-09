"use client";

import Image from 'next/image';
import { designBottleSteps } from '../utils/utils';
import React from 'react';
import { useDesignBottle } from '@/context/DesignBottleContext';

const DesignStepsBar = () => {
    const {
        currentStep,
    } = useDesignBottle();
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

export default DesignStepsBar;