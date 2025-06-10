"use client";

import { useState } from "react";

import Image from "next/image";
import ButtonViolet from "../general/ButtonViolet";
import { SimulatedPurchaseProps } from "../utils/typing";



export default function SimulatedPurchase({ productName,variant}: SimulatedPurchaseProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handlePurchase = () => {
    if (!variant) return;
    setIsPurchasing(true);
    setTimeout(() => {
      setIsPurchasing(false);
      setConfirmed(true);
    }, 2500);
  };

  if (!variant) return (
    <div className="p-4 text-sm text-gray-500 bg-white rounded-lg border">
      Seleccioná una presentación para continuar con la compra.
    </div>
  );

  return (
    <div className="mt-10 p-6 border rounded-xl shadow-md bg-white flex flex-col items-center">
      {!confirmed ? (
        <>
          <p className="text-md text-gray-700 mb-4 text-center">
            ¿Querés comprar <strong>{productName}</strong> en presentación <strong>{variant.volume} {variant.unit}</strong>?
          </p>
          <ButtonViolet label="Confirmar compra" onClick={handlePurchase} />

          {isPurchasing && (
            <p className="text-sm mt-4 animate-pulse text-[var(--violeta)] font-semibold">
              Procesando compra...
            </p>
          )}
        </>
      ) : (
        <div className="text-center">
          <Image
            src="/mascotas/quimi-compra.png"
            alt="Confirmación"
            width={120}
            height={120}
            className="mx-auto mb-4"
          />
          <p className="text-xl font-semibold text-[var(--violeta)] mb-2">
            ¡Gracias por tu compra!
          </p>
          <p className="text-sm text-gray-600">
            Tu pedido está a la espera de confirmación del proveedor.
          </p>
        </div>
      )}
    </div>
  );
}
