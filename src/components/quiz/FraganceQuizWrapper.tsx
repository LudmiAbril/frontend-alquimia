// components/quiz/FragranceQuizWrapper.tsx
"use client"
import { useEffect, useState } from "react"
import { AnswerDTO, QuestionDTO, FamilyResult, VisualType } from "@/components/utils/typing"
import CurrentStep from "./CurrentStep"
import Welcome from "./Welcome"
import Result from "./Result"



export default function FragranceQuizWrapper() {
  const [currentStep, setCurrentStep] = useState<"landing" | "quiz" | "result">("landing")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<QuestionDTO[]>([])
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [answers, setAnswers] = useState<AnswerDTO[]>([])
  const [result, setResult] = useState<FamilyResult | null>(null)
  const [loading, setLoading] = useState(false)
  const URL="http://localhost:5035/quiz/preguntas";
const visualMap: Record<number, VisualType> = {
  1: "cards",
  2: "grid",
  3: "list",
  4: "bubbles",
  5: "cards",
  6: "buttons",
  7: "grid",
  8: "cards",
  9: "list",
  10: "bubbles",
}

  useEffect(() => {
    if (currentStep === "quiz" && questions.length === 0) {
      setLoading(true)
      fetch(URL)
        .then((res) => res.json())
       .then((data: QuestionDTO[]) => {
  const enrichedData = data.map((q) => ({
    ...q,
    VisualType: visualMap[q.Id] || "cards", 
  }))
  setQuestions(enrichedData)
  setLoading(false)
})

    }
  }, [currentStep])

  const startQuiz = () => {
    setLoading(true)
    setTimeout(() => {
      setCurrentStep("quiz")
      setLoading(false)
    }, 1000)
  }

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex]
    if (selectedOption) {
      const newAnswer: AnswerDTO = {
        preguntaId: currentQuestion.Id,
        selectedOption: selectedOption,
      }
      setAnswers([...answers, newAnswer])
    }

    setSelectedOption("")

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
   
      setLoading(true)
      setTimeout(() => {
       setResult({
  nombre: "Aromática",
  descripcion: "Fresca, limpia y natural",
  imagen: null,
})

        setCurrentStep("result")
        setLoading(false)
      }, 1500)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setAnswers(answers.slice(0, -1))
    }
  }

  const resetQuiz = () => {
    setCurrentStep("landing")
    setCurrentQuestionIndex(0)
    setSelectedOption("")
    setAnswers([])
    setResult(null)
  }

  return (
<div
  className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center px-6 py-12"
>

      {currentStep === "landing" && (
        <Welcome onStart={startQuiz} loading={loading} />
      )}
      {currentStep === "quiz" && (
        <CurrentStep
          currentQuestionIndex={currentQuestionIndex}
          questions={questions}
          selectedOption={selectedOption}
          onSelect={handleOptionSelect}
          onNext={handleNextQuestion}
          onPrev={currentQuestionIndex > 0 ? handlePreviousQuestion : resetQuiz}
          loading={loading}
        />
      )}
      {currentStep === "result" && result && (
        <Result result={result} answers={answers} onReset={resetQuiz} />
      )}
    </div>
  )
}
