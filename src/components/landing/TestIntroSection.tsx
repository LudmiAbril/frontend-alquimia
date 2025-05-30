"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/general/Button";
import SectionWrapper from "@/components/general/SectionWrapper";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { families } from "@/components/utils/utils";

export default function TestIntroSection() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <SectionWrapper className="relative bg-[#E8E3DE] text-center overflow-hidden">
            <div className="hidden md:block absolute left-0 bottom-0 z-0">
                <Image
                    src="/LandingImage/Test/bg-left.svg"
                    alt="Árbol izquierdo"
                    width={180}
                    height={850}
                    className="object-contain"
                />
            </div>

            <div className="hidden md:block absolute right-0 bottom-0 z-0">
                <Image
                    src="/LandingImage/Test/bg-right.svg"
                    alt="Árbol derecho"
                    width={250}
                    height={850}
                    className="object-contain"
                />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[var(--gris4)] mb-5">
                ¿NO SABÉS POR DÓNDE EMPEZAR?
            </h2>
            <p className="text-sm italic text-[var(--gris3)] mb-16">
                DEJÁ QUE LA MAGIA TE GUÍE.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-[5rem]">
                <div className="flex items-end">
                    {families.map(({ name, src }, index) => {
                        const isHovered = hovered === name;
                        const isAnyHovered = hovered !== null;

                        return (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setHovered(name)}
                                onMouseLeave={() => setHovered(null)}
                                className={`transition-all duration-300 ease-in-out flex flex-col items-center cursor-pointer
    ${isHovered ? "scale-[0.4] md:scale-[0.9] z-10" : ""}
    ${isAnyHovered && !isHovered ? "scale-90 opacity-40 grayscale" : ""}
  `}
                            >
                                <Image
                                    src={src}
                                    alt={name}
                                    width={isHovered ? 170 : 140} 
                                    height={isHovered ? 200 : 160}
                                    className={`transition-all duration-300 ${isHovered ? "mb-0" : "-mb-2"}`}
                                />
                                <span className="text-xs font-semibold text-[var(--gris4)] mt-4">{name}</span>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="text-left md:text-center md:w-[260px] flex flex-col items-center md:items-start">
                    <p className="text-[15.5px] font-semibold text-[var(--gris4)] mb-5">
                        ¿CUÁL ES TU FAMILIA OLFATIVA?
                    </p>
                    <Button
                        label="QUIERO TOMAR EL TEST"
                        onClick={() => console.log("Ir al test")}
                        colorClass="bg-violeta text-white hover:bg-[#7a2f96]"
                    />
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-[var(--gris3)] italic mt-6 md:mt-16 max-w-lg mx-auto">
                <InfoOutlinedIcon fontSize="small" className="text-[var(--gris3)]" />
                <p className="leading-snug">
                    Ideal si no sabés por dónde empezar o querés dejarte sorprender.
                </p>
            </div>


        </SectionWrapper>
    );
}
