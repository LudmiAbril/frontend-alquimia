"use client";

import { useEffect, useState } from "react";
import EmptySection from "@/components/menu/EmptySection";

export default function LibraryPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/profile/wishlist")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar la wishlist");
        return res.json();
      })
      .then((data) => setWishlist(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando ingredientes guardados...</p>;

  if (wishlist.length === 0){
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
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Mis Ingredientes Guardados</h1>
      <ul className="space-y-2">
        {wishlist.map((item) => (
          <li key={item.id} className="border p-4 rounded">
            <h2 className="font-semibold">{item.nombre}</h2>
            <p>Familia: {item.familiaOlfativa}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
