"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/general/Button";
import SectionWrapper from "@/components/general/SectionWrapper";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { families } from "@/components/utils/utils";

export default function TestIntroSection() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <SectionWrapper className="relative bg-[#E8E3DE] text-justify overflow-hidden">

            <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--gris4)] mb-8 text-center">
                    ¿NO SABÉS POR DÓNDE EMPEZAR?
                </h2>

                <p className="text-xl text-[var(--gris3)] mb-12 leading-relaxed">
                    Si no estás seguro de qué tipo de fragancia es la que mejor te representa, ¡El quiz olfativo de Alquimia es perfecto para vos! Responde algunas preguntas y descubre tu familia olfativa ideal. Es rápido, fácil y te sorprenderás de los resultados.
                </p>


                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-[2.5rem]">
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
                  ${isHovered ? "scale-110 z-10" : ""}
                  ${isAnyHovered && !isHovered ? "scale-90 opacity-40 grayscale" : ""}`}
                            >
                                <div className="w-[230px] h-[250px] mb-4 rounded-xl border-2 border-[#9444B6] overflow-hidden">
                                    <Image
                                        src={src}
                                        alt={name}
                                        width={isHovered ? 220 : 200}
                                        height={isHovered ? 220 : 200}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <span className="text-xl font-semibold text-[var(--gris4)]">{name}</span>
                            </motion.div>
                        );
                    })}
                </div>
                <div className="flex items-center justify-center gap-3 text-xl text-[var(--gris3)] italic  ">
                    <InfoOutlinedIcon fontSize="medium" className="text-[var(--gris3)]" />
                    <p className="leading-relaxed">
                        Ideal si no sabés por dónde empezar o querés dejarte sorprender.
                    </p>
                </div>
                <div className="text-center mt-12">
                    <Button
                        label="Comenzar el quiz"
                        href="/quiz"
                        colorClass="bg-violeta text-white hover:bg-[#7a2f96]"
                    />
                </div>


            </div>
        </SectionWrapper>
    );
}
