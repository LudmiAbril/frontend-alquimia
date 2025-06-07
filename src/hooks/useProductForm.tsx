// useProductForm.ts
"use client";

import { useState } from "react";

export function useProductForm() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [isHypoallergenic, setIsHypoallergenic] = useState(false);
  const [isParabenFree, setIsParabenFree] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  const resetForm = () => {
    setProductName("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");
    setIsVegan(false);
    setIsHypoallergenic(false);handleInputChange
    setIsParabenFree(false);
    setSelectedAttributes([]);
  };
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
    }
  };

  const handleSubmit = async () => {
    if (!productName || !category || !price || !stock) {
      return { success: false, message: "Completá todos los campos obligatorios." };
    }

    // Simulación de envío
    try {
      //  se haría la llamada real al backend
      await new Promise((res) => setTimeout(res, 1000));
      return { success: true, message: "Producto creado exitosamente." };
    } catch (error) {
      return { success: false, message: "Error al crear el producto." };
    }
  };

  return {
    productName,
    setProductName,
    category,
    setCategory,
    price,
    setPrice,
    stock,
    setStock,
    description,
    setDescription,
    isVegan,
    setIsVegan,
    isHypoallergenic,
    setIsHypoallergenic,
    isParabenFree,
    setIsParabenFree,
    selectedAttributes,
    setSelectedAttributes,
    resetForm,
    handleSubmit,
  };
}
