import { StepCardProps } from "@/components/utils/typing";
import Image from "next/image";

export default function StepCard({ image, alt, text }: StepCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm w-full max-w-[160px] text-center overflow-hidden min-h-[210px]">
      <div className="rounded-t-xl overflow-hidden">
        <Image
          src={image}
          alt={alt}
          className="max-w-full h-auto mx-auto"
          style={{ width: "160px", height: "140px" }}
          width={160}
          height={140}
        />
      </div>

      <p className="text-sm font-medium px-3 py-4">{text}</p>
    </div>
  );
}
