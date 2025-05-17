import SectionWrapper from "@/components/general/SeccionWrapper";
import SeccionTextoConBoton from "./SeccionTextoConBoton";
import TipoFraganciaSelector from "./TipoFraganciaSelector";

export default function SeccionInicioFragrancia() {
  return (
<SectionWrapper className="bg-[#D9B6E2] rounded-tl-[15rem] rounded-tr-[15rem]">
<div className="grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-10">

        {/* 1️  Crae Columna */}
        <div className="order-1">
          <SeccionTextoConBoton
            titulo="DISEÑÁ TU FRAGANCIA DESDE CERO, COMO UN VERDADERO ALQUIMISTA."
            descripcion={`Elegí tus ingredientes favoritos, combiná notas aromáticas y personalizá el frasco a tu gusto.\n\nNuestra plataforma te acompaña paso a paso para que experimentes, explores y crees una fragancia tan única como vos.`}
            botonTexto="EMPEZAR A DISEÑAR"
          />
        </div>

        {/* 2️ Frasco + opciones */}
        <div className="order-2 flex flex-col items-center gap-4">      
          <TipoFraganciaSelector />
        </div>


        {/* 3️ Imagen  */}
        <div className="order-3 flex justify-start">
          <img
            src="/chicoAlquimista.png"
            alt="Ilustración chico"
            className="rounded-xl w-full max-w-sm"
          />
        </div>

        {/* 4️ Test Columna*/}
        <div className="order-4">
          <SeccionTextoConBoton
            titulo="¿NO SABÉS POR DÓNDE EMPEZAR?"
            descripcion={`DEJÁ QUE LA MAGIA TE GUÍE.\n\nNuestro test de aromas te orienta a través de distintas preguntas que te permitirán encontrar los aromas que se adapten a tu esencia, creando tu fórmula perfecta.`}
            botonTexto="QUIERO TOMAR EL TEST"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
