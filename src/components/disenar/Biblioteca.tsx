"use client";
import React, { useState , useEffect} from "react";
import { obtenerNotasPorPaso } from "../../services/notaService";

interface Biblioteca {
  pasoActual: number;
  onConfirm: () => void;
}
const Biblioteca = ({ pasoActual, onConfirm }: Biblioteca) => {
  const seleccionDeNotas = pasoActual >= 1 && pasoActual <= 3;

  const titulo = seleccionDeNotas ? "Biblioteca de notas" : "Intensidad";
  const subtitulo = seleccionDeNotas
    ? "Arrastrá una nota de fondo al frasco para dar el primer soplo de tu fragancia."
    : "Elige un tipo de intensidad para tu perfume.";

  return (
    <div className="w-[38rem] h-[44rem] bg-white flex flex-col items-center p-[2.31rem] rounded-[10px] shadow-md text-center mb-10">
      <p className="fuente-principal uppercase text-[20px] text-[var(--gris3)] mb-4 font-extrabold">
        {titulo}
      </p>
      <p className="italic mb-4 w-[527px] text-[var(--gris4)] text-[14px]">
        {subtitulo}
      </p>
      {/*buscador */}
      {seleccionDeNotas === true && (
        <div className="flex w-full gap-2">
          <input
            type="text"
            className="border border-black rounded-[10px] w-full p-1"
          />
          <button className="bg-[var(--violeta)] px-8 rounded-[10px] text-white text-xs">
            FILTROS
          </button>
        </div>
      )}

      {/* caja de notas */}
      <div className="max-h-full w-full">
        {/* una x cada familia olfativa, ver como se renderizara esto con el handle filterchange... */}
        {seleccionDeNotas ? (
          <ContenedorNotas paso = {pasoActual}/>
        ) : (
          <ContenedorIntensidades onConfirm={onConfirm} />
        )}
      </div>
    </div>
  );
};

export default Biblioteca;
 
interface Nota {
  id: number;
  nombre: string;
}

interface FamiliaNotas {
  familia: string;
  notas: Nota[];
}

export const ContenedorNotas = ({ paso }: { paso: number }) => {
  const [notasPorFamilia, setNotasPorFamilia] = useState<FamiliaNotas[]>([]);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const data = await obtenerNotasPorPaso(paso);
        const notasReducidas = data.map((item: any) => ({
        familia: item.Familia,
        notas: item.Notas?.map((n: any) => ({
        id: n.Id,
        nombre: n.Nombre,
  })) ?? [], // Previene error si Notas es undefined
}));

        setNotasPorFamilia(notasReducidas);
      } catch (error) {
        console.error("Error al obtener notas:", error);
      }
    };
    fetchNotas();
  }, [paso]);

  return (
    <div className="overflow-y-scroll max-h-[31rem] mt-6 w-full flex flex-col">
      {notasPorFamilia.map(({ familia, notas }) => (
        <div key={familia} className="flex flex-col mb-[2.43rem]">
          {/* Título de familia con estilo original */}
          <div className="flex items-center gap-2 mb-2 fuente-principal">
            <p className="text-[var(--gris3)] text-[20px] font-medium">
              {familia}
            </p>
            <span className="text-xs bg-[var(--gris3)] rounded-full px-2 py-0.5 text-white font-bold">i</span>
          </div>

          {/* Notas en botones estilizados pero sin imagen */}
          <div className="w-100 flex flex-wrap gap-[25px]">
            {notas.map((nota) => (
              <div
                key={nota.id}
                className="cursor-default bg-[#E2708A] hover:bg-[#DD4568] transition-colors duration-100 w-[80px] h-[80px] flex items-center justify-center rounded-[10px] text-white p-[16px] shadow-md shadow-gray-400 text-center text-[12px] font-semibold"
              >
                {nota.nombre}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};



interface ContenedorIntensidadesProps {
  onConfirm: () => void;
}
export const ContenedorIntensidades = ({
  onConfirm,
}: ContenedorIntensidadesProps) => {
  const intensidades = [
    {
      nombre: "Baja",
      tipo: "Body Splash",
      descripcion: "dura alrededor de 1-3 horas y tiene poca proyección",
    },
    {
      nombre: "Media",
      tipo: "Eau De Toilette",
      descripcion: "dura alrededor de 3-5 horas y tiene buena proyección",
    },
    {
      nombre: "Alta",
      tipo: "Eau De Parfum",
      descripcion: "dura alrededor de 5-8 horas y tiene buena proyección.",
    },
  ];
  return (
    <div className="mt-[3rem]">
      <div className="flex flex-col gap-[46px] items-center text-white">
        {intensidades.map((intensidad, key) => (
          <div
            key={key}
            className=" w-[430px] h-[103px] rounded-[10px] cursor-pointer bg-[var(--lila)] hover:bg-[var(--violeta)] flex flex-col items-center justify-center transition"
          >
            <p className="fuente-principal uppercase font-bold text-[20px] mb-2">
              {intensidad.nombre}- {intensidad.tipo}
            </p>
            <p className="text-[14px]">{intensidad.descripcion}</p>
          </div>
        ))}
      </div>
      <button
        className="bg-[var(--violeta)] px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer"
        onClick={onConfirm}
      >
        confirmar
      </button>
    </div>
  );
};
