import { useSearchParams } from "next/navigation";

  
  
  export default function FormulaQUiz(){ 
  const params = useSearchParams();

  const topNote = params.get("top");
  const heartNote = params.get("heart");
  const baseNote = params.get("base");
  const concentration = params.get("type");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center text-gray-700">
      <h1 className="text-3xl font-bold text-[var(--violeta)] mb-4">Tu fórmula recomendada</h1>

      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6 w-full max-w-md shadow">
        <p className="text-sm mb-2 text-gray-600">Tipo de concentración:</p>
        <p className="text-lg font-semibold mb-4">{concentration}</p>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div>
            <p className="font-bold text-purple-600">Nota de Salida</p>
            <p>{topNote}</p>
          </div>
          <div>
            <p className="font-bold text-purple-600">Nota de Corazón</p>
            <p>{heartNote}</p>
          </div>
          <div>
            <p className="font-bold text-purple-600">Nota de Fondo</p>
            <p>{baseNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
   }