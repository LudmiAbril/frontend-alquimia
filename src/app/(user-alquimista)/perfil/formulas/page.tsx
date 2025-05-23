"use client"; 

import { useRouter } from "next/navigation";
import SeccionVacia from "@/components/menu/EmptySection";

export default function FormulasPage() {
  const router = useRouter();

  return (
    <SeccionVacia
      titulo="Mis Fórmulas"
      descripcion1="Todavía no hay huellas perfumadas aquí."
      descripcion2="Cuando elijas tu fragancia y la prepares, vas a ver tus fórmulas en este rincón."
      textoBoton="Empezar a diseñar"
      onClick={() => router.push("/disenar")}
    />
  );
}
