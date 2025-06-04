"use client"

import CustomButton from "./CustomButton"
import { Provider } from "../utils/typing"


interface Props {
  provider: Provider
}

export default function ProviderRow({ provider }: Props) {
  return (
    <tr className="border-t text-center">
      <td className="py-3">{provider.id}</td>
      <td>{provider.name}</td>
      <td>{provider.description}</td>
      <td className="flex gap-2 justify-center py-2">
        <CustomButton variant="outlined">Actualizar</CustomButton>
        <CustomButton color="error">Eliminar</CustomButton>
      </td>
    </tr>
  )
}
