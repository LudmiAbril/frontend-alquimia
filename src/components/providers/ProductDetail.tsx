"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/services/productService";

import Image from "next/image";
import Button from "@/components/General/Button";
import SectionWrapper from "../General/SectionWrapper";
import Link from "next/link";
import { ProductDTO } from "../utils/typing";

import ButtonViolet from "../general/ButtonViolet";
import ButtonSecondary from "../general/ButtonSecondary";


export default function ProductDetailPage() {
const params = useParams();
const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!id) return;

  const fetchAndFindProduct = async () => {
    try {
      const allProducts = await getAllProducts();
      const found = allProducts.find((p) => p.id === Number(id));



      setProduct(found ?? null);
    } catch (err) {
      console.error("Error al cargar producto:", err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  fetchAndFindProduct();
}, [id]);


  if (loading) return <p className="text-center py-12">Cargando producto...</p>;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Image src="/mascotas/sadQuimi.png" alt="No encontrado" width={140} height={140} />
        <p className="text-center text-xl mt-4 text-[var(--violeta)] font-semibold">
          ¡Oops! No encontramos lo que buscás
        </p>
        <p className="text-center text-gray-600 mt-1">A veces la magia lleva tiempo, probá más tarde.</p>
        <Button label="Volver a inicio" />
      </div>
    );
  }

  const validVariants = product.variants?.filter((v) => typeof v.price === "number") || [];
  const hasPrices = validVariants.length > 0;
  const minPrice = hasPrices ? Math.min(...validVariants.map(v => v.price!)) : null;

  return (
    <SectionWrapper>
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Imagen */}
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/default-product.jpg"
            alt={`Imagen de ${product.name}`}
            width={280}
            height={280}
            className="object-contain rounded-xl shadow-sm"
          />
          <Image
            src="/logos/danfa-logo.png"
            alt="Proveedor"
            width={90}
            height={40}
            className="mt-4"
          />
        </div>

        {/* Detalles */}
        <div className="text-left">
        
<nav className="text-xs text-gray-500 uppercase mb-2 tracking-wide space-x-1">
  <Link href="/proveedores" className="hover:underline text-[var(--violeta)] font-medium">
    Proveedores
  </Link>
  <span>/</span>
  <span>{product.productType?.toUpperCase()}</span>
  <span>/</span>
  <span className="text-gray-800">{product.name}</span>
</nav>
          <p className="text-sm font-semibold mb-1">
            vendido por {product.provider?.Nombre?.toUpperCase() || "PROVEEDOR"}
          </p>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          {hasPrices ? (
            <>
              <p className="text-2xl font-bold text-gray-800 mb-0">${minPrice!.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mb-6">precio sin Alquimia ${(minPrice! * 1.2).toLocaleString()}</p>
            </>
          ) : (
            <p className="text-md text-gray-500 mb-4">Precio no disponible</p>
          )}

          <h3 className="text-sm font-bold mb-1 uppercase tracking-wide">Detalle del producto</h3>
          <p className="text-sm text-gray-700 mb-6">
            {product.description || "Sin descripción disponible."}
          </p>

          <div className="flex gap-3 mb-8">
            <ButtonViolet label="VISITAR PROVEEDOR" />
          </div>

          <h3 className="text-sm font-bold mb-2 uppercase tracking-wide">Presentaciones disponibles:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
           {product.variants?.map((v, index) => (

              <div
                key={`variant-${v.id ?? index}`}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
              >
                <p className="text-sm font-medium mb-1">
                  {v.volume ?? "?"} {v.unit ?? ""}
                </p>
                <p className="text-lg font-bold text-[var(--violeta)]">
                  {typeof v.price === "number" ? `$${v.price.toLocaleString()}` : "Precio no disponible"}
                </p>
                <p className="text-xs text-gray-500 mt-1">Stock: {v.stock ?? "?"}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonSecondary label="SUMAR A BIBLIOTECA" />
            <ButtonViolet label="RECLAMAR CÓDIGO" />
          </div>
        </div>
      </main>
    </SectionWrapper>
  );
}
