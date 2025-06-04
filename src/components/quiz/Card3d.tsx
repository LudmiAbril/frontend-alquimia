"use client"

import Image from "next/image"

interface Card3DProps {
  backgroundSrc: string
  characterSrc: string
  alt: string
}

export default function Card3D({ backgroundSrc, characterSrc, alt }: Card3DProps) {
  return (
    <div className="card relative w-[200px] h-[300px] flex justify-center items-end perspective-[2500px] group">
      <div className="wrapper absolute w-full h-full rounded-3xl overflow-hidden transition-all duration-500 group-hover:translate-y-[-5%] group-hover:rotate-x-[25deg] group-hover:shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(12,13,19,0.9)] to-transparent z-0"></div>
        <Image
          src={backgroundSrc}
          alt="Background"
          fill
          className="object-cover rounded-3xl"
        />
      </div>

      <Image
        src={characterSrc}
        alt={alt}
        width={300}
        height={300}
        className="character absolute w-full transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-30%] z-10"
      />
    </div>
  )
}
