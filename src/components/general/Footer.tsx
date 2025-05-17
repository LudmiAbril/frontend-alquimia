import React from 'react';
import Link from 'next/link';


export const Footer = () => {
    return (
        <footer className="bg-[#E8E3DE] text-white text-sm">
            <div className="bg-[#9444B6] rounded-t-[4rem] px-10 py-9">
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                    {/* Logo */}
                    <img src="./logotipo.svg"  alt="Logo Alquimia" className="w-[90px] h-[80px]" />

                    {/* Redes  */}
                    <div className="flex flex-col items-end">
                        <p className="mb-4">Encontranos en:</p>
                        <div className="flex gap-8">
                            <img src="./tiktokIcon.svg" alt="TikTok" className="w-[32px] h-[32px] cursor-pointer" />
                            <img src="./instagram.svg" alt="Instagram" className="w-[32px] h-[32px] cursor-pointer"/>
                        </div>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-[#E8E3DE] my-5" />

                {/* Texto legal */}
                <div className="flex flex-col md:flex-row justify-between gap-3 text-[13px] leading-snug">
                    <p>© 2025 Alquimia. Plataforma informativa sin fines comerciales. No
                       nos responsabilizamos por el uso inapropiado de ingredientes.
                    </p>
                    <p>
                        <Link href="#" className="text-white underline hover:opacity-90 transition-opacity">
                            Términos y condiciones
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;