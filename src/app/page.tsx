import Hero from "@/components/landing/Hero";
import DiscoverSection from "@/components/landing/DiscoverSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FragranceIntroSection from "@/components/landing/FragranceIntroSection";
import TestIntroSection from "@/components/landing/TestIntroSection";
import SuppliersSection from "@/components/landing/SuppliersSection";
import CustomDesignSection from "@/components/landing/CustomDesignSection";
import FAQAccordion from "@/components/landing/FAQAccordion";
import SupplierCarousel from "@/components/landing/SupplierCarousel";
import MascotaFlotante from "@/components/general/MascotaFlotante";

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
      <FAQAccordion />
      <MascotaFlotante />

    </>
  );
}
