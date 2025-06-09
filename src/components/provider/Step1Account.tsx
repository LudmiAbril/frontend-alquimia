"use client";

import { useState } from "react";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import HandshakeIcon from "@mui/icons-material/Handshake";
import FloatingMascot from "../general/MascotaFlotante";
import { proveedorMessages } from "../utils/utils";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getPasswordStrength, validateRegisterForm } from "../utils/getBackendErrorMessage";
import { Step1Props } from "../utils/typing";
import SectionWrapper from "../general/SectionWrapper";


export default function Step1Cuenta({ onContinue, formData, setFormData }: Step1Props) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<"Débil" | "Media" | "Segura">("Débil");

  const handleNext = () => {
    const errorMsg = validateRegisterForm("Proveedor", formData.email, formData.password, confirmPassword);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setError("");
    onContinue();
  };

  return (
        <SectionWrapper className="bg-[var(--hueso)]">
    
      <div className="flex gap-14">
    <aside className="hidden md:flex flex-col items-start w-[45%] px-5 text-left py-10">
          <h2 className="text-2xl font-bold text-[var(--violeta)] mb-6 leading-snug uppercase">
          Unite a Alquimia y hacé crecer tu emprendimiento
        </h2>
       
         <p className="text-ml text-gray-700 mb-6 text-left">
          Conoce los beneficios de unirte con Alquimia:
          </p>
        <ul className="space-y-8 text-gray-700 text-base">
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

    
    <main className="w-[55%] flex items-center justify-center px-4 py-9">
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--violeta)]"
                  value={formData.password}
                  onChange={(e) => {
                    const val = e.target.value;
                    setFormData({ ...formData, password: val });
                    setPasswordStrength(getPasswordStrength(val));
                  }}
                  placeholder="••••••••"
                />
                <button type="button" className="absolute top-2 right-3  text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-1 italic">
          Mínimo 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial.
        </p>
              {formData.password && (
                <p className={`text-sm mt-1 ${
                  passwordStrength === "Débil" ? "text-red-500" :
                  passwordStrength === "Media" ? "text-yellow-500" : "text-green-600"
                }`}>
                  Fortaleza: {passwordStrength}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[var(--violeta)]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button type="button" className="absolute top-2 right-3 text-gray-400" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                </button>
              </div>
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
        <FloatingMascot
          messages={proveedorMessages}
          imageSrc="/Quimi/quimiLanding.png"
        />
      </main>
    </div>
        </SectionWrapper>
    
  );
}
