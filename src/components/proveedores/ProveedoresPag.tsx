
import SectionWrapper from "../general/SeccionWrapper";
import { productosMock } from "../utils/utils";
import CardProducto from "./CardProducto";
import FiltroLateral from "./Firltrateral";



export default function ProveedoresPage() {
  return (
    <>
        <SectionWrapper  >

      <main className=" min-h-screen pb-20">
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-center text-3xl font-bold mb-2">PROVEEDORES</h1>
          <p className="text-center text-gray-700 mb-10">
            Explorá los productos que le van a dar vida a tus ideas
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
            {/* Filtros laterales */}
            <FiltroLateral />

            {/* Contenido */}
            <div className="space-y-16">
              {/* Secciones: Más vendidos, Esencias, Botellas, etc. */}
              <div>
               
              {Object.entries(productosMock || {}).map(([titulo, productos]) => {
  console.log("Renderizando sección:", titulo, productos);
  return (
    <div key={titulo}>
      <div className="flex justify-between items-center mb-4 space-y-12">
        <h2 className="text-xl font-semibold">{titulo}</h2>
        <a href="#" className="text-sm text-[#9444B6] hover:underline">Ver todo</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {Array.isArray(productos) ? (
          productos.map((producto, index) => (
            <CardProducto
              key={index}
              nombre={producto.nombre}
              precio={producto.precio}
              categoria={producto.categoria}
              imagen={producto.imagen} proveedor={""} rubro={""}            />
          ))
        ) : (
          <p className="text-red-500">Error al cargar productos de {titulo}</p>
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

      
      </main>
  </SectionWrapper>
    </>
  );
}
