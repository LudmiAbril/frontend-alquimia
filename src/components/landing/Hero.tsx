"use client";

import { useState, useEffect } from "react";
import Button from "@/components/general/Button";
import DiscoverModal from "../modals/DiscoverModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animateBg, setAnimateBg] = useState(false);

  useEffect(() => {
    setAnimateBg(true);
  }, []);

  return (
    <section className="relative text-white min-h-[100vh] flex items-center px-6 md:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-[#854289] z-[-2]" />

      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[4000ms] ease-in-out transform ${animateBg ? "scale-100 opacity-100" : "scale-110 opacity-0"
          } z-[-1]`} style={{ backgroundImage: "url('/LandingImage/hero.png')" }} />

      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      <div className="relative z-10">
        <div className="max-w-lg md:max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-4 pb-5">
            DISEÑÁ PERFUMES <br className="hidden sm:block" />
            QUE HABLEN DE VOS
          </h1>

          <p className="text-lg md:text-xl mb-5 pb-5">
            Creatividad, emoción y aroma. Todo desde una plataforma hecha para no expertos.
          </p>
          <Button label="Empezar a crear"
            onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {isModalOpen && <DiscoverModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
