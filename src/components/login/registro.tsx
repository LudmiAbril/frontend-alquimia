"use client";

import GoogleIcon from "@mui/icons-material/Google";
import { PropsFormulario } from "@/components/utils/typing";
import Link from 'next/link';


export default function FormularioRegistro({ cambiarFormulario }: PropsFormulario) {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Nombre <span className="text-red-500">*</span>
        </label>
        <input type="text" placeholder="Nombre"  className="campo" required   />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Correo electrónico <span className="text-red-500">*</span>
        </label>
        <input type="email" placeholder="tucorreo@gmail.com" className="campo" required />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Contraseña <span className="text-red-500">*</span>
        </label>
        <input  type="password" placeholder="************" className="campo"  required />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[var(--gris4)]">
          Repetir contraseña <span className="text-red-500">*</span>
        </label>
        <input type="password"  placeholder="************" className="campo"  required />
      </div>

      <p className="text-xs text-gray-500 text-start mt-1">
        Al continuar, aceptás las{" "}
        <Link href="#" className="underline text-blue-600">Condiciones del Servicio</Link> y la{" "}
        <Link href="/legales/politica" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Política de Privacidad</Link>.
      </p>

      <button type="submit"
        className="uppercase bg-[#9444B6] text-white px-10 py-3 rounded-[10px] hover:bg-[#7a2f96] transition font-bold text-sm w-full mt-2" >
        Crear cuenta
      </button>

      <button type="button"
        className="bg-white flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md hover:bg-gray-100 transition w-full text-sm font-medium"  >
        <GoogleIcon fontSize="small" />
        Iniciar sesión con Google
      </button>

      <p className="text-sm text-center text-gray-600 mt-2">
        ¿Ya tenés cuenta?{" "}
        <button type="button"  onClick={cambiarFormulario}  className="underline text-[var(--violeta)]"  >
          Iniciá sesión
        </button>
      </p>
    </form>
  );
}
