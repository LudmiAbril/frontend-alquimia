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
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[var(--gris4)] uppercase">
        Preguntas frecuentes
      </h2>

      <div className="space-y-4">
        {faqQuestions.map((item, index) => (
          <div
            key={index}
            className="rounded-xl bg-white shadow-sm transition-all"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full p-5 flex justify-between items-center text-left text-[#444] font-semibold hover:bg-[var(--lila)] rounded-xl transition-colors"
            >
              <span>{item.question}</span>
              <ExpandMoreIcon
                className={`transition-transform duration-300 text-[#9444B6] ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                style={{ fontSize: "20px" }}
              />
            </button>
            <div
              className={`px-5 overflow-hidden text-sm text-gray-600 transition-all duration-300 ${
                openIndex === index
                  ? "max-h-[300px] pb-4 pt-3"
                  : "max-h-0 pt-0 pb-0"
              }`}
            >
              {openIndex === index && item.answer}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
