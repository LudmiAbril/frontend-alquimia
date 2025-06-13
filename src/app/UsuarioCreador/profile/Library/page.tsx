"use client";

import EmptySection from "@/components/Menu/EmptySection";

export default function LibraryPage() {
  return (
    <EmptySection
      title="Mi Biblioteca"
      description1="Tu rincón personal para guardar esencias e ingredientes que te inspiran.."
      description2="Aún no hay ingredientes guardados.
Explorá las esencias disponibles y guardá tus favoritas para combinarlas más tarde o contactarte con proveedores cuando estés lista para crear."
      buttonText="Explorar ingredientes"
      onClick={() => console.log("Explorar ingredientes")}
    />
  );
}