"use client"

import { useState } from "react"
import Bienvenida from "./Bienvenida";
import Confeccion from "./Confeccion";

// Pasos del proceso de diseño
const pasos = ["Bienvenida", "Nota Base", "Nota Corazon", "Nota Salida", "Intensidad", "Formula"] as const;


const DisenarPerfume = () => {
    const [pasoActual, setPasoActual] = useState<number>(0);

    const avanzarPaso = () => {
        if (pasoActual < pasos.length - 1) {
            setPasoActual((prev) => prev + 1);
        }
    };

    const retrocederPaso = () => {
        if (pasoActual > 0) {
            setPasoActual((prev) => prev - 1);
        }
    };


    return (
        <>
            {pasoActual === 0 ? (
                <Bienvenida onNext={avanzarPaso} />
            ) : pasoActual < pasos.length - 1 ? (
                <Confeccion pasoActual={pasoActual} avanzar={avanzarPaso} volver={retrocederPaso} />
            ) : (<></>)
            }
        </>
    );

};


export default DisenarPerfume