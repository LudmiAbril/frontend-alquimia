"use client";

import { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { formatCuit, validateStep2Form } from "../utils/getBackendErrorMessage";
import {  Paso2Props } from "../utils/typing";
import { PRODUCT_OPTIONS } from "../utils/utils";
import SectionWrapper from "../general/SectionWrapper";

export default function Paso2Empresa({ onContinue, onBack, formData, setFormData }: Paso2Props) {
  const [error, setError] = useState("");

  const toggleProducto = (producto: string) => {
    const actuales = formData.productosSeleccionados || [];
    const actualizado = actuales.includes(producto)
      ? actuales.filter((p) => p !== producto)
      : [...actuales, producto];

    setFormData({ ...formData, productosSeleccionados: actualizado });
  };

  const handleNext = () => {
    const errorMsg = validateStep2Form(formData);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setError("");
    onContinue();
  };

  return (
    <SectionWrapper className="bg-[var(--hueso)]">
      <div className="flex gap-14">
        <aside className="hidden md:flex flex-col items-start w-[45%] px-8 text-left py-10">
          <h2 className="text-2xl font-bold text-[var(--violeta)] mb-6 leading-snug uppercase">
            Información de tu emprendimiento
          </h2>
          <ul className="space-y-8 text-gray-700 text-base">
            <li className="flex items-start gap-3">
              <BusinessIcon className="text-[var(--violeta)]" />
              Completá los datos de tu empresa o marca para que podamos mostrarla en tu perfil.
            </li>
            <li className="flex items-start gap-3">
              <BadgeIcon className="text-[var(--violeta)]" />
              Verificamos el CUIL para mantener una comunidad segura.
            </li>
            <li className="flex items-start gap-3">
              <InventoryIcon className="text-[var(--violeta)]" />
              Seleccioná los productos que promocionás en AlquimIA.
            </li>
            <li className="flex items-start gap-3">
              <LocalOfferIcon className="text-[var(--violeta)]" />
              Si tenés otros productos, ¡podés especificarlos!
            </li>
          </ul>
        </aside>

        <main className="w-[55%] flex items-center justify-center px-4 py-9">
          <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-center text-gray-800 mb-2 uppercase">
              Tu emprendimiento
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Completá los datos para mostrar tu propuesta.
            </p>
            
             {/* Indicador de progreso */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-4 h-4 bg-[var(--violeta)] rounded-full" />
            <div className="w-4 h-4 bg-[var(--violeta)] rounded-full" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
          </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Nombre de la empresa o marca
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  placeholder="Fragancias Brillantes"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  CUIL
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={formData.cuil}
                  onChange={(e) => {
                    const formatted = formatCuit(e.target.value);
                    setFormData({ ...formData, cuil: formatted });
                  }}
                  placeholder="27-20335514-8"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  ¿Qué productos ofrecés?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PRODUCT_OPTIONS.map((op) => (
                    <label
                      key={op}
                      className={`flex items-center px-3 py-2 border rounded cursor-pointer ${formData.productosSeleccionados?.includes(op)
                          ? "bg-[var(--violeta)] text-white border-[var(--violeta)]"
                          : "border-gray-300 hover:border-[var(--violeta)]"
                        }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.productosSeleccionados?.includes(op)}
                        onChange={() => toggleProducto(op)}
                      />
                      <span className="text-sm">{op}</span>
                    </label>
                  ))}
                </div>

                {formData.productosSeleccionados?.includes("Otro") && (
                  <div className="mt-4">
                    <label className="block text-sm font-semibold mb-1 text-gray-700">
                      ¿Cuál?
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-4 py-2"
                      value={formData.otroProducto}
                      onChange={(e) => setFormData({ ...formData, otroProducto: e.target.value })}
                      placeholder="Tintes naturales, frascos reciclados..."
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">
                  Rubro o sector (opcional)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={formData.rubro}
                  onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                  placeholder="Cosmética natural, packaging..."
                />
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
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SectionWrapper>

  );
}
