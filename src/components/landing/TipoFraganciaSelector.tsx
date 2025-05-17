import BotonFragancia from "./BotonFragancia";

export default function TipoFraganciaSelector() {
  return (
    <div className="flex flex-col items-center gap-4">
      <img src="/img/frascoIcono.png" alt="Frasco" className="w-[100px]" />
      <p className="text-center font-medium text-sm text-white">
        ¿CUÁL ES TU TIPO DE FRAGANCIA FAVORITA?
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {["FLORAL", "CÍTRICA", "HERBAL", "GOURMAND"].map((tipo) => (
          <BotonFragancia key={tipo} label={tipo} />
        ))}
      </div>
    </div>
  );
}
