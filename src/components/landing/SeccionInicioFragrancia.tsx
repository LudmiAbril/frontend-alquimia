import SectionWrapper from "@/components/general/SeccionWrapper";
import SeccionTextoConBoton from "./SeccionTextoConBoton";
import TestOlfativo from "./TestOlfativo";
import Image from "next/image";

export default function SeccionInicioFragrancia() {
  return (
    <SectionWrapper className="bg-[#D9B6E2] rounded-tl-[15rem] rounded-tr-[15rem] py-16 px-6max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
        {/* Fila 1 */}
        <div>
          <SeccionTextoConBoton
            titulo="¿NO SABÉS POR DÓNDE EMPEZAR?"
            descripcion={`DEJÁ QUE LA MAGIA TE GUÍE.\n\nNuestro test de aromas te orienta a través de distintas preguntas que te permitirán encontrar los aromas que se adapten a tu esencia, creando tu fórmula perfecta.`}
            botonTexto="QUIERO TOMAR EL TEST"
          />
        </div>

        <div>
          <TestOlfativo />
        </div>

        {/* Fila 2 */}
        <div className="w-full flex justify-center mt-8">
          <Image
            src="/chicoAlquimista.png"
            alt="Ilustración de alquimista"
            width={400}
            height={400}
            className="rounded-2xl object-contain"
          />
        </div>

        <div className="mt-8">
          <SeccionTextoConBoton
            titulo="Diseñá tu fragancia desde cero, como un verdadero alquimista."
            descripcion={`Elegí tus ingredientes favoritos, combiná notas aromáticas y personalizá el frasco a tu gusto.\nNuestra plataforma te acompaña paso a paso para que experimentes, explores y crees una fragancia tan única como vos.`}
            botonTexto="EMPEZAR A DISEÑAR"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
