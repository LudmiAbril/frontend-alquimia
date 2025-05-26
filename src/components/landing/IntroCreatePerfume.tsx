import Image from "next/image";

export default function IntroCreatePerfume() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center gap-6">
      {/* Texto */}
      <div className="text-white max-w-md text-center lg:text-left space-y-4">
        <h2 className="text-2xl lg:text-3xl font-extrabold uppercase leading-tight">
          Diseñá tu fragancia desde cero, como un verdadero alquimista.
        </h2>
        <p className="italic font-medium text-white/90">
          Dejá que la magia te guíe.
        </p>
        <p className="text-sm leading-relaxed text-white/90">
          Elegí tus ingredientes favoritos, combiná notas aromáticas y personalizá el frasco a tu gusto.
          Nuestra plataforma te acompaña paso a paso para que experimentes, explores y crees una fragancia tan única como vos.
        </p>

        <button className="bg-[#9444B6] hover:bg-[#7c38a0] text-white font-bold py-2 px-6 rounded-lg shadow-md transition">
          EMPEZAR A DISEÑAR
        </button>
      </div>

      {/* Imagen */}
      <Image
        src="/landingImagenes/chicoAlquimista.png"
        alt="Ilustración de alquimista"
        width={160}
        height={160}
        className="rounded-xl"
      />
    </div>
  );
}
