
import { SeeMoreProps } from "../utils/typing";

export default function SeeMoreButton({ className = "" }: SeeMoreProps) {
  return (
    <span
      className={`inline-block mt-2 text-white bg-[#4F8578] text-sm px-4 py-2 rounded-lg text-center hover:bg-[#3c6a60] transition ${className}`}
    >
      Ver más
    </span>
  );
}