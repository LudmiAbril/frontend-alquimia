"use client";

import Hero from "@/components/Landing/Hero";
import DiscoverSection from "@/components/Landing/DiscoverSection";
import HowItWorks from "@/components/Landing/HowItWorks";
import FragranceIntroSection from "@/components/Landing/FragranceIntroSection";
import TestIntroSection from "@/components/Landing/TestIntroSection";
import SuppliersSection from "@/components/Landing/SuppliersSection";
import CustomDesignSection from "@/components/Landing/CustomDesignSection";
import FAQAccordion from "@/components/Landing/FAQAccordion";
import FloatingMascot from "@/components/General/MascotaFlotante";
import { messagesLanding } from "@/components/Utils/utils";

export default function Home() {
  return (
    <>
      <Hero />
      <DiscoverSection />
      <HowItWorks />
      <FragranceIntroSection />
      <TestIntroSection />
      <CustomDesignSection />
      <SuppliersSection />
      <FAQAccordion />
      <FloatingMascot
        messages={messagesLanding}
        imageSrc="/quimi/quimiLanding.png"
      />
    </>
  );
}
