"use client"

import { PropsCurrent } from "@/components/utils/typing"
import DynamicQuestion from "./DynamicQuestion"
import Button from "@/components/general/Button"
import ButtonSecondary from "@/components/general/ButtonSecondary"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const colorMap: Record<string, string> = {
  A: "#CD5C68",
  B: "#6483C2",
  C: "#E8C75C",
  D: "#7B655A",
}

export default function CurrentStep({
  currentQuestionIndex,
  questions,
  selectedOption,
  onSelect,
  onNext,
  onPrev,
  loading,
}: PropsCurrent) {
  const progress =
    questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0
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

  const isButtonDisabled = !selectedOption || loading

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Barra de progreso */}
      <div className="max-w-5xl mx-auto w-full mb-12">
        <div className="flex items-center justify-between">
          <img src="/quiz/inicio.svg" alt="Inicio" className="w-8 h-8" />
          <div className="flex-1 flex items-center justify-between px-4">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full border-2 ${
                  index <= currentQuestionIndex ? "bg-[#9444B6] border-[#9444B6]" : "border-[#9444B6]"
                }`}
              ></div>
            ))}
          </div>
          <img src="/quiz/final.svg" alt="Fin" className="w-8 h-8" />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto w-full gap-10">
        {/* Texto y opciones */}
        <div className="lg:w-1/2 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {question?.Pregunta}
          </h2>
          <p className="text-white text-sm md:text-base mb-6">
            Selecciona la opción que más te identifique
          </p>

          {/* Opciones: tipo buttons */}
          {question.VisualType === "buttons" ? (
            <div className="bg-[#f4eaff] rounded-2xl px-6 py-8 shadow-xl mb-10 w-full max-w-md mx-auto">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={1}
              >
                {question.Opciones.map((opt) => (
                  <SwiperSlide key={opt.Letra}>
                    <button
                      onClick={() => onSelect(opt.Letra)}
                      style={{
                        border: `2px solid ${colorMap[opt.Letra]}`,
                        color: colorMap[opt.Letra],
                      }}
                      className={`w-full px-6 py-4 rounded-xl font-semibold text-lg text-center transition bg-white hover:scale-105 ${
                        selectedOption === opt.Letra ? "bg-opacity-80" : ""
                      }`}
                    >
                      {opt.Texto}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="mb-10 w-full">
              <DynamicQuestion
                question={question}
                selectedOption={selectedOption}
                onSelect={onSelect}
              />
            </div>
          )}

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

        {/* Imagen lateral */}
        <div className="hidden lg:flex justify-center items-center w-1/2">
          <img src="/mascotas/mascotas-grupo-fight.png" alt="Mascotas" className="max-w-sm" />
        </div>
      </div>
    </div>
  )
}
