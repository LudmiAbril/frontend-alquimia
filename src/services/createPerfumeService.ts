import { SaveFormulaDTO } from "@/components/CreatePerfume/FormulaResult";
import { Intensity } from "@/components/CreatePerfume/Library";

export const submitFormula = async (payload: SaveFormulaDTO) => {
    try {
        const response = await fetch("http://localhost:5035/creator/save-formula", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error("Error al guardar formula.");
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}

export const getIntensities = async (): Promise<Intensity[]> => {
    const res = await fetch("http://localhost:5035/creator/intensities");
    const data = await res.json();
    return data;
}