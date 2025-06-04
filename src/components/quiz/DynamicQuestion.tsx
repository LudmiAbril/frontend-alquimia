
import {  PropsDynamic } from "@/components/utils/typing"
import OptionGrid from "./visual/OptionGrid"
import OptionList from "./visual/OptionList"
import OptionCard from "./visual/OptionCard"
import OptionBubble from "./visual/OptionBubble"
import OptionButtons from "./visual/OptionButtons"



const overrideMap: Record<number, string> = {
  1: "bubbles",
  2: "cards",
  3: "buttons",
  4: "list",
5:"cards",
6:"buttons",
7:"bubbles",
8:"cards",
9:"buttons",
10:"grid"
}

export default function DynamicQuestion({ question, selectedOption, onSelect }: PropsDynamic) {
  const visualType = overrideMap[Number(question.Id)] || question.VisualType
console.log("Pregunta ID:", question.Id)
console.log("Componente a renderizar:", visualType)
  switch (visualType) {
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
