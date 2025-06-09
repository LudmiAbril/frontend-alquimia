"use client";

import { useEffect, useState } from "react";

/**
 * Hook para manejar el formulario de creación/edición de productos.
 * Se encarga de mantener sincronizados los flags booleanos (vegano, hipoalergénico, sin parabenos)
 * con los atributos seleccionados y de armar el payload correcto para el backend.
 */
export function useProductForm(imageUrls: string[], defaultCategory = "") {
  /* ────────────── Estados ────────────── */
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const [isVegan, setIsVegan] = useState(false);
  const [isHypoallergenic, setIsHypoallergenic] = useState(false);
  const [isParabenFree, setIsParabenFree] = useState(false);

  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  const [providerId, setProviderId] = useState<number | null>(null);

  /* ────────────── Effects ────────────── */
  useEffect(() => {
    const fetchProviderId = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5035/provider/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setProviderId(data.idProveedor);
        } else {
          console.error("❌ No se pudo obtener el ID del proveedor");
        }
      } catch (err) {
        console.error("❌ Error al obtener ID del proveedor:", err);
      }
    };

    fetchProviderId();
  }, []);

  /* ────────────── Helpers ────────────── */
  /**
   * Sincroniza la lista de atributos seleccionados con los flags booleanos.
   * Ajusta los textos de comparación si tus labels difieren.
   */
  const syncAttributes = (attrs: string[]) => {
    setSelectedAttributes(attrs);
    setIsVegan(attrs.includes("Vegano"));
    setIsHypoallergenic(attrs.includes("Hipoalergénico"));
    setIsParabenFree(attrs.includes("Sin parabenos"));
  };

  const resetForm = () => {
    setProductName("");
    setCategory(defaultCategory);
    setPrice("");
    setStock("");
    setDescription("");
    setIsVegan(false);
    setIsHypoallergenic(false);
    setIsParabenFree(false);
    setSelectedAttributes([]);
  };

  /* ────────────── Handlers ────────────── */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "productName":
        setProductName(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "stock":
        setStock(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    switch (name) {
      case "isVegan":
        setIsVegan(checked);
        break;
      case "isHypoallergenic":
        setIsHypoallergenic(checked);
        break;
      case "isParabenFree":
        setIsParabenFree(checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    /* Validaciones mínimas */
    if (!productName || !category || !price || !stock) {
      return {
        success: false,
        message: "Completá todos los campos obligatorios.",
      };
    }

    if (!providerId) {
      return {
        success: false,
        message: "No se pudo obtener el ID del proveedor.",
      };
    }

    if (!imageUrls[0]) {
      return {
        success: false,
        message: "Debés subir al menos una imagen del producto.",
      };
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return { success: false, message: "No se encontró el token." };
      }

 const payload = {
  name: productName.trim(),
  description: description.trim(),
  tipoProductoDescription: category,
  variants: [
    {
      volume: 0,
      unit: "unidad",
      price: Number(price),
      stock: Number(stock),
      isVegan: !!isVegan,
      isHypoallergenic: !!isHypoallergenic,
      isParabenFree: !!isParabenFree,
      image: imageUrls[0] || ""
    }
  ]
};
console.log("➡️ Payload:", JSON.stringify(payload, null, 2));

      const res = await fetch(
        `http://localhost:5035/provider/create/${providerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Error al crear producto:", errorText);
        throw new Error("Error al crear el producto.");
      }

      return { success: true, message: "Producto creado exitosamente." };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error al crear el producto." };
    }

  };  /* ────────────── API pública ────────────── */
  return {
    // Valores
    productName,
    category,
    price,
    stock,
    description,
    isVegan,
    isHypoallergenic,
    isParabenFree,
    selectedAttributes,

    // Setters
    setProductName,
    setCategory,
    setPrice,
    setStock,
    setDescription,
    setIsVegan,
    setIsHypoallergenic,
    setIsParabenFree,

    // Helpers
    setSelectedAttributes: syncAttributes,
    resetForm,
    handleSubmit,
    handleInputChange,
    handleCheckboxChange,
  };
}
