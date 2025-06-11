"use client"

import { useState } from "react"
import WelcomeIntro from "./WelcomeIntro";
import WelcomeFamilies from "./WelcomeFamilies";
import Fireflies from "./Fireflies";
interface WelcomeProps {
  onStart: () => void;
  loading: boolean;
}

export default function Welcome({ onStart, loading }: WelcomeProps) {
  const [step, setStep] = useState<1 | 2>(1)

  return step === 1 ? (
      <><Fireflies /><WelcomeIntro onNext={() => setStep(2)} /></>
  ) : (
     <><Fireflies /><WelcomeFamilies onStart={onStart} loading={loading} /></>
  )
}
