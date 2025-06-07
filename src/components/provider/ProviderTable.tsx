"use client"

import { Provider } from "../utils/typing"
import ProviderRow from "./ProviderRow"

interface Props {
  providers: Provider[]
}

export default function ProviderTable({ providers }: Props) {
  return (
    <table className="w-full bg-white rounded-xl border text-sm overflow-hidden">
      <thead>
        <tr className="bg-[#f9f9f9] text-center text-[var(--gris4)]">
          <th className="py-3 px-4 ">ID</th>
          <th >Nombre</th>
          <th >Descripción</th>
          <th >Stock</th>
          <th >Acciones</th>
        </tr>
      </thead>
      <tbody>
        {providers.map((p) => (
          <ProviderRow key={p.id} provider={p} />
        ))}
      </tbody>
    </table>
  )
}
