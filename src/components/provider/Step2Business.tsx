"use client";

import { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import BadgeIcon from "@mui/icons-material/Badge";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { ProviderFormData } from "@/app/(user-proveedor)/registroProveedor/page";

interface Paso2Props {
  onContinue: () => void;
  onBack: () => void;
  formData: ProviderFormData;
  setFormData: (data: ProviderFormData) => void;
}

const opciones = [
  "Esencias",
  "Envases",
  "Alcohol",
  "Fijadores",
  "Etiquetas",
  "Otro",
];

export default function Paso2Empresa({ onContinue, onBack, formData, setFormData }: Paso2Props) {
  const [error, setError] = useState("");

  const toggleProducto = (producto: string) => {
    const actuales = formData.productosSeleccionados || [];
    const actualizado = actuales.includes(producto)
      ? actuales.filter((p: string) => p !== producto)
      : [...actuales, producto];

    setFormData({ ...formData, productosSeleccionados: actualizado });
  };

  const handleNext = () => {
    const { empresa, cuil, productosSeleccionados, otroProducto } = formData;

    if (!empresa || !cuil || productosSeleccionados.length === 0) {
      setError("Por favor completá todos los campos obligatorios.");
      return;
    }

    if (!/^\d{2}-\d{8}-\d{1}$/.test(cuil)) {
      setError("El CUIL debe tener el formato 27-XXXXXXXX-X");
      return;
    }

    if (productosSeleccionados.includes("Otro") && !otroProducto?.trim()) {
      setError("Por favor especificá qué otro producto ofrecés.");
      return;
    }

    setError("");
    onContinue();
  };

  return (
    <section className="mt-10">
    <div className="flex min-h-screen bg-[#f4efeb]">
      {/* Columna izquierda */}
      <aside className="hidden md:flex flex-col justify-center w-[45%] px-10 text-left">
        <h2 className="text-2xl font-bold text-[var(--violeta)] mb-6 leading-snug uppercase">
          Información de tu emprendimiento
        </h2>
        <ul className="space-y-5 text-gray-700 text-base">
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

      {/* Columna derecha */}
      <main className="w-[55%] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-2 uppercase">
            Tu emprendimiento
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Completá los datos para mostrar tu propuesta.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Nombre de la empresa o marca
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value={formData.empresa}
                onChange={(e) =>
                  setFormData({ ...formData, empresa: e.target.value })
                }
                placeholder="Fragancias Brillantes"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                CUIL
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value={formData.cuil}
                onChange={(e) =>
                  setFormData({ ...formData, cuil: e.target.value })
                }
                placeholder="27-20335514-8"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                ¿Qué productos ofrecés?
              </label>
          <div className="grid grid-cols-2 gap-2">
  {opciones.map((op) => (
    <label
      key={op}
      className={`flex items-center px-3 py-2 border rounded cursor-pointer ${
        formData.productosSeleccionados?.includes(op)
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
                    onChange={(e) =>
                      setFormData({ ...formData, otroProducto: e.target.value })
                    }
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
                onChange={(e) =>
                  setFormData({ ...formData, rubro: e.target.value })
                }
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
    </section>
  );
}
