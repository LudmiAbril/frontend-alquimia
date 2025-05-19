"use client";

import Button from "@/components/general/Button";
import GoogleIcon from "@mui/icons-material/Google";

export default function FormularioInicioSesion() {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Correo electrónico"
        className="campo"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        className="campo"
        required
      />

      <a href="#" className="text-sm text-gray-500 self-end hover:underline">
        Me olvidé la contraseña
      </a>

      <Button label="Ingresar" />

      <button
        type="button"
        className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition w-full"
      >
        <GoogleIcon fontSize="small" />
        Iniciar sesión con Google
      </button>

      <p className="text-sm text-center text-gray-600 mt-2">
        ¿No tenés cuenta? <a href="#" className="underline">Registrate</a>
      </p>
    </form>
  );
}
