import { ProductDTO } from "@/components/Utils/typing";
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

//########A ESPERA DE ENDPOINT NUEVOS
// export async function getProductById(id: string): Promise<ProductDTO | null> {
//   const response = await fetch(`http://localhost:5035/product/${id}`);
//   if (!response.ok) return null;

//   const data = await response.json();

//   const validVariants = data.Variants?.filter((v: any) => v.Price > 0) || [];
//   const minVariant = validVariants.length > 0
//     ? validVariants.reduce((min: any, curr: any) => (curr.Price < min.Price ? curr : min))
//     : null;

//   return {
//     id: data.Id,
//     name: data.Name,
//     description: data.Description,
//     productType: data.ProductType,
//     provider: {
//       id: data.Provider?.Id,
//       nombre: data.Provider?.Nombre,
//       email: data.Provider?.Email,
//       esAprobado: data.Provider?.EsAprobado,
//     },
//     supplierName: data.SupplierName,
//     variants: data.Variants,
//     price: minVariant?.Price ?? 0,
//     volume: minVariant?.Volume,
//     unit: minVariant?.Unit,
//   };
// }

