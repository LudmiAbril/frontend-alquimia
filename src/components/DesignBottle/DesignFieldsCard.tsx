"use client";
import React, { useState } from 'react'

interface DesignFieldsCardProps {
    currentStep: number;
    onNext: () => void;
    onBack: () => void;
}
export const DesignFieldsCard = ({ currentStep, onNext, onBack }: DesignFieldsCardProps) => {

    return (
        <div className="w-[38rem] h-[38rem] bg-white flex flex-col items-center p-[2.31rem] rounded-[10px] shadow-md text-center mb-10">
            {currentStep === 0 && (<BottleFields />)}
            {currentStep === 1 && (<LabelFields />)}
            {currentStep === 2 && (<TextFields />)}
            <div className='mt-6 flex justify-center gap-9 w-full'>
                <button onClick={onBack} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem] cursor-pointer'>volver</button>
                <button onClick={onNext} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem] cursor-pointer'>continuar</button>
            </div>
        </div>
    )
}

export const BottleFields = () => {
    return (<>elegir botella</>)
}

export const LabelFields = () => {
    return (<>elegir etiqueta</>)
}

export const TextFields = () => {
    return (<>elegir textos</>)
}