import Link from "next/link";
import Image from "next/image";
import { ProductCardProps } from "../utils/typing";

export default function ProductCard({ name, price, category, image, slug }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between min-h-[260px]">
      <Image
        src={image}
        alt={name ? `Imagen de ${name}` : "Producto sin nombre"}
        className="h-32 object-contain mx-auto mb-2"
        width={120}
        height={120}
        priority
      />

      <div>
        <div className="text-sm font-semibold text-black">
          {name || "Producto sin nombre"}
        </div>
        <div className="text-xs text-gray-500">
          {category || "Otros"}
        </div>
        <div className="text-md font-bold mt-1">
          {price > 0 ? `$${price.toLocaleString()}` : "$Precio no disponible"}
        </div>
      </div>

      <Link href={`/proveedores/${slug}`} className="mt-2">
        <span className="text-[#4a7f5c] font-semibold hover:underline text-sm cursor-pointer">
          Ver más
        </span>
      </Link>
    </div>
  );
}
