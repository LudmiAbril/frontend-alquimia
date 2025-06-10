"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/services/productService";
import Image from "next/image";
import SectionWrapper from "../General/SectionWrapper";
import Link from "next/link";
import { ProductDTO, VariantDTO } from "../utils/typing";
import ButtonViolet from "../general/ButtonViolet";
import ButtonSecondary from "../general/ButtonSecondary";
import Purchase from "./Purchase";


export default function ProductDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
const [selectedVariant, setSelectedVariant] = useState<VariantDTO | null>(null);
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
        <ButtonViolet label="Volver a inicio" />
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
      <div className="text-left flex flex-col gap-4">

  {/* Breadcrumb */}
  <nav className="text-xs text-gray-500 uppercase tracking-wide space-x-1">
    <Link href="/proveedores" className="hover:underline text-[var(--violeta)] font-medium">
      Proveedores
    </Link>
    <span>/</span>
    <span>{product.productType?.toUpperCase()}</span>
    <span>/</span>
    <span className="text-gray-800">{product.name}</span>
  </nav>

  {/* Nombre y proveedor */}
  <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
  <p className="text-sm font-semibold text-gray-600">
    Vendido por {product.provider?.Nombre?.toUpperCase() || "PROVEEDOR"}
  </p>

  {/* Precio */}
  {hasPrices ? (
    <div>
      <p className="text-2xl font-bold text-gray-800">${minPrice!.toLocaleString()}</p>
      <p className="text-sm text-gray-400">precio sin Alquimia ${(minPrice! * 1.2).toLocaleString()}</p>
    </div>
  ) : (
    <p className="text-base text-gray-500">Precio no disponible</p>
  )}

  {/* Descripción */}
  <div>
    <h3 className="text-sm font-bold uppercase tracking-wide mb-1">Detalle del producto</h3>
    <p className="text-sm text-gray-700">{product.description || "Sin descripción disponible."}</p>
  </div>

  {/* Presentaciones */}
  <div>
    <h3 className="text-sm font-bold uppercase tracking-wide mb-2">Presentaciones disponibles:</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
   {product.variants?.map((v, index) => {
  const isSelected = selectedVariant?.id === v.id;

  return (
    <div
      key={`variant-${v.id ?? index}`}
      onClick={() => setSelectedVariant(v)}
      className={`cursor-pointer border rounded-lg p-4 shadow-sm bg-white transition-all ${
        isSelected
          ? "border-[var(--violeta)] ring-2 ring-[var(--violeta)]"
          : "border-gray-200"
      }`}
    >
      <p className="text-sm font-medium mb-1">
        {v.volume ?? "?"} {v.unit ?? ""}
      </p>
      <p className="text-lg font-bold text-[var(--violeta)]">
        {typeof v.price === "number" ? `$${v.price.toLocaleString()}` : "Precio no disponible"}
      </p>
      <p className="text-xs text-gray-500 mt-1">Stock: {v.stock ?? "?"}</p>
    </div>
  );
})}

    </div>
  </div>

  {/* compra */}
  <div className="mt-6">
<Purchase productName={product.name} variant={selectedVariant} />

  </div>

  {/* Acciones */}
  <div className="flex flex-wrap gap-3 mt-4">
    <ButtonViolet label="VISITAR PROVEEDOR" />
    <ButtonSecondary label="SUMAR A BIBLIOTECA" />
  </div>
</div>

      </main>
    </SectionWrapper>
  );
}
