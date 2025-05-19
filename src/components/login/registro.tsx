"use client";

import Button from "@/components/general/Button";
import GoogleIcon from "@mui/icons-material/Google";

export default function FormularioRegistro() {
  return (
    <form className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Nombre"
        className="campo"
        required
      />
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
      <input
        type="password"
        placeholder="Repetir contraseña"
        className="campo"
        required
      />

      <p className="text-xs text-gray-500 text-center">
        Al continuar, aceptás las{" "}
        <a href="#" className="underline">Condiciones del Servicio</a> y la{" "}
        <a href="#" className="underline">Política de Privacidad</a>.
      </p>

      <Button label="Crear cuenta" />

      <button
        type="button"
        className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition w-full"
      >
        <GoogleIcon fontSize="small" />
        Iniciar sesión con Google
      </button>

      <p className="text-sm text-center text-gray-600 mt-2">
        ¿Ya tenés cuenta? <a href="#" className="underline">Iniciá sesión</a>
      </p>
    </form>
  );
}
