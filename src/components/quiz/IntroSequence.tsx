"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { src: "/mascotas/mascotas-grupo-fight.png", alt: "Preparación mágica" },
  { src: "/mascotas/slide2.jpeg", alt: "Competencia olfativa" },
  { src: "/mascotas/slide3.jpeg", alt: "Combate de fragancias" },
  { src: "/mascotas/slide4.jpeg", alt: "Descubrí tu esencia" },
];

export default function IntroSequence() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[600px] h-[350px] flex items-center justify-center relative mx-auto overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 40, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: -40, scale: 1.05, rotate: 2, filter: "blur(2px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute w-full h-full flex items-center justify-center"
        >
          <Image
            src={slides[step].src}
            alt={slides[step].alt}
            width={600}
            height={350}
            priority
            className="object-contain w-full h-full"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
