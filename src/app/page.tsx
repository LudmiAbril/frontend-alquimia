"use client";

import Hero from "@/components/landing/Hero";
import DiscoverSection from "@/components/landing/DiscoverSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FragranceIntroSection from "@/components/landing/FragranceIntroSection";
import TestIntroSection from "@/components/landing/TestIntroSection";
import SuppliersSection from "@/components/landing/SuppliersSection";
import CustomDesignSection from "@/components/landing/CustomDesignSection";
import FAQAccordion from "@/components/landing/FAQAccordion";
import FloatingMascot from "@/components/general/MascotaFlotante";
import { messagesLanding } from "@/components/utils/utils";

export default function Home() {
  return (
    <>
      <Hero />
      <DiscoverSection />
      <HowItWorks />
      <FragranceIntroSection />
      <TestIntroSection />
      <SuppliersSection />
      <CustomDesignSection />
      
      <div className="flex items-center justify-center my-16">
        <div className="h-px bg-[var(--violeta)] w-1/3" />
        <div className="mx-4 w-[10px]" /> 
        <div className="h-px bg-[var(--violeta)] w-1/3" />
      </div>

      <FAQAccordion />
      <FloatingMascot
        messages={messagesLanding}
        imageSrc="/Quimi/quimiLanding.png"
      />
    </>
  );
}
