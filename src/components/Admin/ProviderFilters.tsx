"use client"

import { Dispatch, SetStateAction } from "react"
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, Button } from "@mui/material"
import { ProviderFiltersProps } from "../utils/typing"


export default function ProviderFilters({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    fetchProviders
}: ProviderFiltersProps) {
    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                padding: "24px",
                marginBottom: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", flexWrap: "wrap" }}>
                <TextField
                    label="Buscar proveedor"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nombre o email..."
                    sx={{borderRadius: "12px", flex: 1,
                        "& label.Mui-focused": {
                            color: "var(--violeta)",
                        },
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: "var(--violeta)",
                            },
                        },
                    }}

                />

                <FormControl sx={{ minWidth: 180 }}>
                    <InputLabel>Estado</InputLabel>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as "all" | "approved" | "pending")}
                        label="Estado"
                        sx={{borderRadius: "12px"
                    }}
                    >
                        <MenuItem value="all">Todos</MenuItem>
                        <MenuItem value="approved">Aprobados</MenuItem>
                        <MenuItem value="pending">Pendientes</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    onClick={fetchProviders}
                    variant="outlined"
                    sx={{
                        borderRadius: "10px",
                        fontWeight: 600,
                        height: "56px",
                        alignSelf: "start",
                        borderColor: "var(--violeta)",
                        color: "var(--violeta)",
                        "&:hover": {
                            backgroundColor: "var(--violeta)",
                            color: "#fff",
                        },
                    }}
                    className=" px-10 py-3"
                >
                    Actualizar
                </Button>
            </Box>
        </Box>
    )
}
