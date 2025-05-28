// components/quiz/CurrentStep.tsx
"use client"
import { LinearProgress, Button, Card, CardContent } from "@mui/material"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import { AnswerDTO, QuestionDTO } from "@/components/utils/typing"
import React from "react"

interface Props {
  currentQuestionIndex: number
  questions: QuestionDTO[]
  selectedOption: string
  onSelect: (option: string) => void
  onNext: () => void
  onPrev: () => void
  loading: boolean
}

export default function CurrentStep({
  currentQuestionIndex,
  questions,
  selectedOption,
  onSelect,
  onNext,
  onPrev,
  loading,
}: Props) {
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0
  const question = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="max-w-4xl mx-auto w-full mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button variant="contained" onClick={onPrev} className="text-purple-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentQuestionIndex > 0 ? "Anterior" : "Inicio"}
          </Button>
          <span className="text-sm text-gray-500">
            {currentQuestionIndex + 1} de {questions.length}
          </span>
        </div>
        <LinearProgress variant="determinate" value={progress} className="h-2" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{question?.Pregunta}</h2>
          <p className="text-gray-600">Selecciona la opción que más te identifique</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-8">
          {question?.Opciones.map((option) => (
            <Card
              key={option.Letra}
              className={`cursor-pointer transition-all hover:shadow-lg transform hover:scale-105 ${
                selectedOption === option.Letra
                  ? "ring-2 ring-purple-500 bg-purple-50 scale-105"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => onSelect(option.Letra)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold transition-all ${
                      selectedOption === option.Letra
                        ? "bg-purple-500 text-white border-purple-500 scale-110"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {option.Letra}
                  </div>
                  <div className="flex-1">
                    {option.ImagenBase64 && (
                      <div className="mb-3">
                        <Image
                          src={`data:image/jpeg;base64,${option.ImagenBase64}`}
                          alt={option.Texto}
                          width={100}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                    <p className="text-gray-800 font-medium">{option.Texto}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          onClick={onNext}
          disabled={!selectedOption || loading}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 rounded-full transform transition-all hover:scale-105"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Calculando resultado...
            </div>
          ) : currentQuestionIndex === questions.length - 1 ? (
            "Ver Resultado"
          ) : (
            <>
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
