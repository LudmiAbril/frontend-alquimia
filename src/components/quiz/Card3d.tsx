"use client"

import Image from "next/image"

interface Card3DProps {
  backgroundSrc: string
  characterSrc: string
  alt: string
  title: string // nuevo
}

export default function Card3D({ backgroundSrc, characterSrc, alt, title }: Card3DProps) {
  return (
    <div className="card relative w-[200px] h-[300px] flex justify-center items-end perspective-[2500px] group">
      <div className="wrapper absolute w-full h-full rounded-3xl overflow-hidden transition-all duration-500 group-hover:translate-y-[-5%] group-hover:rotate-x-[25deg] group-hover:shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(12,13,19,0.9)] to-transparent z-0"></div>
        <Image
          src={backgroundSrc}
          alt="Background"
          fill
          className="object-cover rounded-3xl group-hover:blur-sm transition-all duration-500"
        />
      </div>

      <Image
        src={characterSrc}
        alt={alt}
        width={230}
        height={230}
        className="character absolute bottom-4 w-full max-h-[230px] object-contain transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-15%] z-10"
      />

      {/* Texto animado */}
 <div className="absolute bottom-2 w-full text-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
  <span className="text-white text-base font-bold tracking-wide font-[var(--font-principal)] glow bg-[rgba(0,0,0,0.3)] px-2 py-1 rounded-md">
    {title}
  </span>
</div>

    </div>
  )
}
