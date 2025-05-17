import SectionWrapper from "@/components/general/SeccionWrapper";

type Props = {
  titulo: string;
  descripcion: string;
  imagen: string;
  alt: string;
  botonTexto?: string;
  invertir?: boolean;
  className?: string;
};

export default function SeccionConImagen({
  titulo,
  descripcion,
  imagen,
  alt,
  botonTexto,
  invertir = false,
  className = "bg-[#E8E3DE]",
}: Props) {
  return (
    <SectionWrapper className={className}>
      <div
        className={`flex flex-col md:flex-row items-center gap-10 ${
          invertir ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Texto */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{titulo}</h2>
          <p className="text-base md:text-lg whitespace-pre-line mb-6 pb-5">{descripcion}</p>
          {botonTexto && (
            <button className="bg-[#9444B6] text-white px-6 py-3 rounded-[10px] text-sm font-bold hover:bg-[#7a2f96] transition">
              {botonTexto}
            </button>
          )}
        </div>

        {/* Imagen */}
        <div className="flex-1 flex justify-end">
          <img
            src={imagen}
            alt={alt}
            className="w-full max-w-md rounded-xl"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
