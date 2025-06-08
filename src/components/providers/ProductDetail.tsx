"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "../general/Button";

export default function ProductDetail() {
  const params = useSearchParams();

  const name = params.get("name") ?? "Sin nombre";
  const price = Number(params.get("price") ?? 0);
  const volume = params.get("volume");
  const unit = params.get("unit");
  const supplier = params.get("supplier") ?? "Proveedor";
  const mainCategory = params.get("mainCategory") ?? "Otros";
  const subCategory = params.get("subCategory");

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex flex-col items-center">
        <Image src="/default-product.jpg" alt={name} className="w-60 h-60 object-contain" width={240} height={240} />
      </div>

      <div>
        {/* Miga de pan navegable */}
        <nav className="text-sm text-gray-500 mb-1 space-x-1">
          <Link href="/proveedores" className="hover:underline">PROVEEDORES</Link>
          <span>/</span>
          <Link href={`/proveedores/${mainCategory.toLowerCase()}`} className="hover:underline">{mainCategory.toUpperCase()}</Link>
          {subCategory && (
            <>
              <span>/</span>
              <Link href={`/proveedores/${mainCategory.toLowerCase()}/${subCategory.toLowerCase()}`} className="hover:underline">
                {subCategory.toUpperCase()}
              </Link>
            </>
          )}
        </nav>

        <p className="text-sm text-[var(--violeta)] font-medium mb-2">
          vendido por <span className="font-semibold">{supplier.toUpperCase()}</span>
        </p>

        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-xl font-semibold mb-1">${price}</p>

        <h3 className="font-semibold mb-1">DETALLE DEL PRODUCTO</h3>
        <p className="mb-4">{volume && unit ? `Presentación de ${volume} ${unit}.` : "Presentación no disponible."}</p>

        <Button label="VISITAR PROVEEDOR" />
        <div className="flex gap-4 mt-6">
          <Button label="SUMAR A BIBLIOTECA" />
        </div>
      </div>
    </main>
  );
}
