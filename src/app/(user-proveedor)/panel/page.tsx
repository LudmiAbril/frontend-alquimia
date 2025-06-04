"use client"

import SectionWrapper from "@/components/general/SectionWrapper"
import CustomButton from "@/components/provider/CustomButton"
import ProviderTable from "@/components/provider/ProviderTable"
import ProviderTabs from "@/components/provider/ProviderTabs"
import { Provider } from "@/components/utils/typing"



export default function ProviderPage() {
  const mockProviders: Provider[] = [
    { id: 1, name: "Producto A", description: "Descripción A" },
    { id: 2, name: "Producto B", description: "Descripción B" },
    { id: 3, name: "Producto C", description: "Descripción C" },
  ]

  return (
<SectionWrapper className="bg-[var(--hueso)]">     
        
  <div className="flex items-center gap-4">
    <h2 className="text-2xl font-bold text-[var(--gris4)]">Productos del Proveedor</h2>
  </div>
 <div className="flex justify-between items-center mb-4 mt-6">
  <ProviderTabs />
  <CustomButton color="primary">Crear Producto</CustomButton>
</div>

      <ProviderTable providers={mockProviders} />
    </SectionWrapper>
  )
}
