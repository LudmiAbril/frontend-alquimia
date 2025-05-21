import SectionWrapper from "@/components/general/SeccionWrapper";
import DetalleProducto from "@/components/proveedores/ProductDetail";
import { Producto, Props } from "@/components/utils/typing";
import { productosMock } from "@/components/utils/utils";
import { notFound } from "next/navigation";


export default function ProductPage({ params }: Props) {
  const { slug } = params;

  // Buscar el producto por nombre transformado a slug
  const producto: Producto | undefined = Object.values(productosMock)
    .flat()
    .find((p) => p.nombre.toLowerCase().replace(/\s+/g, "-") === slug);

  if (!producto) {
    return notFound();
  }

  // Agregar manualmente info que falta si no está en el mock
  const rubro = "envases";
  const subrubro = "cuadradas";

  // Extraer el nombre real del proveedor del campo `categoria: "por XYZ"`
  const proveedor = producto.categoria.replace(/^por\s+/i, "");

  return (
    <SectionWrapper>
      <DetalleProducto
        nombre={producto.nombre}
        precio={producto.precio}
        imagen={producto.imagen}
        categoria={producto.categoria}
        proveedor={proveedor}
        rubro={rubro}
        subrubro={subrubro}
      />
    </SectionWrapper>
  );
}