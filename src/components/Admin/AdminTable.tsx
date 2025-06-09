"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Box,
  Typography,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"

import { useState } from "react"
import { ProviderDTO, ProviderTableProps } from "../Utils/typing"

export default function ProviderTable({
  providers,
  loading,
  onProviderClick,
  onApprove,
  onDeactivate,
}: ProviderTableProps) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<ProviderDTO | null>(null)


  const handleOpenConfirm = (provider: ProviderDTO) => {
    setSelectedProvider(provider)
    setConfirmDialogOpen(true)
  }

  const handleCloseConfirm = () => {
    setSelectedProvider(null)
    setConfirmDialogOpen(false)
  }

  const handleConfirmDeactivate = () => {
    if (selectedProvider) {
      onDeactivate(selectedProvider.Id)
      handleCloseConfirm()
    }
  }

  return (
    <>
      <Card sx={{ overflow: "hidden" ,   borderRadius: "15px", mb: "5"}} >
        <Box sx={{ p: 3, borderBottom: "1px solid #e9ecef" }}>
          <Typography variant="h6">Lista de Proveedores</Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
            <Typography color="text.secondary">Cargando proveedores...</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                  <TableCell sx={{ fontWeight: 600, color: "#2c3e50" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#2c3e50" }}>Proveedor</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#2c3e50" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#2c3e50" }}>Estado</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#2c3e50" }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {providers.map((provider) => (
                  <TableRow
                    key={provider.Id}
                    hover
                    sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f8f9fa" } }}
                    onClick={() => onProviderClick(provider)}
                  >
                    <TableCell>#{provider.Id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            mr: 2,
                            bgcolor: "#8e44ad",
                            width: 36,
                            height: 36,
                            fontSize: "0.9rem",
                          }}
                        >
                          {provider.Nombre.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {provider.Nombre}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {provider.Email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={provider.EsAprobado ? "Aprobado" : "Pendiente"}
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: "10px",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          color: provider.EsAprobado ? "#2ecc71" : "#f39c12",
                          borderColor: provider.EsAprobado ? "#2ecc71" : "#f39c12",
                          backgroundColor: "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={provider.EsAprobado ? "outlined" : "contained"}
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (provider.EsAprobado) {
                            handleOpenConfirm(provider);
                          } else {
                            onApprove(provider.Id);
                          }
                        }}
                        sx={{
                          borderRadius: "10px",
                          minWidth: "120px",
                          height: "36px",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          px: 2,
                          color: provider.EsAprobado ? "var(--violeta)" : "#fff",
                          borderColor: "var(--violeta)",
                          backgroundColor: provider.EsAprobado ? "transparent" : "var(--violeta)",
                          "&:hover": {
                            backgroundColor: provider.EsAprobado ? "#f4e5ff" : "#7a2f96",
                          },
                        }}
                      >
                        {provider.EsAprobado ? "Desactivar" : "Aprobar"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {providers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                      <Typography color="text.secondary">No se encontraron proveedores</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>


      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirm}
        PaperProps={{
          sx: {
            borderRadius: "24px",
            px: 4,
            py: 3,
            textAlign: "center",
            alignItems: "center",
            width: "450px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            mb: 1,
          }} 
        >
          <WarningAmberIcon color="warning" />
          Confirmar desactivación
        </DialogTitle>

        <DialogContent sx={{ px: 4, py: 2 }}>
          <Typography>
            ¿Estás seguro de que querés desactivar al proveedor <strong>{selectedProvider?.Nombre}</strong>?
          </Typography>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            gap: 2,
            pt: 2,
          }}
        >
          <Button
            onClick={handleCloseConfirm}
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
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirmDeactivate}
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
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}
