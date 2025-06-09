"use client";

import { useEffect, useRef, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectableButtonGroup from "./common/SelectableButtonGroup";
import SnackbarFeedback from "./common/SnackbarFeedback";
import { attributesProduct } from "../utils/utils";
import { useImageUpload } from "@/services/useImageUploadService";
import { useProductForm } from "@/services/useProductForm";

export default function NewProductPage() {
  /* ───────────── refs & state ───────────── */
  const dropRef = useRef<HTMLDivElement>(null);

  // categorías (desde API)
  const [categories, setCategories] = useState<string[]>([]);
  const [defaultCategory, setDefaultCategory] = useState("");

  // snackbar feedback
  const [snack, setSnack] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  /* ───────────── hooks personalizados ───────────── */
  const {
    images,
    urls,
    handleImageUpload,
    handleDrop,
    handleRemoveImage,
    message: imageMessage,
  } = useImageUpload();

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
    resetForm,
    setCategory,
    setSelectedAttributes,
    handleInputChange,
    handleCheckboxChange,
  } = useProductForm(urls, defaultCategory);

  /* ───────────── fetch categorías ───────────── */
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("🚫 No token");
        return;
      }

      const res = await fetch("http://localhost:5035/provider/product-types", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.error("❌ Status", res.status);
        return;
      }

      const data = await res.json();
      const fetched = data
        .map(
          (t: any) =>
            t.descripcion ??
            t.Descripcion ??
            t.description ??
            t.Description
        )
        .filter(Boolean);

      setCategories(fetched);
      setDefaultCategory(fetched[0] || "");
    } catch (err) {
      console.error("❌ fetchCategories", err);
    }
  };

  /* ───────────── efectos ───────────── */
  useEffect(() => {
    fetchCategories();
  }, []);

  // selecciona la primera categoría cuando cargan
  useEffect(() => {
    if (categories.length && !category) {
      setCategory(categories[0]);
    }
  }, [categories]);

  /* ───────────── submit wrapper ───────────── */
  const onSubmit = async (e: React.FormEvent) => {
    const res = await handleSubmit(e);
    setSnack({
      open: true,
      message: res.message,
      severity: res.success ? "success" : "error",
    });
    if (res.success) resetForm();
  };

  /* ───────────── render ───────────── */
  return (
    <section className="flex gap-6 p-6 min-h-screen text-sm max-w-[1800px] mx-auto mt-10">
      {/* ─── Columna izquierda: imágenes ─── */}
      <div className="w-[40%] bg-white rounded-lg p-5 shadow-md border border-gray-200">
        <h2 className="text-base font-semibold text-gray-700 mb-3">
          Agregar imágenes
        </h2>

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

        {imageMessage && (
          <p className="text-red-500 text-xs mt-2">{imageMessage}</p>
        )}

        <ul className="mt-3 space-y-1">
          {images.map((file, i) => (
            <li
              key={i}
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
              <button onClick={() => handleRemoveImage(i)}>
                <DeleteIcon fontSize="small" className="text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── Columna derecha: datos del producto ─── */}
      <div className="w-[65%] bg-white rounded-lg p-6 shadow-md border border-gray-200">
        <h2 className="text-base font-semibold text-gray-700 mb-4">
          Detalles del producto
        </h2>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            label="Nombre del producto"
            name="productName"
            fullWidth
            required
            size="small"
            value={productName}
            onChange={handleInputChange}
            sx={muiStyle}
          />

          <div className="flex gap-4">
            <TextField
              label="Categoría"
              name="category"
              select
              fullWidth
              required
              size="small"
              value={category || ""}
              onChange={handleInputChange}
              sx={muiStyle}
            >
              {categories.length === 0 ? (
                <MenuItem disabled value="">
                  Cargando...
                </MenuItem>
              ) : (
                categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))
              )}
            </TextField>

            <TextField
              label="Cantidad de stock"
              name="stock"
              type="number"
              fullWidth
              required
              size="small"
              value={stock}
              onChange={handleInputChange}
              sx={muiStyle}
            />
          </div>

          <TextField
            label="Precio"
            name="price"
            type="number"
            fullWidth
            required
            size="small"
            InputProps={{ startAdornment: <span className="mr-2">$</span> }}
            value={price}
            onChange={handleInputChange}
            sx={muiStyle}
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
            sx={muiStyle}
          />

          <p className="text-sm text-gray-700 mb-2">
            Seleccioná las características que describen tu producto:
            <span className="italic text-gray-500"> (opcional)</span>
          </p>

          <SelectableButtonGroup
            options={attributesProduct}
            selected={selectedAttributes}
            onChange={setSelectedAttributes}
          />

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

      {/* ─── Snackbar global ─── */}
      <SnackbarFeedback
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      />
    </section>
  );
}

/* MUI input violet style */
const muiStyle = {
  "& label.Mui-focused": { color: "#9444B6" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#ccc" },
    "&:hover fieldset": { borderColor: "#9444B6" },
    "&.Mui-focused fieldset": { borderColor: "#9444B6" },
  },
};
