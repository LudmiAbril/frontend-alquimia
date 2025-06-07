"use client"

import Image from "next/image"

interface Card3DProps {
  backgroundSrc: string
  characterSrc: string
  alt: string
  title: string
}

export default function Card3D({ backgroundSrc, characterSrc, alt, title }: Card3DProps) {
  return (
    <div className="card relative w-[200px] h-[300px] flex justify-center items-end perspective-[2500px] group overflow-hidden rounded-3xl">
      <div className="wrapper absolute w-full h-full rounded-3xl overflow-hidden transition-all duration-500 group-hover:translate-y-[-5%] group-hover:rotate-x-[25deg] group-hover:shadow-2xl">
        {/* ANIMACIONES BONITAS DE DESTELLITOS  */}
<div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
  {[...Array(10)].map((_, i) => (
    <span
      key={i}
      className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full animate-firefly"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${3 + Math.random() * 2}s`,
      }}
    />
  ))}
</div>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(12,13,19,0.9)] to-transparent z-0"></div>
            {/* IMG DE FONDO*/}
        <Image
          src={backgroundSrc}
          alt="Background"
          fill
          className="object-cover rounded-3xl group-hover:blur-sm transition-all duration-500"
        />
      </div>
    {/* IMG HOVER */}
      <Image
        src={characterSrc}
        alt={alt}
        width={230}
        height={230}
        className="character absolute bottom-4 w-full max-h-[230px] object-contain transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-15%] z-10"
      />

      {/* EL TEXTO DEL HOVER */}
      <div className="absolute bottom-6 w-full text-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
    <span className="text-white text-xl font-bold tracking-widest uppercase font-volkorn glow px-4 py-1 rounded-md shadow-lg">
  {title}
</span>

      </div>
    </div>
  )
}
