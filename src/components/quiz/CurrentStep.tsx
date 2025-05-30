"use client"
import { LinearProgress, Button } from "@mui/material"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { QuestionDTO } from "@/components/utils/typing"
import DynamicQuestion from "./DynamicQuestion"

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
    <div className="text-center text-white animate-pulse text-lg">
      Cargando pregunta mágica...
    </div>
  </div>
)

}


  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header de navegación y progreso */}
      <div className="max-w-4xl mx-auto w-full mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button variant="contained" onClick={onPrev} className="text-purple-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentQuestionIndex > 0 ? "Anterior" : "Inicio"}
          </Button>
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
