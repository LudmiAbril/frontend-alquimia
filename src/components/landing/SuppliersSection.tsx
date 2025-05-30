"use client";
import "swiper/css";
import "swiper/css/pagination";
import SectionWrapper from "@/components/general/SectionWrapper";
import SupplierCarousel from "./SupplierCarousel";

export default function SuppliersSection() {
    return (
        <section className="bg-[var(--lila)] text-center py-16 px-4">
            <h2 className="text-center text-2xl font-bold text-[var(--gris4)] mt-6">
                TODOS LOS INGREDIENTES, A UN HECHIZO DE DISTANCIA
            </h2>
            <p className="text-[var(--gris4)] mt-10 text-left max-w-4xl mx-auto">
                Desde envases encantados hasta esencias únicas, encontrá todo lo que necesitás para dar vida a tu perfume. Conoce a nuestros proveedores
            </p>

            <SupplierCarousel />
        </section>
    );
}
