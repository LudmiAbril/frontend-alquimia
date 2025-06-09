import Image from "next/image";
import SectionWrapper from "@/components/general/SectionWrapper";
import MagicParticles from "../general/MagicParticles";
import Button from "../general/Button";

export default function DiscoverSection() {
  return (
<SectionWrapper className="relative text-white text-center overflow-hidden min-h-[100vh] bg-gradient-to-b from-[#451F55] to-[#9444B6]">
      <MagicParticles />

      <div className="absolute left-30 top-12 w-26 md:w-34 animate-float">
        <Image
          src="/LandingImage/Mago.svg"
          alt="Mascota alquímica"
          width={116}
          height={116}
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto ">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          DESCUBRÍ ALQUIMIA
        </h2>

        <p className=" mb-2 leading-relaxed text-center text-2xl  mx-auto">
          Encontrar una fragancia que realmente te represente puede ser un desafío.
        </p>

        <p className=" mb-10  leading-relaxed text-center text-2xl  mx-auto">
          Alquimia existe para cambiar eso.
        </p>
        <Button label="Explorar cómo funciona" href="#como-funciona" />
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
