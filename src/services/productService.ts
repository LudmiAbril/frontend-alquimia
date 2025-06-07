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
    supplierName: p.SupplierName,
    variants: p.Variants,
  }));

  return normalizedData.filter(p => !!p.id && !!p.name?.trim());
}
