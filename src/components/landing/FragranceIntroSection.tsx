"use client";
import Image from "next/image";
import Button from "@/components/general/Button";
import SectionWrapper from "@/components/general/SectionWrapper";

export default function FragranceIntroSection() {
  return (
    <SectionWrapper className="relative text-white text-center overflow-hidden min-h-[105vh] bg-[var(--lila)]">

      <div className="relative z-10  mx-auto mt-10 ">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-[var(--gris4)]">
          DISEÑÁ TU FRAGANCIA DESDE CERO.
        </h2>
        <p className="text-md md:text-base mb-10 text-[var(--gris4)]">
          Elegí ingredientes únicos, combiná notas aromáticas y personalizá tu frasco. <br />
          Alquimia te guía paso a paso para que explores, experimentes y crees un perfume tan único como vos.
        </p>

        <Button
          label="CREAR MI PERFUME"
        href="/createParfum"
          colorClass="bg-[var(--violeta)] text-[var(--hueso)] hover:bg-[var(--hueso)] group"
        />

      </div>

      <div className="absolute bottom-0 left-0 w-full -mb-[1px]">
        <Image
          src="/LandingImage/TreeBg.svg"
          alt="Bosque mágico"
          width={1920}
          height={120}
          className="w-full h-auto block"
        />
      </div>
    </SectionWrapper>
  );
}
