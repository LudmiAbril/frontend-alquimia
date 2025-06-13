import { Wand2 } from "lucide-react"
import ButtonMagic from "../General/ButtonMagic"
import IntroSequence from "./IntroSequence"
import FloatingMascot from "../General/MascotaFlotante";
import { messagesQuimiQuiz } from "../utils/utils";



export default function WelcomeIntro({ onNext }: { onNext: () => void }) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      {/* <Image src="/mascotas/mascotas-grupo-fight.png" alt="Competencia olfativa" width={500} height={300} className="mb-6" /> */}
      <IntroSequence></IntroSequence>
      <h1 className="text-4xl font-bold text-[var(--gris4)] mb-4">¡Las familias se preparan para mostrar su esencia!</h1>
      <p className="text-[var(--gris4)] text-lg mb-6 max-w-xl">
        Solo una vibrará contigo. ¿Estás listo para descubrirla?
      </p>
      <ButtonMagic
              onClick={onNext}
              className="bg-[var(--violeta)] hover:bg-[#7a2f96] text-white px-6 py-2 rounded-full flex items-center gap-2 transition" label={"Conocer a las familias"}      >
        <Wand2 className="h-5 w-5" /> 
      </ButtonMagic>
      <FloatingMascot messages={messagesQuimiQuiz} imageSrc="/quimi/quimiLanding.png" />

    </div>
  )
}
