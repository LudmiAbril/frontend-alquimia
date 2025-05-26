"use client";

import Paso1Cuenta from "@/components/provider/Paso1Cuenta";
import Paso2Empresa from "@/components/provider/Paso2Empresa";
import Paso3Pago from "@/components/provider/Paso3Pago";
import Paso4Confirmacion from "@/components/provider/Paso4Confirmacion";
import { useState } from "react";

export default function RegistroProveedorPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    empresa: "",
    cuil: "",
    productosSeleccionados: [] as string[],
    otroProducto: "",
    rubro: "",
    tarjeta: {
      nombre: "",
      numero: "",
      vencimiento: "",
      cvc: "",
    },
  });

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4efeb] px-4">
      {step === 1 && (
        <Paso1Cuenta
          onContinue={handleNext}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 2 && (
        <Paso2Empresa
          onContinue={handleNext}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 3 && (
        <Paso3Pago
          onContinue={handleNext}
          onBack={handleBack}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {step === 4 && (
        <Paso4Confirmacion
   onFinish={() => console.log("Proceso finalizado")}
        />
      )}
    </div>
  );
}
