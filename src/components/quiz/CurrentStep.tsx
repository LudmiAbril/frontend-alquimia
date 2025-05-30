"use client"
import { LinearProgress } from "@mui/material"
import { QuestionDTO } from "@/components/utils/typing"
import DynamicQuestion from "./DynamicQuestion"
import Button from "@/components/general/Button"
import ButtonSecondary from "@/components/general/ButtonSecondary"

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

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white  text-lg">
          Cargando pregunta mágica...
        </div>
      </div>
    )
  }

  const isButtonDisabled = !selectedOption || loading

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header de navegación y progreso */}
      <div className="max-w-4xl mx-auto w-full mb-8">
        <div className="flex items-center justify-between mb-4">
          <ButtonSecondary
            label={currentQuestionIndex > 0 ? "Anterior" : "Inicio"}
            onClick={onPrev}
          />
          <span className="text-sm text-white">{currentQuestionIndex + 1} de {questions.length}</span>
        </div>
        <LinearProgress variant="determinate" value={progress} className="h-2" />
      </div>

      {/* Pregunta */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{question?.Pregunta}</h2>
          <p className="text-white">Selecciona la opción que más te identifique</p>
        </div>

        {/* Componente dinámico para distintas visualizaciones */}
        <DynamicQuestion
          question={question}
          selectedOption={selectedOption}
          onSelect={onSelect}
        />

        {/* Botón siguiente */}
        <div className="mt-6">
          <div
            className={`transition-all duration-300 ${
              isButtonDisabled
                ? "opacity-50 cursor-not-allowed"
                : " hover:scale-105"
            }`}
          >
            <Button
              label={loading ? "Calculando..." : currentQuestionIndex === questions.length - 1 ? "Ver Resultado" : "Siguiente"}
              onClick={isButtonDisabled ? undefined : onNext}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
