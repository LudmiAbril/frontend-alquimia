"use client"
import { Card, CardContent, Button } from "@mui/material"
import { Sparkles } from "lucide-react"
import Image from "next/image"
import { AnswerDTO, FamilyResult } from "@/components/utils/typing"

interface Props {
  result: FamilyResult
  answers: AnswerDTO[]
  onReset: () => void
}

export default function Result({ result, answers, onReset }: Props) {
  const resumenRespuestas = answers.reduce((acc, answer) => {
    acc[answer.SelectedOption] = (acc[answer.SelectedOption] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="relative mx-auto w-48 h-48 mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full animate-pulse opacity-20"></div>
            {result.Imagen ? (
              <Image
                src={`data:image/png;base64,${result.Imagen}`}
                alt={result.Nombre}
                width={192}
                height={192}
                className="rounded-full object-cover shadow-lg"
              />
            ) : (
              <div className="w-48 h-48 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-24 h-24 text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ¡Quiz completado!
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tu familia olfativa es:</h1>
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-6">
          {result.Nombre}
        </h2>

        <Card className="mb-8 shadow-lg">
          <CardContent className="p-6">
            <p className="text-lg text-gray-700 leading-relaxed">{result.Descripcion}</p>
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
          className="border-purple-500 text-purple-600 hover:bg-purple-100 transition"
        >
          Volver a empezar
        </Button>
      </div>
    </div>
  )
}
