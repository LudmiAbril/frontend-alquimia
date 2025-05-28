import { PropsQuiz } from "../utils/typing";


export default function QuestionHeader({ title, subtitle }: PropsQuiz) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  )
}
