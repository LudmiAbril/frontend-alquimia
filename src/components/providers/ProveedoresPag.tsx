"use client";

import { useEffect, useState } from "react";
import SectionWrapper from "../general/SectionWrapper";
import SidebarFilter from "./SidebarFilter";
import ProductCard from "./CardProducto";
import Button from "../general/Button";
import { ProductDTO } from "../utils/typing";
import Image from "next/image";
import { getCategoryLabel } from "../utils/getcategorylabel";

export default function ProovedoresPage() {
  const [groupedProducts, setGroupedProducts] = useState<Record<string, ProductDTO[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5035/product/all");

        if (!response.ok) {
          console.error("❌ Error al hacer fetch:", response.statusText);
          setError(true);
          return;
        }

        const data: ProductDTO[] = await response.json();
        console.log("✅ Productos recibidos:", data);

        const grouped = data.reduce((acc, product) => {
const category = getCategoryLabel(product);

          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {} as Record<string, ProductDTO[]>);

        console.log("📦 Agrupados por categoría:", grouped);
        setGroupedProducts(grouped);
      } catch (err) {
        console.error("💥 Error inesperado al cargar productos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <SectionWrapper>
      <main className="min-h-screen pb-20">
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-center text-3xl font-bold mb-2">PROVEEDORES</h1>
          <p className="text-center text-gray-700 mb-10">
            Explorá los productos que le van a dar vida a tus ideas
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
            <SidebarFilter />

            <div className="space-y-12">
              {loading && (
                <div className="flex flex-col items-center justify-center py-20 opacity-80">
                  <Image src="/mascotas/lookingQuimi.png" alt="Cargando productos..." width={140} height={140} />
                  <p className="mt-4qtext-sm text-gray-600">Cargando productos...</p>
                </div>
              )}

              {error && (
                <p className="text-center text-red-500">
                  Ocurrió un error al cargar los productos. Intentá nuevamente más tarde.
                </p>
              )}

              {!loading && !error && Object.keys(groupedProducts).length === 0 && (
                <p className="text-center text-gray-500">No se encontraron productos.</p>
              )}

              {!loading && !error && Object.entries(groupedProducts).map(([title, products], idx) => (
                <div key={`${title}-${idx}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <a href="#" className="text-sm text-[#9444B6] hover:underline">Ver todo</a>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => {
                      const slug = `${product.name}-${product.id}`
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9\-]/g, "");

                      const price = product.variants?.[0]?.price || 0;

                      return (
                        <ProductCard
                          key={product.id ? `product-${product.id}` : `${product.name}-${Math.random()}`}
                          name={product.name || "Producto sin nombre"}
                          price={price}
             category={getCategoryLabel(product)}


                          image="/default-product.jpg"
                          slug={slug}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="fixed bottom-6 left-6 z-50">
          <Button label={"RECLAMÁ TU CÓDIGO"} />
        </div>
      </main>

      {/* Panel de debug visual */}
      {!loading && !error && (
        <div className="fixed bottom-0 right-0 z-50 bg-black text-white text-xs p-3 max-w-xs max-h-[200px] overflow-auto opacity-70 rounded-tl-xl">
          <p className="font-bold mb-1">🧪 Debug:</p>
          <p>Total categorías: {Object.keys(groupedProducts).length}</p>
          {Object.entries(groupedProducts).map(([cat, prods]) => (
            <p key={cat}>• {cat}: {prods.length}</p>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
