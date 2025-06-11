import { ProductDTO } from "@/components/utils/typing";
export async function getAllProducts(): Promise<ProductDTO[]> {
  const response = await fetch("http://localhost:5035/product/all");

  if (!response.ok) {
    throw new Error(`Error al obtener productos: ${response.statusText}`);
  }

  const rawData = await response.json();

  const normalizedData: ProductDTO[] = rawData.map((p: any) => ({
    id: p.Id,
    name: p.Name,
    description: p.Description,
    productType: p.ProductType,
    provider: {
      id: p.Provider?.Id,
      nombre: p.Provider?.Nombre,
      email: p.Provider?.Email,
      esAprobado: p.Provider?.EsAprobado,
    },
    variants: (p.Variants || []).map((v: any) => ({
      id: v.Id,
      volume: v.Volume,
      unit: v.Unit,
      price: v.Price,
      stock: v.Stock,
      isHypoallergenic: v.IsHypoallergenic,
      isVegan: v.IsVegan,
      isParabenFree: v.IsParabenFree
    })),
  }));

  return normalizedData;
}

export const getProductImage = (name: string): string => {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("naranja")) return "/imgProductos/esenciaNaranja.png";
  if (lowerName.includes("jazmín") || lowerName.includes("jazmin")) return "/imgProductos/esenciaJazmin.png";

 
  if (lowerName.includes("alcohol")) return "/imgProductos/alcohol.png";

  if (
    lowerName.includes("frasco") ||
    lowerName.includes("botella") ||
    lowerName.includes("envase")
  ) {
    if (lowerName.includes("blanco")) return "/imgProductos/whitebottl.png";
    return "/imgProductos/glassbottle.png";
  }

  // Fallback 
  return "/imgProductos/esenciaNaranja.png";
};
