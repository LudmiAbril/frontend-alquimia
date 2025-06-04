"use client"
import { PropsResult } from "@/components/utils/typing"
import Card3D from "./Card3d"
import { backgroundByFamily, familyPet } from "../utils/utils"

export default function Result({ result, answers, onReset }: PropsResult) {

const backgroundImage = backgroundByFamily[result.nombre] || "/quiz/familia-fondos/amaderadaBack.png"

  const familyPets= familyPet[result.nombre] || "/mascotas/amaderada.png"

  const resumenRespuestas = answers.reduce((acc, answer) => {
    acc[answer.selectedOption] = (acc[answer.selectedOption] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[var(--hueso)]">
      <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl w-full">
        {/* Card 3D estilo Mythrill */}
<Card3D
          backgroundSrc={backgroundImage}
          characterSrc={familyPets}
          alt={result.nombre} title={result.nombre}/>


        {/* Contenido textual */}
        <div className="flex-1 text-center lg:text-left text-[var(--gris4)]">
          <div className="bg-purple-100 inline-block px-4 py-2 rounded-full text-sm font-medium text-purple-800 mb-4">
            ¡Quiz completado!
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Tu familia olfativa es:</h1>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-6">
            {result.nombre}
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {result.descripcion}
          </p>

          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-4 text-purple-800">Resumen de tus respuestas:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {Object.entries(resumenRespuestas).map(([letra, count]) => (
                <div key={letra} className="text-center">
                  <div className="font-bold text-purple-600">{letra}</div>
                  <div className="text-gray-600">{count} respuesta(s)</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onReset}
            className="bg-[var(--violeta)] hover:bg-[#7a2f96] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2"
          >
            <svg className="h-5 w-5 animate-ping" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 105.293 14.707l1.414 1.414A10 10 0 1110 0v2z" /></svg>
            Volver a empezar
          </button>
        </div>
      </div>
    </div>
  )
}
