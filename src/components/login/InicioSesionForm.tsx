"use client";

import GoogleIcon from "@mui/icons-material/Google";
import { Props } from "@/components/utils/typing";

export default function FormularioInicioSesion({ cambiarFormulario }: Props) {
  return (
    <form className="flex flex-col gap-4">
     
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          placeholder="Correo electrónico"
          className="campo"
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
          required
        />
      </div>

      <a href="#" className="text-sm text-gray-500 self-end hover:underline mt-1">
        Me olvidé la contraseña
      </a>

      <button type="submit"
        className="uppercase bg-[#9444B6] text-white px-10 py-3 rounded-[10px] hover:bg-[#7a2f96] transition font-bold text-sm w-full mt-2">
        Ingresar
      </button>

      {/* Botón Google */}
      <button
        type="button"
        className="  bg-white flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition w-full text-sm font-medium"
      >
        <GoogleIcon fontSize="small" />
        Iniciar sesión con Google
      </button>

      {/* Enlace a registro */}
      <p className="text-sm text-center text-gray-600 mt-2">
        ¿No tenés cuenta?{" "}
        <button
          type="button"
          onClick={cambiarFormulario}
          className="underline text-[var(--violeta)] "
        >
          Registrate
        </button>
      </p>
    </form>
  );
}
