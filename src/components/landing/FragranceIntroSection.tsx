import SectionWrapper from "@/components/general/SectionWrapper";
import TextSectionWithButton from "./TextSectionWithButton";
import OlfactoryTest from "./OlfactoryTest";
import Image from "next/image";

export default function FragranceIntroSection() {
  return (
    <SectionWrapper className="bg-[#D9B6E2] rounded-tl-[15rem] rounded-tr-[15rem] py-16 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
        <div>
          <TextSectionWithButton
            title="¿NO SABÉS POR DÓNDE EMPEZAR?"
            description={`DEJÁ QUE LA MAGIA TE GUÍE.\n\nNuestro test de aromas te orienta a través de distintas preguntas que te permitirán encontrar los aromas que se adapten a tu esencia, creando tu fórmula perfecta.`}
            buttonText="QUIERO TOMAR EL TEST"
          />
        </div>

        <div>
          <OlfactoryTest />
        </div>

        <div className="w-full flex justify-center mt-8">
          <Image
            src="/landingImagenes/chicoAlquimista.png"
            alt="Ilustración de alquimista"
            width={400}
            height={400}
            className="rounded-2xl object-contain"
          />
        </div>

        <div className="mt-8">
          <TextSectionWithButton
            title="Diseñá tu fragancia desde cero, como un verdadero alquimista."
            description={`Elegí tus ingredientes favoritos, combiná notas aromáticas y personalizá el frasco a tu gusto.\nNuestra plataforma te acompaña paso a paso para que experimentes, explores y crees una fragancia tan única como vos.`}
            buttonText="EMPEZAR A DISEÑAR"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
