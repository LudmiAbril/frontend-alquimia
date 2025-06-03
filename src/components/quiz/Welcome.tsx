"use client"

import { useState } from "react"
import WelcomeIntro from "./WelcomeIntro";
import WelcomeFamilies from "./WelcomeFamilies";
interface WelcomeProps {
  onStart: () => void;
  loading: boolean;
}

export default function Welcome({ onStart, loading }: WelcomeProps) {
  const [step, setStep] = useState<1 | 2>(1)

  return step === 1 ? (
    <WelcomeIntro onNext={() => setStep(2)} />
  ) : (
    <WelcomeFamilies onStart={onStart} loading={loading} />
  )
}
