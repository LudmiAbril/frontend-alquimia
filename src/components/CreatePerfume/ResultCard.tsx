"use client";

import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { updateFormulaName } from "@/services/createPerfumeService";
import PreparationSteps from "./PreparationSteps";
import { Formula } from "./Formula";
import { Composition } from "./Composition";
import { useCreatePerfumeStore } from "@/store/CreatePerfumeStore";

const ResultCard = () => {
  const {
    resultFormula,
  } = useCreatePerfumeStore();

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
            (<button onClick={() => handleSubmitName(resultFormula.Id, formulaName)}>
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
      <div className="flex-grow flex items-center justify-center">
        {dataToShow === "composition" && <Composition />}
        {dataToShow === "formula" && <Formula />}
        {dataToShow === "steps" && <PreparationSteps />}
      </div>

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