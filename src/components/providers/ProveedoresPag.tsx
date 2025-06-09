"use client";

import { useEffect, useState } from "react";
import SectionWrapper from "../general/SectionWrapper";
import SidebarFilter from "./SidebarFilter";
import ProductCard from "./CardProducto";
import Button from "../general/Button";
import { ProductDTO } from "../utils/typing";
import Image from "next/image";
import { getCategoryLabel } from "../utils/getcategorylabel";
import { getAllProducts } from "@/services/productService";

export default function ProovedoresPage() {
  const [groupedProducts, setGroupedProducts] = useState<Record<string, ProductDTO[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "popular">("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();

        const grouped = products.reduce((acc, product) => {
          const category = getCategoryLabel(product) || "Otros";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {} as Record<string, ProductDTO[]>);

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

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat],
    }));
  };

  const finalGrouped = Object.entries(groupedProducts).reduce((acc, [category, products]) => {
    if (selectedCategory && category !== selectedCategory) return acc;

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.productType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    let sorted = [...filtered];
    if (sortOrder === "asc") {
   sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));

    } 
    acc[category] = sorted;
    return acc;
  }, {} as typeof groupedProducts);

  return (
    <SectionWrapper>
      <main className="min-h-screen pb-20">
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-center text-3xl font-bold mb-2">PROVEEDORES</h1>
          <p className="text-center text-gray-700 mb-10">
            Explorá los productos que le van a dar vida a tus ideas
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
            <SidebarFilter
              onFilter={setSelectedCategory}
              onSort={setSortOrder}
              onSearch={setSearchTerm}
            />

            <div className="space-y-12">
              {loading && (
                <div className="flex flex-col items-center justify-center py-20 opacity-80">
                  <Image src="/mascotas/lookingQuimi.png" alt="Cargando productos..." width={140} height={140} />
                  <p className="mt-4 text-sm text-gray-600">Cargando productos...</p>
                </div>
              )}

              {error && (
                <p className="text-center text-red-500">
                  Ocurrió un error al cargar los productos. Intentá nuevamente más tarde.
                </p>
              )}

              {!loading && !error && Object.keys(finalGrouped).length === 0 && (
                <p className="text-center text-gray-500">No se encontraron productos disponibles.</p>
              )}

              {!loading && !error &&
                Object.entries(finalGrouped).map(([title, products], idx) => {
                  const isExpanded = expandedCategories[title];
            const visibleProducts = isExpanded ? products : products.slice(0, 3);


                  return (
                    <div key={`${title}-${idx}`}>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        {products.length > 4 && (
                          <button
                            onClick={() => toggleCategory(title)}
                            className="text-sm text-[#9444B6] hover:underline"
                          >
                            {isExpanded ? "Ver menos" : "Ver todo"}
                          </button>
                        )}
                      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                  {visibleProducts.map((product) => {




  return (
    
<ProductCard
  key={product.id} 
  id={product.id}
  name={product.name}
  image="/default-product.jpg"
  category={getCategoryLabel(product)}
  variants={product.variants}
/>





  );
})}

                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>

        <div className="fixed bottom-6 left-6 z-50">
          <Button label={"RECLAMÁ TU CÓDIGO"} />
        </div>
      </main>
    </SectionWrapper>
  );
}
