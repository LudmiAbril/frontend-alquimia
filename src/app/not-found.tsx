// src/app/not-found.tsx
"use client";

import Link from "next/link";
import SectionWrapper from "@/components/General/SectionWrapper";
import Image from "next/image";
import ButtonViolet from "@/components/General/ButtonViolet";

export default function NotFound() {
  return (
    <SectionWrapper>
      <div className="animate-fadeIn min-h-screen flex flex-col justify-center items-center text-center px-6 py-20">

        <Image
          src="/svgGeneral/404.png"
          alt="Quimi triste"
          width={192}
          height={192}
          className="mb-6 "
        />

        <h1 className="text-4xl font-bold text-[#9444B6] mb-4">¡Oops! No encontramos lo que buscás</h1>
        <p className="text-gray-600 text-lg mb-8">
         A veces la magia lleva tiempo, probá más tarde.
        </p>

        <Link href="/">
          <ButtonViolet label="Volver a Inicio" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
