"use client";

import { hexToHsva, ColorResult, hsvaToHex } from "@uiw/color-convert";
import Colorful from "@uiw/react-color-colorful";
import { useState, useRef } from "react";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';
import { useDesignBottle } from "@/context/DesignBottleContext";

export const LabelFields = () => {
    const { currentDesign, setCurrentDesign } = useDesignBottle();
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
                <button onClick={() => handleChangeLabelForm("redonda")} className='bg-[var(--violeta)] text-white py-[15px] rounded-[10px] hover:bg-[var(--lila)] transition w-[10rem]'>Redonda</button>
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