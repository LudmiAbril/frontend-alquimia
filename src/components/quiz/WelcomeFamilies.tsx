"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { familiesQuiz, messages } from "../utils/utils"
import { WelcomeFamiliesProps } from "../utils/typing"
import { AnimatePresence, motion } from "framer-motion"
import ButtonMagic from "../general/ButtonMagic"

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
    <div className="flex flex-col lg:flex-row items-center justify-center px-6 py-16 gap-12 bg-[url('/textures/magic-paper.jpg')] bg-cover bg-center min-h-screen relative overflow-hidden">

      {/* Carrusel de familias */}
      <div className="flex flex-col items-center gap-8 w-full lg:w-1/2">
        <h2 className="text-4xl font-volkorn font-bold text-violeta drop-shadow-sm text-center">Conocé a las familias olfativas</h2>

        <div className="relative w-[200px] h-[200px] rounded-full border-4 border-violeta flex items-center justify-center ">
          {familiesQuiz.map((family, index) => {
            const angle = (360 / familiesQuiz.length) * index
            const isActive = index === active
            return (
              <motion.div
                key={family.id}
                className={`absolute w-[200px] h-[200px] rounded-full flex items-center justify-center 
                  ${isActive ? 'scale-125 z-10' : 'scale-90 opacity-60 bg-white/80'} transition-all`}
                style={{
                  transform: `rotate(${angle}deg) translate(120px) rotate(-${angle}deg)`
                }}
                animate={{ scale: isActive ? 1.25 : 0.9, opacity: isActive ? 1 : 0.7 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={family.image}
                  alt={family.name}
                  width={70}
                  height={70}
                  className="object-contain drop-shadow-md"
                />
              </motion.div>
            )
          })}
        </div>

        <div className="flex gap-4">
          <button onClick={prev} className="text-2xl text-violeta hover:scale-125 transition-transform">❮</button>
          <button onClick={next} className="text-2xl text-violeta hover:scale-125 transition-transform">❯</button>
        </div>

        <div className="flex gap-2">
          {familiesQuiz.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i === active ? "bg-violeta scale-110" : "bg-gray-300"} transition-transform duration-300`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={familiesQuiz[active].id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="w-full px-6 py-5 bg-white/90 rounded-xl shadow-md text-center border border-violeta max-w-md"
          >
            <h3 className="text-2xl font-volkorn text-violeta mb-2">{familiesQuiz[active].name}</h3>
            <p className="text-base italic text-gris4 leading-relaxed">{familiesQuiz[active].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Columna Quimi y CTA */}
      <div className="flex flex-col items-center gap-6 w-full lg:w-1/2 mt-10 lg:mt-0 text-center">
        <motion.div
          className="bg-white/90 border border-violeta rounded-xl shadow-lg p-4 text-gris4 max-w-md relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {messages[currentIndex].map((text, i) => (
            <p key={i} className={`text-base ${i > 0 ? "mt-2" : ""}`}>{text}</p>
          ))}
          <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[var(--violeta)]"></div>
        </motion.div>

        <motion.div
          className="relative w-[130px] h-[130px] "
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          <Image
            src="/mascotas/surpriseQuimi.png"
            alt="Quimi inspirador"
            fill
            className="object-contain"
          />
        </motion.div>

        <ButtonMagic
          onClick={onStart}
          disabled={loading}
          label="Descubrir mi familia"
          className="bg-violeta text-white px-8 py-3 text-lg rounded-xl hover:bg-[#7a2f96] transition-all shadow-xl flex items-center gap-2"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Cargando...
            </div>
          ) : (
            <>
              <Sparkles className="h-5 w-5 animate-pulse" />
              Descubrir mi familia
            </>
          )}
        </ButtonMagic>
      </div>
    </div>
  )
}
