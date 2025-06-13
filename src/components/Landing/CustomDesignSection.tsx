"use client";

import { useState } from "react";
import SectionWrapper from "@/components/General/SectionWrapper";
import Image from "next/image";
import { motion } from "framer-motion";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ImageModal from "../Modals/ImageModal";
import { etiquetas } from "../Utils/utils";

export default function CustomDesignSection() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

 

  return (
    <SectionWrapper className="bg-white">
      <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--gris4)] mb-10 text-center">
          PERSONALIZA TU FRASCO
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 max-w-xl text-left text-[var(--gris4)]">
            <p className="text-xl text-[var(--gris3)] mb-4 leading-relaxed">
              Personaliza cada detalle de tu frasco para hacerlo único:
            </p>

            <motion.ul
              className="space-y-4 mb-6 text-lg md:text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {[
                "Subir tu logo",
                "Elegir el color",
                "Cambiar la tipografía",
                "Subir una imagen",
                "Elegir la forma (cuadrada, redonda o rectangular)",
              ].map((label) => (
                <motion.li
                  key={label}
                  className="flex items-center gap-4 text-[var(--gris4)] cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <CheckCircleOutlineIcon fontSize="small" className="text-[var(--violeta)]" />
                  <span className="font-semibold text-lg">{label}</span>
                </motion.li>
              ))}
            </motion.ul>

            <p className="text-xl text-[var(--gris3)] mb-2 leading-relaxed">
              Nosotros nos encargamos de conectarte con proveedores que harán realidad tu diseño personalizado.
            </p>
          </div>

          <div className="flex-1 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full"
            >
              {etiquetas.map((img, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-[var(--gris4)]"
                  onClick={() => setSelectedImg(img)}
                >
                  <Image
                    src={img}
                    alt={`Etiqueta ejemplo ${index + 1}`}
                    width={350}
                    height={350}
                    className="object-cover w-full h-full transition-all duration-500 transform group-hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white text-xl font-semibold">Ver detalles</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <ImageModal selectedImg={selectedImg} onClose={() => setSelectedImg(null)} />
      </div>
    </SectionWrapper>
  );
}
