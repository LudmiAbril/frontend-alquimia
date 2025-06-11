import { AnswerDTO, QuestionDTO, FamilyResult, VisualType } from "@/components/utils/typing"

const visualMap: Record<number, VisualType> = {
    1: "bubbles",
    2: "two",
    3: "cards",
    4: "grid",
    5: "cards",
    6: "cards",
    7: "list",
    8: "cards",
    9: "grid",
    10: "cards"
};

const QUESTIONS_URL = "http://localhost:5035/quiz/questions";
const RESULT_URL = "http://localhost:5035/quiz/result";


export const fetchQuestions = async (): Promise<QuestionDTO[]> => {
    const res = await fetch(QUESTIONS_URL);
    const data: QuestionDTO[] = await res.json();
    return data.map((q) => ({
        ...q,
        VisualType: visualMap[q.Id] || "cards",
    }));
};


export const buildAnswer = (
    questionId: number,
    selectedOption: string
): AnswerDTO => ({
    questionId: questionId,
    selectedOption,
});


export const fetchQuizResult = async (answers: AnswerDTO[]): Promise<FamilyResult> => {

    const normalizedAnswers = answers.map((a) => {
        if (a.questionId === 10) {
            const map: Record<string, string> = {
                A: "1",
                B: "2",
                C: "3",
                D: "4",
            };
            return {
                ...a,
                selectedOption: map[a.selectedOption.toUpperCase()] || "1", // default: Body Splash
            };
        }
        return a;
    });

    const response = await fetch(RESULT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(normalizedAnswers),
    });

    if (!response.ok) {
        throw new Error("No se pudo obtener el resultado del test.");
    }

    const data = await response.json();

    return {
        nombre: data.SuperFamily,
        descripcion: `Tu perfil olfativo es ${data.SuperFamily}.\nSubfamilias: ${data.AllSubFamilies.join(", ")}`,
        imagen: null,
        formulas: data.Formulas,
        subfamilias: data.AllSubFamilies,
        concentracion: data.ConcentrationType,
    };
};

export const addOrUpdateAnswer = (
    answers: AnswerDTO[],
    questionId: number,
    selectedOption: string
): AnswerDTO[] => {
    return [
        ...answers.filter((a) => a.questionId !== questionId),
        { questionId, selectedOption },
    ];
};