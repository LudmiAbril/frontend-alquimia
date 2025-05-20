"use client";

import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { Props } from "@/components/utils/typing";
import Link from "next/link";

export default function FormularioInicioSesion({ cambiarFormulario }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("Procesando...");

    try {
      const response = await fetch("https://localhost:7164/cuenta/login-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("jwtToken", data.token);
        setMensaje("Login exitoso ✅");
        window.location.reload(); // recargar para reflejar usuario logueado en navbar
      } else {
        console.error("❌ Error al iniciar sesión:", data);
        setMensaje("Error en el login ❌");
      }
    } catch (error) {
      console.error("❌ Error de red:", error);
      setMensaje("Error de conexión");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="campo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Contraseña <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          placeholder="Contraseña"
          className="campo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <a href="#" className="text-sm text-gray-500 self-end hover:underline mt-1 italic">
        Me olvidé la contraseña
      </a>

      <button
        type="submit"
        className="uppercase bg-[#9444B6] text-white px-10 py-3 rounded-[10px] hover:bg-[#7a2f96] transition font-bold text-sm w-full mt-2"
      >
        Ingresar
      </button>

      <button
        type="button"
        className="bg-white flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition w-full text-sm font-medium"
        onClick={() => (window.location.href = "https://localhost:7164/cuenta/login-google")}
      >
        <GoogleIcon fontSize="small" />
        Iniciar sesión con Google
      </button>

      <div className="flex justify-between items-center text-sm mb-4">
        <p className="text-sm text-center text-gray-600 ">
          ¿No tenés cuenta?{" "}
          <button
            type="button"
            onClick={cambiarFormulario}
            className="underline text-[black] font-bold"
          >
            Registrate
          </button>
        </p>
        <Link
          href="/registro-proveedor"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--violeta)] italic font-small"
        >
          Quiero ser Proveedor
        </Link>
      </div>

      {mensaje && (
        <p className="text-sm text-center text-gray-600 italic">{mensaje}</p>
      )}
    </form>
  );
}
