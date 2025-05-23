"use client";

import SeccionVacia from "@/components/menu/EmptySection";

export default function FormulasPage() {
  return (
    <SeccionVacia
      titulo="Mi Biblioteca"
      descripcion1="Tu rincón personal para guardar esencias e ingredientes que te inspiran.."
      descripcion2="Aún no hay ingredientes guardados.
 Explorá las esencias disponibles y guardá tus favoritas para combinarlas más tarde o contactarte con proveedores cuando estés lista para crear."
      textoBoton="Explorar ingredientes"
      onClick={() => console.log("Explorar ingredientes")}
    />
  );
}
