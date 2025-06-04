"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EmptySection from "@/components/menu/EmptySection";

export default function FormulasPage() {
  const router = useRouter();
  const [formulas, setFormulas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/profile/formulas")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar las fórmulas");
        return res.json();
      })
      .then((data) => setFormulas(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando fórmulas...</p>;

  if (formulas.length === 0){
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
  
}
