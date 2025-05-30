"use client";

import SectionWrapper from "@/components/general/SectionWrapper";
import Image from "next/image";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function CustomDesignSection() {
  return (
    <SectionWrapper className="bg-[var(--hueso)]">
      <div className="flex flex-col md:flex-row items-center gap-10">

        <div className="flex-1 flex justify-center">
          <Image
            src="/LandingImage/macoaMovingPotion.gif" 
            alt="Frasco personalizado"
            className="w-full max-w-[250px]"
            width={250}
            height={250}
          />
        </div>

        <div className="flex-1 max-w-xl text-left text-[var(--gris4)]">
          <h2 className="text-2xl md:text-3xl font-bold mb-5">HECHO A TU MEDIDA</h2>

          <p className="mb-2">Dale tu sello personal al frasco. Elegí:</p>

          <ul className="space-y-2 mb-4">
            {[
              { label: "Los colores" },
              { label: "La forma" },
              { label: "La tipografía" },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <CheckCircleOutlineIcon fontSize="small" className="text-[var(--gris4)]" />
                <span className="font-semibold">{item.label}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm md:text-base">
            Nosotros nos encargamos de conectarte con proveedores que harán realidad tu diseño.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
