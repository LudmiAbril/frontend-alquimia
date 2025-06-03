"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/general/Button";
import SectionWrapper from "@/components/general/SectionWrapper";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Cada familia olfativa con su mascota, descripción y color
const families = [
  {
    name: "Orientales",
    description: "Notas especiadas, dulces o gourmand. Muy sensuales.",
    color: "#BA4944",
    src: "/mascotas/oriental.png",
  },
  {
    name: "Floral",
    description: "Notas románticas y delicadas. Muy versátil.",
    color: "#D54DA2",
    src: "/mascotas/floral.png",
  },
  {
    name: "Frescas",
    description: "Piel clara o gusto por fragancias cítricas y ligeras.",
    color: "#6483C2",
    src: "/mascotas/fresca.png",
  },
  {
    name: "Amaderada",
    description: "Profunda, cálida. Ideal para la noche o piel oscura.",
    color: "#7B655A",
    src: "/mascotas/amaderada.png",
  },
];

export default function Welcome() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <SectionWrapper className="relative bg-[#E8E3DE] text-center overflow-hidden py-16">
      {/* Quimi encabezando */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <Image
          src="/mascotas/lookingQuimi.png"
          alt="Quimi el mago guía"
          width={100}
          height={100}
          className="mx-auto"
        />
      </motion.div>

      {/* Título */}
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--gris4)] mb-3">
        Descubre qué aromas van con vos
      </h2>
      <p className="text-base text-[var(--gris4)] max-w-xl mx-auto mb-8">
        Este quiz mágico te ayudará a encontrar tu familia olfativa ideal. Cada respuesta va a sumar puntos a una familia y así vamos a determinar cuáles son los aromas que te representan.Conozcamos a las familias :
      </p>
 

      {/* Banderines de familias como banners */}
      <div className="flex flex-wrap justify-center items-end gap-8 mb-14">
        {families.map(({ name, src, color, description }, index) => {
          const isHovered = hovered === name;
          const isAnyHovered = hovered !== null;

          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHovered(name)}
              onMouseLeave={() => setHovered(null)}
              className={`transition-all duration-300 ease-in-out cursor-pointer flex flex-col items-center relative group
                ${isHovered ? "scale-105 z-10" : isAnyHovered ? "opacity-40 grayscale" : ""}`}
            >
              {/* Banner visual con imagen incluida */}
              <div className="w-36 h-40 bg-white rounded-b-xl shadow-md relative border-t-4 flex flex-col items-center justify-center" style={{ borderColor: color }}>
                <div className="relative w-[90px] h-[90px]">
                  <Image
                    src={src}
                    alt={name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-2 text-sm font-semibold text-[var(--gris4)]">
                  {name}
                </div>
              </div>
              {isHovered && (
                <motion.div
                  className="absolute top-full mt-2 bg-white p-3 rounded-md shadow-lg text-sm w-48"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {description}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Info y botón */}
      <div className="text-center flex flex-col items-center mb-6">
        <p className="text-[16px] font-semibold text-[var(--gris4)] mb-3">
          ¿QUERÉS SABER CUAL FAMILIA OLFATIVA ES LA TUYA?
        </p>
        <Button
          label="COMENZAR QUIZ"
          onClick={() => console.log("Ir al test")}
          colorClass="bg-[#9444B6] text-white hover:bg-[#7a2f96]"
        />
   
      </div>
    </SectionWrapper>
  );
}
