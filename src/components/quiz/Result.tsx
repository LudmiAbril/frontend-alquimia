"use client";

import { PropsResult, SummaryItem } from "@/components/utils/typing";
import { answerSummaryMap, backgroundByFamily, familyDescriptions, familyPet } from "../utils/utils";
import { useState } from "react";
import Card3D from "./Card3d";
import Fireflies from "./Fireflies";
import ConfettiStreamers from "./ConfettiStreamer";
import FloatingMascot from "../General/MascotaFlotante";
import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/login/RegisterForm";
import LoginRequiredModal from "@/components/login/LoginRequiredModal";
import AuthModalWrapper from "@/components/modals/AuthModalWrapper";
import StepFamily from "./StepFamily";
import StepSubfamilies from "./StepSubfamilies";
import StepFormula from "./StepFormula";
import StepSummary from "./StepSummary";



export default function Result({ result, answers, onReset }: PropsResult) {
  const [step, setStep] = useState(1);
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
      const letterToNum = { A: "1", B: "2", C: "3", D: "4" };
      const key = letterToNum[answer.selectedOption as keyof typeof letterToNum];
      const entry = answerSummaryMap[answer.questionId]?.[key];
      return entry ?? null;
    })
    .filter((e): e is SummaryItem => e !== null);

  const backgroundImage = backgroundByFamily[result.nombre] || "/quiz/familia-fondos/amaderadaBack.png";
  const familyPets = familyPet[result.nombre] || "/mascotas/amaderada.png";
  const formula = result.formulas?.[0];
  const concentration = result.concentracion && result.concentracion !== "Desconocido" ? result.concentracion : "Body Splash";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[url('/textures/paper.jpg')] bg-cover bg-center">
      <Fireflies />
      <ConfettiStreamers />

      {step === 1 && (
        <StepFamily
          result={result}
          backgroundImage={backgroundImage}
          familyPets={familyPets}
          onNext={() => setStep(2)}
        />
      )}

   {step === 2 && Array.isArray(result.subfamilias) && (
  <StepSubfamilies
    subfamilias={result.subfamilias}
    onNext={() => setStep(3)}
  />
)}

      {step === 3 && (
        <StepFormula
          formula={formula}
          concentration={concentration}
          description={familyDescriptions[result.nombre]}
          onNext={() => setStep(4)}
          onCrearPerfume={handleCrearPerfume}
        />
      )}

{step === 4 && (
  <StepSummary
    summary={dynamicSummary}
    onReset={onReset}
    onBack={() => setStep(3)}
  />
)}


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
  );
}
