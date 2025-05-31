"use client";
import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { FormToggleProps } from "@/components/utils/typing";
import Link from "next/link";

export default function LoginForm({ toggleForm }: FormToggleProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5035/cuenta/login-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.mensaje || "Credenciales incorrectas.");
      } else {
        localStorage.setItem("token", data.token);
        const payload = parseJwt(data.token);
          if (payload?.name) {
            localStorage.setItem("username", payload.name);
          }

          console.log("Ingreso exitoso ✅");
          window.location.reload(); 
      }
    } catch (err) {
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

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Contraseña <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          placeholder="************"
          className="campo"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Enlace para recuperación */}
      <a href="#" className="text-sm text-gray-500 self-end hover:underline mt-1 italic">
        Me olvidé la contraseña
      </a>
      {error && <p className="text-red-500">{error}</p>}
      {/* Botón de ingreso */}
      <button
        type="submit"
        className="uppercase bg-[#9444B6] text-white px-10 py-3 rounded-[10px] hover:bg-[#7a2f96] transition font-bold text-sm w-full mt-2"
      >
        Ingresar
      </button>

      {/* Botón Google */}
      <button
        type="button"
        className="bg-white flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition w-full text-sm font-medium"
      >
        <GoogleIcon fontSize="small" />
        Iniciar sesión con Google
      </button>

      {/* Enlace a registro */}
      <div className="flex justify-between items-center text-sm mb-4">
        <p className="text-sm text-center text-gray-600">
          ¿No tenés cuenta?{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="underline text-[black] font-bold"
          >
            Registrate
          </button>
        </p>
        <Link
          href="/registroProveedor"
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
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}