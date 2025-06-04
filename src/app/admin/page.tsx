"use client"

import { useState, useEffect } from "react"
import {
  Box, Container, Typography, Card, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Snackbar, FormControl, InputLabel,
  Select, MenuItem, Avatar, AppBar, Toolbar,
} from "@mui/material"
import Image from "next/image" // ✅


import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from '@mui/material/Grid'; // ✅ Correcto


import GroupsIcon from "@mui/icons-material/Groups"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import StatCircleCard from "@/components/Admin/StatCircleCard"
import MagicParticles from "@/components/general/MagicParticles"
import SectionWrapper from "@/components/general/SectionWrapper"

interface ProviderDTO {
  Id: number
  Nombre: string
  Email: string
  EsAprobado: boolean
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#8e44ad",
      light: "#bb6bd9",
      dark: "#5e2750",
    },
    secondary: {
      main: "#95a5a6",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#7f8c8d",
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      principal: "var(--font-principal)",

    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #f0f0f0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "25px",
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 24px",
        },
      },
    },
  },
})

export default function AdminPanel() {
  const [providers, setProviders] = useState<ProviderDTO[]>([])
  const [filteredProviders, setFilteredProviders] = useState<ProviderDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending">("all")
  const [selectedProvider, setSelectedProvider] = useState<ProviderDTO | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })

  const mockProviders: ProviderDTO[] = [
    { Id: 1, Nombre: "Juan Pérez", Email: "juan@example.com", EsAprobado: true },
    { Id: 2, Nombre: "María García", Email: "maria@example.com", EsAprobado: false },
    { Id: 3, Nombre: "Carlos López", Email: "carlos@example.com", EsAprobado: true },
    { Id: 4, Nombre: "Ana Martínez", Email: "ana@example.com", EsAprobado: false },
    { Id: 5, Nombre: "Luis Rodríguez", Email: "luis@example.com", EsAprobado: false },
    { Id: 6, Nombre: "Sofia Hernández", Email: "sofia@example.com", EsAprobado: true },
    { Id: 7, Nombre: "Diego Morales", Email: "diego@example.com", EsAprobado: false },
  ]
  const fetchProviders = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5035/admin/listProviders", {
        credentials: "include",
      })

      if (!response.ok) throw new Error("Error al obtener proveedores")

      const data = await response.json()
      setProviders(data)
      setFilteredProviders(data)
    } catch (error) {
      console.error("Error fetching providers:", error)
      setSnackbar({ open: true, message: "Error al cargar proveedores", severity: "error" })
    } finally {
      setLoading(false)
    }
  }


  const approveProvider = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5035/admin/approveProvider/${id}`, {
        method: "POST",
        credentials: "include",
      })

      if (!response.ok) throw new Error("Error al aprobar proveedor")

      setProviders((prev) =>
        prev.map((p) => (p.Id === id ? { ...p, EsAprobado: true } : p))
      )
      setSnackbar({ open: true, message: "Proveedor aprobado correctamente", severity: "success" })
      setDialogOpen(false)
    } catch (error) {
      console.error("Error approving provider:", error)
      setSnackbar({ open: true, message: "Error al aprobar proveedor", severity: "error" })
    }
  }


  const deactivateProvider = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5035/admin/deactivateProvider/${id}`, {
        method: "PUT",
        credentials: "include",
      })

      if (!response.ok) throw new Error("Error al desactivar proveedor")

      setProviders((prev) =>
        prev.map((p) => (p.Id === id ? { ...p, EsAprobado: false } : p))
      )
      setSnackbar({ open: true, message: "Proveedor desactivado correctamente", severity: "success" })
      setDialogOpen(false)
    } catch (error) {
      console.error("Error deactivating provider:", error)
      setSnackbar({ open: true, message: "Error al desactivar proveedor", severity: "error" })
    }
  }


  useEffect(() => {
    let filtered = providers
    if (searchTerm) {
      filtered = filtered.filter(
        (provider) =>
          provider.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.Email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((provider) =>
        statusFilter === "approved" ? provider.EsAprobado : !provider.EsAprobado,
      )
    }

    setFilteredProviders(filtered)
  }, [providers, searchTerm, statusFilter])

  useEffect(() => {
    fetchProviders()
  }, [])

  const handleProviderClick = (provider: ProviderDTO) => {
    setSelectedProvider(provider)
    setDialogOpen(true)
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", backgroundColor: "var(--hueso)" }}>

        <Box
          sx={{
            minHeight: "110vh",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: "linear-gradient(to bottom, #451F55, #9444B6)",
            color: "white",
            overflow: "hidden",
            px: 2,
            pb: 20,
          }}
        >
          {/* Partículas mágicas */}
          <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <MagicParticles />
          </Box>

          {/* Texto principal */}
          <Box sx={{ position: "relative", zIndex: 1, maxWidth: "640px", mt: 4 }}>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold">GESTIONA TUS PROVEEDORES</h2>
              <p className="text-md md:text-lg mt-6">
                Administrá y aprobá proveedores de fragancias de forma clara, segura y personalizada.
              </p>
            </div>
          </Box>

          {/* Estadísticas */}
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 6, zIndex: 1 }}>
            <Grid item xs={12} sm={4}>
              <StatCircleCard
                icon={<GroupsIcon sx={{ fontSize: 40, color: "#8e44ad" }} />}
                value={providers.length}
                label="Total Proveedores"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCircleCard
                icon={<CheckCircleIcon sx={{ fontSize: 40, color: "#2ecc71" }} />}
                value={providers.filter((p) => p.EsAprobado).length}
                label="Aprobados"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StatCircleCard
                icon={<HourglassEmptyIcon sx={{ fontSize: 40, color: "#f1c40f" }} />}
                value={providers.filter((p) => !p.EsAprobado).length}
                label="Pendientes"
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "180px",
              backgroundImage: "url('/LandingImage/TreeBg.svg')",
              backgroundSize: "auto 100%",
              backgroundPosition: "bottom center",
              zIndex: 0,
            }}
          />

        </Box>



        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 6 }} id="providers-section" className="mt-10">

          {/* Filters Section */}
          <Card sx={{ mb: 4, p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Filtros de Búsqueda
            </Typography>
            <Grid container spacing={3} alignItems="center">
              <Grid item={true} xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Buscar proveedor"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o email..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </Grid>
              <Grid item={true} xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Estado</InputLabel>
                   <Select
        value={statusFilter}
        label="Estado"
        onChange={(e) =>
          setStatusFilter(e.target.value as "all" | "approved" | "pending")
        }
        sx={{
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <MenuItem value="all">Todos</MenuItem>
        <MenuItem value="approved">Aprobados</MenuItem>
        <MenuItem value="pending">Pendientes</MenuItem>
      </Select>
                </FormControl>
              </Grid>
              <Grid item={true} xs={12} md={3}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={fetchProviders}
                  sx={{ height: "56px", borderRadius: "10px"}}
                >
                  Actualizar
                </Button>
              </Grid>
            </Grid>
          </Card>

          {/* Providers Table */}
        
<Card sx={{ overflow: "hidden" }}>
  <Box sx={{ p: 3, borderBottom: "1px solid #e9ecef" }}>
    <Typography variant="h6">Lista de Proveedores ({filteredProviders.length})</Typography>
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
          {filteredProviders.map((provider) => (
            <TableRow
              key={provider.Id}
              hover
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f8f9fa" },
              }}
              onClick={() => handleProviderClick(provider)}
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
                  color={provider.EsAprobado ? "error" : "primary"}
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    provider.EsAprobado
                      ? deactivateProvider(provider.Id)
                      : approveProvider(provider.Id)
                  }}
                  sx={{
                    borderRadius: "10px",
                    minWidth: "120px",
                    height: "36px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    px: 2,
                  }}
                >
                  {provider.EsAprobado ? "Desactivar" : "Aprobar"}
                </Button>
              </TableCell>
            </TableRow>

            
          ))}
          {filteredProviders.length === 0 && (
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

        </Container>


        {/* Provider Detail Dialog */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ pb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ mr: 2, bgcolor: "#8e44ad" }}>{selectedProvider?.Nombre.charAt(0)}</Avatar>
              <Typography variant="h6">Detalles del Proveedor</Typography>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            {selectedProvider && (
              <Box>
                <Typography variant="h6" gutterBottom sx={{ color: "#2c3e50" }}>
                  {selectedProvider.Nombre}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  <strong>ID:</strong> #{selectedProvider.Id}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  <strong>Email:</strong> {selectedProvider.Email}
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Chip
                    label={selectedProvider.EsAprobado ? "Aprobado" : "Pendiente de Aprobación"}
                    color={selectedProvider.EsAprobado ? "success" : "warning"}
                    variant="filled"
                    sx={{ borderRadius: "16px" }}
                  />
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setDialogOpen(false)} sx={{ borderRadius: "16px" }}>
              Cerrar
            </Button>
            {selectedProvider && !selectedProvider.EsAprobado && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => approveProvider(selectedProvider.Id)}
                sx={{ borderRadius: "10px" }}
              >
                Aprobar Proveedor
              </Button>
            )}
            {selectedProvider && selectedProvider.EsAprobado && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => deactivateProvider(selectedProvider.Id)}
                sx={{ borderRadius: "10px" }}
              >
                Desactivar Proveedor
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%", borderRadius: "12px" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* CSS for animations */}
        <style jsx global>{`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 0.1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.2;
            }
            100% {
              transform: scale(1);
              opacity: 0.1;
            }
          }
        `}</style>
      </Box>
    </ThemeProvider>
  )
}
