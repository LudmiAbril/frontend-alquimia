"use client";

import { useState, useEffect, useCallback } from "react";
import Bienvenida from "./Bienvenida";

/* ------------------- Pasos del proceso de diseño -------------------- */
const PASOS = ["Bienvenida", "Notas", "Intensidad", "Formula"] as const;

/* ------------------- Tipos que llegan del backend ------------------- */
export interface RawNota {
    id: number;
    nombre: string;
    descripcion: string;
    sectorId: number;
    familiaOlfativaId?: number;
    /** Presente sólo cuando el endpoint incluye navegación. */
    familiaOlfativa?: {
        id: number;
        nombre: string;
        description: string;
    } | null;
}

/* ------------------- Tipos usados en el frontend -------------------- */
export interface Nota {
    id: number;
    nombre: string;
    descripcion: string;
    /** Nombre de la familia para mostrar (“Cítrica”, “Gourmand”…). */
    familia: string;
}

/** Normaliza la nota que llega del backend al formato que usa la UI. */
const mapNota = (n: RawNota): Nota => ({
    id: n.id,
    nombre: n.nombre,
    descripcion: n.descripcion,
    familia: n.familiaOlfativa?.nombre ?? "Sin familia",
});

/* ==================================================================== */
/* ======================== Componente principal ====================== */
/* ==================================================================== */

export default function DisenarPerfume() {
    /* ---------------------------- Estados ----------------------------- */
    const [pasoActual, setPasoActual] = useState(0);
    const [notas, setNotas] = useState<Nota[]>([]);
    const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
    const [compatibles, setCompatibles] = useState<Nota[]>([]);

    /* ------------------------- Config helpers ------------------------- */
    const API_URL =
        process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:7164"; // fallback

    /** Alterna una nota (agregar / quitar) */
    const toggleNota = useCallback(
        (id: number) =>
            setSeleccionadas((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            ),
        []
    );

    /* ---------------------------- Efectos ----------------------------- */
    /* 1️⃣  Carga inicial de la biblioteca de notas */
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

    /* 2️⃣  Cada vez que cambian las seleccionadas, pedir compatibles     */
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

    /* ----------------------- Navegación de pasos ---------------------- */
    const avanzarPaso = () =>
        setPasoActual((p) => Math.min(p + 1, PASOS.length - 1));
    const retrocederPaso = () => setPasoActual((p) => Math.max(p - 1, 0));

    /* ----------------------------- Render ----------------------------- */
    if (pasoActual === 0) return <Bienvenida onNext={avanzarPaso} />;

    return (
        <div style={{ padding: 32 }}>
            <h1>Diseñá tu perfume – Paso {pasoActual}: Notas</h1>

            {/* -------- Biblioteca completa -------- */}
            <section>
                <h2>Biblioteca</h2>
                {notas.map((n) => (
                    <button
                        key={n.id}
                        onClick={() => toggleNota(n.id)}
                        style={{
                            margin: 6,
                            padding: "6px 12px",
                            borderRadius: 6,
                            border: "1px solid #ccc",
                            background: seleccionadas.includes(n.id) ? "#e2e2e2" : "#fff",
                        }}
                    >
                        {n.nombre} <small>({n.familia})</small>
                    </button>
                ))}
            </section>

            {/* -------- Notas seleccionadas -------- */}
            <section style={{ marginTop: 24 }}>
                <h3>Notas seleccionadas ({seleccionadas.length})</h3>
                <ul>
                    {notas
                        .filter((n) => seleccionadas.includes(n.id))
                        .map((n) => (
                            <li key={`sel-${n.id}`}>{n.nombre}</li>
                        ))}
                </ul>
            </section>

            {/* -------- Sugerencias compatibles -------- */}
            {compatibles.length > 0 && (
                <section style={{ marginTop: 24 }}>
                    <h3>Sugerencias compatibles</h3>
                    <ul>
                        {compatibles.map((n) => (
                            <li key={`comp-${n.id}`}>
                                {n.nombre} – <em>{n.familia}</em>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* -------- Botones de navegación -------- */}
            <div style={{ marginTop: 32 }}>
                <button onClick={retrocederPaso} disabled={pasoActual === 0}>
                    ← Atrás
                </button>
                <button
                    onClick={avanzarPaso}
                    disabled={seleccionadas.length < 4}
                    style={{ marginLeft: 12 }}
                >
                    Siguiente →
                </button>
            </div>
        </div>
    );
}
