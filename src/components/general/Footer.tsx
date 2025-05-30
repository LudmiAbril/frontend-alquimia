import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
<footer className="bg-[#E8E3DE] text-white text-sm">
  <div>
    <Image
      src="/svgGeneral/TreeFooter.svg"
      alt="Decoración árboles"
      width={1440}
      height={150}
      className="w-full object-cover "
    />
  </div>

  <div className="bg-[#9444B6]  px-10 py-9 -mt-1">
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
      {/* Logo */}
      <Image
        src="/Logo/logotipo.svg"
        alt="Logo Alquimia"
        className="w-[90px] h-[80px]"
        width={90}
        height={80}
      />

      {/* Redes */}
      <div className="flex flex-col items-end">
        <p className="mb-4">Encontranos en:</p>
        <div className="flex gap-8">
          <Image
            src="/Redes/tiktokIcon.svg"
            alt="TikTok"
            className="w-[32px] h-[32px] cursor-pointer"
            width={32}
            height={32}
          />
          <Image
            src="/Redes/instagram.svg"
            alt="Instagram"
            className="w-[32px] h-[32px] cursor-pointer"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>

    {/* Línea divisoria */}
    <div className="border-t border-[#E8E3DE] my-5" />

    <div className="flex flex-col md:flex-row justify-between gap-3 text-[13px] leading-snug">
      <p>
        © 2025 Alquimia, todos los derechos reservados. No nos
        responsabilizamos por el uso inapropiado de ingredientes.
      </p>
      <p>
        <Link
          href="/legales/terminos"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline hover:opacity-90 transition-opacity"
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
