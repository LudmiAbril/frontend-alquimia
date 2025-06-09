"use client";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import SectionWrapper from "@/components/general/SectionWrapper";
import { suppliers } from "../utils/utils";
import Image from "next/image";

export default function SuppliersSection() {
    return (
        <SectionWrapper className="bg-[var(--lila)] text-justify py-16 px-4">
            <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--gris4)] mb-8">
                    TODOS LOS INGREDIENTES, A UN HECHIZO DE DISTANCIA
                </h2>
                
                <h3 className="text-lg md:text-xl font-semibold mb-6 text-[var(--gris4)] italic">
                    Desde envases encantados hasta esencias únicas, encontrá todo lo que necesitás para dar vida a tu perfume.
                </h3>

                <p className="text-xl text-[var(--gris3)] mb-12 leading-relaxed text-left">
                    Descubrí nuestros proveedores de ingredientes  para tus perfumes. Desde esencias  hasta frascos personalizados, cada uno de nuestros proveedores ofrece productos que te permitirán crear una fragancia única, tal como la imaginas.
                </p>

                <Swiper
                    spaceBetween={20}
                    slidesPerView={1.3}
                    breakpoints={{
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="py-10"
                >
                    {suppliers.map((supplier, index) => (
                        <SwiperSlide key={index}>
                            <div className="group relative w-[250px] h-[320px] rounded-3xl overflow-hidden shadow-md flex flex-col items-center justify-center text-justify transition-all duration-300">

                                <Image
                                    src={supplier.imageSrc}
                                    alt={supplier.name}
                                    width={280}
                                    height={300}
                                    className="object-cover object-center transition-all duration-500 filter blur-sm group-hover:blur-0"
                                />

                                <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />

                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                                    <button
                                        className="w-[160px] h-[44px] bg-[#9444B6] text-white px-4 py-2 rounded-[10px] font-bold transition-all duration-300 
                    group-hover:bg-white group-hover:text-[#9444B6] text-sm uppercase flex items-center justify-center"
                                    >
                                        <span className="block group-hover:hidden whitespace-nowrap truncate">
                                            {supplier.name}
                                        </span>
                                        <span className="hidden group-hover:block">VER MÁS</span>
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </SectionWrapper>
    );
}
