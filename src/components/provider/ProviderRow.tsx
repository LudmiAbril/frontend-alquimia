"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductDTO } from "../utils/typing";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

interface Props {
  producto: ProductDTO;
  onDeleted?: (idEliminado: number) => void;
}

export default function ProviderRow({ producto, onDeleted }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5035/provider/products/${producto.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Fallo al eliminar el producto");

      // Notificar al padre para que quite la fila
      onDeleted?.(producto.id);

      handleClose();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleEdit = () => router.push(`/editarProducto/${producto.id}`);

  const stock = Array.isArray(producto.variants)
    ? producto.variants.reduce((acc, v) => acc + (v.stock ?? 0), 0)
    : 0;

  return (
    <>
      <tr className="border-t text-sm">
        <td className="py-3 px-4 text-center">{producto.id}</td>
        <td className="py-3 px-4 text-center">{producto.name}</td>
        <td className="py-3 px-4 text-center">{producto.description}</td>
        <td className="py-3 px-4 text-center">{stock}</td>
        <td className="py-2 px-2">
          <div className="flex justify-center gap-2">
            <button
              onClick={handleEdit}
              className="w-10 h-10 p-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all flex items-center justify-center"
            >
              <EditIcon fontSize="small" />
            </button>

            <button
              onClick={handleOpen}
              className="w-10 h-10 p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-all flex items-center justify-center"
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        </td>
      </tr>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que querés eliminar el producto{" "}
            <strong>{producto.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
