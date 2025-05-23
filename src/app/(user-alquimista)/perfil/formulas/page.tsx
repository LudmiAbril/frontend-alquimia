"use client";

import { useRouter } from "next/navigation";
import EmptySection from "@/components/menu/EmptySection";

export default function FormulasPage() {
  const router = useRouter();

  return (
    <EmptySection
      title="Mis Fórmulas"
      description1="Todavía no hay huellas perfumadas aquí."
      description2="Cuando elijas tu fragancia y la prepares, vas a ver tus fórmulas en este rincón."
      buttonText="Empezar a diseñar"
      onClick={() => router.push("/disenar")}
    />
  );
}
