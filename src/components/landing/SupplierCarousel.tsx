"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SectionWrapper from "@/components/general/SectionWrapper";
import { suppliers } from "../utils/utils";
import Image from "next/image";

const SupplierCarousel = () => {
    return (
        <SectionWrapper className="w-full px-6">
            <Swiper
                spaceBetween={20}
                slidesPerView={1.3}
                breakpoints={{
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {suppliers.map((supplier, index) => (
                    <SwiperSlide key={index}>
                        <div className="group relative h-[220px] rounded-3xl overflow-hidden bg-[#E8E3DE] shadow-md flex flex-col items-center justify-center text-center transition-all duration-300">
                            <Image
                                src={supplier.imageSrc}
                                alt={supplier.name}
                                fill
                                className="object-cover object-center group-hover:opacity-100 opacity-0 transition-opacity duration-500"
                            />

                            <div className="absolute inset-0 bg-[var(--hueso)] group-hover:bg-transparent transition duration-500 z-10" />

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

        </SectionWrapper>
    );
};

export default SupplierCarousel;
