"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@mui/material"
import { Card, CardContent } from "@mui/material"
import { LinearProgress } from "@mui/material"
import { BookOpen, ArrowLeft, ArrowRight, Sparkles } from "lucide-react"

interface OptionDTO {
  Letra: string
  Texto: string
  ImagenBase64: string
}

interface QuestionDTO {
  Id: number
  Pregunta: string
  Opciones: OptionDTO[]
}

interface AnswerDTO {
  QuestionId: number
  SelectedOption: string
}

interface FamilyResult {
  letraDominante: string
  Nombre: string
  Descripcion: string
  Imagen: string
}

export default function FragranceQuiz() {
  const [currentStep, setCurrentStep] = useState<"landing" | "quiz" | "result">("landing")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<AnswerDTO[]>([])
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [result, setResult] = useState<FamilyResult | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock questions data
  const questions: QuestionDTO[] = [
    {
      Id: 1,
      Pregunta: "¿Qué tipo de ambiente prefieres?",
      Opciones: [
        { Letra: "A", Texto: "Playa y brisa marina", ImagenBase64: "" },
        { Letra: "B", Texto: "Bosque y naturaleza", ImagenBase64: "" },
        { Letra: "C", Texto: "Mercado de especias", ImagenBase64: "" },
        { Letra: "D", Texto: "Jardín de flores", ImagenBase64: "" },
      ],
    },
    {
      Id: 2,
      Pregunta: "¿Cuál es tu momento favorito del día?",
      Opciones: [
        { Letra: "A", Texto: "Mañana fresca", ImagenBase64: "" },
        { Letra: "B", Texto: "Tarde en el bosque", ImagenBase64: "" },
        { Letra: "C", Texto: "Noche misteriosa", ImagenBase64: "" },
        { Letra: "D", Texto: "Atardecer romántico", ImagenBase64: "" },
      ],
    },
    {
      Id: 3,
      Pregunta: "¿Qué actividad disfrutas más?",
      Opciones: [
        { Letra: "A", Texto: "Deportes acuáticos", ImagenBase64: "" },
        { Letra: "B", Texto: "Senderismo", ImagenBase64: "" },
        { Letra: "C", Texto: "Cena romántica", ImagenBase64: "" },
        { Letra: "D", Texto: "Picnic en el parque", ImagenBase64: "" },
      ],
    },
    {
      Id: 4,
      Pregunta: "¿Qué color te atrae más?",
      Opciones: [
        { Letra: "A", Texto: "Azul océano", ImagenBase64: "" },
        { Letra: "B", Texto: "Verde bosque", ImagenBase64: "" },
        { Letra: "C", Texto: "Dorado intenso", ImagenBase64: "" },
        { Letra: "D", Texto: "Rosa suave", ImagenBase64: "" },
      ],
    },
    {
      Id: 5,
      Pregunta: "¿Qué estación del año prefieres?",
      Opciones: [
        { Letra: "A", Texto: "Verano", ImagenBase64: "" },
        { Letra: "B", Texto: "Otoño", ImagenBase64: "" },
        { Letra: "C", Texto: "Invierno", ImagenBase64: "" },
        { Letra: "D", Texto: "Primavera", ImagenBase64: "" },
      ],
    },
    {
      Id: 6,
      Pregunta: "¿Qué tipo de música prefieres?",
      Opciones: [
        { Letra: "A", Texto: "Pop y música alegre", ImagenBase64: "" },
        { Letra: "B", Texto: "Folk y música acústica", ImagenBase64: "" },
        { Letra: "C", Texto: "Jazz y música sofisticada", ImagenBase64: "" },
        { Letra: "D", Texto: "Clásica y música romántica", ImagenBase64: "" },
      ],
    },
    {
      Id: 7,
      Pregunta: "¿Cómo prefieres vestirte?",
      Opciones: [
        { Letra: "A", Texto: "Casual y cómodo", ImagenBase64: "" },
        { Letra: "B", Texto: "Natural y relajado", ImagenBase64: "" },
        { Letra: "C", Texto: "Elegante y sofisticado", ImagenBase64: "" },
        { Letra: "D", Texto: "Romántico y femenino", ImagenBase64: "" },
      ],
    },
    {
      Id: 8,
      Pregunta: "¿Qué tipo de vacaciones prefieres?",
      Opciones: [
        { Letra: "A", Texto: "Playa y actividades acuáticas", ImagenBase64: "" },
        { Letra: "B", Texto: "Montaña y naturaleza", ImagenBase64: "" },
        { Letra: "C", Texto: "Ciudad y cultura", ImagenBase64: "" },
        { Letra: "D", Texto: "Campo y tranquilidad", ImagenBase64: "" },
      ],
    },
  ]

  // Fragrance families data
  const familias = {
    A: {
      Nombre: "Fresca",
      Descripcion:
        "Las fragancias frescas son ligeras, limpias y energizantes. Perfectas para personas activas que disfrutan de la simplicidad y la naturalidad. Estas fragancias evocan la brisa marina, los cítricos y la frescura de la mañana.",
      Imagen: "",
    },
    B: {
      Nombre: "Amaderada",
      Descripcion:
        "Las fragancias amaderadas son cálidas, sofisticadas y reconfortantes. Ideales para personas que aprecian la elegancia y la profundidad. Estas fragancias incluyen notas de sándalo, cedro y otras maderas nobles.",
      Imagen: "",
    },
    C: {
      Nombre: "Oriental",
      Descripcion:
        "Las fragancias orientales son misteriosas, sensuales y exóticas. Perfectas para personas audaces que disfrutan de la intensidad y el misterio. Incluyen especias, ámbar y notas dulces y envolventes.",
      Imagen: "",
    },
    D: {
      Nombre: "Floral",
      Descripcion:
        "Las fragancias florales son románticas, femeninas y delicadas. Ideales para personas que aprecian la belleza y la suavidad. Estas fragancias capturan la esencia de jardines en flor y pétalos frescos.",
      Imagen: "",
    },
  }

  // Calculate result based on answers
  const calculateResult = (answers: AnswerDTO[]): FamilyResult => {
    const conteo = { A: 0, B: 0, C: 0, D: 0 }

    answers.forEach((answer) => {
      const letra = answer.SelectedOption.toUpperCase()
      if (conteo[letra as keyof typeof conteo] !== undefined) {
        conteo[letra as keyof typeof conteo]++
      }
    })

    const letraDominante = Object.entries(conteo).sort(([, a], [, b]) => b - a)[0][0]
    const familia = familias[letraDominante as keyof typeof familias]

    return {
      letraDominante,
      Nombre: familia.Nombre,
      Descripcion: familia.Descripcion,
      Imagen: familia.Imagen,
    }
  }

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
    if (!selectedOption) return

    const newAnswer: AnswerDTO = {
      QuestionId: questions[currentQuestionIndex].Id,
      SelectedOption: selectedOption,
    }

    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)
    setSelectedOption("")

    if (currentQuestionIndex === questions.length - 1) {
      setLoading(true)
      setTimeout(() => {
        const calculatedResult = calculateResult(updatedAnswers)
        setResult(calculatedResult)
        setCurrentStep("result")
        setLoading(false)
      }, 1500)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedOption("")
    }
  }

  const resetQuiz = () => {
    setCurrentStep("landing")
    setCurrentQuestionIndex(0)
    setAnswers([])
    setSelectedOption("")
    setResult(null)
  }

  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Landing Page */}
      {currentStep === "landing" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-2xl">
            <div className="mb-8">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full animate-pulse"></div>
                <div className="relative bg-white rounded-full p-8 shadow-lg">
                  <BookOpen className="w-16 h-16 text-purple-500 mx-auto" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Descubre tu Familia Olfativa</h1>
            <p className="text-lg text-gray-600 mb-8">
              Responde nuestro cuestionario personalizado y descubre qué familia de fragancias se adapta mejor a tu
              personalidad.
            </p>

            <Button
              onClick={startQuiz}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg transform transition-all hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Cargando preguntas...
                </div>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Comenzar Quiz
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Quiz Page */}
      {currentStep === "quiz" && (
        <div className="min-h-screen p-4 flex flex-col">
          {/* Header with progress */}
          <div className="max-w-4xl mx-auto w-full mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="contained" /*text, outlined o contained*/
                onClick={currentQuestionIndex > 0 ? handlePreviousQuestion : resetQuiz}
                className="text-purple-600"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {currentQuestionIndex > 0 ? "Anterior" : "Inicio"}
              </Button>
              <span className="text-sm text-gray-500">
                {currentQuestionIndex + 1} de {questions.length}
              </span>
            </div>
            <LinearProgress variant="determinate" value={progress} className="h-2" />
          </div>

          {/* Question */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {questions[currentQuestionIndex]?.Pregunta}
              </h2>
              <p className="text-gray-600">Selecciona la opción que más te identifique</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-8">
              {questions[currentQuestionIndex]?.Opciones.map((option) => (
                <Card
                  key={option.Letra}
                  className={`cursor-pointer transition-all hover:shadow-lg transform hover:scale-105 ${
                    selectedOption === option.Letra
                      ? "ring-2 ring-purple-500 bg-purple-50 scale-105"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleOptionSelect(option.Letra)}
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

            {/* Next Button */}
            <Button
              onClick={handleNextQuestion}
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
      )}

      {/* Result Page */}
      {currentStep === "result" && result && (
        <div className="min-h-screen p-4 flex flex-col items-center justify-center">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="relative mx-auto w-48 h-48 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full animate-pulse opacity-20"></div>
                {result.Imagen ? (
                  <Image
                    src={`data:image/jpeg;base64,${result.Imagen}`}
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

            {/* Answer Summary */}
            <Card className="mb-8 bg-purple-50 border-purple-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 text-purple-800">Resumen de tus respuestas:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {Object.entries(
                    answers.reduce(
                      (acc, answer) => {
                        acc[answer.SelectedOption] = (acc[answer.SelectedOption] || 0) + 1
                        return acc
                      },
                      {} as Record<string, number>,
                    ),
                  ).map(([letra, count]) => (
                    <div key={letra} className="text-center">
                      <div className="font-bold text-purple-600">{letra}</div>
                      <div className="text-gray-600">{count} respuestas</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={resetQuiz}
                variant="outlined"
                className="border-purple-500 text-purple-500 hover:bg-purple-50 transform transition-all hover:scale-105"
              >
                Hacer Quiz Nuevamente
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white transform transition-all hover:scale-105">
                Explorar Fragancias {result.Nombre}s
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
