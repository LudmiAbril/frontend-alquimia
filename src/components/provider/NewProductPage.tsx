"use client";

import { useRef } from "react";
import { ChangeEvent } from "react";
import { TextField, MenuItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectableButtonGroup from "./common/SelectableButtonGroup";
import { attributesProduct } from "../utils/utils";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useProductForm } from "@/hooks/useProductForm";


export default function NewProductPage() {
  const dropRef = useRef<HTMLDivElement>(null);
  const {
    productName,
    category,
    price,
    stock,
    description,
    isVegan,
    isHypoallergenic,
    isParabenFree,
    selectedAttributes,
   
    handleSubmit,
    setSelectedAttributes
  } = useProductForm();

  const {
    images,
    handleImageUpload,
    handleDrop,
    handleRemoveImage,
    message
  } = useImageUpload();

  function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    throw new Error("Funcion no implementada.");
  }

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>, checked: boolean): void {
    throw new Error("Funcion no implementada.");
  }

  return (
    <section className="flex gap-6 p-6 min-h-screen text-sm max-w-[1800px] mx-auto mt-10">
      {/* Columna izquierda - imágenes */}
      <div className="w-[40%] bg-white rounded-lg p-5 shadow-md border border-gray-200">
        <h2 className="text-base font-semibold text-gray-700 mb-3">Agregar imágenes</h2>
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer"
        >
          <CloudUploadIcon className="text-gray-400 mb-1" fontSize="medium" />
          <p className="text-gray-500 text-xs">
            Arrastrá tus imágenes o
            <label className="text-[var(--violeta)] underline cursor-pointer ml-2">
              explorá
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  handleImageUpload(e);
                  e.target.value = "";
                }}
                className="hidden"
              />
            </label>
          </p>
        </div>
        {message && <p className="text-red-500 text-xs mt-2">{message}</p>}
        <ul className="mt-3 space-y-1">
          {images.map((file, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-[var(--hueso)] p-2 rounded text-xs"
            >
              <div className="flex items-center gap-2">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-8 h-8 object-cover rounded"
                />
                {file.name} ({Math.round(file.size / 1024)} KB)
              </div>
              <button onClick={() => handleRemoveImage(index)}>
                <DeleteIcon fontSize="small" className="text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Columna derecha - datos */}
      <div className="w-[65%] bg-white rounded-lg p-6 shadow-md border border-gray-200">
        <h2 className="text-base font-semibold text-gray-700 mb-4">Detalles del producto</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <TextField
            label="Nombre del producto"
            name="productName"
            fullWidth
            required
            size="small"
            value={productName}
            onChange={handleInputChange}
            sx={violetInputStyle}
          />

          <div className="flex gap-4">
            <TextField
              label="Categoría"
              name="category"
              select
              fullWidth
              required
              size="small"
              value={category}
              onChange={handleInputChange}
              sx={violetInputStyle}
            >
              <MenuItem value="Fragancia">Fragancia</MenuItem>
              <MenuItem value="Envase">Envase</MenuItem>
              <MenuItem value="Insumo">Insumo</MenuItem>
            </TextField>

            <TextField
              label="Cantidad de stock"
              name="stock"
              fullWidth
              type="number"
              size="small"
              required
              value={stock}
              onChange={handleInputChange}
              sx={violetInputStyle}
            />
          </div>

          <TextField
            label="Precio"
            name="price"
            type="number"
            fullWidth
            size="small"
            required
            InputProps={{ startAdornment: <span className="mr-2">$</span> }}
            value={price}
            onChange={handleInputChange}
            sx={violetInputStyle}
          />

          <TextField
            label="Descripción"
            name="description"
            multiline
            rows={3}
            fullWidth
            size="small"
            value={description}
            onChange={handleInputChange}
            sx={violetInputStyle}
          />

          <p className="text-sm text-gray-700 mb-2">
            Seleccioná las características que describen tu producto:
            <span className="italic text-gray-500"> (opcional)</span>
          </p>

          <div className="w-full">
            <SelectableButtonGroup
              options={attributesProduct}
              selected={selectedAttributes}
              onChange={setSelectedAttributes}
            />
          </div>

      

          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="bg-[var(--violeta)] text-white hover:bg-[#7a2f96] rounded-md px-6 py-2 text-sm font-semibold"
            >
              Publicar producto
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const violetInputStyle = {
  '& label.Mui-focused': { color: '#9444B6' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#ccc' },
    '&:hover fieldset': { borderColor: '#9444B6' },
    '&.Mui-focused fieldset': { borderColor: '#9444B6' },
  },
};
