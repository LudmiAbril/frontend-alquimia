"use client"

import { Box } from "@mui/material"
import StatCircleCard from "./StatCircleCard"
import GroupsIcon from "@mui/icons-material/Groups"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty"
import { ProviderStatsProps } from "../utils/typing"

export default function ProviderStats({ total, approved, pending }: ProviderStatsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        flexWrap: "wrap",
        mt: 6,
        zIndex: 1,
      }}
    >
      <StatCircleCard
        icon={<GroupsIcon sx={{ fontSize: 40, color: "#8e44ad" }} />}
        value={total}
        label="Total Proveedores"
      />
      <StatCircleCard
        icon={<CheckCircleIcon sx={{ fontSize: 40, color: "#2ecc71" }} />}
        value={approved}
        label="Aprobados"
      />
      <StatCircleCard
        icon={<HourglassEmptyIcon sx={{ fontSize: 40, color: "#f1c40f" }} />}
        value={pending}
        label="Pendientes"
      />
    </Box>
  )
}
