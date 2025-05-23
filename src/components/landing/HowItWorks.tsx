import SectionWrapper from "@/components/general/SectionWrapper";
import StepCard from "./StepCard";
import { creationSteps } from "@/components/utils/utils";

export default function HowItWorks() {
  return (
    <SectionWrapper className="bg-[#E8E3DE]">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-[var(--gris4)]">
        ¿CÓMO FUNCIONA?
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {creationSteps.map((step, index) => (
          <div key={index} className="flex items-center gap-4">
            <StepCard image={step.image} alt={step.alt} text={step.text} />
            {index !== creationSteps.length - 1 && (
              <span className="text-[#9444B6] text-3xl">→</span>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-sm font-semibold mx-auto mt-10">
        Concentrate en tu visión creativa. Nosotros te damos las herramientas para hacerla realidad.
      </p>
    </SectionWrapper>
  );
}
