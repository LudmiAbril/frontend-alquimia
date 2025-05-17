import SectionWrapper from "@/components/general/SeccionWrapper";
import SeccionTextoConBoton from "./SeccionTextoConBoton";
import TipoFraganciaSelector from "./TipoFraganciaSelector";
import TestOlfativo from "./TestOlfativo";

export default function SeccionInicioFragrancia() {
  return (
<SectionWrapper className="bg-[#D9B6E2] rounded-tl-[15rem] rounded-tr-[15rem]">
<div className="grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-10">

   {/* 4️ Test */}
<div className="order-4">
  <SeccionTextoConBoton
    titulo="¿NO SABÉS POR DÓNDE EMPEZAR?"
    descripcion={`DEJÁ QUE LA MAGIA TE GUÍE.\n\nNuestro test de aromas te orienta a través de distintas preguntas que te permitirán encontrar los aromas que se adapten a tu esencia, creando tu fórmula perfecta.`}
    botonTexto="QUIERO TOMAR EL TEST"
  />
</div>

    
       {/* 4️ Test dinámico con animación */}
<div className="order-4">
  <TestOlfativo />
</div>

      </div>
    </SectionWrapper>
  );
}
