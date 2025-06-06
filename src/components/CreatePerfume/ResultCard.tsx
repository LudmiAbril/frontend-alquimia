"use client"

import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Intensity } from "./Library";
import { GetFormulaResponse } from "./FormulaResult";
import { updateFormulaName } from "@/services/createPerfumeService";

interface ResultCardProps {
  perfume: GetFormulaResponse
}
const ResultCard = ({ perfume }: ResultCardProps) => {
  const [dataToShow, setDataToShow] = useState("composition");
  const [editable, setEditable] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);
  const [formulaName, setFormulaName] = useState("Mi fórmula");

  const toggleEnableEdit = () => {
    setEditable((prev) => !prev);
  };

  const handleSubmitName = async (formulaId: number, formulaName: string) => {
    try {
      await updateFormulaName(formulaId, formulaName);
      setUpdateSuccess(true)
      setUpdateMessage("Se actualizo el nombre")
    } catch (error) {
      console.error(error)
      setUpdateSuccess(false)
      setUpdateMessage("Error al actualizar nombre")
    }
  }

  return (
    <div className="w-[38rem] h-[44rem] bg-white flex flex-col items-center justify-center p-[41px] rounded-[10px] shadow-md text-center mb-10">
      {/* input nombre y descarga */}
      <div className="flex items-center justify-between w-full pb-4 border-b-1 border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={formulaName}
            maxLength={20}
            disabled={!editable}
            onChange={(e) => setFormulaName(e.target.value)}
            className={`fuente-principal font-bold text-[20px] text-[var(--gris3)] border-b border-gray-400 outline-none transition-all uppercase 
    ${editable ? "cursor-text" : "border-transparent bg-transparent cursor-default"}
  `}
          />
          {editable ?
            (<button onClick={() => handleSubmitName(perfume.Id, formulaName)}>
              <CheckCircleIcon
                sx={{ color: "var(--gris3)", cursor: "pointer" }}
                onClick={toggleEnableEdit}
              />
            </button>)
            : (<>
              <EditIcon
                sx={{ color: "var(--gris3)", cursor: "pointer" }}
                onClick={toggleEnableEdit}
              /> {updateMessage && (
                <p className={`${updateSuccess ? "text-lime-600" : "text-red-600"}`}>
                  {updateMessage}
                </p>
              )}
            </>)}
        </div>

        <DownloadIcon sx={{ color: "var(--gris3)", cursor: "pointer" }} />

      </div>
      {/* contenido intermedio si hay, ocupa el espacio vertical restante */}
      <div className="flex-grow flex items-center justify-center">
        {dataToShow === "composition" && <Composition perfume={perfume} />}
        {dataToShow === "formula" && <Formula perfume={perfume} />}
        {dataToShow === "steps" && <Steps />}
      </div>

      {/* botones */}
      <div className="flex gap-[20px] items-end">
        <button
          className={`${dataToShow === "composition"
            ? "bg-[var(--violeta)]"
            : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
            } bg-[var(--lila)] hover:bg-[var(--violeta)] px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer`}
          onClick={() => setDataToShow("composition")}
        >
          composición
        </button>
        <button
          className={`${dataToShow === "formula"
            ? "bg-[var(--violeta)]"
            : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
            } bg-[var(--lila)] hover:bg-[var(--violeta)] px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer"
          onClick={visualizar("formula")`}
          onClick={() => setDataToShow("formula")}
        >
          fórmula
        </button>
        <button
          className={`${dataToShow === "steps"
            ? "bg-[var(--violeta)]"
            : "bg-[var(--lila)] hover:bg-[var(--violeta)]"
            } bg-[var(--lila)] hover:bg-[var(--violeta)] px-8 py-2 rounded-[10px] text-white text-xs mt-[3rem] uppercase cursor-pointer"
          onClick={visualizar("pasos")`}
          onClick={() => setDataToShow("steps")}
        >
          paso a paso
        </button>
      </div>
    </div>
  );
};

export default ResultCard;

export interface perfumeData {
  baseNotes: Note[],
  heartNotes: Note[],
  topNotes: Note[],
  intensity: Intensity
}

export interface Note {
  id: number;
  name: string
}


// COMPONENTES SECUNDARIOS
interface CompositionProps {
  perfume: GetFormulaResponse
}

export const Composition = ({ perfume }: CompositionProps) => {
  return (
    <div className="flex flex-col w-[38rem]">
      <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">Composición Aromática</p>
      <div className="mt-10 mb-[4rem]">
        <div className=" px-10 text-center">
          <div className="border-b border-[var(--gris2)] flex justify-between px-6 pb-1 mb-4 uppercase fuente-principal text-[14px] text-[var(--gris3)]"><p>nota</p> <p>esencia</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Fondo</p>  <p>
            {Object.values(perfume.NotasFondoIds || {})
              .filter((note) => note !== null)
              .map((note) => note!.Name)
              .join(', ')}
          </p></div>
          <div className="flex justify-between mb-4 px-6"><p>Corazón</p>  <p>
            {Object.values(perfume.NotasCorazonIds || {})
              .filter((note) => note !== null)
              .map((note) => note!.Name)
              .join(', ')}
          </p></div>
          <div className="flex justify-between mb-4 px-6"><p>Salida</p>  <p>
            {Object.values(perfume.NotasSalidaIds || {})
              .filter((note) => note !== null)
              .map((note) => note!.Name)
              .join(', ')}
          </p></div>
        </div>
      </div>
      <p className="text-[12px] text-[var(--gris3)]">Intensidad <span className="font-bold uppercase">{perfume.Intensity.Name}</span> ({perfume.Intensity.Category})</p>
    </div>
  );
};

interface FormulaProps {
  perfume: GetFormulaResponse
}

export const Formula = ({ perfume }: FormulaProps) => {

  return (
    <div className="flex flex-col w-[38rem]">
      <p className="fuente-principal text-[var(--gris4)] uppercase text-[20px]">Fórmula</p>
      <div className="mt-10 ">
        <div className=" px-10 text-center">
          <div className="border-b border-[var(--gris2)] flex justify-between px-6 pb-1 mb-4 uppercase fuente-principal text-[14px] text-[var(--gris3)]"><p>componente</p> <p>cantidad</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Concentracion de escencia</p><p>{perfume.ConcentracionEsencia}%</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Alcohol Etílico</p><p>{perfume.ConcentracionAlcohol}%</p></div>
          <div className="flex justify-between mb-4 px-6"><p>Agua Destilada</p><p>{perfume.ConcentracionAgua}%</p></div>
        </div>
      </div>
    </div>
  );
};

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
