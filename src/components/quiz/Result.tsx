"use client"

import { PropsResult, SummaryItem } from "@/components/utils/typing"
import Card3D from "./Card3d"
import { answerSummaryMap, backgroundByFamily, familyDescriptions, familyPet } from "../utils/utils"
import { useState } from "react"
import ButtonSecondary from "../general/ButtonSecondary"
import Button from "../general/Button"

export default function Result({ result, answers, onReset }: PropsResult){ 

  const backgroundImage = backgroundByFamily[result.nombre] || "/quiz/familia-fondos/amaderadaBack.png"
  const familyPets = familyPet[result.nombre] || "/mascotas/amaderada.png"
const [showFormula, setShowFormula] = useState(false);
const [showSummary, setShowSummary] = useState(false);


 console.log("Respuestas:", answers)
const dynamicSummary: SummaryItem[] = answers
  .map((answer) => {
const optionLetterToNumber = { A: "1", B: "2", C: "3", D: "4" };
const key = optionLetterToNumber[answer.selectedOption as keyof typeof optionLetterToNumber];
const entry = answerSummaryMap[answer.questionId]?.[key];



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
{result.nombre && familyDescriptions[result.nombre] && (
  <p className="mt-6 text-[var(--gris4)] leading-relaxed max-w-xl text-sm md:text-base">
    {familyDescriptions[result.nombre]}
  </p>
)}

          {/* Resumen de respuestas */}
{!showSummary && (
  <button
    onClick={() => setShowSummary(true)}
    className="mt-6 text-sm underline text-purple-700 hover:text-purple-900 transition"
  >
    Ver resumen de tus respuestas
  </button>
)}

{showSummary && (
  <section className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-md max-w-xl mx-auto">
    <h3 className="text-center text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">
      Resumen de tus respuestas
    </h3>
    <ul className="text-sm text-gray-700 space-y-2">
      {dynamicSummary.map((item, idx) => (
        <li key={idx}>
          <strong className="font-semibold">{item.label}:</strong> {item.value}
        </li>
      ))}
    </ul>
    <button
      onClick={() => setShowSummary(false)}
      className="mt-6 block mx-auto text-sm text-purple-600 hover:underline"
    >
      Ocultar resumen
    </button>
  </section>
)}



{/* Acciones */}
<div className="flex  items-center gap-4 mt-6 w-full">
  <ButtonSecondary
    label="Volver a empezar"
    onClick={onReset}
  />
  {!showSummary && (
  
<Button
  label="fórmula recomendada"
  href={`/quiz/formula?top=${encodeURIComponent(formula?.TopNote || "")}&heart=${encodeURIComponent(formula?.HeartNote || "")}&base=${encodeURIComponent(formula?.BaseNote || "")}&type=${encodeURIComponent(result.concentracion || "")}`}
/>
  )}
</div>



        </div>
      </div>
    </div>
  )
}
