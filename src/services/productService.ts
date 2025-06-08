import { ProductDTO } from "@/components/utils/typing";
export async function getAllProducts(): Promise<ProductDTO[]> {
  const response = await fetch("http://localhost:5035/product/all");

  if (!response.ok) {
    throw new Error(`Error al obtener productos: ${response.statusText}`);
  }

  const rawData = await response.json();

  const normalizedData: ProductDTO[] = rawData.map((p: any) => {
    const validVariants = p.Variants?.filter((v: any) => v.Price > 0) || [];
    const minVariant = validVariants.length > 0
      ? validVariants.reduce((min: any, curr: any) => (curr.Price < min.Price ? curr : min))
      : null;

    return {
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
      price: minVariant?.Price ?? 0,
      volume: minVariant?.Volume,
      unit: minVariant?.Unit,
    };
  });

  return normalizedData.filter(p => !!p.id && !!p.name?.trim());
}

