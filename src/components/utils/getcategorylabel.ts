import { ProductDTO } from "./typing";

export function getCategoryLabel(product: ProductDTO): string {
  return typeof product.productType === "string"
    ? product.productType
    : product.productType?.description?.trim() || "Otros";
}
