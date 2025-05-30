
import { QuestionDTO, OptionDTO } from "@/components/utils/typing"
import OptionGrid from "./visual/OptionGrid"
import OptionList from "./visual/OptionList"
import OptionCard from "./visual/OptionCard"
import OptionBubble from "./visual/OptionBubble"
import OptionButtons from "./visual/OptionButtons"

interface Props {
  question: QuestionDTO
  selectedOption: string
  onSelect: (option: string) => void
}

export default function DynamicQuestion({ question, selectedOption, onSelect }: Props) {
  switch (question.VisualType) {
    case "grid":
      return <OptionGrid question={question} selectedOption={selectedOption} onSelect={onSelect} />
        case "bubbles":
      return <OptionBubble question={question} selectedOption={selectedOption} onSelect={onSelect} />
         case "buttons":
      return <OptionButtons question={question} selectedOption={selectedOption} onSelect={onSelect} />
    case "list":
      return <OptionList question={question} selectedOption={selectedOption} onSelect={onSelect} />
    default:
      return <OptionCard question={question} selectedOption={selectedOption} onSelect={onSelect} />
  }
}
