import Image from "next/image";
import SectionWrapper from "@/components/general/SectionWrapper";
import MagicParticles from "../general/MagicParticles";

export default function DiscoverSection() {
  return (
    <SectionWrapper className="relative text-white text-center overflow-hidden min-h-[95vh] bg-gradient-to-b from-[#451F55] to-[#9444B6]">
      <MagicParticles />

      <div className="absolute left-15 top-12 w-16 md:w-24 animate-float">
        <Image
          src="/LandingImage/Mago.svg"
          alt="Mascota alquímica"
          width={96}
          height={96}
          priority
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto mt-10">
        <h2 className="text-2xl md:text-4xl font-bold">DESCUBRÍ ALQUIMIA</h2>
        <p className="text-md md:text-lg mt-10">
          Encontrar una fragancia que realmente te represente puede ser un desafío. <br />
          Alquimia existe para cambiar eso.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full -mb-[1px]">
        <Image
          src="/LandingImage/TreeBg.svg"
          alt="Bosque mágico"
          width={1920}
          height={160}
          className="w-full h-auto block"
        />
      </div>
    </SectionWrapper>
  );
}
