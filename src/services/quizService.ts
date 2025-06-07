
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

export const simulateResult = (): Promise<FamilyResult> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        nombre: "Aromática",
        descripcion: "Fresca, limpia y natural",
        imagen: null,
      })
    }, 1500)
  })
