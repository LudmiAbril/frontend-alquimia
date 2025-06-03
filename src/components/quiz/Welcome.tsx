// components/quiz/Welcome.tsx
"use client"
import { Sparkles } from "lucide-react"
import { Button } from "@mui/material"

export default function Welcome({ onStart, loading }: { onStart: () => void; loading: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-2xl">
        
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--gris4)] mb-4">Descubre tu Familia Olfativa</h1>
        <p className="text-lg text-[var(--gris4)]mb-8">
          Responde nuestro cuestionario personalizado y descubre qué familia de fragancias se adapta mejor a tu personalidad.
        </p>
        <Button
          onClick={onStart}
         className="bg-[var(--violeta)] text-[var(--gris4)] px-4 py-2 rounded hover:bg-[#7a2f96] transition"
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
