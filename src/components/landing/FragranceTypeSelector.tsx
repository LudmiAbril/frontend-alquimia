import FragranceButton from "./FragranceButton";

export default function FragranceTypeSelector() {
  return (
    <div className="flex flex-col items-center gap-4">
      <img src="/img/frascoIcono.png" alt="Frasco" className="w-[100px]" />
      <p className="text-center font-medium text-sm text-white">
        ¿CUÁL ES TU TIPO DE FRAGANCIA FAVORITA?
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {["FLORAL", "CÍTRICA", "HERBAL", "GOURMAND"].map((type) => (
          <FragranceButton key={type} label={type} />
        ))}
      </div>
    </div>
  );
}
