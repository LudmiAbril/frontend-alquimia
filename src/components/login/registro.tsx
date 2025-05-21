"use client";

import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { PropsFormulario } from "@/components/utils/typing";

export default function FormularioRegistro({ cambiarFormulario }: PropsFormulario) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    setMensaje("Procesando...");

    try {
      const response = await fetch("https://localhost:7164/cuenta/registrar-json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          name: nombre,
          rol: "Creador", // fijo como pediste
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("jwtToken", data.token); // en caso de que lo envíes
        setMensaje("Registro exitoso 🎉");
        window.location.reload(); // o cerrar modal, si lo preferís
      } else {
        console.error("❌ Error:", data);
        setMensaje("Error en el registro ❌");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Nombre"
          className="campo"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="campo"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Repetir contraseña <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          placeholder="Repetir contraseña"
          className="campo"
          required
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
        />
      </div>

      <p className="text-xs text-gray-500 text-start mt-1">
        Al continuar, aceptás las{" "}
        <Link href="#" className="underline text-blue-600">
          Condiciones del Servicio
        </Link>{" "}
        y la{" "}
        <Link
          href="/legales/politica"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-600"
        >
          Política de Privacidad
        </Link>
        .
      </p>

      <button
        type="submit"
        className="uppercase bg-[#9444B6] text-white px-10 py-3 rounded-[10px] hover:bg-[#7a2f96] transition font-bold text-sm w-full mt-2"
      >
        Crear cuenta
      </button>

      <button
        type="button"
        className="bg-white flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition w-full text-sm font-medium"
        onClick={() => (window.location.href = "https://localhost:7164/cuenta/login-google")}
      >
        <GoogleIcon fontSize="small" />
        Iniciar sesión con Google
      </button>

      <p className="text-sm text-center text-gray-600 mt-2">
        ¿Ya tenés cuenta?{" "}
        <button type="button" onClick={cambiarFormulario} className="underline text-[var(--violeta)]">
          Iniciá sesión
        </button>
      </p>

      {mensaje && (
        <p className={`text-sm mt-2 ${mensaje.includes("exitoso") ? "text-green-600" : "text-red-500"}`}>
          {mensaje}
        </p>
      )}
    </form>
  );
}
