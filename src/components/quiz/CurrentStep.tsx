"use client"

import { PropsCurrent } from "@/components/Utils/typing"
import DynamicQuestion from "./DynamicQuestion"
import Button from "@/components/General/Button"
import ButtonSecondary from "@/components/General/ButtonSecondary"
import { useState, useEffect } from "react"

export default function CurrentStep({
  currentQuestionIndex,
  questions,
  selectedOption,
  onSelect,
  onNext,
  onPrev,
  loading,
}: PropsCurrent) {
  const question = questions[currentQuestionIndex]
  const [localSelection, setLocalSelection] = useState<string>(selectedOption || "")

  useEffect(() => {
    setLocalSelection(selectedOption || "")
  }, [selectedOption, question])

  const handleSelect = (option: string) => {
    setLocalSelection(option)
    onSelect(option)
  }

  const isButtonDisabled = !localSelection || loading

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-[var(--gris4)] animate-pulse text-lg">
          Cargando pregunta mágica...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 flex flex-col mt-[32px]">
      {/* Barra de progreso */}
<div className="max-w-5xl mx-auto w-full mb-6">

        <div className="flex items-center justify-between relative px-2">
          <img src="/quiz/inicio.svg" alt="Inicio" className="w-8 h-8 z-10" />
          <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-[#9444B6] -z-0 transform -translate-y-1/2"></div>
          <div className="flex-1 flex items-center justify-between z-10 px-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  index <= currentQuestionIndex
                    ? "bg-[#9444B6] border-[#9444B6]"
                    : "bg-white border-[#9444B6]"
                }`}
              ></div>
            ))}
          </div>
          <img src="/quiz/final.svg" alt="Fin" className="w-8 h-8 z-10" />
        </div>
      </div>

      {/* Pregunta + opciones */}
      <div className="flex flex flex-col items-center justify-center max-w-3xl mx-auto w-full gap-2 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--gris4)] mb-2">
          {question?.Pregunta}
        </h2>
        <p className="text-[var(--gris4)] text-sm md:text-base mb-6">
          Selecciona la opción que más te identifique
        </p>

        <div className="mb-10 w-full">
          <DynamicQuestion
            question={question}
            selectedOption={localSelection}
            onSelect={handleSelect}
          />
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-center gap-6">
          <ButtonSecondary
            label={currentQuestionIndex > 0 ? "Anterior" : "Inicio"}
            onClick={onPrev}
          />
          <div
            className={`transition-all duration-300 ${
              isButtonDisabled ? "opacity-50 cursor-not-allowed" : "animate-pulse hover:scale-105"
            }`}
          >
            <Button
              label={
                loading
                  ? "Calculando..."
                  : currentQuestionIndex === questions.length - 1
                  ? "Ver Resultado"
                  : "Siguiente"
              }
              onClick={isButtonDisabled ? undefined : onNext}
            />
          </div>
        </div>
      </div>
    </div>
  )
}