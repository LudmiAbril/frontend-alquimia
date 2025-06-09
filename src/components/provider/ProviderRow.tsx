"use client";

import { useState } from "react";
import { PropsRow } from "../utils/typing";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { MouseEvent as ReactMouseEvent } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";


export default function ProviderRow({ provider }: PropsRow) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirmDelete = () => {
    console.log("Eliminando producto con ID:", provider.id);
    handleClose();
  };

function handleEdit(event: ReactMouseEvent<HTMLButtonElement>): void {
  console.log("Editando:", provider.id);
}

function handleDelete(event: ReactMouseEvent<HTMLButtonElement>): void {
  handleOpen();
}

  return (
    <>
      <tr className="border-t text-sm">
        <td className="py-3 px-4 text-center">{provider.id}</td>
        <td className="py-3 px-4 text-center">{provider.name}</td>
        <td className="py-3 px-4 text-center">{provider.description}</td>
        <td className="py-3 px-4 text-center">{provider.stock || 0}</td>
        <td className="py-2 px-2">
          <div className="flex justify-center gap-2">
  <button
  onClick={handleEdit}
  className="w-10 h-10 p-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all flex items-center justify-center"
>
  <EditIcon fontSize="small" />
</button>

<button
  onClick={handleDelete}
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
            ¿Estás seguro de que querés eliminar el producto <strong>{provider.name}</strong>?
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
