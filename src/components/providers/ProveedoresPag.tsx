import Button from "../general/Button";
import SectionWrapper from "../general/SectionWrapper";
import { mockProducts } from "../utils/utils";
import ProductCard from "./CardProducto";
import SidebarFilter from "./SidebarFilter";

export default function SuppliersPage() {
  return (
    <>
      <SectionWrapper>
        <main className="min-h-screen pb-20">
          <section className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-center text-3xl font-bold mb-2">PROVEEDORES</h1>
            <p className="text-center text-gray-700 mb-10">
              Explorá los productos que le van a dar vida a tus ideas
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
              {/* Filtros laterales */}
              <SidebarFilter />

              {/* Contenido */}
              <div className="space-y-12">
                {/* Secciones: Más vendidos, Esencias, Botellas, etc. */}
                <div>
                  {Object.entries(mockProducts || {}).map(([title, products]) => {
                    console.log("Renderizando sección:", title, products);
                    return (
                      <div key={title}>
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-xl font-semibold">{title}</h2>
                          <a href="#" className="text-sm text-[#9444B6] hover:underline">Ver todo</a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {Array.isArray(products) ? (
                            products.map((product, index) => (
                              <ProductCard
                                key={index}
                                name={product.name}
                                price={product.price}
                                category={product.category}
                                image={product.image}
                              />

                            ))
                          ) : (
                            <p className="text-red-500">Error al cargar productos de {title}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Repetir bloques por categoría */}
                {/* Esencias */}
                {/* Botellas */}
              </div>
            </div>
          </section>

          {/* Beneficio fijo */}
          <div className="fixed bottom-6 left-6 z-50">
            <Button label={"RECLAMÁ TU CÓDIGO"} />
          </div>
        </main>
      </SectionWrapper>
    </>
  );
}
