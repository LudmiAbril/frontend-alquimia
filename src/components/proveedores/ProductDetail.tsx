import Link from "next/link";
import { DetalleProductoProps } from "../utils/typing";
import Button from "../general/Button";

export default function DetalleProducto({
  nombre,
  precio,
  imagen,
  categoria,
  proveedor,
  rubro,
  subrubro,
}: DetalleProductoProps) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex flex-col items-center">
        <img src={imagen} alt={nombre} className="w-60 h-60 object-contain" />
        {/*ACA DESPUÉS IMG DEL LOGO DELOSROOOVEDORES */}
        {/* <img src={`/imgProveedores/${proveedor.toLowerCase().replace(/\s+/g, "")}.png`} alt="Proveedor" className="w-32 mt-4" /> */}
      </div>
      <div>
        {/* Miga de pan navegable */}
        <nav className="text-sm text-gray-500 mb-1 space-x-1">
          <Link href="/proveedores" className="hover:underline">PROVEEDORES</Link>
          <span>/</span>
          <Link href={`/proveedores/${rubro.toLowerCase()}`} className="hover:underline">{rubro.toUpperCase()}</Link>
          {subrubro && (
            <>
              <span>/</span>
              <Link href={`/proveedores/${rubro.toLowerCase()}/${subrubro.toLowerCase()}`} className="hover:underline">
                {subrubro.toUpperCase()}
              </Link>
            </>
          )}
        </nav>

        {/* Proveedor */}
        <p className="text-sm text-[var(--violeta)] font-medium mb-2">
          vendido por <span className="font-semibold">{proveedor.toUpperCase()}</span>
        </p>

        {/* Detalle */}
        <h1 className="text-3xl font-bold mb-2">{nombre}</h1>
        <p className="text-xl font-semibold mb-1">${precio}</p>
        <p className="text-sm text-gray-500 mb-4">precio sin Alquimia $12800</p>

        <h3 className="font-semibold mb-1">DETALLE DEL PRODUCTO</h3>
        <p className="mb-4">Envase de vidrio coloreado blanco con detalle dorado para 100ml.</p>

        <div className="flex gap-4 mt-6">
        <Button label="VISITAR PROVEEDOR" />
          <Button label="SUMAR A BIBLIOTECA" />
   
        </div>
      </div>
    </main>
  );
}
