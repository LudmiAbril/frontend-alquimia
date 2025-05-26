import Link from "next/link";
import { ProductCardProps } from "../utils/typing";
import Image from "next/image";

export default function ProductCard({ name, price, category, image }: ProductCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col justify-between min-h-[260px]">
      <Image src={image} alt={name} className="h-32 object-contain mx-auto mb-2" height={32} width={100} />
      <div className="text-sm font-semibold">{name}</div>
      <div className="text-xs text-gray-500">{category}</div>
      <div className="text-md font-bold">${price.toLocaleString()}</div>
      
      <Link href={`/proveedores/${slug}`}>
        <span className="mt-2 text-[#4a7f5c] font-semibold hover:underline text-sm cursor-pointer">
          Ver más
        </span>
      </Link>
    </div>
  );
}
