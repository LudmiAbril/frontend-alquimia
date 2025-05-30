import SectionWrapper from "@/components/general/SectionWrapper";
import Image from "next/image";
import { howSteps } from "@/components/utils/utils";
import { StepData } from "@/components/utils/typing";

export default function HowItWorks() {
  return (
    <SectionWrapper className="bg-[#E8E3DE]">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-[var(--gris4)]">
        ¿CÓMO FUNCIONA?
      </h2>

    
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center items-start gap-20">
          {howSteps.map((step: StepData, index: number) => (
            <div key={index} className="flex flex-col items-center text-center max-w-[180px]">
              <div className="w-[180px] h-[180px] rounded-full border-2 border-[#9444B6]  flex items-center justify-center mb-4">
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>

              <p className="text-sm font-medium text-[var(--gris4)] leading-snug italic">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>

       <p className="text-center text-base font-semibold mx-auto mt-[55px] text-[var(--gris4)]">
        No necesitás ser experto, nosotros con Alquimia vamos a guiarte a formular la fragancia perfecta.
      </p>

    </SectionWrapper>
  );
}
