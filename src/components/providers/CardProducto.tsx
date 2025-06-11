import Link from "next/link";
import Image from "next/image";
import { ProductCardProps } from "../utils/typing";
import { getProductImage } from "@/services/productService";

function isValidImageUrl(url: string | null | undefined) {
  return typeof url === "string" && (url.startsWith("http") || url.startsWith("/"));
}
export default function ProductCard({
  id,
  name,
  category,
  image,
  variants = [],
}: ProductCardProps) {
  const validVariants = variants.filter(v => typeof v.price === "number");
  const cheapest = validVariants.length
    ? validVariants.reduce((min, curr) => (curr.price < min.price ? curr : min))
    : null;

 const fallbackImage = getProductImage(name); // o tu función 
  const displayImage = isValidImageUrl(image) ? image : fallbackImage;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-md flex flex-col p-4 w-full max-w-[220px] min-h-[340px] transition hover:shadow-lg mx-auto">
      {/* Imagen */}
      <div className="flex justify-center items-center h-32 mb-3">


        <Image
          src={displayImage}
          alt={name || "Producto sin nombre"}
          width={100}
          height={100}
          className="object-contain"
        />
              
      </div>
      {/* Info */}
      <div className="flex-1 text-center">
        <h3 className="text-sm font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-xs text-gray-500 mb-1">{category || "Otros"}</p>
{cheapest?.stock === 0 && (
  <p className="text-xs text-red-500 mt-1">Sin stock</p>
)}

        {cheapest ? (
          <p className="text-[var(--violeta)] font-semibold text-sm mb-1">
            ${cheapest.price.toLocaleString()}
            <span className="text-xs text-gray-600 ml-1">
              • {cheapest.volume} {cheapest.unit}
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-400 mb-1">Precio no disponible</p>
        )}
      </div>

      {/* Botón */}
      <Link
        href={`/producto/${id}`}
        className="mt-4 bg-[var(--violeta)] text-white text-sm rounded-md px-4 py-2 font-semibold text-center hover:bg-purple-700 transition"
      >
        VER MÁS
      </Link>
    </div>
  );
}
