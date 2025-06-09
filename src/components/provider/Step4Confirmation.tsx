"use client";

import { useRouter } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { Step4Props } from "../Utils/typing";
import SectionWrapper from "../General/SectionWrapper";

export default function Step4Confirmation({  }: Step4Props) {
  const router = useRouter();

  return (
    <SectionWrapper className="bg-[var(--hueso)]">
      <div className="flex gap-14">
        <aside className="hidden md:flex flex-col items-start w-[45%] px-5 text-left py-10">
          <h2 className="text-2xl font-bold text-[var(--violeta)] mb-6 leading-snug uppercase">
            ¡Gracias por completar tu registro!
          </h2>
          <ul className="space-y-5 text-gray-700 text-base">
            <li className="flex items-start gap-3">
              <MarkEmailReadIcon className="text-[var(--violeta)]" />
              Hemos recibido tu solicitud de registro como proveedor.
            </li>
            <li className="flex items-start gap-3">
              <InfoIcon className="text-[var(--violeta)]" />
              Nuestro equipo revisará tu información en las próximas horas.
            </li>
            <li className="flex items-start gap-3">
              <CheckCircleIcon className="text-[var(--violeta)]" />
              Te notificaremos por correo electrónico una vez que tu cuenta sea aprobada.
            </li>
          </ul>
        </aside>

        <main className="w-[55%] flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md mx-auto bg-white p-10 rounded-xl shadow-lg text-center">
            <MarkEmailReadIcon className="text-[var(--violeta)] mb-4" style={{ fontSize: "3rem" }} />
            <h2 className="text-xl font-bold text-gray-800 mb-2 uppercase">
              Registro enviado
            </h2>
            <p className="text-gray-600 mb-6">
              Gracias por tu interés en formar parte de Alquimia. Estamos revisando tu solicitud y pronto recibirás un correo con la decisión final.
            </p>

            <button
              onClick={() => router.push("/")}
              className="w-full py-3 rounded bg-[var(--violeta)] text-white font-semibold hover:bg-violet-700 transition-all"
            >
              Volver al inicio
            </button>
          </div>
        </main>
      </div>
    </SectionWrapper>
  );
}
