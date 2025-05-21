import Link from "next/link";
import { CardProductoProps } from "../utils/typing";

export default function CardProducto({ nombre, precio, categoria, imagen }: CardProductoProps) {
  const slug = nombre.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between min-h-[260px]">
      <img src={imagen} alt={nombre} className="h-32 object-contain mx-auto mb-2" />
      <div className="text-sm font-semibold">{nombre}</div>
      <div className="text-xs text-gray-500">{categoria}</div>
      <div className="text-md font-bold">${precio.toLocaleString()}</div>
      
      <Link href={`/proveedores/${slug}`}>
        <span className="mt-2 text-[#4a7f5c] font-semibold hover:underline text-sm cursor-pointer">
          Ver más
        </span>
      </Link>
    </div>
  );
}
