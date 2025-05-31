"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  AppBar,
  Toolbar,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from '@mui/material/Grid';

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
      <Box sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        {/* Navigation Header */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid #e9ecef",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            
            
          </Toolbar>
        </AppBar>

        {/* Hero Section */}
        <Box
          sx={{
            position: "relative",
            minHeight: "60vh",
            background: "linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ color: "white" }}>
                  <Typography variant="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                    GESTIONA TUS PROVEEDORES
                  </Typography>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 400, opacity: 0.9, mb: 4 }}>
                    DESDE LA SOLICITUD HASTA LA APROBACIÓN
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "1.1rem", opacity: 0.8, mb: 4, lineHeight: 1.6 }}>
                    Administra y aprueba proveedores de fragancias de manera eficiente. Controla el acceso y mantén la
                    calidad de tu plataforma.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "white",
                      color: "#8e44ad",
                      "&:hover": { backgroundColor: "#f8f9fa" },
                      px: 4,
                      py: 1.5,
                    }}
                    onClick={() => document.getElementById("providers-section")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    GESTIONAR PROVEEDORES
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
                  <Box
                    sx={{
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: "-20px",
                        left: "-20px",
                        right: "-20px",
                        bottom: "-20px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "50%",
                        animation: "pulse 2s infinite",
                      },
                    }}
                  >
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pet%20alquimia-AO8q7ItwM19PgZR6sbuH9FXi0XXMym.png"
                      alt="Alquimia Admin"
                      width={300}
                      height={300}
                      style={{ borderRadius: "50%", position: "relative", zIndex: 1 }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: 6 }} id="providers-section">
          {/* Stats Section */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h3" sx={{ color: "#8e44ad", fontWeight: "bold", mb: 1 }}>
                  {providers.length}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Total Proveedores
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h3" sx={{ color: "#27ae60", fontWeight: "bold", mb: 1 }}>
                  {providers.filter((p) => p.EsAprobado).length}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Aprobados
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center", p: 3 }}>
                <Typography variant="h3" sx={{ color: "#f39c12", fontWeight: "bold", mb: 1 }}>
                  {providers.filter((p) => !p.EsAprobado).length}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Pendientes
                </Typography>
              </Card>
            </Grid>
          </Grid>

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
                    onChange={(e) => setStatusFilter(e.target.value as "all" | "approved" | "pending")}
                    sx={{
                      borderRadius: "12px",
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
                  sx={{ height: "56px", borderRadius: "12px" }}
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
                            color={provider.EsAprobado ? "success" : "warning"}
                            variant="filled"
                            size="small"
                            sx={{ borderRadius: "16px" }}
                          />
                        </TableCell>
                        <TableCell>
                          {!provider.EsAprobado ? (
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation()
                                approveProvider(provider.Id)
                              }}
                              sx={{ borderRadius: "16px" }}
                            >
                              Aprobar
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation()
                                deactivateProvider(provider.Id)
                              }}
                              sx={{ borderRadius: "16px" }}
                            >
                              Desactivar
                            </Button>
                          )}
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
                sx={{ borderRadius: "16px" }}
              >
                Aprobar Proveedor
              </Button>
            )}
            {selectedProvider && selectedProvider.EsAprobado && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => deactivateProvider(selectedProvider.Id)}
                sx={{ borderRadius: "16px" }}
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
