import SectionWrapper from "@/components/general/SectionWrapper";
import ProductDetail from "@/components/proveedores/ProductDetail";
import { Product, ProductPageProps} from "@/components/utils/typing";
import { mockProducts } from "@/components/utils/utils";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  // Buscar el producto por nombre transformado a slug
  const product: Product | undefined = Object.values(mockProducts)
    .flat()
    .find((p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug);

  if (!product) {
    return notFound();
  }

  // Agregar manualmente info que falta si no está en el mock
  const category = "envases";
  const subcategory = "cuadradas";

  // Extraer el nombre real del proveedor del campo `categoria: "por XYZ"`
  const supplier = product.category.replace(/^por\s+/i, "");

  return (
    <SectionWrapper>
      <ProductDetail
        name={product.name}
        price={product.price}
        image={product.image}
        category={product.category}
        supplier={supplier}
        mainCategory={category}
        subCategory={subcategory}
      />
    </SectionWrapper>
  );
}
