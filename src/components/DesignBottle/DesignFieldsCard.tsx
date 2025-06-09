"use client";

import React from 'react'
import { BottleFields } from './BottleFields';
import { LabelFields } from './LabelFields';
import { TextFields } from './TextFields';
import { useDesignBottle } from '@/context/DesignBottleContext';

interface DesignFieldsCardProps {
    onNext: () => void;
    onBack: () => void;
}
export const DesignFieldsCard = ({ onNext, onBack }: DesignFieldsCardProps) => {
    const {
        currentStep
    } = useDesignBottle();
    return (
        <div className="w-[38rem] h-[38rem] bg-white flex flex-col  p-[2.31rem] rounded-[10px] shadow-md text-center mb-10">
            {currentStep === 0 && (<BottleFields />)}
            {currentStep === 1 && (<LabelFields />)}
            {currentStep === 2 && (<TextFields />)}
            <div className='mt-6 flex justify-center gap-9 w-full'>
                <button onClick={onBack} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem] cursor-pointer'>Volver</button>
                <button onClick={onNext} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem] cursor-pointer'>Continuar</button>
            </div>
        </div>
    )
}