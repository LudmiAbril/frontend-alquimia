"use client";

import { useState, useEffect, useCallback } from "react";
import Bienvenida from "./Bienvenida";

/** Pasos del proceso de diseño */
const PASOS = ["Bienvenida", "Notas", "Intensidad", "Formula"] as const;

/**
 * Tipos que llegan crudos del backend (ASP.NET devuelve PascalCase).
 */
interface RawNota {
  Id: number;
  Nombre: string;
  Descripcion: string;
  FamiliaOlfativa?: { Nombre: string } | null;
}

/**
 * Tipo que usa el frontend —camelCase y sin campos que puedan ser null.
 */
interface Nota {
  id: number;
  nombre: string;
  descripcion: string;
  familiaOlfativaNombre: string; // si el backend envía null => "Sin familia"
}

/** Transformación de RawNota → Nota */
const mapNota = (n: RawNota): Nota => ({
  id: n.Id,
  nombre: n.Nombre,
  descripcion: n.Descripcion,
  familiaOlfativaNombre: n.FamiliaOlfativa?.Nombre ?? "Sin familia",
});

export default function DisenarPerfume() {
  /* --------------------------- Estados globales --------------------------- */
  const [pasoActual, setPasoActual] = useState(0);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [compatibles, setCompatibles] = useState<Nota[]>([]);

  /* --------------------------- Helpers ------------------------------------ */
  const API_URL = process.env.NEXT_PUBLIC_API_URL!; // ¡asegúrate de tenerla en .env.local!

  /** Alterna una nota (agregar / quitar) */
  const toggleNota = useCallback(
    (id: number) =>
      setSeleccionadas((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      ),
    []
  );

  /* --------------------------- Efectos ------------------------------------ */
  /** 1️⃣  Carga inicial de notas */
  useEffect(() => {
    const abort = new AbortController();
    fetch(`${API_URL}/api/notas`, { signal: abort.signal })
      .then((r) => r.json())
      .then((data: RawNota[]) => data.map(mapNota))
      .then(setNotas)
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => abort.abort();
  }, [API_URL]);

  /** 2️⃣  Pide compatibles cada vez que cambian las seleccionadas */
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
      .then((r) => r.json())
      .then((data: RawNota[]) => data.map(mapNota))
      .then(setCompatibles)
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => abort.abort();
  }, [seleccionadas, API_URL]);

  /* --------------------------- Navegación pasos --------------------------- */
  const avanzarPaso = () => setPasoActual((p) => Math.min(p + 1, PASOS.length - 1));
  const retrocederPaso = () => setPasoActual((p) => Math.max(p - 1, 0));

  /* --------------------------- Render ------------------------------------ */
  if (pasoActual === 0) return <Bienvenida onNext={avanzarPaso} />;

  return (
    <div style={{ padding: 32 }}>
      <h1>Diseñá tu perfume – Paso {pasoActual}: Notas</h1>

      {/* Biblioteca completa */}
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
            {n.nombre} <small>({n.familiaOlfativaNombre})</small>
          </button>
        ))}
      </section>

      {/* Seleccionadas */}
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

      {/* Compatibles */}
      {compatibles.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h3>Sugerencias compatibles</h3>
          <ul>
            {compatibles.map((n) => (
              <li key={`comp-${n.id}`}>
                {n.nombre} – <em>{n.familiaOlfativaNombre}</em>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Navegación */}
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
