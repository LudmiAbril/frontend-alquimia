"use client";

import { useEffect, useState } from "react";
import Button from "@/components/general/Button";
import DiscoverModal from "../modals/DiscoverModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateBg, setAnimateBg] = useState(false);

  useEffect(() => {
    setAnimateBg(true);
  }, []);

  return (
    <section className="relative text-white min-h-screen flex items-center px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[#854289] z-[-3]" />

      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[4000ms] ease-in-out transform ${animateBg ? "scale-100 opacity-100" : "scale-110 opacity-0"} z-[-2]`}
        style={{ backgroundImage: "url('/LandingImage/hero.png')" }}
      />

      <div className="absolute inset-0 bg-black bg-opacity-60 z-[-1]" />

      {/* Contenido alineado a la izquierda con espacio extra */}
      <div className="relative z-10 max-w-3xl pl-2 sm:pl-6 md:pl-10 lg:pl-14">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-8 uppercase">
          Diseñá perfumes
          <span className="block mt-4">que hablen de vos</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-xl">
          Creatividad, emoción y aroma. Todo desde una plataforma hecha para no expertos.
        </p>

        <Button label="Empezar a crear" onClick={() => setIsModalOpen(true)} />
      </div>

      {isModalOpen && <DiscoverModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
