"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllProducts, getProductImage } from "@/services/productService";
import { ProductDTO} from "@/components/utils/typing";
import Image from "next/image";
import Link from "next/link";
import ButtonViolet from "../General/ButtonViolet";

import ButtonSecondary from "../General/ButtonSecondary";
import SectionWrapper from "../General/SectionWrapper";
import { getMockCheckoutUrl } from "@/services/mp";


type Variant = NonNullable<ProductDTO["variants"]>[number];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const allProducts = await getAllProducts();
        const found = allProducts.find((p) => p.id === Number(id));
        setProduct(found ?? null);
      } catch (err) {
        console.error("Error al cargar producto:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

const redirectToCheckout = () => {
  const url = getMockCheckoutUrl();
  router.push(url); 
};

  const formatMoney = (value: number | undefined | null) =>
    typeof value === "number" ? `$${value.toLocaleString()}` : "Precio no disponible";
        
  if (loading) return  <div className="flex flex-col items-center justify-center py-20 opacity-80 mt-20">
                    <Image src="/mascotas/lookingQuimi.png" alt="Cargando productos..." width={140} height={140} />
                    <p className="mt-4 text-sm text-gray-600">Cargando detalle de producto...</p>
                  </div>;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Image src="/mascotas/sadQuimi.png" alt="No encontrado" width={140} height={140} />
        <p className="text-xl text-[var(--violeta)] font-semibold mt-4">¡Oops! No encontramos lo que buscás</p>
        <p className="text-gray-600">Probá más tarde.</p>
        <ButtonViolet label="Volver a inicio" onClick={() => router.push("/")} />
      </div>
    );
  }

  return (
    <SectionWrapper>
      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Imagen */}
        <div className="flex flex-col items-center gap-6">
<Image
  src={
    selectedVariant?.image?.startsWith("/") || selectedVariant?.image?.startsWith("http")
      ? selectedVariant.image
      : product.variants?.[0]?.image?.startsWith("/") || product.variants?.[0]?.image?.startsWith("http")
        ? product.variants[0].image
        : getProductImage(product.name)
  }
  alt={product.name}
  width={280}
  height={280}
  className="object-contain rounded-xl"
/>


         
        </div>

        {/* Detalles */}
        <div className="text-left">
          <nav className="text-xs text-gray-500 uppercase mb-2 tracking-wide space-x-1">
            <Link href="/proveedores" className="text-[var(--violeta)] font-medium hover:underline">Proveedores</Link>
            <span>/</span>
            <span>{product.productType?.toUpperCase()}</span>
            <span>/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-sm font-semibold text-gray-600 mb-4">Vendido por {product.provider?.Nombre?.toUpperCase() || "PROVEEDOR"}</p>

          {selectedVariant && (
            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-800">{formatMoney(selectedVariant.price)}</p>
              <p className="text-sm text-gray-400">precio sin Alquimia {formatMoney(selectedVariant.price! * 1.2)}</p>
            </div>
          )}

          <h3 className="text-sm font-bold uppercase mb-1 tracking-wide">Detalle del producto</h3>
          <p className="text-sm text-gray-700 mb-6">{product.description || "Sin descripción disponible."}</p>

          <h3 className="text-sm font-bold uppercase mb-2 tracking-wide">Presentaciones disponibles:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {product.variants?.map((v, index) => {
           
              const isSelected = selectedVariant?.id === v.id;
              return (
                <button
                  key={`variant-${v.id ?? index}`}
                  onClick={() => setSelectedVariant(v)}
                  className={`p-4 border rounded-lg shadow-sm transition-all bg-white text-left cursor-pointer ${
                    isSelected ? "border-[var(--violeta)] ring-2 ring-[var(--violeta)]" : "border-gray-200"
                  }`}
                >
                  <p className="text-sm font-medium">{v.volume ?? "?"} {v.unit ?? ""}</p>
                  <p className="text-lg font-bold text-[var(--violeta)]">{formatMoney(v.price)}</p>
                  <p className="text-xs text-gray-500 mt-1">Stock: {v.stock ?? "?"}</p>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <ButtonViolet
              label={isRedirecting ? "Redirigiendo..." : "COMPRAR AHORA"}
              onClick={redirectToCheckout}
              disabled={!selectedVariant || isRedirecting}
            />
            <ButtonSecondary label="SUMAR A BIBLIOTECA" />
          </div>
        </div>
      </main>
    </SectionWrapper>
  );
}
