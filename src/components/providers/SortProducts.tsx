
"use client";
import { useState } from "react";
import { PropsProduct } from "../utils/typing";


const options = [
  { label: "Más vendidos", value: "popular" },
  { label: "Menor precio", value: "asc" },
  { label: "Mayor precio", value: "desc" },
];

export default function SortProducts({ onSort }: PropsProduct) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

const handleSelect = (option: typeof selected) => {
  setSelected(option);
  setOpen(false);
  onSort(option.value as "asc" | "desc" | "popular"); 
};


  return (
    <div className="relative w-full">
      <h3 className="text-sm font-semibold uppercase text-gray-600 mb-2">Ordenar por</h3>

      <div
        className="w-full border border-gray-300 rounded px-4 py-2 text-sm cursor-pointer bg-white hover:border-[var(--violeta)] transition-all"
        onClick={() => setOpen(!open)}
      >
        <span className={selected.value !== "popular" ? "text-[var(--violeta)] font-medium" : ""}>
          {selected.label}
        </span>
      </div>

      {open && (
        <ul className="absolute mt-1 z-10 bg-white border border-gray-300 rounded shadow-md w-full text-sm">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer hover:bg-[var(--violeta)] hover:text-white transition-all ${
                option.value === selected.value ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
