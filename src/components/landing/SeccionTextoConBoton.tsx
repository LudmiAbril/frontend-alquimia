import Button from "@/components/general/Button";

type Props = {
  titulo: string;
  descripcion: string;
  botonTexto: string;
  className?: string;
};

export default function SeccionTextoConBoton({
  titulo,
  descripcion,
  botonTexto,
  className = "",
}: Props) {
  return (
    <div className={`text-white ${className}`}>
      <h2 className="font-bold text-xl md:text-2xl mb-4">{titulo}</h2>
      <p className="text-sm md:text-base mb-6 whitespace-pre-line">{descripcion}</p>
      <Button label={botonTexto}/>
    </div>
  );
}
