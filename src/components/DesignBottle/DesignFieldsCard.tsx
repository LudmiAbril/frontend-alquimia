"use client";
import React, { useRef, useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Colorful from '@uiw/react-color-colorful';
import { ColorResult, hexToHsva, hsvaToHex } from '@uiw/color-convert'; // esto es para pasar a hex
import { BottleDesign, BottleForm, FontKey } from './DesignBottle';
import ClearIcon from '@mui/icons-material/Clear';

interface DesignFieldsCardProps {
    currentStep: number;
    currentDesign: BottleDesign;
    setCurrentDesign: React.Dispatch<React.SetStateAction<BottleDesign>>;
    onNext: () => void;
    onBack: () => void;
}
export const DesignFieldsCard = ({ currentStep, currentDesign, setCurrentDesign, onNext, onBack }: DesignFieldsCardProps) => {

    return (
        <div className="w-[38rem] h-[38rem] bg-white flex flex-col  p-[2.31rem] rounded-[10px] shadow-md text-center mb-10">
            {currentStep === 0 && (<BottleFields currentDesign={currentDesign} setCurrentDesign={setCurrentDesign} />)}
            {currentStep === 1 && (<LabelFields currentDesign={currentDesign} setCurrentDesign={setCurrentDesign} />)}
            {currentStep === 2 && (<TextFields currentDesign={currentDesign} setCurrentDesign={setCurrentDesign} />)}
            <div className='mt-6 flex justify-center gap-9 w-full'>
                <button onClick={onBack} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem] cursor-pointer'>Volver</button>
                <button onClick={onNext} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem] cursor-pointer'>Continuar</button>
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
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">Volumen</p>
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
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">Forma</p>
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

    const removeImage = () => {
        setCurrentDesign((prev) => ({
            ...prev,
            labelImage: "",
        }));
    }

    return (<div className="flex flex-col flex-1 text-left">
        <p className="fuente-principal uppercase text-[20px] text-[var(--gris3)] mb-4 font-extrabold">Etiqueta</p>

        <div className="flex flex-1  flex-col justify-center items-left">
            <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">Forma</p>
            <div className='flex gap-[1rem] mb-9'>
                <button onClick={() => handleChangeLabelForm("cuadrada")} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem]'>Cuadrada</button>
                <button onClick={() => handleChangeLabelForm("circular")} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem]'>Circular</button>
            </div>


            <div className='mb-9'>
                <p className="text-[var(--gris3)] text-[20px] font-medium mb-2">Subir Mi Logo</p>
                <p className='text-[var(--gris2)] italic mb-4'>Te recomendamos que subas una imagen en formato .png</p>
                <div className='flex gap-[1rem]'>
                    <button onClick={handleUploadClick} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[5rem]'><UploadFileIcon /></button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {currentDesign.labelImage && (<>
                        <button onClick={removeImage} className="border-[0.1rem] border-[var(--gris2)] text-[var(--gris2)] py-[15px] px-2 rounded-[10px] transition ">Eliminar Imagen <ClearIcon sx={{ color: "var(--gris2)" }} /></button>
                        <input
                            type="range"
                            min="0.4"
                            max="1"
                            step="0.1"
                            value={currentDesign.imageScale}
                            onChange={(e) => onChangeImageScale(e.target.value)}
                            className="accent-[var(--violeta)]"
                        />
                    </>)}
                </div>
            </div>
            <div>
                <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">Elegir Color</p>
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

    return (<div className="flex flex-col flex-1 text-left self-start">
        <p className="fuente-principal uppercase text-[20px] text-[var(--gris3)] mb-4 font-extrabold">Textos</p>
        <div className="flex-1 flex flex-col gap-2">
            <div className='flex gap-[1rem]'>
                <div>
                    <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">Ingresa Un texto</p>
                    <div className='flex gap-[1rem] items-left mb-9'>
                        <input
                            className="border border-black rounded-[10px] w-[14rem] p-1"
                            placeholder="Ingresa un texto..."
                            value={currentDesign.text}
                            type="text"
                            maxLength={20}
                            onChange={(e) =>
                                setCurrentDesign((prev) => ({
                                    ...prev,
                                    text: e.target.value,
                                }))
                            }
                        />
                    </div>
                </div>
                <div>
                    <p className="text-[var(--gris3)] text-[20px] font-medium mb-6">Posición</p>
                    <div className='mb-9 flex justify-center items-baseline'>
                        <input
                            type="range"
                            min="0.1"
                            max="0.9"
                            step="0.01"
                            value={currentDesign.textYPosition}
                            onChange={(e) =>
                                setCurrentDesign((prev) => ({
                                    ...prev,
                                    textYPosition: parseFloat(e.target.value),
                                }))
                            }
                            className="accent-[var(--violeta)]"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className='flex gap-[1rem]'>
                    <div>
                        <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">Tipografia</p>
                        <div className='flex gap-[1rem] mb-9'>
                            <select
                                className="border border-black rounded-[10px] p-1 w-[13rem]"
                                value={currentDesign.textTypography}
                                onChange={(e) => {
                                    const value = e.target.value as FontKey;
                                    setCurrentDesign((prev) => ({
                                        ...prev,
                                        textTypography: value,
                                    }));
                                }}
                            >
                                <option value="roboto">Roboto</option>
                                <option value="josefinSans">Josefin Sans</option>
                                <option value="libreBaskerville">Libre Baskerville</option>
                                <option value="greatVibes">Great Vibes</option>
                                <option value="petitFormalScript">Petit Formal Script</option>
                                <option value="charmonman">Charmonman</option>
                                <option value="paprika">Paprika</option>
                                <option value="badScript">Bad Script</option>

                            </select>
                        </div>
                    </div>
                    <div>
                        <p className="text-[var(--gris3)] text-[20px] font-medium mb-4">Tamaño</p>
                        <div className='flex gap-[1rem]'>
                            <select
                                className="border border-black rounded-[10px] p-1 w-[4rem]"
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
                                <option value="34">34</option>
                                <option value="36">36</option>
                            </select>
                        </div>
                    </div>

                </div>

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