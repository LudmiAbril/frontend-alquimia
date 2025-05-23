import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import SectionWithImage from "@/components/landing/SectionWithImage";
import CustomDesignSection from "@/components/landing/CustomDesignSection";
import SupplierSection from "@/components/landing/SupplierSection";
import FragranceIntroSection from "@/components/landing/FragranceIntroSection";
import FAQAccordion from "@/components/landing/FAQAccordion";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionWithImage
        title="¿POR QUÉ ALQUIMIA?"
        description={`Alquimia nace para que el arte de crear perfumes esté al alcance de todos.
        Diseñamos una experiencia que te permite transformar tus ideas en aromas.`}
        image="/landingImagenes/personasAlquimistas.png"
        alt="Ilustración Alquimia" />

      <HowItWorks />
      <FragranceIntroSection />

      <SectionWithImage
        title="TODOS LOS INSUMOS A TU ALCANCE"
        description="Te conectamos con distintos proveedores registrados en nuestra plataforma, de forma que tendrás acceso a un extenso catálogo de materia prima, como envases, esencias y alcoholes. Contamos con una gran variedad de opciones y precios adecuados para vos."
        image="/landingImagenes/pociones.png"
        alt="Insumos"
        buttonText="QUIERO REGISTRARME" />

      <CustomDesignSection />
      <FAQAccordion />
      <SupplierSection />
    </>
  );
}
