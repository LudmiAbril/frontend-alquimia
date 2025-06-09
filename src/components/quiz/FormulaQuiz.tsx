"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { GetFormulaResponse, SaveFormulaDTO, NotesGroupDTO } from "../CreatePerfume/FormulaResult";
import { getFormulaById, submitFormula } from "@/services/createPerfumeService";
import FormulaQuizDetails from "./FormulaQuizDetails";

export default function FormulaQuiz() { 
  const params = useSearchParams();

  // Obtener las notas y concentración desde los parámetros de la URL
  const topNote = params.get("top");
  const heartNote = params.get("heart");
  const baseNote = params.get("base");
  const concentration = params.get("type");

  const [savedFormulaId, setSavedFormulaId] = useState<number | null>(null);
  const [savedFormula, setSavedFormula] = useState<GetFormulaResponse | null>(null);

  // Cargar la fórmula guardada al obtener el ID
  useEffect(() => {
    if (savedFormulaId) {
      const fetchSavedFormula = async () => {
        const formulaData = await getFormulaById(savedFormulaId); 
        setSavedFormula(formulaData);
      };
      fetchSavedFormula();
    }
  }, [savedFormulaId]);

  // Función para guardar la fórmula
  const saveFormula = async () => {
    if (topNote && heartNote && baseNote && concentration) {
      // Agrupar las notas en el formato adecuado para el payload
      const topNotes: NotesGroupDTO = { "0": { Id: parseInt(topNote) } };
      const heartNotes: NotesGroupDTO = { "0": { Id: parseInt(heartNote) } };
      const baseNotes: NotesGroupDTO = { "0": { Id: parseInt(baseNote) } };

      const formulaPayload: SaveFormulaDTO = {
        IntensityId: 1, // Asignar un ID de intensidad, por ejemplo, si lo tienes.
        CreatorId: 1,   // Asignar un ID de creador, este valor debería ser dinámico, si lo tienes.
        TopNotes: topNotes,
        HeartNotes: heartNotes,
        BaseNotes: baseNotes,
      };

      // Enviar la fórmula al backend
      const formulaId = await submitFormula(formulaPayload);
      if (formulaId) {
        setSavedFormulaId(formulaId); // Guardamos el ID de la fórmula
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center text-gray-700">
      <h1 className="text-3xl font-bold text-[var(--violeta)] mb-4">Tu fórmula recomendada</h1>

      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 w-full max-w-md shadow">
        <p className="text-sm mb-2 text-gray-600">Tipo de concentración:</p>
        <p className="text-lg font-semibold mb-4">{concentration}</p>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div>
            <p className="font-bold text-purple-600">Nota de Salida</p>
            <p>{topNote}</p>
          </div>
          <div>
            <p className="font-bold text-purple-600">Nota de Corazón</p>
            <p>{heartNote}</p>
          </div>
          <div>
            <p className="font-bold text-purple-600">Nota de Fondo</p>
            <p>{baseNote}</p>
          </div>
        </div>
      </div>

      {/* Botón para guardar la fórmula */}
      <button
        onClick={saveFormula}
        className="mt-6 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700"
      >
        Guardar mi fórmula
      </button>

      {/* Mostrar la fórmula guardada */}
      {savedFormula && <FormulaQuizDetails formula={savedFormula} />}
    </div>
  );
}
