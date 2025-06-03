"use client"

import { useState } from "react"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { familiesQuiz } from "../utils/utils"
import Button from "@mui/material/Button"
import { WelcomeFamiliesProps } from "../utils/typing"
import { AnimatePresence, motion } from "framer-motion"
import ButtonMagic from "../general/ButtonMagic"


export default function WelcomeFamilies({ onStart, loading }: WelcomeFamiliesProps) {
  const [active, setActive] = useState(0)

  const next = () => setActive((prev) => (prev + 1) % familiesQuiz.length)
  const prev = () => setActive((prev) => (prev - 1 + familiesQuiz.length) % familiesQuiz.length)

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center text-center px-6 py-10 gap-12 bg-[url('/textures/paper.jpg')] bg-cover min-h-screen relative">

      {/* Column: Circle Carousel + Description */}
      <div className="flex flex-col items-center gap-6 w-full lg:w-1/2">
        <h2 className="text-3xl font-bold text-[var(--gris4)] max-w-xl">
          ¡Las familias se preparan para mostrar su esencia!
        </h2>
        <p className="text-[var(--gris4)] max-w-md">
          Solo una vibrará contigo. ¿Estás listo para descubrirla?
        </p>

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

      {/* Column: Mascot + Button */}
      <div className="flex flex-col items-center w-full lg:w-1/2 gap-6">
        <motion.div
    
          className="relative w-[220px] h-[220px]"
        >
          <Image
            src="/mascotas/lookingQuimi.png"
            alt="Quimi inspirador"
            fill
            className="object-contain "
          />
        </motion.div>

        <ButtonMagic
                  onClick={onStart}
                  className="bg-[var(--violeta)] text-white px-6 py-2 mt-2 rounded hover:bg-[#7a2f96] transition flex items-center gap-2"
                  disabled={loading} label={"Descubrir mi Familia"}        >
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