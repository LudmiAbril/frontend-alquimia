"use client";
import Image from "next/image";
import Button from "@/components/general/Button";
import SectionWrapper from "@/components/general/SectionWrapper";

export default function FragranceIntroSection() {
  return (
    <SectionWrapper className="relative text-white text-center overflow-hidden min-h-[100vh] bg-[var(--lila)]">
      <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-6xl flex flex-col lg:flex-row items-center justify-between">
     
        <div className="flex-1 mb-6 lg:mb-0 pl-10">
          <Image
            src="/LandingImage/macoaMovingPotion.gif"
            alt="Imagen o GIF representativo"
            width={200}
            height={200}
            className="w-[82%] h-auto object-contain"
          />
        </div>


        <div className="flex-1  text-justify">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight text-[var(--gris4)]">
            <span className="block">DISEÑÁ TU FRAGANCIA</span>
            <span className="block">DESDE CERO</span>
          </h2>

         <h3 className="text-lg md:text-xl font-semibold mb-6 text-[var(--gris4)] italic">
            Elegí ingredientes únicos, combiná notas aromáticas y personalizá tu frasco.
          </h3>

          <p className="text-lg md:text-xl mb-3 text-[var(--gris4)] leading-relaxed">
            Alquimia te guía paso a paso para que explores, experimentes y crees un perfume tan único como vos.
          </p>

          <p className="text-lg md:text-xl mb-[60px] text-[var(--gris4)] leading-relaxed">
            Diseñá tu fragancia ideal con una amplia variedad de opciones y un proceso creativo único.
          </p>

          <Button
            label="Crear mi perfume"
            href="/createParfum"
            colorClass="bg-[var(--violeta)] text-[var(--hueso)] hover:bg-[var(--hueso)] group hover:text-[var(--violeta)]"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
