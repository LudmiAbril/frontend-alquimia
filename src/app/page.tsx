"use client";

import Hero from "@/components/landing/Hero";
import DiscoverSection from "@/components/landing/DiscoverSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FragranceIntroSection from "@/components/landing/FragranceIntroSection";
import TestIntroSection from "@/components/landing/TestIntroSection";
import SuppliersSection from "@/components/landing/SuppliersSection";
import CustomDesignSection from "@/components/landing/CustomDesignSection";
import FAQAccordion from "@/components/landing/FAQAccordion";
import FloatingMascot from "@/components/General/MascotaFlotante";
import { messagesLanding } from "@/components/utils/utils";

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
