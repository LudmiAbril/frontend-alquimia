import Button from "@/components/general/Button";
import { PropsTextSectionWithButton } from "../utils/typing";



export default function TextSectionWithButton({
  title,
  description,
  buttonText,
  className = "",
}: PropsTextSectionWithButton) {
  return (
    <div className={`text-white ${className}`}>
      <h2 className="font-bold text-xl md:text-2xl mb-4">{title}</h2>
      <p className="text-sm md:text-base mb-6 whitespace-pre-line">{description}</p>
      <Button label={buttonText} />
    </div>
  );
}
