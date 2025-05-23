"use client";

import { useState } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SecurityIcon from "@mui/icons-material/Security";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PaymentsIcon from "@mui/icons-material/Payments";
import CircularProgress from "@mui/material/CircularProgress";

interface Paso3Props {
  onContinue: () => void;
  onBack: () => void;
  formData: any;
  setFormData: (data: any) => void;
}

export default function Paso3Pago({ onContinue, onBack, formData, setFormData }: Paso3Props) {
  const [error, setError] = useState("");
  const [estadoPago, setEstadoPago] = useState<"idle" | "verificando" | "exito">("idle");

  const handleNext = () => {
    const { numero, nombre, vencimiento, cvc } = formData.tarjeta ?? {};

    if (!numero || !nombre || !vencimiento || !cvc) {
      setError("Por favor completá todos los datos de tu tarjeta.");
      return;
    }

    setError("");
    setEstadoPago("verificando");

    setTimeout(() => {
      setEstadoPago("exito");

      setTimeout(() => {
        onContinue();
      }, 1500);
    }, 2000);
  };

  const formatearVencimiento = (valor: string) => {
    let limpio = valor.replace(/\D/g, "");

    if (limpio.length > 2) {
      limpio = limpio.slice(0, 4);
      return `${limpio.slice(0, 2)}/${limpio.slice(2)}`;
    }

    return limpio;
  };

  return (
    <div className="flex min-h-screen bg-[#f4efeb]">
      <aside className="hidden md:flex flex-col justify-center w-[45%] px-10 text-left">
        <h2 className="text-2xl font-bold text-[var(--violeta)] mb-6 leading-snug uppercase">
          Activá tu cuenta de proveedor
        </h2>
        <ul className="space-y-5 text-gray-700 text-base">
          <li className="flex items-start gap-3">
            <PaymentsIcon className="text-[var(--violeta)]" />
            Pagá una sola vez y accedé a la plataforma durante 12 meses.
          </li>
          <li className="flex items-start gap-3">
            <CreditCardIcon className="text-[var(--violeta)]" />
            Aceptamos tarjeta de crédito y débito.
          </li>
          <li className="flex items-start gap-3">
            <ScheduleIcon className="text-[var(--violeta)]" />
            Podés renovar tu suscripción cuando expire.
          </li>
          <li className="flex items-start gap-3">
            <SecurityIcon className="text-[var(--violeta)]" />
            Tus datos están protegidos y encriptados.
          </li>
        </ul>
      </aside>

      <main className="w-[55%] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-2 uppercase">
            Pago del Pack Anual
          </h2>
          <p className="text-sm text-center text-gray-600 mb-4">
            Promocioná tus productos durante <strong>12 meses</strong> en AlquimIA.
          </p>

          <div className="bg-[var(--violeta)] text-white text-center py-3 mb-6 rounded-lg font-semibold">
            PACK ANUAL: $25.000 ARS
          </div>

          {estadoPago === "verificando" && (
            <div className="flex flex-col items-center gap-2 mb-4 text-[var(--violeta)]">
              <CircularProgress size={24} />
              <p className="text-sm">Verificando pago...</p>
            </div>
          )}

          {estadoPago === "exito" && (
            <div className="flex flex-col items-center gap-2 mb-4 text-green-600 font-semibold">
              <CheckmarkIcon />
              <p className="text-sm">¡Pago exitoso!</p>
            </div>
          )}

          {estadoPago === "idle" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Número de la tarjeta
                </label>
                <input
                  type="text"
                  maxLength={19}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="1234 5678 9012 3456"
                  value={formData.tarjeta?.numero || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tarjeta: { ...formData.tarjeta, numero: e.target.value },
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Nombre completo como aparece en la tarjeta
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  placeholder="Ej: Juan Pérez"
                  value={formData.tarjeta?.nombre || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tarjeta: { ...formData.tarjeta, nombre: e.target.value },
                    })
                  }
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Vencimiento</label>
                  <input
                    type="text"
                    maxLength={5}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="MM/AA"
                    value={formData.tarjeta?.vencimiento || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tarjeta: {
                          ...formData.tarjeta,
                          vencimiento: formatearVencimiento(e.target.value),
                        },
                      })
                    }
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-1 text-gray-700">CVC</label>
                  <input
                    type="password"
                    maxLength={4}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    placeholder="123"
                    value={formData.tarjeta?.cvc || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tarjeta: { ...formData.tarjeta, cvc: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex justify-between mt-6">
                <button
                  onClick={onBack}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Volver
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded bg-[var(--violeta)] text-white font-semibold hover:bg-violet-700 transition-all"
                >
                  Confirmar Pago
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function CheckmarkIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
