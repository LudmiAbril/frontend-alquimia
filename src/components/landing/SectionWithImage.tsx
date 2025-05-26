import SectionWrapper from "@/components/general/SectionWrapper";
import { ImageSectionProps } from "@/components/utils/typing";
import Image from "next/image";

export default function SectionWithImage({
  title,
  description,
  image,
  alt,
  buttonText,
  reverse = false,
  className = "bg-[#E8E3DE]",
}: ImageSectionProps) {
  return (
    <SectionWrapper className={className}>
      <div className={`flex flex-col md:flex-row items-center gap-10 ${reverse ? "md:flex-row-reverse" : ""}`}>
        <div className="flex-1 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--gris4)]">{title}</h2>
          <p className="text-base md:text-lg whitespace-pre-line mb-6 pb-5">{description}</p>
          {buttonText && (
            <button className="bg-[#9444B6] text-white px-6 py-3 rounded-[10px] text-sm font-bold hover:bg-[#7a2f96] transition">
              {buttonText}
            </button>
          )}
        </div>

        <div className="flex-1 flex justify-end">
          <Image
            src={image}
            alt={alt}
            className="w-full max-w-md rounded-xl"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
