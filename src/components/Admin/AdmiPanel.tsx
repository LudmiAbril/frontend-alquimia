"use client"

import { useEffect, useState } from "react"
import { Box, Container, Typography, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Avatar, Chip, Button } from "@mui/material"
import ProviderFilters from "@/components/admin/ProviderFilters"
import ProviderTable from "@/components/admin/AdminTable"
import ProviderStats from "@/components/admin/ProviderStats"
import MagicParticles from "@/components/general/MagicParticles"
import { approveProvider, deactivateProvider } from "@/services/providerFunctionsService"
import { ProviderDTO } from "../utils/typing"
import { fetchProviders } from "@/services/providerFunctionsService"


export default function AdminPanel() {
    const [providers, setProviders] = useState<ProviderDTO[]>([])
    const [filteredProviders, setFilteredProviders] = useState<ProviderDTO[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending">("all")
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedProvider, setSelectedProvider] = useState<ProviderDTO | null>(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as "success" | "error" })

    useEffect(() => {
        fetchProviders(setProviders, setFilteredProviders, setSnackbar, setLoading)
    }, [])

    useEffect(() => {
        let result = [...providers]
        if (searchTerm) {
            result = result.filter(
                (p) =>
                    p.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    p.Email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        if (statusFilter !== "all") {
            result = result.filter((p) => (statusFilter === "approved" ? p.EsAprobado : !p.EsAprobado))
        }
        setFilteredProviders(result)
    }, [providers, searchTerm, statusFilter])

    const handleProviderClick = (provider: ProviderDTO) => {
        setSelectedProvider(provider)
        setDialogOpen(true)
    }

    const handleApprove = async (id: number) => {
        await approveProvider(id, setProviders, setSnackbar, () => setDialogOpen(false))
    }

    const handleDeactivate = async (id: number) => {
        await deactivateProvider(id, setProviders, setSnackbar, () => setDialogOpen(false))
    }

    const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false })

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: "var(--hueso)" }}>
           
            <Box
                sx={{
                    minHeight: "50vh",
                   
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    overflow: "hidden",
                    px: 2,
                    mt: 14,
                    pb: 10,

                }}
            >
                <Box sx={{ position: "absolute", inset: 0, zIndex: 0 }}>
                    <MagicParticles />
                </Box>

                <Box sx={{ position: "relative", zIndex: 1, maxWidth: "640px", mt: 4 }}>
                    <h2 className="text-2xl md:text-3xl font-bold text-[var(--gris4)] mb-5">GESTIONA TUS PROVEEDORES</h2>
                    
                    <p className="text-md italic text-[var(--gris3)]  mt-6 mb-6">
                        Administrá y aprobá proveedores de fragancias de forma clara, segura y personalizada.</p>
                </Box>

                <ProviderStats
                    total={providers.length}
                    approved={providers.filter((p) => p.EsAprobado).length}
                    pending={providers.filter((p) => !p.EsAprobado).length}
                />


            </Box>

            <Container maxWidth="lg" sx={{ py: 6 }}>
                <ProviderFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    fetchProviders={() => fetchProviders(setProviders, setFilteredProviders, setSnackbar, setLoading)
                    }
                />

                <ProviderTable
                    providers={filteredProviders}
                    loading={loading}
                    onProviderClick={handleProviderClick}
                    onApprove={handleApprove}
                    onDeactivate={handleDeactivate}
                />
            </Container>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ pb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ mr: 2, bgcolor: "#8e44ad" }}>
                            {selectedProvider?.Nombre.charAt(0)}
                        </Avatar>
                        <Typography variant="h6">Detalles del Proveedor</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    {selectedProvider && (
                        <Box>
                            <Typography variant="h6" sx={{ color: "#2c3e50" }}>{selectedProvider.Nombre}</Typography>
                            <Typography variant="body1" color="text.secondary"><strong>ID:</strong> #{selectedProvider.Id}</Typography>
                            <Typography variant="body1" color="text.secondary"><strong>Email:</strong> {selectedProvider.Email}</Typography>
                            <Box sx={{ mt: 2 }}>
                                <Chip
                                    label={selectedProvider.EsAprobado ? "Aprobado" : "Pendiente de Aprobación"}
                                    variant="outlined"
                                    sx={{
                                        borderRadius: "10px",
                                        fontWeight: 600,
                                        fontSize: "0.75rem",
                                        color: selectedProvider.EsAprobado ? "#2ecc71" : "#f39c12",
                                        borderColor: selectedProvider.EsAprobado ? "#2ecc71" : "#f39c12",
                                        backgroundColor: "transparent",
                                    }}
                                />
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={() => setDialogOpen(false)} sx={{ borderRadius: "10px" }}>Cerrar</Button>
                    {selectedProvider && !selectedProvider.EsAprobado && (
                        <Button
                            variant="contained"
                            onClick={() => handleApprove(selectedProvider.Id)}
                            sx={{
                                backgroundColor: "#8e44ad",
                                color: "#fff",
                                borderRadius: "10px",
                                fontWeight: 600,
                                px: 4,
                            }}
                        >
                            Aprobar Proveedor
                        </Button>
                    )}
                    {selectedProvider && selectedProvider.EsAprobado && (
                        <Button
                            variant="contained"
                            onClick={() => handleDeactivate(selectedProvider.Id)}
                            sx={{
                                backgroundColor: "#8e44ad",
                                color: "#fff",
                                borderRadius: "10px",
                                fontWeight: 600,
                                px: 4,
                            }}
                        >
                            Desactivar Proveedor
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ borderRadius: "12px" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}
