"use client"

import { useState } from "react"
import Bienvenida from "./Bienvenida";

// Pasos del proceso de diseño
const pasos = ["Bienvenida", "Nota Base", "Nota Corazon", "Nota Salida", "Intensidad", "Formula"] as const;


const DisenarPerfume = () => {
    const [pasoActual, setPasoActual] = useState(0);

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


    if (pasoActual === 0) return <Bienvenida onNext={avanzarPaso} />;
}

export default DisenarPerfume