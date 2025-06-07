"use client";

import { useState } from "react";
import { FormToggleProps } from "@/components/utils/typing";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { saveSessionData } from "../utils/session";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/dist/client/components/navigation";

export default function LoginForm({ toggleForm }: FormToggleProps) {
  const router = useRouter(); // 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5035/cuenta/login-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.mensaje || "Credenciales incorrectas.");
        return;
      }
      saveSessionData(data.token);

      // Redirección según rol
      
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="tucorreo@gmail.com"
          className="campo"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

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
      </div>

      <Link
        href="/RecoverPassord"
        className="text-sm text-gray-500 self-end hover:underline mt-1 italic"
      >
        Me olvidé la contraseña
      </Link>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`uppercase bg-[#9444B6] text-white px-10 py-3 rounded-[10px] transition font-bold text-sm w-full mt-2 flex justify-center
          ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#7a2f96]"}`}
      >
        {loading ? (
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          "Ingresar"
        )}
      </button>

      <button
        type="button"
        className="bg-white flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition w-full text-sm font-medium"
      >
        <GoogleIcon fontSize="small" />
        Iniciar sesión con Google
      </button>

      <div className="flex justify-between items-center text-sm mb-4">
        <p className="text-sm text-center text-gray-600">
          ¿No tenés cuenta?{" "}
          <button type="button" onClick={toggleForm} className="underline text-[black] font-bold">
            Registrate
          </button>
        </p>
        <Link
          href="/registerProveedor"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--violeta)] italic font-small"
        >
          Quiero ser Proveedor
        </Link>
      </div>
    </form>
  );
}
