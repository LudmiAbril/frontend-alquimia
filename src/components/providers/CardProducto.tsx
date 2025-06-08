import Link from "next/link";
import Image from "next/image";
import { ProductCardProps } from "../utils/typing";

export default function ProductCard({
  name,
  category,
  image,
  id,
  variants = [],
}: ProductCardProps) {
  // Buscamos la variante más barata con precio válido
  const validVariants = variants.filter((v) => typeof v.price === "number");
  const cheapest = validVariants.length
    ? validVariants.reduce((min, curr) => (curr.price < min.price ? curr : min))
    : null;

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
        <div className="text-xs text-gray-500">{category || "Otros"}</div>

        <div className="text-md font-bold mt-1">
          {cheapest ? (
            <>
              ${cheapest.price.toLocaleString()}
              <span className="text-xs font-normal text-gray-600">
                {" "}
                • {cheapest.volume} {cheapest.unit}
              </span>
            </>
          ) : (
            "$Precio no disponible"
          )}
        </div>
      </div>

      <Link href={`/producto/${id}`} className="mt-2">
        <span className="text-[#4a7f5c] font-semibold hover:underline text-sm cursor-pointer">
          Ver más
        </span>
      </Link>
    </div>
  );
}
