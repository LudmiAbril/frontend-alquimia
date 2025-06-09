"use client";

import { useState } from "react";
import SectionWrapper from "@/components/general/SectionWrapper";
import { faqQuestions } from "@/components/utils/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper className="bg-[var(--hueso)] mb-20">
            <div className="relative z-10 mx-auto px-4 sm:px-6 md:px-8 max-w-6xl">

        <h2 className="text-3xl md:text-4xl font-bold text-[var(--gris4)] mb-10 text-center uppercase">
        Preguntas frecuentes
      </h2>

      <div className="space-y-6">
        {faqQuestions.map((item, index) => (
          <div
            key={index}
            className="rounded-xl bg-white shadow-lg transition-all"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full p-6 flex justify-between items-center text-left text-lg md:text-xl font-semibold hover:bg-[var(--lila)] rounded-xl transition-colors"
            >
              <span className="text-[var(--gris4)]">{item.question}</span>
              <ExpandMoreIcon
                className={`transition-transform duration-300 text-[#9444B6] ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                style={{ fontSize: "28px" }}  
              />
            </button>
            <div
              className={`px-6 overflow-hidden text-base text-gray-600 transition-all duration-300 ${
                openIndex === index
                  ? "max-h-[500px] pb-6 pt-4"  
                  : "max-h-0 pt-0 pb-0"
              }`}
            >
              {openIndex === index && <p className="text-lg md:text-xl">{item.answer}</p>} 
            </div>
          </div>
        ))}
      </div>
      </div>
    </SectionWrapper>
  );
}
