"use client";
import React, { useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Colorful from '@uiw/react-color-colorful';
import { hsvaToHex } from '@uiw/color-convert'; // esto es para pasar a hex
import { BottleDesign, BottleForm } from './DesignBottle';

interface DesignFieldsCardProps {
    currentStep: number;
    currentDesign: BottleDesign;
    setCurrentDesign: React.Dispatch<React.SetStateAction<BottleDesign>>;
    onNext: () => void;
    onBack: () => void;
}
export const DesignFieldsCard = ({ currentStep, currentDesign, setCurrentDesign, onNext, onBack }: DesignFieldsCardProps) => {

    return (
        <div className="w-[38rem] h-[38rem] bg-white flex flex-col items-center p-[2.31rem] rounded-[10px] shadow-md text-center mb-10">
            {currentStep === 0 && (<BottleFields currentDesign={currentDesign} setCurrentDesign={setCurrentDesign} />)}
            {currentStep === 1 && (<LabelFields />)}
            {currentStep === 2 && (<TextFields />)}
            <div className='mt-6 flex justify-center gap-9 w-full'>
                <button onClick={onBack} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem] cursor-pointer'>volver</button>
                <button onClick={onNext} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem] cursor-pointer'>continuar</button>
            </div>
        </div>
    )
}

interface BottleFieldsProps {
    currentDesign: BottleDesign;
    setCurrentDesign: React.Dispatch<React.SetStateAction<BottleDesign>>;
}

export const BottleFields = ({ currentDesign, setCurrentDesign }: BottleFieldsProps) => {
    const setBottleVolume = (volume: number) => {
        setCurrentDesign((prev: BottleDesign) => ({ ...prev, volume }));

    };
    const setBottleForm = (form: BottleForm) => {
        setCurrentDesign((prev: BottleDesign) => ({ ...prev, form }));

    };

    const volumeOptions = [30, 50, 100];
    const formsOptions = [{ name: "cubica", nameToShow: "Cúbica" }, { name: "cilindrica", nameToShow: "Cilindrica" }, { name: "esferica", nameToShow: "Esférica" }];

    const baseButtonClass = 'py-[15px] rounded-[10px] transition w-[10rem] text-white';
    const activeClass = 'bg-[var(--lila)]';
    const inactiveClass = 'bg-[var(--violeta)] hover:bg-[var(--lila)]';

    return (<div className="flex flex-col flex-1 text-left">
        <p className="fuente-principal uppercase text-[20px] text-[var(--gris3)] mb-4 font-extrabold">Botella</p>
        <div className="flex-1 flex flex-col justify-center">
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">volumen</p>
            <div className='flex gap-[1rem] mb-9'>
                {volumeOptions.map((volume) => (
                    <button
                        key={volume}
                        onClick={() => setBottleVolume(volume)}
                        className={`${baseButtonClass} ${currentDesign.volume === volume ? activeClass : inactiveClass
                            }`}
                    >
                        {volume}ml
                    </button>
                ))}
            </div>
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">forma</p>
            <div className='flex gap-[1rem]'>
                {formsOptions.map((form) => (
                    <button
                        key={form.name}
                        onClick={() => setBottleForm(form)}
                        className={`${baseButtonClass} ${currentDesign.form.name === form.name ? activeClass : inactiveClass
                            }`}
                    >
                        {form.nameToShow}
                    </button>
                ))}
            </div>
        </div>
    </div>)
}

export const LabelFields = () => {
    const [hsva, setHsva] = useState({ h: 0, s: 0, v: 0, a: 0 });
    const [isChoosingColor, setIsChoosingColor] = useState(false);

    const toggleOpenColorPIcker = () => {
        setIsChoosingColor((prev) => !prev)
    }
    return (<div className="flex flex-col flex-1 text-left items-left">
        <p className="fuente-principal uppercase text-[20px] text-[var(--gris3)] mb-4 font-extrabold">Etiqueta</p>

        <div className="flex-1 flex flex-col justify-center items-left">
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">forma</p>
            <div className='flex gap-[5rem] mb-9'>
                <button className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem]'>cuadrada</button>
                <button className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem]'>circular</button>
            </div>

            <div className='flex gap-[5rem]'>
                <div>
                    <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">subir mi logo</p>
                    <button className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[5rem]'><UploadFileIcon /></button>
                </div>
                <div>
                    <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">elegir color</p>
                    <div className='relative'>
                        <button onClick={toggleOpenColorPIcker} className='border border-black text-black py-[15px] rounded-[10px]  w-[10rem] flex justify-center items-center gap-2'><div className="w-[1rem] h-[1rem] rounded-full flex items-center justify-center" style={{ backgroundColor: hsvaToHex(hsva) }}>
                        </div>
                            {hsvaToHex(hsva)}</button>
                        {isChoosingColor && (<div className="absolute top-full left-0 mt-2 z-10 shadow-lg">
                            <Colorful
                                color={hsva}
                                onChange={(color) => setHsva(color.hsva)}
                                disableAlpha={true}
                            />
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export const TextFields = () => {
    return (<>elegir textos</>)
}