"use client";
import React, { useRef, useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Colorful from '@uiw/react-color-colorful';
import { ColorResult, hexToHsva, hsvaToHex } from '@uiw/color-convert'; // esto es para pasar a hex
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
            {currentStep === 1 && (<LabelFields currentDesign={currentDesign} setCurrentDesign={setCurrentDesign} />)}
            {currentStep === 2 && (<TextFields currentDesign={currentDesign} setCurrentDesign={setCurrentDesign} />)}
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

interface LabelFieldsProps {
    currentDesign: BottleDesign;
    setCurrentDesign: React.Dispatch<React.SetStateAction<BottleDesign>>;
}
export const LabelFields = ({ currentDesign, setCurrentDesign }: LabelFieldsProps) => {
    const [hsva, setHsva] = useState(hexToHsva(currentDesign.labelColor));
    const [isChoosingColor, setIsChoosingColor] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleChangeColor = (color: ColorResult) => {
        setHsva(color.hsva);
        setCurrentDesign((prev) => ({
            ...prev,
            labelColor: hsvaToHex(color.hsva),
        }));
    };

    const toggleOpenColorPIcker = () => {
        setIsChoosingColor((prev) => !prev)
    }

    const handleChangeLabelForm = (labelForm: string) => {
        setCurrentDesign((prev) => ({
            ...prev,
            labelForm: labelForm,
        }));
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentDesign((prev) => ({
                    ...prev,
                    labelImage: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const onChangeImageScale = (v: string) => {
        setCurrentDesign((prev) => ({
            ...prev,
            imageScale: v
        }));
    }

    return (<div className="flex flex-col flex-1 text-left items-left">
        <p className="fuente-principal uppercase text-[20px] text-[var(--gris3)] mb-4 font-extrabold">Etiqueta</p>

        <div className="flex-1 flex flex-col justify-center items-left">
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">forma</p>
            <div className='flex gap-[5rem] mb-9'>
                <button onClick={() => handleChangeLabelForm("cuadrada")} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem]'>cuadrada</button>
                <button onClick={() => handleChangeLabelForm("circular")} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem]'>circular</button>
            </div>

            <div className='flex gap-[5rem]'>
                <div>
                    <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">subir mi logo</p>
                    <button onClick={handleUploadClick} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[5rem]'><UploadFileIcon /></button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <input
                        type="range"
                        min="0.5"
                        max="1"
                        step="0.1"
                        value={currentDesign.imageScale}
                        onChange={(e) => onChangeImageScale(e.target.value)}
                    />
                </div>
                <div>
                    <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">elegir color</p>
                    <div className='relative'>
                        <button onClick={toggleOpenColorPIcker} className='border border-black text-black py-[15px] rounded-[10px]  w-[10rem] flex justify-center items-center gap-2'><div className="w-[1rem] h-[1rem] rounded-full flex items-center justify-center" style={{ backgroundColor: currentDesign.labelColor }}>
                        </div>
                            {currentDesign.labelColor}</button>
                        {isChoosingColor && (<div className="absolute top-full left-0 mt-2 z-10 shadow-lg">
                            <Colorful
                                color={hsva}
                                onChange={handleChangeColor}
                                disableAlpha={true}
                            />
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}


interface TextsFieldsProps {
    currentDesign: BottleDesign;
    setCurrentDesign: React.Dispatch<React.SetStateAction<BottleDesign>>;
}
export const TextFields = ({ currentDesign, setCurrentDesign }: TextsFieldsProps) => {
    const [hsva, setHsva] = useState((hexToHsva(currentDesign.textColor)));
    const [isChoosingColor, setIsChoosingColor] = useState(false);
    const toggleOpenColorPIcker = () => {
        setIsChoosingColor((prev) => !prev)
    }
    const handleChangeColor = (color: ColorResult) => {
        setHsva(color.hsva);
        setCurrentDesign((prev) => ({
            ...prev,
            textColor: hsvaToHex(color.hsva),
        }));
    };

    return (<div className="flex flex-col flex-1 text-left">
        <p className="fuente-principal uppercase text-[20px] text-[var(--gris3)] mb-4 font-extrabold">Textos</p>
        <div className="flex-1 flex flex-col justify-center">
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">ingresa un texto</p>
            <div className='flex gap-[1rem] mb-9'>
                <input
                    className="border border-black rounded-[10px] w-full p-1"
                    placeholder="Ingresa un texto..."
                    value={currentDesign.text}
                    type="text"
                    maxLength={15}
                    onChange={(e) =>
                        setCurrentDesign((prev) => ({
                            ...prev,
                            text: e.target.value,
                        }))
                    }
                />
            </div>
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">Tipografia</p>
            {/* buscar mas tipografias y a
            justar recorte + fixear el diseño de las opciones, stepbar icons y la pantalla en general + back con pdf/jpg */}
            <div className='flex gap-[1rem]'>
                <select
                    className="border border-black rounded-[10px] w-full p-1"
                    value={currentDesign.textTypography}
                    onChange={(e) =>
                        setCurrentDesign((prev) => ({
                            ...prev,
                            textTypography: e.target.value,
                        }))
                    }
                >
                    <option value="Roboto">Roboto</option>
                    <option value="sans-serif">Sans-serif</option>
                    <option value="Arial">Arial</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Tahoma">Tahoma</option>

                </select>
            </div>
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">Tamaño</p>
            <div className='flex gap-[1rem]'>
                <select
                    className="border border-black rounded-[10px]  p-1"
                    value={currentDesign.textSize}
                    onChange={(e) =>
                        setCurrentDesign((prev) => ({
                            ...prev,
                            textSize: parseInt(e.target.value),
                        }))
                    }
                >
                    <option value="16">16</option>
                    <option value="20">20</option>
                    <option value="26">26</option>
                    <option value="30">30</option>
                </select>
            </div>
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">Color</p>
            <div className='relative'>
                <button onClick={toggleOpenColorPIcker} className='border border-black text-black py-[15px] rounded-[10px]  w-[10rem] flex justify-center items-center gap-2'><div className="w-[1rem] h-[1rem] rounded-full flex items-center justify-center" style={{ backgroundColor: currentDesign.textColor }}>
                </div>
                    {currentDesign.textColor}</button>
                {isChoosingColor && (<div className="absolute top-full left-0 mt-2 z-10 shadow-lg">
                    <Colorful
                        color={hsva}
                        onChange={handleChangeColor}
                        disableAlpha={true}
                    />
                </div>)}
            </div>
        </div>
    </div>)
}