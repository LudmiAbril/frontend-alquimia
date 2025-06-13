import { ProductDTO } from "./typing";

export function getCategoryLabel(product: ProductDTO): string {
  const raw = product.productType?.trim().toLowerCase();
  if (!raw) return "otros";
  if (raw.endsWith("s")) return raw.slice(0, -1); 
  return raw;
}
