"use client";

import { useState, useEffect, useCallback } from "react";
import Bienvenida from "./Bienvenida";

// ------------------ PasoCard incorporado ------------------
const PasoCard = ({ pasoActual, avanzar, volver }: { pasoActual: number, avanzar: () => void, volver: () => void }) => (
    <div className='flex items-center gap-6'>
        <img
            src={pasoActual <= 1 ? '/arrow-left-inactive.svg' : '/arrow-left-active.svg'}
            alt="flecha"
            className='cursor-pointer'
            onClick={() => {
                if (pasoActual > 1) volver();
            }}
        />
        <div className='bg-white p-6 rounded-[10px] items-center flex flex-col w-[409px] h-[179px] shadow-md'>
            <img src="/icono-info.svg" alt="info" className='mb-[18px]' />
            <h3 className='mb-[10px]'>PASO {pasoActual} - NOTA DE FONDO</h3>
            <p>Profunda, duradera... la estela que perdura.</p>
        </div>
        <img
            src={pasoActual >= 4 ? '/arrow-right-inactive.svg' : '/arrow-right-active.svg'}
            alt="flecha"
            className='cursor-pointer'
            onClick={() => {
                if (pasoActual < 4) avanzar();
            }}
        />
    </div>
);

// ------------------- Pasos del proceso --------------------
const PASOS = ["Bienvenida", "Notas", "Intensidad", "Formula"] as const;

// ------------------- Tipos --------------------
export interface RawNota {
    id: number;
    nombre: string;
    descripcion: string;
    sectorId: number;
    familiaOlfativaId?: number;
    familiaOlfativa?: {
        id: number;
        nombre: string;
        description: string;
    } | null;
}

export interface Nota {
    id: number;
    nombre: string;
    descripcion: string;
    familia: string;
}

const mapNota = (n: RawNota): Nota => ({
    id: n.id,
    nombre: n.nombre,
    descripcion: n.descripcion,
    familia: n.familiaOlfativa?.nombre ?? "Sin familia",
});

// ------------------- Componente principal --------------------
export default function DisenarPerfume() {
    const [pasoActual, setPasoActual] = useState(0);
    const [notas, setNotas] = useState<Nota[]>([]);
    const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
    const [compatibles, setCompatibles] = useState<Nota[]>([]);

    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:7164";

    const toggleNota = useCallback(
        (id: number) =>
            setSeleccionadas((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            ),
        []
    );

    useEffect(() => {
        const abort = new AbortController();
        fetch(`${API_URL}/api/notas`, { signal: abort.signal })
            .then((r) => {
                if (!r.ok) throw new Error(`GET /api/notas → ${r.status}`);
                return r.json();
            })
            .then((data: RawNota[]) => data.map(mapNota))
            .then(setNotas)
            .catch((err) => {
                if (err.name !== "AbortError") console.error(err);
            });
        return () => abort.abort();
    }, [API_URL]);

    useEffect(() => {
        if (seleccionadas.length === 0) {
            setCompatibles([]);
            return;
        }

        const abort = new AbortController();

        fetch(`${API_URL}/api/notas/compatibles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(seleccionadas),
            signal: abort.signal,
        })
            .then((r) => {
                if (!r.ok) throw new Error(`POST /compatibles → ${r.status}`);
                return r.json();
            })
            .then((data: RawNota[]) => data.map(mapNota))
            .then(setCompatibles)
            .catch((err) => {
                if (err.name !== "AbortError") console.error(err);
            });

        return () => abort.abort();
    }, [seleccionadas, API_URL]);

    const avanzarPaso = () => setPasoActual((p) => Math.min(p + 1, PASOS.length - 1));
    const retrocederPaso = () => setPasoActual((p) => Math.max(p - 1, 0));

    if (pasoActual === 0) return <Bienvenida onNext={avanzarPaso} />;

    return (
        <div className='flex flex-col items-center bg-[20px]'>
            <h1 className='fuente-principal text-[var(--gris4)] text-[32px] font-bold mb-4'>CREANDO FRAGANCIA</h1>

            {/* barra pasos (estética) */}
            <div className='flex items-center mb-10'>
                <img src="/icono-pocion-inicio.svg" alt="" />
                <div className='w-[114px] h-[2px] bg-[var(--violeta)]'></div>
                <div className='rounded-full border-2 border-[var(--violeta)] p-2'></div>
                <div className='w-[114px] h-[2px] bg-[var(--violeta)]'></div>
                <div className='rounded-full border-2 border-[var(--violeta)] p-2'></div>
                <div className='w-[114px] h-[2px] bg-[var(--violeta)]'></div>
                <div className='rounded-full border-2 border-[var(--violeta)] p-2'></div>
                <div className='w-[114px] h-[2px] bg-[var(--violeta)]'></div>
                <div className='rounded-full border-2 border-[var(--violeta)] p-2'></div>
                <div className='w-[114px] h-[2px] bg-[var(--violeta)]'></div>
                <img src="/icono-pocion-final.svg" alt="" />
            </div>

            {/* contenido */}
            <div className='flex justify-center gap-[80px]'>
                <div className='flex flex-col items-center gap-[50px]'>
                    <PasoCard pasoActual={pasoActual} avanzar={avanzarPaso} volver={retrocederPaso} />
                    <img src="/frasco-diseño.svg" alt="" />
                </div>

                {/* Biblioteca funcional */}
                <div className='w-[38rem] h-[44rem] bg-white flex flex-col items-center p-[2.31rem] rounded-[10px] shadow-md overflow-y-scroll'>
                    <p className='fuente-principal uppercase text-[20px] text-[var(--gris3)] mb-4 font-extrabold'>Biblioteca de notas</p>
                    <p className='italic mb-4 w-[527px] text-[var(--gris4)] text-[14px]'>Seleccioná al menos 4 notas para continuar.</p>

                    <div className='grid grid-cols-2 gap-2'>
                        {notas.map((n) => (
                            <button
                                key={n.id}
                                onClick={() => toggleNota(n.id)}
                                className={`p-2 border rounded ${seleccionadas.includes(n.id) ? 'bg-[var(--violeta)] text-white' : 'bg-white text-black border-gray-300'}`}
                            >
                                {n.nombre} <small>({n.familia})</small>
                            </button>
                        ))}
                    </div>

                    {compatibles.length > 0 && (
                        <div className="mt-6 w-full">
                            <h3 className="text-[var(--gris4)] font-bold">Sugerencias compatibles</h3>
                            <ul className="list-disc list-inside text-sm">
                                {compatibles.map((n) => (
                                    <li key={`comp-${n.id}`}>
                                        {n.nombre} – <em>{n.familia}</em>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
