import SectionWrapper from "@/components/general/SeccionWrapper";

export default function PorqueAlquimia() {
  return (
    <SectionWrapper className="bg-[#E8E3DE]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="max-w-[520px]">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿POR QUÉ ALQUIMIA?</h2>
          <p className="text-base md:text-lg mb-2">
            Alquimia nace para que el arte de crear perfumes esté al alcance de todos.
          </p>
          <p className="text-base md:text-lg">
            Diseñamos una experiencia que te permite transformar tus ideas en aromas.
          </p>
        </div>

        <div className="flex justify-end">
          <img
            src="/chicoAlquimista.png"
            alt="Ilustración Alquimia"
            className="w-full max-w-[400px] rounded-xl"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
