import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const CardResultados = () => {
  const [mostrarDatos, setMostrarDatos] = useState("composicion");
  const [editable, setEditable] = useState(false);

  const toggleEnableEdit = () => {
    setEditable((prev) => !prev);
  };
  const visualizar = (
    datos: string
  ): React.MouseEventHandler<HTMLButtonElement> => {
    return (event) => {
      event.preventDefault();
      setMostrarDatos(datos);
    };
  };
  // falta variable x cada tamaño ml y seleccion card instensidad (que quede seleccionada)
  return (
    <div className="w-[38rem] h-[44rem] bg-white flex flex-col items-center justify-center p-[41px] rounded-[10px] shadow-md text-center mb-10">
      {/* input nombre y descarga */}
      <div className="flex items-center justify-between w-full pb-4 border-b-1 border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            defaultValue="Fresca dulzura"
            disabled={!editable}
            className={`fuente-principal font-bold text-[20px] text-[var(--gris3)] border-b border-gray-400 outline-none transition-all uppercase 
    ${editable ? "cursor-text" : "border-transparent bg-transparent cursor-default"}
  `}
          />
          {editable ? (<CheckCircleIcon
            sx={{ color: "var(--gris3)", cursor: "pointer" }}
            onClick={toggleEnableEdit}
          />) : (<EditIcon
            sx={{ color: "var(--gris3)", cursor: "pointer" }}
            onClick={toggleEnableEdit}
          />)}
        </div>

        <DownloadIcon sx={{ color: "var(--gris3)", cursor: "pointer" }} />

      </div>
      {/* contenido intermedio si hay, ocupa el espacio vertical restante */}
      <div className="flex-grow flex items-center justify-center">
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
    <div className="flex flex-col w-[38rem]">
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
  return (
    <div className="flex flex-col w-[38rem]">
      <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">Fórmula</p>
      <div className="mt-10 ">
        <div className=" px-10 text-center">
          <div className="border-b border-[var(--gris2)] flex justify-between px-6 pb-1 mb-4 uppercase fuente-principal text-[14px] text-[var(--gris3)]"><p>componente</p> <p>cantidad</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Mezcla aromatica de notas base</p><p>-</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Mezcla aromatica de notas de corazón</p><p>-</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Mezcla aromatica de notas de salida</p><p>-</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Alcohol Etílico</p><p>-</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Agua Destilada</p><p>-</p></div>
        </div>
      </div>
    </div>
  );
};

export const Pasos = () => {
  return (
    <div className=" w-[38rem]">
      <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">pasos para construir tu perfume</p>
      <div className="mt-10 flex flex-col items-left justify-center ml-[2rem] text-[14px] text-[var(--gris4)]">
        <div className="flex justify-between mb-6 px-6"><p>1. En tu recipiente, mezclá las  <span className="font-bold">esencias</span> según el porcentaje indicado en la tabla.</p></div>
        <div className="flex justify-between mb-6 px-6"><p>2. Diluir la mezcla con el porcentaje indicado de <span className="font-bold">alcohol etílico + agua destilada.</span></p></div>
        <div className="flex justify-between mb-6 px-6"><p>3. Dejar <span className="font-bold">macerar</span> la mezcla entre 1 a 3 días.</p></div>
        <div className="flex justify-between mb-6 px-6"><p>4. tu fragancia ya está lista para usarse!</p></div>
      </div>
    </div>
  );
};
