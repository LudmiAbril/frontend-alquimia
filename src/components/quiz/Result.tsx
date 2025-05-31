"use client"
import { Card, CardContent, Button } from "@mui/material"
import { Sparkles } from "lucide-react"
import Image from "next/image"
import { AnswerDTO, FamilyResult, PropsResult } from "@/components/utils/typing"



export default function Result({ result, answers, onReset }: PropsResult) {

  const familiaMascotas: Record<string, string> = {
  "Fresca": "/mascotas/fresca.png",
  "Floral": "/mascotas/floral.png",
  "Amaderada": "/mascotas/amaderada.png",
  "Oriental": "/mascotas/oriental.png",
}

const imagenMascota = familiaMascotas[result.nombre] || "/mascotas/surpriseQuimi.png"

  const resumenRespuestas = answers.reduce((acc, answer) => {
acc[answer.selectedOption] = (acc[answer.selectedOption] || 0) + 1

    return acc
  }, {} as Record<string, number>)

  return (
<div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-[#f8f2ed] via-[#fff9f5] to-[#f8f2ed]">
  <div className="max-w-xl w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center border border-purple-200">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="relative mx-auto w-48 h-48 mb-6">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full animate-pulse opacity-20" />
  <Image
    src={imagenMascota}
    alt={result.nombre}
    width={192}
    height={192}
    className="rounded-full object-contain shadow-lg border-4 border-purple-300"
  />
</div>

        </div>

        <div className="mb-6">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ¡Quiz completado!
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tu familia olfativa es:</h1>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-6">
          {result.nombre}
        </h2>

        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <p className="text-lg text-gray-700 leading-relaxed">{result.descripcion}</p>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4 text-purple-800">Resumen de tus respuestas:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {Object.entries(resumenRespuestas).map(([letra, count]) => (
                <div key={letra} className="text-center">
                  <div className="font-bold text-purple-600">{letra}</div>
                  <div className="text-gray-600">{count} respuesta(s)</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={onReset}
          variant="outlined"
          className="m-4"
        >
          Volver a empezar
        </Button>
      </div>
 </div>
</div>
  )
}
