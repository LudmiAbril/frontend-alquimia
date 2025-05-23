import Button from "@/components/general/Button";

export default function IntroDesign() {
  return (
    <div>
      <h2 className="text-white font-bold text-xl md:text-2xl mb-4">
        DISEÑÁ TU FRAGANCIA DESDE CERO, COMO UN VERDADERO ALQUIMISTA.
      </h2>
      <p className="text-white text-sm md:text-base mb-6">
        Elegí tus ingredientes favoritos, combiná notas aromáticas y personalizá el frasco a tu gusto.
        <br /><br />
        Nuestra plataforma te acompaña paso a paso para que experimentes, explores y crees una fragancia tan única como vos.
      </p>

      <Button label={"EMPEZAR A DISEÑAR"} />
    </div>
  );
}
