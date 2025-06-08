
import {  PropsDynamic } from "@/components/utils/typing"
import OptionGrid from "./visual/OptionGrid"
import OptionList from "./visual/OptionList"
import OptionCard from "./visual/OptionCard"
import OptionBubble from "./visual/OptionBubble"
import OptionTwo from "./visual/OptionTwo"



const overrideMap: Record<number, string> = {
  1: "bubbles",
  2: "two",
  3: "cards",
  4: "cards",
5:"cards",
6:"cars",
7:"cards",
8:"grid",
9:"bubbles",
10:"cards"
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
 
  case "list":
    return <OptionList question={question} selectedOption={selectedOption} onSelect={onSelect} />
  case "two":
    return <OptionTwo question={question} selectedOption={selectedOption} onSelect={onSelect} />
  default:
    return <OptionCard question={question} selectedOption={selectedOption} onSelect={onSelect} />
}

}
