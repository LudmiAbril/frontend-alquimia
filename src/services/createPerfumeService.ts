import { GetFormulaResponse, SaveFormulaDTO } from "@/components/CreatePerfume/FormulaResult";
import { Intensity } from "@/components/CreatePerfume/Library";

export const submitFormula = async (payload: SaveFormulaDTO): Promise<number | null> => {
    try {
        const response = await fetch("http://localhost:5035/creator/save-formula", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Error al guardar formula.");
        const data = await response.json();
        return data.formulaId;
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getFormulaById = async (formulaId: number): Promise<GetFormulaResponse | null> => {
    try {
        const response = await fetch(`http://localhost:5035/creator/get-formula/${formulaId}`);
        if (!response.ok) throw new Error("Error obtener formula.");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getIntensities = async (): Promise<Intensity[]> => {
    const res = await fetch("http://localhost:5035/creator/intensities");
    const data = await res.json();
    return data;
}

export const updateFormulaName = async (formulaId: number, newName: string) => {
    try {
        const response = await fetch(`http://localhost:5035/creator/formula/${formulaId}/titulo}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newName),
        });
        if (!response.ok) throw new Error("Error al actualizar nombre de la formula.");
    } catch (error) {
        console.error(error)
    }
}