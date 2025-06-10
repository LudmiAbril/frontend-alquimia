"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
const isQuizPage = pathname === "/quiz" || pathname.startsWith("/quiz/formula");


  return (
    <footer className="text-sm">
      <div className={isQuizPage ? "bg-white" : "bg-[#E8E3DE]"}>
        <Image
          src="/svgGeneral/TreeFooter.svg"
          alt="Decoración árboles"
          width={1440}
          height={150}
          className="w-full object-cover"
        />
      </div>

      <div className="bg-[#9444B6] text-white px-10 py-8 -mt-1">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <Image
            src="/logo/logotipo.svg"
            alt="Logo Alquimia"
            className="w-[120px] h-[110px]" 
            width={120}
            height={110}
          />

          <div className="flex flex-col items-end">
            <p className="mb-4 text-lg font-semibold">Encontranos en:</p>  
            <div className="flex gap-10">
              <Image
                src="/redes/tiktokIcon.svg"
                alt="TikTok"
                className="w-[40px] h-[40px] cursor-pointer"  
                width={40}
                height={40}
              />
              <Image
                src="/redes/instagram.svg"
                alt="Instagram"
                className="w-[40px] h-[40px] cursor-pointer"  
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>

      
        <div className="border-t border-[#E8E3DE] my-4" />  

        <div className="flex flex-col md:flex-row justify-between gap-6 text-lg leading-snug">  
          <p>
            © 2025 Alquimia, todos los derechos reservados. No nos
            responsabilizamos por el uso inapropiado de ingredientes.
          </p>
          <p>
            <Link
              href="/legales/terminos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:opacity-90 transition-opacity text-lg"  
            >
              Términos y condiciones
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
