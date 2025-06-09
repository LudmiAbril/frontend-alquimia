"use client";

import { useState } from "react";
import Link from "next/link";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SectionWrapper from "../General/SectionWrapper";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5035/cuenta/recuperar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data?.mensaje || "Ocurrió un error. Intentá nuevamente.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <SectionWrapper className="relative text-white text-center overflow-hidden bg-[var(--hueso)]">
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-center text-[var(--gris4)] uppercase">Recuperar contraseña</h2>
      {success ? (
        <div className="flex flex-col items-center text-center">
          <CheckCircleOutlineIcon className="text-green-500 mb-2" fontSize="large" />
          <p className="text-green-600">Se ha enviado un correo con instrucciones para restablecer tu contraseña.</p>
          <Link href="/" className="mt-4 text-[var(--violeta)] underline">Volver al inicio</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-medium text-[var(--gris4)] text-left">
            Ingresá tu correo electrónico:
          </label>
          <input
            type="email"
            required
            placeholder="tucorreo@gmail.com"
            className="campo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`uppercase bg-[#9444B6] text-white px-6 py-3 rounded-[10px] transition font-bold text-sm w-full flex justify-center ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#7a2f96]"}`}
          >
            {loading ? (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Enviar instrucciones"
            )}
          </button>

          <Link href="/" className="text-sm text-center text-gray-600 hover:underline">
            Volver al inicio de sesión
          </Link>
        </form>
      )}
    </div>
    </SectionWrapper>
  );
}
