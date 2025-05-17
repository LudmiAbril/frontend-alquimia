import SectionWrapper from "@/components/general/SeccionWrapper";
import StepCard from "./Cards";

const pasos = [
  { image: "/steps/seleccionar.png", alt: "Seleccioná", text: "Seleccioná las esencias" },
  { image: "/steps/combinar.png", alt: "Combiná", text: "Combiná las notas" },
  { image: "/steps/diseñar.png", alt: "Diseñá", text: "Diseñá tu packaging" },
  { image: "/steps/provedores.png", alt: "Contactate", text: "Contactate con los proveedores" },
  { image: "/steps/llegar.png", alt: "Recibí", text: "Recibí tus ingredientes" },
];

export default function ComoFunciona() {
  return (
    <SectionWrapper className="bg-[#E8E3DE]">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-[var(--gris4)]">
        ¿CÓMO FUNCIONA?
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {pasos.map((paso, index) => (
          <div key={index} className="flex items-center gap-4">
            <StepCard image={paso.image} alt={paso.alt} text={paso.text} />
            {index !== pasos.length - 1 && (
              <span className="text-[#9444B6] text-3xl">→</span>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-sm font-semibold  mx-auto mt-10">
      Concentrate en tu visión creativa. Nosotros te damos las herramientas para hacerla realidad.
      </p>
    </SectionWrapper>
  );
}
