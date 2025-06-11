"use client"

import { PropsResult, SummaryItem } from "@/components/utils/typing"
import Card3D from "./Card3d"
import { answerSummaryMap, backgroundByFamily, familyDescriptions, familyPet } from "../utils/utils"
import { useState } from "react"
import ButtonSecondary from "../general/ButtonSecondary"
import ButtonViolet from "../general/ButtonViolet"
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import LoginRequiredModal from "@/components/login/LoginRequiredModal";
import AuthModalWrapper from "@/components/modals/AuthModalWrapper";
import Fireflies from "./Fireflies"
import ConfettiStreamers from "./ConfettiStreamer"
import FloatingMascot from "../general/MascotaFlotante"
export default function Result({ result, answers, onReset }: PropsResult) {
  const backgroundImage = backgroundByFamily[result.nombre] || "/quiz/familia-fondos/amaderadaBack.png"
  const familyPets = familyPet[result.nombre] || "/mascotas/amaderada.png"
  const [showSummary, setShowSummary] = useState(false)

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authForm, setAuthForm] = useState<"login" | "register">("login");

  const handleCrearPerfume = () => {
    const user = localStorage.getItem("username");
    if (user) {
      window.location.href = "/crear-perfume";
    } else {
      localStorage.setItem("next", "/crear-perfume");
      setShowLoginModal(true);
    }
  };
  const dynamicSummary: SummaryItem[] = answers
    .map((answer) => {
      const letterToNum = { A: "1", B: "2", C: "3", D: "4" }
      const key = letterToNum[answer.selectedOption as keyof typeof letterToNum]
      const entry = answerSummaryMap[answer.questionId]?.[key]
      return entry ?? null
    })
    .filter((e): e is SummaryItem => e !== null)

  const formula = result.formulas?.[0]
  const concentration = result.concentracion && result.concentracion !== "Desconocido"
    ? result.concentracion
    : "Body Splash"

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[url('/textures/paper.jpg')] bg-cover bg-center">
        <Fireflies />
      <ConfettiStreamers />
      <div className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl w-full">

        <Card3D backgroundSrc={backgroundImage} characterSrc={familyPets} alt={result.nombre} title={result.nombre} />

        <div className="flex-1 text-center lg:text-left text-[var(--gris4)]">
<div className="bg-[var(--lila)] text-white text-sm px-6 py-2 rounded-full inline-flex items-center gap-2 mb-4 shadow-md animate-fade-in tracking-wide font-semibold">
  <span className="material-icons text-white text-base">local_florist</span>
  ¡Quiz completado!
</div>


          <h1 className="text-3xl md:text-4xl font-bold text-[var(--gris4)] mb-2">
            Tu familia olfativa es:
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-violeta bg-clip-text text-transparent mb-6 animate-fadeIn">
            {result.nombre}
          </h2>
{/* PONGO ARRAY.ISARRAY COMO VALIDACIÓN EXTRA */}
  {Array.isArray(result.subfamilias) && result.subfamilias.length > 0 && (
  <div className="mb-8 text-start">
    <h3 className="text-lg md:text-xl font-bold text-violeta mb-4">
      Subfamilias destacadas
    </h3>
    <ul className="flex flex-wrap justify-start gap-3 text-sm">
      {result.subfamilias.map((sub, idx) => (
        <li
          key={idx}
          className="bg-[var(--violeta)] text-white px-4 py-2 rounded-full shadow-lg font-semibold tracking-wide transition transform hover:scale-105 hover:shadow-xl"
        >
          {sub}
        </li>
      ))}
    </ul>
  </div>
)}


       {formula && (
  <div className="bg-white border border-lila rounded-3xl p-6 mb-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
    <h3 className="text-lg font-bold text-violeta mb-6 flex items-center justify-center gap-2 tracking-wide">
      <span className="material-icons text-[var(--violeta)]">science</span>
      Fórmula sugerida para vos:
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-violeta text-base font-medium">
      {/* Salida */}
      <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
        <span className="material-icons text-2xl text-[var(--violeta)] mb-1">north</span>
        <p className="font-bold text-[var(--violeta)]">Nota de Salida</p>
        <p className="text-[var(--gris4)]">{formula.TopNote}</p>
      </div>

      {/* Corazón */}
      <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
        <span className="material-icons text-2xl text-[var(--violeta)] mb-1">favorite</span>
        <p className="font-bold text-[var(--violeta)]">Nota de Corazón</p>
        <p className="text-[var(--gris4)]">{formula.HeartNote}</p>
      </div>

      {/* Fondo */}
      <div className="flex flex-col items-center transition-transform duration-300 hover:scale-105">
        <span className="material-icons text-2xl text-[var(--violeta)] mb-1">south</span>
        <p className="font-bold text-[var(--violeta)]">Nota de Fondo</p>
        <p className="text-[var(--gris4)]">{formula.BaseNote}</p>
      </div>
    </div>
  </div>
)}



          {concentration && (
            <p className="mb-6 text-sm italic text-[var(--gris3)]">
              Concentración sugerida: <span className="font-semibold">{concentration}</span>
            </p>
          )}

          <p className="mt-10 text-[var(--gris4)] text-sm md:text-base leading-relaxed max-w-xl">
            {familyDescriptions[result.nombre]}
          </p>

          {!showSummary && (
            <button
              onClick={() => setShowSummary(true)}
              className="mt-6 text-sm underline text-violeta hover:text-lila transition"
            >
              Ver resumen de tus respuestas
            </button>
          )}

          {showSummary && (
            <section className="bg-white border border-gray-200 rounded-xl p-6 mt-10 mb-8 shadow-md max-w-xl mx-auto">
              <h3 className="text-center text-lg font-semibold text-gray-800 mb-4 uppercase tracking-wide">
                Resumen de tus respuestas
              </h3>
              <ul className="text-sm text-gray-700 space-y-3">
                {dynamicSummary.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.label}:</strong> {item.value}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowSummary(false)}
                className="mt-6 block mx-auto text-sm text-violeta hover:underline"
              >
                Ocultar resumen
              </button>
            </section>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full justify-center">
            <ButtonSecondary label="Volver a empezar" onClick={onReset} />
              <ButtonViolet onClick={handleCrearPerfume}>
                     Crear mi perfume con esta fórmula
                   </ButtonViolet>
          </div>
        </div>
      </div>
        {/* MODAL DE AVISO */}
            {showLoginModal && (
              <LoginRequiredModal
                onClose={() => setShowLoginModal(false)}
                onLogin={() => {
                  setShowLoginModal(false);
                  setAuthForm("login");
                  setShowAuthModal(true);
                }}
              />
            )}
      
            {/* MODAL DE LOGIN / REGISTER */}
            {showAuthModal && (
              <AuthModalWrapper
                title={authForm === "login" ? "Iniciar sesión" : "Registrarte"}
                onClose={() => setShowAuthModal(false)}
              >
                {authForm === "login" ? (
                  <LoginForm toggleForm={() => setAuthForm("register")} />
                ) : (
                  <RegisterForm toggleForm={() => setAuthForm("login")} />
                )}
              </AuthModalWrapper>
            )}
            <FloatingMascot
  messages={[
    "¡Tu esencia ideal está lista para cobrar vida!",
    "¡Qué combinación mágica descubriste!",
    "Ya podés crear tu perfume con esta fórmula 🧪",
  ]}
  imageSrc="/Quimi/quimiLanding.png" 
/>

    </div>
  )
}
