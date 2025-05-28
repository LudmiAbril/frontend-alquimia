// components/quiz/Welcome.tsx
"use client"
import { Sparkles, BookOpen } from "lucide-react"
import { Button } from "@mui/material"

export default function Welcome({ onStart, loading }: { onStart: () => void; loading: boolean }) {
  return (
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
          Responde nuestro cuestionario personalizado y descubre qué familia de fragancias se adapta mejor a tu personalidad.
        </p>
        <Button
          onClick={onStart}
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
  )
}
