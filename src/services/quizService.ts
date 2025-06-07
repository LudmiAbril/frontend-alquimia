
import { AnswerDTO, QuestionDTO, FamilyResult, VisualType } from "@/components/utils/typing"

const visualMap: Record<number, VisualType> = {
  1: "cards", 2: "grid", 3: "list", 4: "bubbles", 5: "cards",
  6: "buttons", 7: "grid", 8: "cards", 9: "list", 10: "bubbles",
}

const URL = "http://localhost:5035/quiz/questions"

export const fetchQuestions = async (): Promise<QuestionDTO[]> => {
  const res = await fetch(URL)
  const data: QuestionDTO[] = await res.json()
  return data.map((q) => ({
    ...q,
    VisualType: visualMap[q.Id] || "cards",
  }))
}

export const buildAnswer = (
  questionId: number,
  selectedOption: string
): AnswerDTO => ({
  preguntaId: questionId,
  selectedOption,
})
const RESULT_URL = "http://localhost:5035/quiz/result"

export const fetchQuizResult = async (answers: AnswerDTO[]): Promise<FamilyResult> => {
  const response = await fetch(RESULT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answers),
  })

  if (!response.ok) {
    throw new Error("No se pudo obtener el resultado del test.")
  }

  const data = await response.json()

  return {
    nombre: data.SuperFamily,
    descripcion: `Tu perfil olfativo es ${data.SuperFamily}.\nSubfamilias: ${data.AllSubFamilies.join(", ")}`,
    imagen: null, 
    formulas: data.Formulas,
    subfamilias: data.AllSubFamilies,
    concentracion: data.ConcentrationType,
  }
}
