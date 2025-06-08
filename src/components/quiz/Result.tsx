"use client"

import { PropsResult, SummaryItem } from "@/components/utils/typing"
import Card3D from "./Card3d"
import { answerSummaryMap, backgroundByFamily, familyPet } from "../utils/utils"
import { useState } from "react"

export default function Result({ result, answers, onReset }: PropsResult){ 

  const backgroundImage = backgroundByFamily[result.nombre] || "/quiz/familia-fondos/amaderadaBack.png"
  const familyPets = familyPet[result.nombre] || "/mascotas/amaderada.png"
const [showFormula, setShowFormula] = useState(false);



const dynamicSummary: SummaryItem[] = answers
  .map((answer) => {
const entry = answerSummaryMap[answer.questionId]?.[answer.selectedOption];


    return entry ?? null;
  })
  .filter((e): e is SummaryItem => e !== null);



  const formula = result.formulas?.[0]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 ">
      <div className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl w-full">
        {/* Card 3D estilo Mythrill */}
        <Card3D backgroundSrc={backgroundImage} characterSrc={familyPets} alt={result.nombre} title={result.nombre} />

        {/* Contenido textual */}
        <div className="flex-1 text-center lg:text-left text-[var(--gris4)]">
          <div className="bg-purple-100 inline-block px-4 py-2 rounded-full text-sm font-medium text-purple-800 mb-4 animate-pulse">
            ¡Quiz completado!
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Tu familia olfativa es:</h1>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-6">
            {result.nombre}
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-line">{result.descripcion}</p>

          {result.subfamilias && result.subfamilias.length > 0 && (
            <div className="mb-6">
              <h3 className="text-md font-semibold text-purple-800 mb-2">Subfamilias destacadas:</h3>
              <ul className="flex flex-wrap gap-2 text-sm text-purple-700">
                {result.subfamilias.map((sub, idx) => (
                  <li key={idx} className="bg-purple-100 px-3 py-1 rounded-full">
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {formula && (
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-6">
              <h3 className="text-md font-semibold text-purple-800 mb-4">Fórmula sugerida para vos:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-purple-700">
                <div>
                  <p className="font-bold text-purple-600">Nota de Salida</p>
                  <p>{formula.TopNote}</p>
                </div>
                <div>
                  <p className="font-bold text-purple-600">Nota de Corazón</p>
                  <p>{formula.HeartNote}</p>
                </div>
                <div>
                  <p className="font-bold text-purple-600">Nota de Fondo</p>
                  <p>{formula.BaseNote}</p>
                </div>
              </div>
            </div>
          )}

          {result.concentracion && result.concentracion !== "Desconocido" && (
            <p className="mb-6 text-sm italic text-gray-600">
              Concentración sugerida: <span className="font-medium">{result.concentracion}</span>
            </p>
          )}

          {/* Resumen de respuestas */}
<section className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-md max-w-2xl mx-auto">
  <h3 className="text-center text-lg font-semibold text-gray-700 mb-4">Resumen de tu test</h3>
<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {dynamicSummary.map((item, idx) => (
    <li
      key={idx}
      className="flex items-center gap-4 p-4 rounded-xl shadow-sm"
      style={{ backgroundColor: item.color }}
    >
      <div className="text-3xl">{item.icon}</div>
      <div className="text-sm text-gray-800">
        <strong>{item.label}:</strong> {item.value}
      </div>
    </li>
  ))}
</ul>

</section>


      <button
  onClick={onReset}
  className="bg-[var(--violeta)] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-[0_0_12px_4px_rgba(148,68,182,0.5)] hover:scale-105"
>
 
  Volver a empezar
</button>
{!showFormula && (
  <button
    onClick={() => setShowFormula(true)}
    className="bg-[var(--violeta)] text-white px-6 py-3 rounded-full mt-6 hover:scale-105 transition-all"
  >
    Ver fórmula recomendada
  </button>
)}
{showFormula && (
  <div className="...">{/* mostrar fórmula aquí */}</div>
)}



        </div>
      </div>
    </div>
  )
}
