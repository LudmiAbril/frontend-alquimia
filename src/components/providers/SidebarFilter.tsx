"use client";
import { useState } from "react";
import { productCategories } from "../Utils/utils";

interface Props {
  onFilter: (category: string) => void;
  onSort: (order: "asc" | "desc" | "popular") => void;
  onSearch: (term: string) => void; // 👈 nuevo prop
}

export default function SidebarFilter({ onFilter, onSort, onSearch }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value); // 👈 notificamos al padre
  };

  return (
    <aside className="space-y-8">
      {/* Buscador general */}
      <div>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Ordenar por */}
      <div>
        <h3 className="text-sm font-semibold uppercase text-gray-600">ORDENAR POR</h3>
        <select
          className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm"
          onChange={(e) => {
            const val = e.target.value;
            if (val === "Menor precio") onSort("asc");
            else if (val === "Mayor precio") onSort("desc");
            else onSort("popular");
          }}
        >
          <option>Más vendidos</option>
          <option>Menor precio</option>
          <option>Mayor precio</option>
        </select>
      </div>

      {/* Filtrar por categoría */}
      <div>
        <h3 className="text-sm font-semibold uppercase text-gray-600 mb-2">FILTRAR POR</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {productCategories.map((category) => (
            <li key={category}>
              <button
                className="w-full text-left hover:underline"
                onClick={() => onFilter(category.toLowerCase().replace(/s$/, ""))}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
