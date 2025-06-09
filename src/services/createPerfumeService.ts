import { GetFormulaResponse, Intensity, SaveFormulaDTO } from "@/components/Utils/typing";


export const submitFormula = async (payload: SaveFormulaDTO): Promise<number | null> => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5035/creator/save-formula", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
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
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5035/creator/get-formula/${formulaId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error("Error obtener formula.");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error)
        return null
    }
}

export const getIntensities = async (): Promise<Intensity[]> => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5035/creator/intensities", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Error fetching intensities");
    }

    const data = await res.json();
    return data;
};


export const updateFormulaName = async (formulaId: number, newName: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5035/creator/formula/${formulaId}/titulo`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Title: newName }),
        });
        if (!response.ok) {
            throw new Error("Error al actualizar nombre de la fórmula.");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
