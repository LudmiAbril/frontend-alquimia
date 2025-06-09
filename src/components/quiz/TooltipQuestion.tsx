"use client"
import { Tooltip } from "@mui/material"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

const explicaciones: Record<number, string> = {
  1: "El tono de piel influye en cómo se perciben las fragancias. Las pieles claras resaltan notas frescas; las oscuras fijan mejor las cálidas.",
  2: "Las fragancias intensas proyectan más; las sutiles son más íntimas. Depende de cómo querés que se perciba tu aroma.",
  3: "Las notas frescas generan ligereza; las amaderadas o especiadas aportan calidez y profundidad según tu preferencia.",
  4: "Las estaciones favorecen distintas notas: cítricas en verano, cálidas en invierno, adaptándose al clima y a tu afinidad.",
  5: "Tu aroma preferido refleja tus recuerdos o emociones. Esto permite identificar tu perfil olfativo personal.",
  6: "Las notas frescas y herbales evocan calma tipo spa; las dulces o especiadas transmiten confort y calidez.",
  7: "El ambiente que te da paz orienta hacia notas verdes si es natural, o dulces si es cálido y envolvente.",
  8: "Tu deseo emocional guía la elección: cítricos para frescura, amaderados para confianza, orientales para seducción.",
  9: "Eventos especiales requieren notas duraderas y memorables como especiadas o florales suaves según el tono.",
  10: "La presencia de una fragancia varía según su concentración: Body Splash es leve, Eau de Parfum más intensa.",
}

export default function TooltipQuestion({ id }: { id: number }) {
  const contenido = explicaciones[id] || "Esta pregunta ayuda a personalizar mejor tu perfil olfativo."

return (
  <div className="w-full flex justify-center mt-2">
    <Tooltip title={contenido} arrow>
      <span className="cursor-help text-[var(--violeta)] hover:underline flex items-center gap-1 text-sm">
        <HelpOutlineIcon fontSize="small" /> ¿Por qué esta pregunta?
      </span>
    </Tooltip>
  </div>
)

}
