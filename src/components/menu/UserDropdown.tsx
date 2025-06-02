"use client";

import { useEffect, useRef } from "react";

interface Props {
  name: string;
  email: string;
  onLogout: () => void;
  onClose: () => void;
}

export default function UserDropdown({ name, email, onLogout, onClose }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-12 right-0 bg-[var(--hueso)] shadow-[inset_0_2px_3px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.15)] rounded-xl w-[280px] p-5 z-[9999] animate-fade-in"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-[var(--violeta)] text-white flex items-center justify-center font-bold uppercase">
          {name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .substring(0, 2)}
        </div>
        <div>
          <p className="font-bold text-[var(--gris4)] text-sm">¡HOLA, {name.toUpperCase()}!</p>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>

      <ul className="flex flex-col text-sm text-[var(--gris4)] mb-6">
        <li
          className="cursor-pointer hover:underline mb-5"
          onClick={() => (window.location.href = "/profile/Formulas")}
        >
          Mis Fórmulas
        </li>
        <li
          className="cursor-pointer hover:underline"
          onClick={() => (window.location.href = "/profile/Account")}
        >
          Mi  Cuenta
        </li>
      </ul>

      <hr className="border-t border-gray-300 my-3" />

      <button
        onClick={onLogout}
        className="text-sm text-red-600 hover:underline w-full text-left"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}
