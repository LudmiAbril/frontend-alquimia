"use client";

import { useState } from "react";
import { FormToggleProps, RegisterDTO } from "@/components/utils/typing";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { registerUser, saveSessionData } from "../utils/session";
import { validateRegisterForm, getPasswordStrength } from "../utils/getBackendErrorMessage";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function RegisterForm({ toggleForm }: FormToggleProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateRegisterForm(nombre, email, password, passwordConfirm);
    if (validationError) {
      setError(validationError);
      return;
    }

    const registerData: RegisterDTO = {
      Email: email,
      Password: password,
      Name: nombre,
      Rol: "Creador",
    };

    setLoading(true);

    try {
      const result = await registerUser(registerData);
      saveSessionData(result.token);
      setSuccessMessage("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => window.location.reload(), 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="campo"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          className="campo"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Contraseña */}
      <div className="flex flex-col gap-1 relative">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Contraseña <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="************"
            className="campo pr-10"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </button>
        </div>
        <p className="text-[11px] text-gray-500 mt-1 italic">
          Mínimo 8 caracteres, 1 mayúscula, 1 número y 1 carácter especial.
        </p>


        {password.length > 0 && (
          <div className="mt-1 text-xs">
            Fortaleza:{" "}
            <span
              className={`font-semibold ${strength === "Débil"
                ? "text-red-500"
                : strength === "Media"
                  ? "text-yellow-500"
                  : "text-green-600"
                }`}
            >
              {strength}
            </span>
          </div>
        )}
      </div>


      {/* Repetir contraseña */}
      <div className="flex flex-col gap-1 relative">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Repetir contraseña <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type={showPasswordConfirm ? "text" : "password"}
            placeholder="************"
            className="campo pr-10"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPasswordConfirm ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

      <p className="text-xs text-gray-500 text-start mt-1">
        Al continuar, aceptás las{" "}
        <Link href="#" className="underline text-blue-600">Condiciones del Servicio</Link> y la{" "}
        <Link href="/legales/politica" target="_blank" className="underline text-blue-600">
          Política de Privacidad
        </Link>.
      </p>

      <button
        type="submit"
        disabled={loading}
        className={`uppercase bg-[#9444B6] text-white px-10 py-3 rounded-[10px] transition font-bold text-sm w-full mt-2 flex items-center justify-center gap-2
    ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#7a2f96]"}`}
      >
        {loading ? (
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          "Crear cuenta"
        )}
      </button>
      <button
        type="button"
        className="bg-white flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition w-full text-sm font-medium"
      >
        <GoogleIcon fontSize="small" />
        Iniciar sesión con Google
      </button>

      <p className="text-sm text-left text-gray-600 mt-2">
        ¿Ya tenés cuenta?{" "}
        <button type="button" onClick={toggleForm} className="underline text-[var(--violeta)]">
          Iniciá sesión
        </button>
      </p>
    </form>
  );
}
