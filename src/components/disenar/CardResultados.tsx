import React, { useState } from "react";
import DownloadIcon from '@mui/icons-material/Download';
const CardResultados = () => {
  const [mostrarDatos, setMostrarDatos] = useState("composicion");

  const visualizar = (
    datos: string
  ): React.MouseEventHandler<HTMLButtonElement> => {
    return (event) => {
      event.preventDefault(); // si necesitas evitar el comportamiento por defecto
      setMostrarDatos(datos);
    };
  };

  return (
    <div className="w-[38rem] h-[44rem] bg-white flex flex-col items-center justify-center p-[41px] rounded-[10px] shadow-md text-center mb-10">
      {/* input nombre y descarga */}
      <div className="flex items-center justify-between w-full pb-4 border-b-1 border-gray-200">
        <input type="text" placeholder="formula" />

        <button>
          <DownloadIcon />
        </button>
      </div>
      {/* contenido intermedio si hay, ocupa el espacio vertical restante */}
      <div className="flex-grow flex items-center justify-center w-full">
        {mostrarDatos === "composicion" && <Composicion />}
        {mostrarDatos === "formula" && <Formula />}
        {mostrarDatos === "pasos" && <Pasos />}
      </div>

      {/* botones */}
      <div className="flex gap-[20px] items-end">
        <button
          className={`${mostrarDatos === "composicion"
            ? "bg-[var(--violeta)]"
            : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
            } bg-[var(--lila)] hover:bg-[var(--violeta)] px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer`}
          onClick={visualizar("composicion")}
        >
          composición
        </button>
        <button
          className={`${mostrarDatos === "formula"
            ? "bg-[var(--violeta)]"
            : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
            } bg-[var(--lila)] hover:bg-[var(--violeta)] px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer"
          onClick={visualizar("formula")`}
          onClick={visualizar("formula")}
        >
          fórmula
        </button>
        <button
          className={`${mostrarDatos === "pasos"
            ? "bg-[var(--violeta)]"
            : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
            } bg-[var(--lila)] hover:bg-[var(--violeta)] px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer"
          onClick={visualizar("pasos")`}
          onClick={visualizar("pasos")}
        >
          paso a paso
        </button>
      </div>
    </div>
  );
};

export default CardResultados;

export const Composicion = () => {
  return (
    <div className="flex flex-col w-full">
      <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">Composición Aromatica</p>
      <div className="mt-10 mb-[4rem]">
        <div className=" px-10 text-center">
          <div className="border-b border-[var(--gris2)] flex justify-between px-6 pb-1 mb-4 uppercase fuente-principal text-[14px] text-[var(--gris3)]"><p>nota</p> <p>escencia</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Fondo</p><p>-</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Corazón</p><p>-</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Salida</p><p>-</p></div>
        </div>
      </div>
      <p className="text-[12px] text-[var(--gris3)]">Intensidad <span className="font-bold">MEDIA</span> (Eau de parfum)</p>
    </div>
  );
};

export const Formula = () => {
  return <>formula</>;
};

export const Pasos = () => {
  return <>pasos</>;
};
