import SectionWrapper from "@/components/general/SeccionWrapper";

export default function SeccionHechoAMedida() {
  return (
    <SectionWrapper className="bg-[#CBA9D7]">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 flex justify-center">
          <img
            src="/landingImagenes/DiseñoSeccion.png"
            alt="Frasco personalizado"
            className="w-full max-w-[300px] rounded-full"
          />
        </div>

        <div className="flex-1 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--gris4)]">HECHO A TU MEDIDA</h2>
          <p className="text-base md:text-lg whitespace-pre-line">
            Dale tu sello personal al frasco.
            Elegí los colores, formas y tipografías que mejor representen tu estilo.
            Nosotros nos encargamos de conectarte con proveedores que harán realidad tu diseño.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
