"use client";

import { useState } from "react";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { ProviderFormData } from "@/app/(user-proveedor)/page";


interface Paso1Props {
  onContinue: () => void;
  formData: ProviderFormData;
  setFormData: (data: ProviderFormData) => void;
}

export default function Paso1Cuenta({ onContinue, formData, setFormData }: Paso1Props) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!formData.email || !formData.password || !confirmPassword) {
      setError("Por favor completá todos los campos.");
      return;
    }

    if (formData.password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setError("");
    onContinue();
  };

  return (
    <div className="flex min-h-screen bg-[#f4efeb]">
      {/* Columna izquierda con beneficios */}
      <aside className="hidden md:flex flex-col justify-center w-[45%] px-10 text-left ml-15">
        <h2 className="text-2xl font-bold text-[var(--violeta)] mb-6 leading-snug uppercase">
          Unite a Alquimia y hacé crecer tu emprendimiento
        </h2>
        <ul className="space-y-5 text-gray-700 text-base">
          <li className="flex items-start gap-3">
            <ScienceIcon className="text-[var(--violeta)]" />
            Promocioná tus productos ante creadores de perfumes de todo el país.
          </li>
          <li className="flex items-start gap-3">
            <SearchIcon className="text-[var(--violeta)]" />
            Aparecé en búsquedas de esencias, envases, y más.
          </li>
          <li className="flex items-start gap-3">
            <TrendingUpIcon className="text-[var(--violeta)]" />
            Accedé a estadísticas de visitas y rendimiento.
          </li>
          <li className="flex items-start gap-3">
            <HandshakeIcon className="text-[var(--violeta)]" />
            Conectate con una comunidad creativa que transforma ideas en aromas.
          </li>
        </ul>
      </aside>

      {/* Columna derecha: Formulario */}
      <main className="w-[55%] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-2 uppercase">
            Registrarse como Proveedor
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Completá tu cuenta para comenzar a ofrecer tus productos.
          </p>

          {/* Indicador de progreso */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-4 h-4 bg-[var(--violeta)] rounded-full" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>

          {/* Formulario */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--violeta)]"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tumarca@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--violeta)]"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Confirmar contraseña
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--violeta)]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex justify-end mt-6">
              <button
                className="px-6 py-2 rounded bg-[var(--violeta)] text-white font-semibold hover:bg-violet-700 transition-all duration-200"
                onClick={handleNext}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
