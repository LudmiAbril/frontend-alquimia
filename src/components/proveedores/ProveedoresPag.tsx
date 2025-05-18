import Button from "../general/Button";
import Navbar from "../general/Navbar";
import CardProducto from "./CardProducto";
import FiltroLateral from "./Firltrateral";



export default function ProveedoresPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#f5f1ee] min-h-screen pb-20">
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-center text-3xl font-bold mb-2">PROVEEDORES</h1>
          <p className="text-center text-gray-700 mb-10">
            Explorá los productos que le van a dar vida a tus ideas
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
            {/* Filtros laterales */}
            <FiltroLateral />

            {/* Contenido */}
            <div className="space-y-12">
              {/* Secciones: Más vendidos, Esencias, Botellas, etc. */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Más vendidos</h2>
                  <a href="#" className="text-sm text-[#9444B6] hover:underline">Ver todo</a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <CardProducto key={i} nombre={""} precio={0} categoria={""} imagen={""} />
                  ))}
                </div>
              </div>

              {/* Repetir bloques por categoría */}
              {/* Esencias */}
              {/* Botellas */}
            </div>
          </div>
        </section>

        {/* Beneficio fijo */}
        <div className="fixed bottom-6 left-6 z-50">
          <Button label={"RECLAMÁ TU CÓDIGO"}>
            
          </Button>
        </div>
      </main>
  
    </>
  );
}
