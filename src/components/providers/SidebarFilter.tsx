"use client";
import { useState } from "react";
import { productCategories } from "../utils/utils";
import { PropsFilter } from "../utils/typing";
import SortProducts from "./SortProducts";




export default function SidebarFilter({ onFilter, onSort, onSearch }: PropsFilter) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const handleSortChange = (val: "asc" | "desc" | "popular") => {
  onSort(val);
};



  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

 
  return (
    <aside className="space-y-8 px-4">
      {/* Buscador */}
      <div>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--violeta)]"
        />
      </div>

      {/* Ordenar por */}
    <div>
  <SortProducts onSort={handleSortChange} />

</div>

      {/* Filtrar por */}
      <div>
        <h3 className="text-sm font-semibold uppercase text-gray-600 mb-2">Filtrar por</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {productCategories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <li key={category}>
                <button
                  onClick={() => {
                    const normalized = category.toLowerCase().replace(/s$/, "");
                    setSelectedCategory(category);
                    onFilter(normalized);
                  }}
                  className={`w-full text-left py-1 pl-3 border-l-4 transition-all ${
                    isSelected
                      ? "border-[var(--violeta)] text-[var(--violeta)] font-semibold"
                      : "border-transparent hover:underline"
                  }`}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
