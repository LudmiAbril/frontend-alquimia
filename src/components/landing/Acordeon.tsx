"use client";
import { useState } from "react";
import SectionWrapper from "@/components/general/SeccionWrapper";

const preguntas = [
    {
        pregunta: "¿Por qué elegir Alquimia para crear tu perfume?",
        respuesta:
            "Porque ofrecemos una experiencia creativa, accesible y guiada para que cualquier persona pueda crear su fragancia personalizada sin necesidad de conocimientos previos.",
    },
    {
        pregunta: "¿Cómo crear tu propio perfume online?",
        respuesta:
            "Usá nuestro editor interactivo para elegir tus notas favoritas, combinarlas en una fórmula y personalizar tu envase antes de conectarte con proveedores.",
    },
    {
        pregunta: "¿Cómo funciona Alquimia?",
        respuesta:
            "Alquimia te permite crear perfumes eligiendo tus notas favoritas, combinándolas y personalizando tu envase desde nuestra plataforma interactiva.",
    },
    {
        pregunta: "¿Necesito conocimientos previos?",
        respuesta:
            "No, nuestra experiencia está diseñada para guiarte paso a paso en todo momento.",
    },
    {
        pregunta: "¿Puedo comprar ingredientes desde la plataforma?",
        respuesta:
            "Sí. Te conectamos con proveedores registrados que ofrecen materias primas como esencias, frascos y más.",
    },
];

export default function Acordeon() {
    const [abierto, setAbierto] = useState<null | number>(null);

    const toggle = (index: number) => {
        setAbierto(abierto === index ? null : index);
    };

    return (
        <SectionWrapper className="bg-[var(--hueso)]">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[var(--gris4)] uppercase ">
                Preguntas frecuentes
            </h2>

            <div className="space-y-4">
                {preguntas.map((item, index) => (
                    <div key={index} className=" rounded-xl bg-white shadow-sm transition-all">
                        {/* El boton se compone de la pregunta + icono */}
                        <button
                            onClick={() => toggle(index)}
                            className="w-full p-5 flex justify-between items-center text-left text-[#444] font-semibold hover:bg-[var(--lila)] rounded-xl transition-colors"
                        >
                            {/* iteracion de las preguntas que estan definidas arriba */}
                            <span>{item.pregunta}</span>
                            {/* solo es la flecha del acordeon */}
                            <svg
                                className={`w-5 h-5 text-[#9444B6] transition-transform duration-300 ${abierto === index ? "rotate-180" : "" }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            className={`px-5 overflow-hidden text-sm text-gray-600 transition-all duration-300 ${abierto === index ? "max-h-[300px] pb-4 pt-2" : "max-h-0" }`} >
                            {item.respuesta}
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
