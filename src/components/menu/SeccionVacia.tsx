import Button from "@/components/general/Button";
import { SeccionVaciaProps } from "@/components/utils/typing";


export default function SeccionVacia({
  titulo,
  descripcion1,
  descripcion2,
  textoBoton,
  onClick,
}: SeccionVaciaProps) {
    
  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-[var(--gris4)] uppercase pt-6">{titulo}</h2>
      <p className="italic text-gray-500 mb-6">{descripcion1}</p>
      <p className="text-gray-600 mb-9">{descripcion2}</p>
      <Button label={textoBoton} onClick={onClick} />
    </div>
  );
}