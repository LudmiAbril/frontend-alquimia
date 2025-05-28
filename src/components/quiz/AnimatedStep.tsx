// components/quiz/AnimatedStep.tsx
"use client"
import React from "react"
import { Button, LinearProgress } from "@mui/material"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { PropsAS, QuestionDTO } from "@/components/utils/typing"
import QuestionHeader from "./QuestionHeader"
import QuestionCard from "./QuestionCard"


export default function AnimatedStep({
  currentQuestionIndex,
  questions,
  selectedOption,
  onSelect,
  onNext,
  onPrev,
  loading,
}: PropsAS) {
  const question = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="max-w-4xl mx-auto w-full mb-6">
        <div className="flex justify-between items-center mb-2">
          <Button onClick={onPrev} variant="contained">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentQuestionIndex > 0 ? "Anterior" : "Inicio"}
          </Button>
          <span className="text-sm text-gray-500">
            {currentQuestionIndex + 1} de {questions.length}
          </span>
        </div>
        <LinearProgress variant="determinate" value={progress} className="h-2" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <QuestionHeader
          title={question?.Pregunta}
          subtitle="Selecciona la opción que más te identifique"
        />

        <div className="relative w-full max-w-3xl h-[360px] overflow-hidden mb-8">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentQuestionIndex * 100}%)` }}
          >
            {questions.map((q, index) => (
              <div key={index} className="min-w-full px-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.Opciones.map((option) => (
                    <QuestionCard
                      key={option.Letra}
                      option={option}
                      selected={selectedOption === option.Letra}
                      onClick={() => onSelect(option.Letra)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-6">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentQuestionIndex ? "bg-purple-600 scale-125" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={onNext}
          disabled={!selectedOption || loading}
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-full hover:scale-105 transition-all"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Calculando resultado...
            </div>
          ) : currentQuestionIndex === questions.length - 1 ? (
            "Ver Resultado"
          ) : (
            <>
              Siguiente <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
