import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ResultCard = () => {
  const [visibleSection, setVisibleSection] = useState<"composition" | "formula" | "steps">("composition");
  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => setIsEditable((prev) => !prev);

  const handleView = (section: "composition" | "formula" | "steps") => () => {
    setVisibleSection(section);
  };

  return (
    <div className="w-[38rem] h-[44rem] bg-white flex flex-col items-center justify-center p-[41px] rounded-[10px] shadow-md text-center mb-10">
      {/* Título editable y botón de descarga */}
      <div className="flex items-center justify-between w-full pb-4 border-b-1 border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            defaultValue="Fresca dulzura"
            disabled={!isEditable}
            className={`fuente-principal font-bold text-[20px] text-[var(--gris3)] border-b border-gray-400 outline-none transition-all uppercase 
              ${isEditable ? "cursor-text" : "border-transparent bg-transparent cursor-default"}
            `}
          />
          {isEditable ? (
            <CheckCircleIcon
              sx={{ color: "var(--gris3)", cursor: "pointer" }}
              onClick={toggleEdit}
            />
          ) : (
            <EditIcon
              sx={{ color: "var(--gris3)", cursor: "pointer" }}
              onClick={toggleEdit}
            />
          )}
        </div>
        <DownloadIcon sx={{ color: "var(--gris3)", cursor: "pointer" }} />
      </div>

      {/* Contenido dinámico */}
      <div className="flex-grow flex items-center justify-center">
        {visibleSection === "composition" && <Composition />}
        {visibleSection === "formula" && <Formula />}
        {visibleSection === "steps" && <Steps />}
      </div>

      {/* Botones de navegación */}
      <div className="flex gap-[20px] items-end">
        <button
          className={`${
            visibleSection === "composition"
              ? "bg-[var(--violeta)]"
              : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
          } px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer`}
          onClick={handleView("composition")}
        >
          composición
        </button>

        <button
          className={`${
            visibleSection === "formula"
              ? "bg-[var(--violeta)]"
              : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
          } px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer`}
          onClick={handleView("formula")}
        >
          fórmula
        </button>

        <button
          className={`${
            visibleSection === "steps"
              ? "bg-[var(--violeta)]"
              : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
          } px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer`}
          onClick={handleView("steps")}
        >
          paso a paso
        </button>
      </div>
    </div>
  );
};

export default ResultCard;

// COMPONENTES SECUNDARIOS

export const Composition = () => (
  <div className="flex flex-col w-[38rem]">
    <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">Composición Aromática</p>
    <div className="mt-10 mb-[4rem]">
      <div className="px-10 text-center">
        <div className="border-b border-[var(--gris2)] flex justify-between px-6 pb-1 mb-4 uppercase fuente-principal text-[14px] text-[var(--gris3)]">
          <p>nota</p> <p>esencia</p>
        </div>
        <div className="flex justify-between mb-4 px-6"><p>Fondo</p><p>-</p></div>
        <div className="flex justify-between mb-4 px-6"><p>Corazón</p><p>-</p></div>
        <div className="flex justify-between mb-4 px-6"><p>Salida</p><p>-</p></div>
      </div>
    </div>
    <p className="text-[12px] text-[var(--gris3)]">
      Intensidad <span className="font-bold">MEDIA</span> (Eau de parfum)
    </p>
  </div>
);

export const Formula = () => (
  <div className="flex flex-col w-[38rem]">
    <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">Fórmula</p>
    <div className="mt-10">
      <div className="px-10 text-center">
        <div className="border-b border-[var(--gris2)] flex justify-between px-6 pb-1 mb-4 uppercase fuente-principal text-[14px] text-[var(--gris3)]">
          <p>componente</p> <p>cantidad</p>
        </div>
        <div className="flex justify-between mb-4 px-6"><p>Mezcla aromática de notas base</p><p>-</p></div>
        <div className="flex justify-between mb-4 px-6"><p>Mezcla aromática de notas de corazón</p><p>-</p></div>
        <div className="flex justify-between mb-4 px-6"><p>Mezcla aromática de notas de salida</p><p>-</p></div>
        <div className="flex justify-between mb-4 px-6"><p>Alcohol Etílico</p><p>-</p></div>
        <div className="flex justify-between mb-4 px-6"><p>Agua Destilada</p><p>-</p></div>
      </div>
    </div>
  </div>
);

export const Steps = () => (
  <div className="w-[38rem]">
    <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">Pasos para construir tu perfume</p>
    <div className="mt-10 flex flex-col items-left justify-center ml-[2rem] text-[14px] text-[var(--gris4)]">
      <div className="flex justify-between mb-6 px-6">
        <p>
          1. En tu recipiente, mezclá las <span className="font-bold">esencias</span> según el porcentaje indicado en la tabla.
        </p>
      </div>
      <div className="flex justify-between mb-6 px-6">
        <p>
          2. Diluir la mezcla con el porcentaje indicado de <span className="font-bold">alcohol etílico + agua destilada.</span>
        </p>
      </div>
      <div className="flex justify-between mb-6 px-6">
        <p>
          3. Dejar <span className="font-bold">macerar</span> la mezcla entre 1 a 3 días.
        </p>
      </div>
      <div className="flex justify-between mb-6 px-6">
        <p>4. Tu fragancia ya está lista para usarse!</p>
      </div>
    </div>
  </div>
);
