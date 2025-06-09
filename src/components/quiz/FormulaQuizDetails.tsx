"use client"

import React from "react";
import { GetFormulaResponse } from "@/components/CreatePerfume/FormulaResult"; // Importar la interfaz de la fórmula

interface FormulaProps {
  formula: GetFormulaResponse;
}

const Formula = ({ formula }: FormulaProps) => {
  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Tu fórmula</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-purple-700">
        <div>
          <p className="font-bold text-purple-600">Nota de Salida</p>
          <p>{formula.NotasSalidaIds?.[0]?.Name || "Nota no disponible"}</p>
        </div>
        <div>
          <p className="font-bold text-purple-600">Nota de Corazón</p>
          <p>{formula.NotasCorazonIds?.[0]?.Name || "Nota no disponible"}</p>
        </div>
        <div>
          <p className="font-bold text-purple-600">Nota de Fondo</p>
          <p>{formula.NotasFondoIds?.[0]?.Name || "Nota no disponible"}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-bold text-purple-600">Intensidad:</p>
        <p>{formula.Intensity.Name}</p>
      </div>

      <div className="mt-4">
        <p className="font-bold text-purple-600">Concentración:</p>
        <p>{formula.ConcentracionEsencia}% Esencia, {formula.ConcentracionAlcohol}% Alcohol, {formula.ConcentracionAgua}% Agua</p>
      </div>
    </div>
  );
};

export default Formula;
