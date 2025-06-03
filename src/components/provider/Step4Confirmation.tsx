"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Paso4Props } from "../utils/typing";
import SectionWrapper from "../general/SectionWrapper";


export default function Paso4Confirmacion({ onFinish }: Paso4Props) {
  return (
     <SectionWrapper className="bg-[var(--hueso)]">
       
         <div className="flex gap-14">
       <aside className="hidden md:flex flex-col items-start w-[45%] px-5 text-left py-10">
        <h2 className="text-2xl font-bold text-[var(--violeta)] mb-6 leading-snug uppercase">
          ¡Gracias por unirte a Alquimia!
        </h2>
        <ul className="space-y-5 text-gray-700 text-base">
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="text-[var(--violeta)]" />
            Tu cuenta fue creada con éxito.
          </li>
          <li className="flex items-start gap-3">
            <EmojiEventsIcon className="text-[var(--violeta)]" />
            Ahora podés promocionar tus productos y recibir pedidos.
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="text-[var(--violeta)]" />
            Accedé a tu panel para cargar tus primeros artículos.
          </li>
        </ul>
      </aside>

      {/* Columna derecha */}
      <main className="w-[55%] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md mx-auto bg-white p-10 rounded-xl shadow-lg text-center">
          <CheckCircleIcon className="text-[var(--violeta)] mb-4" style={{ fontSize: "3rem" }} />
          <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase">
            ¡Registro completado!
          </h2>
          <p className="text-gray-600 mb-6">
            Bienvenido a Alquimia. Ya podés acceder a tu panel de proveedor y comenzar a mostrar tus productos al mundo.
          </p>

          <button
            onClick={onFinish}
            className="w-full py-3 rounded bg-[var(--violeta)] text-white font-semibold hover:bg-violet-700 transition-all"
          >
            Ir a mi Panel
          </button>
        </div>
      </main>
    </div>
            </SectionWrapper>
    
  );
}
