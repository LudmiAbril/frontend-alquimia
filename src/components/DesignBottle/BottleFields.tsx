"use client";

import { useDesignBottleStore } from "@/store/DesignBottleStore";
import { BottleForm } from "../utils/typing";


export const BottleFields = () => {
    const {
        currentDesign,
        setCurrentDesign
    } = useDesignBottleStore();

    const setBottleVolume = (volume: number) => {
        setCurrentDesign({
            ...currentDesign,
            volume,
        });

    };
    const setBottleForm = (form: BottleForm) => {
        setCurrentDesign({
            ...currentDesign,
            form,
        });
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