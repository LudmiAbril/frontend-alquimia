"use client";

import Colorful from "@uiw/react-color-colorful";
import { useState } from "react";

import { hexToHsva, ColorResult, hsvaToHex } from "@uiw/color-convert";
import { FontKey } from "../utils/utils";
import { useDesignBottleStore } from "@/store/DesignBottleStore";

export const TextFields = () => {
    const { currentDesign, setCurrentDesign } = useDesignBottleStore();
    const [hsva, setHsva] = useState((hexToHsva(currentDesign.textColor)));
    const [isChoosingColor, setIsChoosingColor] = useState(false);
    const toggleOpenColorPIcker = () => {
        setIsChoosingColor((prev) => !prev)
    }
    const handleChangeColor = (color: ColorResult) => {
        setHsva(color.hsva);
        setCurrentDesign({
            ...currentDesign,
            textColor: hsvaToHex(color.hsva),
        });
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
                                setCurrentDesign({
                                    ...currentDesign,
                                    text: e.target.value,
                                })
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
                                setCurrentDesign({
                                    ...currentDesign,
                                    textYPosition: parseFloat(e.target.value),
                                })
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
                                    setCurrentDesign({
                                        ...currentDesign,
                                        textTypography: value,
                                    });
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
                                    setCurrentDesign({
                                        ...currentDesign,
                                        textSize: parseInt(e.target.value),
                                    })
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