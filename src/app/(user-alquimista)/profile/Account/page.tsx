"use client";
import { useEffect, useState } from "react";
import EmptySection from "@/components/menu/EmptySection";


type UserProfile = {
  name: string;
  email: string;
  esProveedor: boolean;
};
export default function AccountPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/profile/data")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los datos del perfil");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando datos del perfil...</p>;

  if (!user){
    return (
    <EmptySection
      title="Mi Cuenta"
      description1="-"
      description2="-"
      buttonText="-"
      onClick={() => console.log("-")}
    />
  );
  }
  return (
    <EmptySection
      title={`Hola, ${user.name}`}
      description1={`Correo: ${user.email}`}
      description2={`Tipo de cuenta: ${user.esProveedor ? "Proveedor" : "Creador"}`}
      buttonText="Editar Perfil"
      onClick={() => console.log("Redirigir a edición de perfil")}
    />
  );
}

