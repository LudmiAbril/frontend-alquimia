"use client";

import { useState } from "react";
import { ProductDTO } from "../Utils/typing";
import ProviderRow from "./ProviderRow";

interface Props {
  productos: ProductDTO[];
}

export default function ProviderTable({ productos: initialProductos }: Props) {
  const [productos, setProductos] = useState<ProductDTO[]>(initialProductos);

  const handleDeleted = (idEliminado: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== idEliminado));
  };

  return (
    <table className="w-full bg-white rounded-xl border text-sm overflow-hidden">
      <thead>
        <tr className="bg-[#f9f9f9] text-center text-[var(--gris4)]">
          <th className="py-3 px-4">ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((p) => (
          <ProviderRow key={p.id} producto={p} onDeleted={handleDeleted} />
        ))}
      </tbody>
    </table>
  );
}
