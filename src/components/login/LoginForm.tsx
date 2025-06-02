"use client";
import { useState } from "react";
import { FormToggleProps } from "@/components/utils/typing";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import { registerUser, saveSessionData } from "../utils/session";


export default function RegisterForm({ toggleForm }: FormToggleProps) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      const token = await registerUser({ Email: email, Password: password, Name: nombre, Rol: "Creador" });
      saveSessionData(token);

      setSuccessMessage("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => {
        setSuccessMessage(null);
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error durante el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input type="text" className="campo" required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input type="email" className="campo" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@gmail.com" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Contraseña <span className="text-red-500">*</span>
        </label>
        <input type="password" className="campo" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="************" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Repetir contraseña <span className="text-red-500">*</span>
        </label>
        <input type="password" className="campo" required value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="************" />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <p className="text-xs text-gray-500 text-start mt-1">
        Al continuar, aceptás las{" "}
        <Link href="#" className="underline text-blue-600">Condiciones del Servicio</Link> y la{" "}
        <Link href="/legales/politica" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
          Política de Privacidad
        </Link>.
      </p>

      <button
        type="submit"
        className="uppercase bg-[#9444B6] text-white px-10 py-3 rounded-[10px] hover:bg-[#7a2f96] transition font-bold text-sm w-full mt-2"
        disabled={loading}
      >
        {loading ? "Registrando..." : "Crear cuenta"}
      </button>

      <button type="button" className="bg-white flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition w-full text-sm font-medium">
        <GoogleIcon fontSize="small" /> Iniciar sesión con Google
      </button>

      <p className="text-sm text-center text-gray-600 mt-2">
        ¿Ya tenés cuenta?{" "}
        <button type="button" onClick={toggleForm} className="underline text-[var(--violeta)]">
          Iniciá sesión
        </button>
      </p>
    </form>
  );
}
