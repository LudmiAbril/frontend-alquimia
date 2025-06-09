"use client";

import { getIntensities } from "@/services/createPerfumeService";
import { useState, useEffect } from "react";
import { Intensity } from "../Utils/typing";

interface IntensityContainerProps {
    onConfirm: () => void;
    onSelectIntensity: (intensity: Intensity) => void;
}

export const IntensityContainer = ({
    onConfirm,
    onSelectIntensity,
}: IntensityContainerProps) => {
    const [selectedIntensity, setSelectedIntensity] = useState<string | null>(
        null
    );
    const [intensities, setIntensities] = useState<Intensity[]>([]);

    const handleSelect = (intensity: Intensity) => {
        setSelectedIntensity(intensity.Name);
        onSelectIntensity(intensity);
    };

    useEffect(() => {
        const fetchIntensities = async () => {
            const intensities = await getIntensities();
            console.log(intensities)
            setIntensities(intensities);
        };

        fetchIntensities();
    }, []);

    return (
        <div className="mt-[3rem]">
            <div className="flex flex-col gap-[46px] items-center text-white">
                {intensities.map((intensity, key) => {
                    const isSelected = selectedIntensity === intensity.Name;
                    return (
                        <div
                            key={key}
                            className={`w-[430px] h-[103px] rounded-[10px] cursor-pointer flex flex-col items-center justify-center transition
              ${isSelected
                                    ? "bg-[var(--violeta)]"
                                    : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
                                }`}
                            onClick={() => handleSelect(intensity)}
                        >
                            <p className="fuente-principal uppercase font-bold text-[20px] mb-2">
                                {intensity.Name} - {intensity.Category}
                            </p>
                            <p className="text-[14px]">{intensity.Description}</p>
                        </div>
                    );
                })}
            </div>
            <button
                disabled={!selectedIntensity}
                className={`px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase transition-colors duration-200 ${selectedIntensity
                    ? "bg-[var(--violeta)] cursor-pointer"
                    : "bg-gray-400"
                    }`}
                onClick={selectedIntensity ? onConfirm : undefined}
            >
                confirmar
            </button>

        </div>
    );
};