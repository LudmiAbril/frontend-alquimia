"use client";

import { useEffect, useState } from "react";
import SectionWrapper from "../general/SectionWrapper";
import SidebarFilter from "./SidebarFilter";
import ProductCard from "./CardProducto";
import Button from "../general/Button";
import { ProductDTO } from "../utils/typing";

export default function ProovedoresPage() {
  const [groupedProducts, setGroupedProducts] = useState<Record<string, ProductDTO[]>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5035/product/all");
        const data: ProductDTO[] = await response.json();

        // Agrupar productos por la descripción del tipo
        const grouped = data.reduce((acc, product) => {
          const category = product.productType?.description?.trim() || "Otros";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {} as Record<string, ProductDTO[]>);

        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Error al cargar productos:", error);
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
              {Object.entries(groupedProducts).map(([title, products], idx) => (
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

                      return (
                    <ProductCard
  key={product.id ? `product-${product.id}` : `${product.name}-${Math.random()}`}

                          name={product.name}
                          price={product.variants?.[0]?.price || 0}
                          category={product.productType?.description || "Otros"}
                          image={"/default-product.jpg"}
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
    </SectionWrapper>
  );
}
