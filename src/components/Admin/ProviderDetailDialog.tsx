"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Chip,
  Button,
} from "@mui/material"
import Image from "next/image"
import { ProviderDetailDialogProps } from "../utils/typing"

export default function ProviderDetailDialog({
  provider,
  open,
  onClose,
  onApprove,
  onDeactivate,
}: ProviderDetailDialogProps) {
  if (!provider) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          padding: "2rem",
          backgroundColor: "#f1eae2",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Image src="/Logo/LogotipoVioleta.svg" alt="Logo Alquimia" width={40} height={40} />
        <Typography variant="h6" sx={{ fontFamily: "var(--font-principal)", fontSize: "1.5rem" }}>
          Ficha del proveedor
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          {/* Columna Izquierda */}
          <Box sx={{ minWidth: "250px", display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>
              <strong>Nombre:</strong> {provider.Nombre}
            </Typography>
            <Typography>
              <strong>ID:</strong> #{provider.Id}
            </Typography>
            <Typography>
              <strong>Email:</strong> {provider.Email}
            </Typography>
          </Box>

          {/* Columna Derecha */}
          <Box sx={{ minWidth: "250px", display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>
              <strong>Estado:</strong>{" "}
              <Chip
                label={provider.EsAprobado ? "Aprobado" : "Pendiente"}
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  color: provider.EsAprobado ? "#2ecc71" : "#f39c12",
                  borderColor: provider.EsAprobado ? "#2ecc71" : "#f39c12",
                  backgroundColor: "transparent",
                  ml: 1,
                }}
              />
            </Typography>
            <Typography>
              <strong>Productos subidos:</strong> 0
            </Typography>
            <Typography>
              <strong>Estado de pago:</strong>{" "}
              <Chip
                label="Pago exitoso"
                sx={{
                  backgroundColor: "#2ecc71",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  ml: 1,
                }}
              />
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "var(--violeta)",
            color: "var(--violeta)",
            borderRadius: "10px",
            fontWeight: 600,
            px: 3,
            "&:hover": {
              backgroundColor: "#f4e5ff",
            },
          }}
        >
          Cerrar
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--violeta)",
            color: "#fff",
            borderRadius: "10px",
            fontWeight: 600,
            px: 3,
            "&:hover": {
              backgroundColor: "#7a2f96",
            },
          }}
          onClick={() =>
            provider.EsAprobado ? onDeactivate(provider.Id) : onApprove(provider.Id)
          }
        >
          {provider.EsAprobado ? "Desactivar Proveedor" : "Aprobar Proveedor"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
