"use client"
import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadFireflyPreset } from "tsparticles-preset-firefly"
import type { Engine } from "tsparticles-engine"

export default function PotionParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFireflyPreset(engine)
  }, [])

  return (
   <Particles
  id="tsparticles"
  init={particlesInit}
  options={{
    fullScreen: false,
    background: { color: "transparent" },
    fpsLimit: 60,
    particles: {
      number: { value: 30 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.5,
          sync: false,
        },
      },
      size: {
        value: 4,
        random: true,
        animation: {
          enable: true,
          speed: 5,
          minimumValue: 0.5,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
  
      },
      glow: {
        enable: true,
        color: "#ffffff",
        blur: 10,
      },
    },
    detectRetina: true,
  }}
/>

  )
}
