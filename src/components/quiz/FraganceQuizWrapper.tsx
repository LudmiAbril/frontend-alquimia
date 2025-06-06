"use client";


import { useEffect, useState } from "react"
import { AnswerDTO, QuestionDTO, FamilyResult } from "@/components/utils/typing"
import CurrentStep from "./CurrentStep"
import Welcome from "./Welcome"
import Result from "./Result"
import { buildAnswer, fetchQuestions, fetchQuizResult} from "@/services/quizService"


export default function FragranceQuizWrapper() {
  const [currentStep, setCurrentStep] = useState<"landing" | "quiz" | "result">("landing")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState<QuestionDTO[]>([])
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [answers, setAnswers] = useState<AnswerDTO[]>([])
  const [result, setResult] = useState<FamilyResult | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentStep === "quiz" && questions.length === 0) {
      setLoading(true)
      fetchQuestions().then((data) => {
        setQuestions(data)
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

  const handleOptionSelect = (option: string) => setSelectedOption(option)

  const handleNextQuestion = async () => {
    const currentQuestion = questions[currentQuestionIndex]
    if (selectedOption) {
      setAnswers([...answers, buildAnswer(currentQuestion.Id, selectedOption)])
    }

    setSelectedOption("")

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setLoading(true)
 const resultData = await fetchQuizResult(answers)

      setResult(resultData)
      setCurrentStep("result")
      setLoading(false)
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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-white flex flex-col items-center justify-center px-6 py-12">
      {currentStep === "landing" && <Welcome onStart={startQuiz} loading={loading} />}
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
