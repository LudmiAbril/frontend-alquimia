"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { familiesQuiz, messages } from "../Utils/utils"
import { WelcomeFamiliesProps } from "../Utils/typing"
import { AnimatePresence, motion } from "framer-motion"
import ButtonMagic from "../General/ButtonMagic"

export default function WelcomeFamilies({ onStart, loading }: WelcomeFamiliesProps) {
  const [active, setActive] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 9000)
    return () => clearInterval(interval)
  }, [])

  const next = () => setActive((prev) => (prev + 1) % familiesQuiz.length)
  const prev = () => setActive((prev) => (prev - 1 + familiesQuiz.length) % familiesQuiz.length)

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center text-left px-6 py-10 gap-12 bg-[url('/textures/paper.jpg')] bg-cover min-h-screen relative">

      {/* Column: Circle Carousel + Description */}
      <div className="flex flex-col items-center gap-6 w-full lg:w-1/2">
        <h2 className="text-3xl font-bold text-[var(--gris4)] max-w-xl">Conocé a las familias olfativas</h2>

        <div className="relative w-[300px] h-[300px] rounded-full border-4 border-[var(--violeta)] flex items-center justify-center">
          {familiesQuiz.map((family, index) => {
            const angle = (360 / familiesQuiz.length) * index
            const isActive = index === active
            return (
              <motion.div
                key={family.id}
                className={`absolute w-[90px] h-[90px] rounded-full flex items-center justify-center shadow-xl 
                  ${isActive ? 'scale-125 z-10' : 'scale-90 opacity-70'}`}
                style={{
                  transform: `rotate(${angle}deg) translate(120px) rotate(-${angle}deg)`
                }}
                animate={{ scale: isActive ? 1.25 : 0.9, opacity: isActive ? 1 : 0.7 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={family.image}
                  alt={family.name}
                  width={80}
                  height={80}
                  className="object-contain drop-shadow-xl"
                />
              </motion.div>
            )
          })}
        </div>

        <div className="flex gap-6 mt-2">
          <button
            onClick={prev}
            className="text-[var(--violeta)] text-xl hover:scale-110 transition-transform"
            aria-label="Anterior"
          >❮</button>
          <button
            onClick={next}
            className="text-[var(--violeta)] text-xl hover:scale-110 transition-transform"
            aria-label="Siguiente"
          >❯</button>
        </div>

        <div className="flex gap-2 mt-1">
          {familiesQuiz.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === active ? "bg-[var(--violeta)] scale-110" : "bg-gray-300"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={familiesQuiz[active].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full px-6 py-4 bg-white rounded-xl shadow-lg text-[var(--gris4)] border max-w-md"
          >
            <h3 className="text-xl font-bold text-[var(--gris3)] mb-1">{familiesQuiz[active].name}</h3>
            <p className="text-sm italic">{familiesQuiz[active].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center w-full lg:w-1/2 gap-6 relative mt-6">

        <div className="relative bg-white border border-[var(--violeta)] rounded-xl shadow-lg p-4 text-[var(--gris4)] max-w-md text-center">
          {messages[currentIndex].map((text, i) => (
            <p key={i} className={`${i > 0 ? "mt-2" : ""}`}>{text}</p>
          ))}
          <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[var(--violeta)]"></div>
        </div>

        {/* Quimi */}
        <div className="relative w-[120px] h-[120px] mt-6">
          <Image
            src="/mascotas/lookingQuimi.png"
            alt="Quimi inspirador"
            fill
            className="object-contain"
          />
        </div>

        {/* Botón */}
        <ButtonMagic
          onClick={onStart}
          disabled={loading}
          label={"Descubrir mi familia"}
          className="bg-[var(--violeta)] text-white px-6 py-3 rounded hover:bg-[#7a2f96] transition flex items-center gap-2 mt-2"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Cargando...
            </div>
          ) : (
            <>
              <Sparkles className="h-5 w-5 animate-ping" />
              Descubrir mi familia
            </>
          )}
        </ButtonMagic>
      </div>
    </div>
  )
}
